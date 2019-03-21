//Code by Hayden Keers using the jQuery library

//Automatically scroll card headings when hovered over

var scrollConstant = 7; //How fast the auto-scroll moves

//The target element (card heading's) child takes precedence with z-index
//The event is therefore attached to the child, but affects the target (this.parentElement)
$("body").on("mouseover",".card-title",function(){
    var elem = this.parentElement;
    $(elem).stop();
    //The following line makes scroll time proportional to scroll distance
    //Allowing for constant speeds between different scroll lengths
    var scrollTime = Math.round(elem.scrollHeight*scrollConstant);
    $(elem).animate({"scrollTop":elem.scrollHeight},scrollTime,"linear");
}).on("mouseout",".card-head",function(){
    $(this).stop(); //Stop the animation when the cursor leaves
    var scrollTime = Math.round((this.scrollTop)*scrollConstant);
    $(this).animate({"scrollTop":0},scrollTime,"linear");
})