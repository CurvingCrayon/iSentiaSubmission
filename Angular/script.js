var received = false;
var pollTimer = 100;
function request(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText === "received"){
                $("#output").html("Request sent successfully");
                setTimeout(poll,pollTimer);
            }
            else{
                if(this.responseText === "error"){
                    error("flickr");
                }
                else{
                    error("server");
                }
            }
        }
    };
    xhttp.open("GET", "/request", true);
    xhttp.send();
}
function poll(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText === "false"){
                setTimeout(poll,pollTimer);
            }
            else{
                displayFeed(this.responseText);
            }
        }
    };
    xhttp.open("GET", "/poll", true);
    xhttp.send();

}
function displayFeed(feedText){
    console.log(JSON.parse(feedText));
}