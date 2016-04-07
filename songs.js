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

let songDOM = document.getElementById("yellowbox");
let listView = document.getElementById("listView");
let addButton = document.getElementById("addButton");
let addView = document.getElementById("addView");
let linkList= document.getElementById("linkList");
let linkAdd = document.getElementById("linkAdd");
// var addSong = document.getElementById("song").value;
// var addArtist = document.getElementById("artist").value;
// var addAlbum = document.getElementById("album").value;

// var songs = ["Legs > by Z*ZTop on the album Eliminator",
//  "The Logical Song > by Supertr@amp on the album Breakfast in America",
//  "Another Brick in the Wall > by Pink Floyd on the album The Wall",
// "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction",
//  "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill"];

// songs.push("New york, New YORK");
// songs.unshift("Hotel California")
// for (var i = 0; i < songs.length; i++) {
//   songs[i] = songs[i].replace(">", "-");
//   songs[i] = songs[i].replace("@", "");
//   songs[i] = songs[i].replace("(", "");
//   songs[i] = songs[i].replace("*", "");
//   songDOM.innerHTML += "<div>"+ songs[i] + "</div>";
// };
  
let songQ = (function(){
  let songs = [];
  let songs2 = [];
  return {
    loadSongs: function (callbackToInvoke) {
    let loader = new XMLHttpRequest();//constructor function
        loader.open("GET","songs.json");//tell loader where to go
        loader.send();//tell loader to execute
        loader.addEventListener("load", function () {
        // Set the value of the private array, the json file has one key, songs
        songs = JSON.parse(this.responseText).songs;
        console.log(songs);
        // Invoke the callback function so that the caller knows
        // that the process is complete. Make sure to pass the 
        // songs array as an argument.
        callbackToInvoke(songs);
        });
      },
      loadSongs2: function (callbackToInvoke) {
      let loader = new XMLHttpRequest();//constructor function
        loader.open("GET","songs2.json");//tell loader where to go
        loader.send();//tell loader to execute
        loader.addEventListener("load", function () {
        // Set the value of the private array, the json file has one key, songs
        songs2 = JSON.parse(this.responseText).songs2;
        console.log(songs2);
        // Invoke the callback function so that the caller knows
        // that the process is complete. Make sure to pass the 
        // songs array as an argument.
        callbackToInvoke(songs2);
        });
      }
    }
}) ();

function showSongs(songs){
  let songDOM = document.getElementById("yellowbox");
  let outputString = "";
  for (var i = 0; i < songs.length; i++) {
      let currentSong = songs[i];
      outputString += `<div class="eachSong"><h2>${currentSong.name}</h2>`
      outputString += `<p>${currentSong.artist} | ${currentSong.album} </p><button>Delete</button></div>`
      songDOM.innerHTML = outputString + `</p><button id='more'>More ></button>`;
      };
  addEvents();    
}

function showSongs2(songs2){
  // keeps everything on the DOM that was written already before the old_more button
  // and removes first More button then adds songs2 PLUS new More button
  let moreButton = document.getElementById("more")
  let moreParent = moreButton.parentNode.lastElementChild
  let item = yellowbox.lastElementChild
  console.log("item", item );
  yellowbox.removeChild(item);
  // var node = document.getElementById('more').lastElementChild
  let outputString = "";
  for (var i = 0; i < songs2.length; i++) {
    console.log("hello" );
      let currentSong = songs2[i];
      outputString += `<div><h2>${currentSong.name}</h2>`
      outputString += `<p>${currentSong.artist} | ${currentSong.album} </p><button>Delete</button></div>`
       moreButton.innerHTML = outputString + `</p><button id='more'>More ></button>`;
       // moreParent = moreButton.innerHTML;
       // document.getElementById("moreButton").appendChild(node);
      };
  addEvents();    
}      

window.addEventListener("load", function() {
  addView.classList.add("hidden");
})

function addEvents(){
  linkList.addEventListener("click", function() {
        listView.classList.remove("hidden");
        addView.classList.add("hidden");
      });

  linkAdd.addEventListener("click", function(){
      addView.classList.remove("hidden");
      listView.classList.add("hidden");
  })


  addButton.addEventListener("click", function(){
    var addSong = document.getElementById("song").value;
    var addArtist = document.getElementById("artist").value;
    var addAlbum = document.getElementById("album").value;
    songDOM.innerHTML += `<h2>${addSong}</h2><p>${addArtist} | ${addAlbum}</p>`;
        })

  yellowbox.addEventListener("click", function(event){
    // console.log("e", event.target.className);
    if (event.target.className === "eachDel"){
       console.log(event);
       yellowbox.removeChild(event.target.parentNode.firstChild);
       yellowbox.removeChild(event.target.previousElementSibling);
       yellowbox.removeChild(event.toElement);
        };
      })

  let moreButton = document.getElementById("more");
  moreButton.addEventListener("click", function(event){
    if (event.target.id === "more"){
       console.log("hi");
          songQ.loadSongs2(showSongs2);
       // for (var i = 0; i < eachDel.length; i++) {
       //   if (i>1){
       //   }
       // };
    };
  })
};
songQ.loadSongs(showSongs);
// songQ.loadSongs2(showSongs2);

//       <p>Artist Name | Album Name | Genre </p>
//     <h2>Song Name</h2>
//       <p>Artist Name | Album Name | Genre </p>
//     <h2>Song Name</h2>
//       <p>Artist Name | Album Name | Genre </p>
//     <h2>Song Name</h2>
//       <p>Artist Name | Album Name | Genre </p>   