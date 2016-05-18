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
  //clears out this attribute 
  $('#addButton').data("song-edit-id", "");

  let linkAdd = document.getElementById("linkAdd");
  function executeJQueryFunction(songList){
      let myArray = [];
      for (let song in songList) {
        // song allows you to access the song1 key and its associated object THEN as you loop thru song accesses song2 and its associated object
        var currentSong = songList[song];
        //create id property for currentSong so you can access it in below for loop when you put out to DOM 
        currentSong.id = song;
        myArray.unshift(currentSong);
      };
      $("#yellowbox").html("");
      for (var i = 0; i < myArray.length; i++) {
      $("#yellowbox").append(`<div class='eachSong'><h1>${myArray[i].name}</h1><div>Performed by ${myArray[i].artist}</div><div>On the album ${myArray[i].album}</div><button class='eachDel' id="${myArray[i].id}">Delete</button><button class='eachEdit' edit-id="${myArray[i].id}">Edit</button></div>`);
      };
  };

  // place ajax into function so argument can be passed and you only need one function and can pass '2' into list one after 'more' button is pressed.  Changed key in songs2.json to be songs not songs2, so that it works in getSong function.
  function getSong(){
  $.ajax({
    url: `https://torrid-heat-6539.firebaseio.com/songs.json`,

    // sets up Listener and Callback
    success: executeJQueryFunction
  });
  }

  $(document).on("click",".eachDel",function(){
    var songId = $(this).attr("id");
      deleteSong(songId);
    });

  $(document).on("click",".eachEdit",function(){
      var songEditId = $(this).attr("edit-id");
      editSong(songEditId);
      $('#addButton').data("song-edit-id", songEditId);
      
      $('#addView').removeClass("hidden");
      $('#listView').addClass("hidden");
      $(".yellowbox").addClass("hidden");

    });

  function editSong(songEditId){
  $.ajax({
      url:`https://torrid-heat-6539.firebaseio.com/songs/${songEditId}.json`,
      method: "GET"
    }).done(function(data){
      console.log("data",data );

      getEditedSong(data);
    });
  }

  function getEditedSong(data){
    let editedName = data.name
    let editedArtist = data.artist
    let editedAlbum = data.album

    $("#song").val(editedName),
    $("#artist").val(editedArtist), 
    $("#album").val(editedAlbum)  
  }

  function putEditedSong(){
   let myId = $('#addButton').data("song-edit-id");
   let editedSong = {
        "name": $("#song").val(),
        "artist":$("#artist").val(), 
        "album": $("#album").val()  
      }

      $.ajax({
        url:`https://torrid-heat-6539.firebaseio.com/songs/${myId}.json`,
        type: "PUT",
        //stringify converts into json format
        data: JSON.stringify(editedSong)
      }).done(function(data){
          console.log("hi" );
          $('#addButton').data("song-edit-id", "");
          $('#listView').removeClass("hidden");
          $('.yellowbox').removeClass("hidden");
          $('#addView').addClass("hidden");
          
          //getSong no longer needs an argument because all songs are in one json
          getSong();
      });
  }

  function deleteSong(songId){
    $.ajax({
      url:`https://torrid-heat-6539.firebaseio.com/songs/${songId}.json`,
      method: "DELETE"
    }).done(function(){
      getSong();
    });
  }

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

    $('#addButton').click(function(e){
      let dataSongKey = $(this).data("song-edit-id")
      if (dataSongKey === ""){
        AddNewSong();
      }else{
        putEditedSong();
      }
});

    function AddNewSong(){
      let newSong = {
        "name": $("#song").val(),
        "artist":$("#artist").val(), 
        "album": $("#album").val()  
      }
      //fetch and save data:
      $.ajax({
        url:"https://torrid-heat-6539.firebaseio.com/songs.json",
        type: "POST",
        //stringify converts into json format
        data: JSON.stringify(newSong)
      }).done(function(data){
          $('#listView').removeClass("hidden");
          $('.yellowbox').removeClass("hidden");
          $('#addView').addClass("hidden");
          
          //getSong no longer needs an argument because all songs are in one json
          getSong();
      });
    };
  getSong();
  });