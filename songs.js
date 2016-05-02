// Music History 5
// Implement jQuery in your Music History code. Every innerHTML, getElementById, getElementByClassName, event listener and XHR request. Covert 'em all.

// In the navigation bar, make sure you have two links labeled "List Music", and "Add Music".
// Add a DOM element that contains some input fields for the user to enter in the name of a song, the artist for the song, and the album. You do not need to enclose them in a <form> element because we're not actually submitting this form anywhere.
// Add a <button> element at the bottom of the input fields labeled "Add".
// The input fields and the add button make up the Add Music View.
// The existing view - the combination of the filter form and the song list - will be referred to as the List Music View.
// The Add Music View should not appear when the user first visits your page. The song list with the corresponding filter form should be visible.
// When the user clicks on "Add Music" in the navigation bar, the List Music View should be hidden, and the Add Music View should be shown (see example wireframe).
// When the user clicks on "List Music" in the naviation bar, the Add Music View should be hidden, and the List Music View should be shown (see example wireframe).
// Once the user fills out the song form and clicks the add button, you should collect all values from the input fields, add the song to your array of songs, and update the song list in the DOM.
// Split songs array into 2 arrays, when you click 'More' button second array displays


"use strict"
$(document).ready(function(){

let linkAdd = document.getElementById("linkAdd");

function executeJQueryFunction(songList){
    console.log("songs", songList);
    for (var i = 0; i < songList.songs.length; i++) {
      var currentSong = songList.songs[i];
    let outputString = $("#yellowbox").append(`<div class='eachSong'><h1>${currentSong.name}</h1><div>Performed by ${currentSong.artist}</div><div>On the album ${currentSong.album}</div><button class='eachDel'>Delete</button></div>`);
    };
};

// place ajax into function so argument can be passed and you only need one function and can pass '2' into list one after 'more' button is pressed.  Changed key in songs2.json to be songs not songs2, so that it works in getSong function.
function getSong(list1){
$.ajax({
  url: `songs${list1}.json`,
  // sets up Listener and Callback
  success: executeJQueryFunction
});
}
$('.yellowbox').click(function(e){
  if ($(event.target).hasClass('eachDel')){
    yellowbox.removeChild(event.target.parentElement); 
  }  
  if ($(event.target).attr('id')==='more') {
    getSong(2);
  };
  
})

  $('#linkList').click(function(){
  if ($(event.target).attr('id')==='linkList') {
        $('#listView').removeClass("hidden");
        $('.yellowbox').removeClass("hidden");
        $('#addView').addClass("hidden");

      }
  })

  $('#linkAdd').click(function(){
    if ($(event.target).attr('id')==='linkAdd') {
        $('#addView').removeClass("hidden");
        $('#listView').addClass("hidden");
        $(".yellowbox").addClass("hidden")
    }
  });  

  $('#addButton').click(function(){
    let inputString =
    {
      "songs":[
      {"name":$("#song").val(),"artist":$("#artist").val(),"album":$("#album").val()}
      ]
    }
    executeJQueryFunction(inputString);

  })


// Pass getSong an empty string so that when function is called list1 = "" & url = songs.json
getSong("");
})