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

const APP = {
  currentSong : 0,
  songList : [
  ],
  player: null,
  audio: null,
  btnPlay: null,
  init: () => {

    APP.eventListeners();
    APP.songsSection();
    
  },


  /**The Event Listeners */
  eventListeners() {    
    let progressBar = document.getElementById("progress-bar");
    let audio = document.getElementById("track-player");
    let durationTime = document.getElementById("max-time")
    //button elements
    let btnPlay = document.getElementById("buttonPlay");
    let btnStop = document.getElementById("buttonStop");
    let  BtnPause = document.getElementById("buttonPause");


    /*Event Listeners */
    // audio.addEventListener('loadedmetadata', APP.loadTrack);
    audio.addEventListener("durationchange", APP.loadTrack);
    btnPlay.addEventListener("click", APP.playSong);
    btnStop.addEventListener("click", APP.stopSong);
    BtnPause.addEventListener("click", APP.pauseSong);
  },

  /*Functions*/
  //load the playlist on screen 
  songsSection() {
    let df = document.createDocumentFragment();
    let playlistSection = document.getElementById("playlist-items");
    SONGS.forEach((song) => {
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
    songItems.append(imageCover, songArtist,songTitle);
    df.append(songItems);

    });
    playlistSection.append(df);
    let playlistDiv = document.getElementById('playlist-section');
    playlistDiv.append(playlistSection);
  },


  //loading the track that is playing (player.play and player.load)
  loadTrack(e){

   
},

  //display total time of audio
  totalTime(ev) {
    // const { durationT, currentT } = ev.target;
    // const progressT = (currentT / durationT) * 60;
    // progressBar.style.width = `${progressT}%`;
  },

  

  //play function
  playSong(ev) {
    console.log('test');
    if (!audio.paused) return; //already playing
    audio.src = songList[currentTrack].src;
    audio.currentTime = 0;
    audio.play();
    //remove play and show pause button 
    
  },

  //stop function
  pauseSong(ev) {
    console.log('test');
    audio.currentTime = 0;
    audio.pause();
     //remove pause and display pause button 
   
  },



 
};

//get the APP.init function to run when the page loads
document.addEventListener("DOMContentLoaded", APP.init);
