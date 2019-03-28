var express = require("express");
var app = express();
var flickr = require("./flickr.js");
var parseString = require("xml2js").parseString;

var allowedFolders = ["Angular","libraries","static"];
var requestStatus= false;
var requestPayload = "";
var options = {
    host: "api.flickr.com",
    port: 443,
    path: "/services/feeds/photos_public.gne",
    method: "GET",
    headers: {
        "Content-Type": "application/xml"
    }
};

app.get("/poll",function(req,res){
    if(requestStatus){
        res.send(requestPayload);
        requestStatus = false;
    }
    else{
        res.send("false");
    }
    
}).get("/",function(req,res){
    var newPath = __dirname.split("\\");
    newPath.pop();
    newPath = newPath.join("/");
    newPath += "/";
    var fileOptions = {
        root: newPath,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    res.sendFile("index.html",fileOptions,function(){
        
    })
    console.log("Index loaded");
}).get("/request",function(req,res){
    console.log("Flickr request received.");
    flickr.sendRequest(options, function(status, responseText){
        if(status == 200){
            parseString(responseText, handleXML); //Equivalent to handleXML(parseString(responseText))
            res.send("received");
        }
        else{
            handleError(responseText);
        }

    });
    
}).get("/:folder/:file",function(req,res){
    var permission = false;
    for(var f in allowedFolders){
        if(allowedFolders[f] === req.params.folder){
            permission = true;
        }
    }
    if(permission){
        var newPath = __dirname.split("\\");
        newPath.pop();
        newPath = newPath.join("/")+"/"+req.params.folder;
        var fileOptions = {
            root: newPath,
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        }
        res.sendFile(req.params.file,fileOptions,
            function(err){
            }
        );
    }
    else{
        res.status(404);
    }
});

function handleXML(err, feedObj){
    var entries = flickr.formatFeedObject(feedObj);
    requestPayload = JSON.stringify(entries);
    requestStatus = true;
}
function handleError(errorText){
    requestPayload = errorText;
    requestStatus = true;
}

app.listen(8000);