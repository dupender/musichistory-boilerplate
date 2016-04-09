// Music History 2
// In the navigation bar, make sure you have two links labeled "List Music", and "Add Music".
// Add a DOM element that contains some input fields for the user to enter in the name of a song, the artist for the song, and the album. You do not need to enclose them in a <form> element because we're not actually submitting this form anywhere.
// Add a <button> element at the bottom of the input fields labeled "Add".
// The input fields and the add button make up the Add Music View.
// The existing view - the combination of the filter form and the song list - will be referred to as the List Music View.
// The Add Music View should not appear when the user first visits your page. The song list with the corresponding filter form should be visible.
// When the user clicks on "Add Music" in the navigation bar, the List Music View should be hidden, and the Add Music View should be shown (see example wireframe).
// When the user clicks on "List Music" in the naviation bar, the Add Music View should be hidden, and the List Music View should be shown (see example wireframe).
// Once the user fills out the song form and clicks the add button, you should collect all values from the input fields, add the song to your array of songs, and update the song list in the DOM.

// {Song name} by {Artist} on the album {Album}
"use strict"

var songDOM = document.getElementById("yellowbox");
var listView = document.getElementById("listView");
var addButton = document.getElementById("addButton");
var addView = document.getElementById("addView");
var linkList= document.getElementById("linkList");
var linkAdd = document.getElementById("linkAdd");
// var addSong = document.getElementById("song").value;
// var addArtist = document.getElementById("artist").value;
// var addAlbum = document.getElementById("album").value;

var songs = ["Legs > by Z*ZTop on the album Eliminator",
 "The Logical Song > by Supertr@amp on the album Breakfast in America",
 "Another Brick in the Wall > by Pink Floyd on the album The Wall",
"Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction",
 "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill"];

songs.push("New york, New YORK");
songs.unshift("Hotel California")
for (var i = 0; i < songs.length; i++) {
  songs[i] = songs[i].replace(">", "-");
  songs[i] = songs[i].replace("@", "");
  songs[i] = songs[i].replace("(", "");
  songs[i] = songs[i].replace("*", "");
  songDOM.innerHTML += "<div>"+ songs[i] + "</div>";
};
  

linkList.addEventListener("click", function() {
      listView.classList.remove("hidden");
      addView.classList.add("hidden");
    });

linkAdd.addEventListener("click", function(){
    addView.classList.remove("hidden");
    listView.classList.add("hidden");
})

window.addEventListener("load", function() {
  addView.classList.add("hidden");
})

addButton.addEventListener("click", function(){
  var addSong = document.getElementById("song").value;
  var addArtist = document.getElementById("artist").value;
  var addAlbum = document.getElementById("album").value;
    console.log("addSong",addSong );
    var buttonAdd = addSong  
     songDOM.innerHTML += `<div>${addSong} by ${addArtist} on the ${addAlbum}</div>`;
      })

//       <p>Artist Name | Album Name | Genre </p>
//     <h2>Song Name</h2>
//       <p>Artist Name | Album Name | Genre </p>
//     <h2>Song Name</h2>
//       <p>Artist Name | Album Name | Genre </p>
//     <h2>Song Name</h2>
//       <p>Artist Name | Album Name | Genre </p>   