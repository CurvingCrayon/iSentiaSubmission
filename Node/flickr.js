var http = require("http");
var https = require("https");

var offMessage = "All requests finished";



var flickrCategoryLink = "https://www.flickr.com/photos/tags/";

exports.formatFeedObject = function(feedObj) {
    var entries = feedObj.feed.entry;
    var newEntries = [];
    for(var e = 0; e < entries.length; e++){ //Loop through feed entries
        var entry = entries[e];
        //Convert date into string
        //e.g. Mar 21 2019
        var publishDate = Date(entry.published[0]).split(" ").splice(1,3).join(" ");
        var details = { //Create clean object for metadata based on feed structure (see above comment)
            author: {
                thumbnail: entry.author[0]["flickr:buddyicon"][0],
                name: entry.author[0].name[0],
                link: entry.author[0].uri[0]
            },
            categories: [], //This is filled in the following loop
            image: entry.link[0].$.href,
            imageURL: entry.link[entry.link.length-1].$.href, //URL to display image (last element)
            imageLink: entry.link[0].$.href,//Links to website
            title: entry.title[0],
            date: publishDate //Type: string ("Mar 21 2019")
        }
        for(var cat = 0; cat < entry.category.length; cat++){ //Generate categories list (due to awkward feed structure)
            details.categories.push(entry.category[cat].$.term);
        }
//        if(e == 0){
//            console.log(details);
//        }
        newEntries.push(details);
    }
    return newEntries;
}


exports.sendRequest = function(options, onResponse){ //Sends request using options object, with aSync callback
    
    var protocol = http;
    if(options.port == 443){ //Decide which node library to use based on options port
        protocol = https;
    }
    
    var req = protocol.request(options, function(res, err){ //Send request based on parameters and callback
        var responseText = "";
        
        res.setEncoding("utf8");
        
        res.on("data", function (chunk) {
            responseText += chunk;
            console.log("chunk loaded"); //Load each chunk into the responseText vairable
        });

        res.on("end", function() {
            console.log("response ended");
            onResponse(res.statusCode, responseText); //End with the responseText 
        });
    });

    req.on("error", function(err) {
        console.log("Flickr API not responding");
        onResponse(-1,"Flickr API not responding")
    });
    
    //req.on("response",function(){console.log("RESPONSE RECEIVED")});

    req.end();
};
