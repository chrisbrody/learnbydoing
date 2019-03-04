// The base speed per character
time_setting = 30;
// How much to 'sway' (random * this-many-milliseconds)
random_setting = 100;
// The text to use NB use \n not real life line breaks!
input_text = "";
// Where to fill up
target_setting = $("#output");
// Launch that function!
type(input_text, target_setting, 0, time_setting, random_setting);

function type(input, target, current, time, random){
  // If the current count is larger than the length of the string, then for goodness sake, stop
  if(current > input.length){
    // Write Complete
    console.log("Complete.");
  }
  else{
    // Increment the marker
    current += 1;
    // fill the target with a substring, from the 0th character to the current one
    target.text(input.substring(0,current));
    // Wait ...
    setTimeout(function(){
      // do the function again, with the newly incremented marker
      type(input, target, current, time, random);
      // Time it the normal time, plus a random amount of sway
    },time + Math.random()*random);
  }
}

/*
  * The typing test stuff
*/
// ADJUST THE NUMBER OF CHARACTERS DISPLAYED FOR THE USER TO TYPE
var character_length

if(window.width <= 650) {
   character_length = 30;
} else {
   character_length = 50;
}

var index = 0;
var letters =  $("#input_text").val();
var started = false;
var current_string = letters.substring(index, index + character_length);

// TARGET THE #TEXTAREA
$("html, body").click(function(){
  $("#textarea").focus();
});
// 
console.log($("#target").text(current_string))
$("#target").text(current_string);
// 
$(window).keypress(function(evt){
  if(!started){
    start();
    started = true;
  }
  evt = evt || window.event;
  var charCode = evt.which || evt.keyCode;
  var charTyped = String.fromCharCode(charCode);
  if(charTyped == letters.charAt(index)){
    index ++;
    current_string = letters.substring(index, index + character_length);
    $("#target").text(current_string);
    $("#your-attempt").append(charTyped);
    if(index == letters.length){
      $("#timer").text(timer);
      if(timer == 0){
        timer = 1;
      }
      stop();
      finished();
    }
  }else{
    $("#your-attempt").append("<span class='wrong'>" + charTyped + "</span>");
    errors ++;
    $("#errors").text(errors);
  }
});

var timer = 0;
var errors = 0;
var interval_timer;

$("#reset").click(function(){
  reset();
});

$("#pause").click(function(){
  stop();
});

$("#input_text").change(function(){
  reset();
});


function start(){
  interval_timer = setInterval(function(){
    timer ++;
    $("#timer").text(timer);
  }, 1000)
}

function stop(){
  clearInterval(interval_timer);
  started = false;
}

function reset(){
  $("#input_text").blur().hide();;
  $("#your-attempt").text("");
  index = 0;
  errors = 0;
  $("#errors").text("0");
  clearInterval(interval_timer);
  started = false;
  letters = $("#input_text").val();
  $("#timer").text("0");
  timer = 0;
  current_string = letters.substring(index, index + character_length);
  $("#target").text(current_string);

  $("#incomplete-wrap").slideDown();
  $("#complete-wrap").slideUp();
  $("#focus").html("Practice creating some HTML elements! Start by typing a &lt;")
}

function finished(){
  $("#incomplete-wrap").slideUp();
  $("#complete-wrap").slideDown();
  $("#focus").html("You created some of your first very important HTML tags!");
  if (errors == 0) {
    $("#score").html("<p>Perfect, 18 HTML tags created, with " + errors + " errors in " + timer + "seconds, Very Nice Work!</p> <p>These elements you just created are some of the most used elements in HTML. The P tag is for paragraphs.  The ul & li go together to make lists.  The anchor or a tag is used to link to another website or another page on your website.  Hopefully the img tag is self explanatory to include images to any website.  Finally the div tag is used to divide up content you want to display on a website.</p> <p>To practice again, hit the reset button at the bottom of your screen.</p>")
  } else {
    $("#score").html("<p>18 HTML tags created, with only " + errors + " errors in " + timer + " seconds, Nice Work!</p> <p>These elements you just created are some of the most used elements in HTML. The P tag is for paragraphs.  The ul & li go together to make lists.  The anchor or a tag is used to link to another website or another page on your website.  Hopefully the img tag is self explanatory to include images to any website.  Finally the div tag is used to divide up content you want to display on a website.</p> <p>To practice again, hit the reset button at the bottom of your screen.</p>")
  }
}

// FURTHER ADJUSTMENTS
var target = document.getElementsByTagName("input")[0];

if (event.target != target) {
    target.focus();
    target.click();
}

