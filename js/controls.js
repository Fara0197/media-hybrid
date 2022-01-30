"use strict";

import { SONGS } from "./songs.js";

/**
 *Hybrid 2: Tasks
 * 1. listen for duration change event..
 * 2. Listen for click events to play, pause and stop the first track from the array
 * 3. Display thumbnail image in the player for the song currently playing
 * 4. Display one of the play and pause button..if playing then play button should be hidden.
 * 5. Add a CSS active class to song playing & media player area.
 */

//get elements
let player = document.getElementById("track-player");
let progressBar = document.getElementById("progress-bar");
let currentTime = document.querySelector('current-time');
let totalTime = document.querySelector('max-time');

//Button elements 
let btnPlay = document.getElementById("buttonPlay");
let btnStop = document.getElementById("buttonStop");
let btnPause = document.getElementById('buttonPause"');

//add event listeners
player.addEventListener("durationchange", totalTime);
btnPlay.addEventListener("click", playSong);
btnStop.addEventListener("click", stopSong);



let currentSong = 0;
let songList = [];

/*Functions for Event listeners*/
//progress bar function: time duration



//play,pause,stop functions
function playSong(ev) {
  if (!audio.paused) return; //already playing
  audio.src = songList[currentSong].src;
  audio.play();
}
function stopSong(ev) {
  audio.pause();
  audio.currentTime = 0;
}
