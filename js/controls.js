"use strict";

import { SONGS } from "./songs.js";

/**
 *Hybrid 2: Tasks
 * 1. listen for duration change event..
 * 2. Listen for click events to play, pause and stop the first track from the array
 * 3. Display thumbnail image in the player for the song currently playing
 * 4. Display one of the play and pause button..if playing then play button should be hidden.
 * 5. Add a CSS active class to song playing & media player area.
 *
 * Steps:
 * Load the songs from songs.js..complete buttons functionality, display current and total time..
 * 
 * stuck on loading the audio..use setTimeout? 
 */

//set global variables for songs and track details
 let currentSong = 0;
let pauseSelected = false;
let selectedImage;
let selectedArtist;
let selectedTrack;
let songItemsList = [];

const APP = {
  init: () => {
APP.eventListeners();
APP.songsSection();
    
  },


  /**The Event Listeners */
  eventListeners() {    
    let progressBar = document.getElementById("progress-bar");
    let audio = document.getElementById("track-player");
    let durationTime = document.getElementById("max-time");
    let selectedCover = document.getElementById("selected-track-cover");
    let selectedTrackName = document.getElementById("selected-track-title");
    let selectedTrackArtist = document.getElementById("selected-track-artist");
    //button elements
    let btnPlay = document.getElementById("buttonPlay");
    let btnStop = document.getElementById("buttonStop");
    let  BtnPause = document.getElementById("buttonPause");


    /*Event Listeners */
    btnPlay.addEventListener("click", APP.playSong);
    btnStop.addEventListener("click", APP.stopSong);
    BtnPause.addEventListener("click", APP.pauseSong);
  },

  /*Functions*/
  //load the playlist on screen: initializing the songs list and the selected the song
  songsSection() {
    let df = document.createDocumentFragment();
    let playlistSection = document.getElementById("playlist-items");
  
    SONGS.forEach((song, index) => {
    //test console.log(song.src);
    //create elements inside playlist section
    let songItems = document.createElement("div");
    let songTitle = document.createElement("h2");
    let songArtist = document.createElement("h2");
    let imageCover = document.createElement("img");
  
    imageCover.src = song.thumbnail;
    imageCover.alt = `image of ${song.title}.`;

    songItems.id = 'song-items';
    songTitle.id = 'track-name';
    songArtist.id = 'artist-name';
  
    songTitle.innerHTML = song.title;
    songArtist.innerHTML = song.artist;

    //event listener for song items
    songItems.addEventListener('click', function(){
    //if clicked, ignore if the selected song is already playing
    if (index!== currentSong){
    //select and display the new song 
    APP.displaySong(songItems);
    }
    //create a new function when called with a certain 'this' value
    //this == object selected 
    }.bind(this))
  
    songItems.append(imageCover, songArtist,songTitle);
    songItemsList.push(songItems);
    df.append(songItems);
 
    });
    playlistSection.append(df);
    let playlistDiv = document.getElementById('playlist-section');
    playlistDiv.append(playlistSection);

    //new function for duration
    APP.trackDuration();
    APP.displaySong(0);
  },

  //the max and current time for the track duration
 trackDuration(){

 },

//Displaying the selected song details
displaySong(){

},

  //play the audio function 
  playSong(ev) {
    
    
  },

  //pause the audio function 
  pauseSong(ev) {
   
  },

 //stop the audio function 
 stopSong(ev) {
 
},


 
};

//get the APP.init function to run when the page loads
document.addEventListener("DOMContentLoaded", APP.init);
