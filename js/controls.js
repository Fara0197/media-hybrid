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
 */

const APP = {
  init: () => {
    let currentSong = 0;
    APP.eventListeners();
    APP.songsSection();
  },
  /**The Event Listeners */
  eventListeners() {
    let progressBar = document.getElementById("progress-bar");
    let audio = document.getElementById("track-player");
    //button elements
    let btnPlay = document.getElementById("buttonPlay");
    let btnStop = document.getElementById("buttonStop");
    let btnPause = document.getElementById('buttonPause"');

    /*Event Listeners */
    audio.addEventListener("durationchange", APP.totalTime);
    btnPlay.addEventListener("click", APP.playSong);
    btnStop.addEventListener("click", APP.stopSong);
    // btnPause.addEventListener("click", APP.buttonPause);
  },

  /*Functions*/
  //load the playlist on screen
  songsSection() {
    let df = document.createDocumentFragment();
    let playlistSection = document.getElementById("playlist-items");
    let songItems = document.createElement("div");
    let songCard = document.createElement("div");
    

  
    SONGS.forEach((song) => {
    //test console.log(song.artist);
    //create elements inside playlist section
    let songTitle = document.createElement("div");
    let songArtist = document.createElement("div");
    let imageCover = document.createElement("img");

    imageCover.src = song.thumbnail;
    imageCover.alt = `image of ${song.title}.`;

    songItems.id = 'song-items';
    songCard.id = 'song-card';
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

  //loading the track function..isPlaying..player.play and player.load
  loadTrack(song) {

  },

  //progress bar function: time duration and current time..(seconds)
  totalTime(ev) {
    const { durationT, currentT } = ev.target;
    const progressT = (currentT / durationT) * 60;
    progressBar.style.width = `${progressT}%`;
  },

  //play function
  playSong(ev) {
    if (!audio.paused) return; //already playing
    audio.src = songList[currentSong].src;
    audio.play();
  },

  //stop function
  stopSong(ev) {
    audio.pause();
    audio.currentTime = 0;
  },

  //pause function
  //   buttonPause(ev) {
  //     audio.pause();
  //   },
};

//get the APP.init function to run when the page loads
document.addEventListener("DOMContentLoaded", APP.init);
