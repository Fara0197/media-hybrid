"use strict";

import { SONGS } from "./songs.js";

/**
 *Feedback 
  To do: 
  have all of the event listeners added within a single function..in eventListeners:()=>{}
  Avoid event listeners in loops..and too many event listeners 
 */

//set global variables for songs and track details
let songItemsList = [];
let currentSong = 0;
let pauseSelected = false;

let selectedCover;
let selectedTrackArtist;
let selectedTrackName;

let audio;
let progressBar;
let btnPlay;
let btnStop;
let durationTime;
let BtnPause;
let btnReplay;
let btnNext;
let btnPrevious;
let btnForward;
let buttonMute; 
let buttonOn;
let element; 

const APP = {
  init: () => {
    APP.eventListeners();
    APP.songsSection();
  },

  /*Event Listeners */
  eventListeners: () => {
    progressBar = document.getElementById("progress-bar");
    audio = document.getElementById("track-player");
    durationTime = document.getElementById("max-time");
    selectedCover = document.getElementById("selected-track-cover");
    selectedTrackName = document.getElementById("selected-track-title");
    selectedTrackArtist = document.getElementById("selected-track-artist");
    btnPlay = document.getElementById("buttonPlay");
    btnStop = document.getElementById("buttonStop");
    BtnPause = document.getElementById("buttonPause");
    btnForward = document.getElementById("buttonForward");
    btnReplay = document.getElementById("buttonReplay");
    btnPrevious = document.getElementById("buttonPrevious");
    btnNext = document.getElementById("buttonNext");
    buttonMute = document.getElementById("buttonMute");
    buttonOn = document.getElementById("buttonOn");
    element = document.getElementById("icon-song");

    audio.addEventListener("durationchange", APP.replaySong);
    audio.addEventListener("timeupdate", APP.trackMax);
    audio.addEventListener("timeupdate", APP.trackCurrent);
    btnPlay.addEventListener("click", APP.playSong);
    btnStop.addEventListener("click", APP.stopSong);
    BtnPause.addEventListener("click", APP.pauseSong);
    btnNext.addEventListener("click", APP.nextSong);
    btnPrevious.addEventListener("click", APP.previousSong);
    btnReplay.addEventListener("click", APP.seekBackwardSong);
    btnForward.addEventListener("click", APP.seekForwardSong);
    buttonMute.addEventListener("click", APP.muteSong);
    buttonOn.addEventListener("click", APP.unMute);
  
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

      songItems.id = "song-items";
      songTitle.id = "track-name";
      songArtist.id = "artist-name";

      songTitle.innerHTML = song.title;
      songArtist.innerHTML = song.artist;

      //event listener for song items
      songItems.addEventListener(
        "click",
        function () {
          //if clicked, ignore if the selected song is already playing
          if (index !== currentSong || index == currentSong ) {
            //select and display the new song
            APP.displaySong(index);
            APP.playSong(index);
          }
          //create a new function when called with a certain 'this' value
          //this == object selected
        }.bind(this)
      );

      songItems.append(imageCover, songArtist, songTitle);
      songItemsList.push(songItems);
      df.append(songItems);
    });
    playlistSection.append(df);
    let playlistDiv = document.getElementById("playlist-section");
    playlistDiv.append(playlistSection);

    //new function for duration
    APP.trackDuration();
    APP.displaySong(0);
  },

  //Displaying the selected song details
  displaySong(index) {
    let selectedTrack = SONGS[index];
    audio.src = selectedTrack.src;
    selectedCover.src = selectedTrack.thumbnail;
    selectedTrackArtist.innerHTML = selectedTrack.artist;
    selectedTrackName.innerHTML = selectedTrack.title;

    //when a new song is selected, make the item css active
    let elements = document.querySelectorAll("#song-items.active");
    elements.forEach(function (el) {
      el.classList.remove("active");
    });
    songItemsList[index].classList.add("active");

    APP.showButton("buttonPlay");
    progressBar.value = 0;

    // Set the currently playing track
    currentSong = index;
  },

  //the max and current time for the track duration
  trackDuration() {
    //event listener for max duration
    audio.addEventListener(
      "timeupdate",
      function () {
        let maxTime = document.getElementById("max-time");
        let duration = parseInt(audio.duration);
        let currentTime = parseInt(audio.currentTime);
        let timeLeft = duration - currentTime;

        //calculations
        let seconds = timeLeft % 60;
        let minutes = Math.floor(timeLeft / 60) % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        maxTime.innerHTML = minutes + ":" + seconds;
      },
      false
    );

    //even listener for current time
    audio.addEventListener(
      "timeupdate",
      function () {
        let currentTime = document.getElementById("current-time");
        let seconds = parseInt(audio.currentTime % 60);
        let minutes = parseInt((audio.currentTime / 60) % 60);

        if (seconds < 10) {
          currentTime.innerHTML = minutes + ":0" + seconds;
        } else {
          currentTime.innerHTML = minutes + ":" + seconds;

          //movement of progress bar every time there is an update in time
          const prob = audio.currentTime / audio.duration;
          progressBar.value = prob * 100;
        }
      },
      false
    );

    //listen to changes when moving the progress bar
    progressBar.addEventListener("change", () => {
      const prob = progressBar.value / 100;
      audio.currentTime = (audio.duration || 0) * prob;
    });
  },

  //Play the audio function
  playSong(ev) {
    audio.play();
    APP.showButton("buttonPause");
    document.querySelector("#icon-song").style.animationPlayState = 'running';
  },

  // Pause the audio function
  pauseSong(ev) {
    audio.pause();
    APP.showButton("buttonPlay");
    console.log('paused song');
    document.querySelector("#icon-song").style.animationPlayState = 'paused';
  },

  // Stop the audio function
  stopSong(ev) {
    audio.pause();
    APP.showButton("buttonPlay");
    audio.currentTime = 0;
    progressBar.value = 0;
    document.querySelector("#icon-song").style.animationPlayState = 'initial';
  },

  // Replay the audio function
  replaySong(ev) {
    audio.currentTime = 0;
  },

  //next song function
  nextSong() {
    // Find the next position while accounting for exceeding past the array length
    currentSong = (currentSong + 1) % SONGS.length;
    APP.displaySong(currentSong);
    APP.playSong(currentSong);
  },

  //previous song function..
  previousSong() {
    let previousIndex = JSON.parse(JSON.stringify(currentSong)) - 1;
    currentSong =
      previousIndex < 0
        ? (previousIndex + SONGS.length) % SONGS.length
        : previousIndex % SONGS.length;
    APP.displaySong(currentSong);
    APP.playSong(currentSong);
  },

  // Move 10 seconds ahead in current song
  seekForwardSong() {
    audio.currentTime += 10;
  },

  // Move 10 seconds behind in current song
  seekBackwardSong() {
    audio.currentTime -= 10;
  },

muteSong(){
//console.log("test-mute");
audio.muted = true;

},
unMute(){
  audio.muted = false;

},




//Toggling the pause or play button based on input parameters
  showButton(button) {
    let showBtn;
    let hideBtn;

    if (button == "buttonPause") {
      showBtn = "buttonPause";
      hideBtn = "buttonPlay";
    } else {
      showBtn = "buttonPlay" ;
      hideBtn = "buttonPause";
    }

    // Hide the hideBtn and display the showBtn
    document.getElementById(hideBtn).style.display = "none";
    document.getElementById(showBtn).style.display = "";
  },

  
};

//get the APP.init function to run when the page loads
document.addEventListener("DOMContentLoaded", APP.init);