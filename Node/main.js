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
}).get("/request",function(req,res){
    flickr.sendRequest(options, function(status, XMLfeed){
        
        if(status == 200){
            parseString(XMLfeed, handleXML);
            res.send("received");
        }
        else{
            res.send("error");
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
        res.sendFile(req.params.file,fileOptions,function(err){
            console.log(err);
        });
    }
    else{
        res.status(404);
    }
});

function handleXML(err, feedObj){
    var entries = flickr.parseFeedObject(feedObj);
    requestPayload = JSON.stringify(entries);
    requestStatus = true;
}

app.listen(8000);