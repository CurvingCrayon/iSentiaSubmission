var errors = [{name:"server",message:"The server was unable to process the request."},
{name:"flickr",message:"The server was unable to contact Flickr."},
//The last error is reserved for when the error code isnt found
{name:"not found",message:"An error occured, but we're not sure what it was."}];

function error(name){
    //Find which error it is
    var errFound = false;
    var errIndex = -1;
    for(var err in errors){
        if(errors[err].name === name){
            errFound = true;
            errIndex = err;
        }
    }
    //Create banner thing
}