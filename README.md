# Music Playlist 

## Created a HTML5 music playlist that includes a playlist of mp3 files with css animations, Javascript-powered controls and his hostred through Netlify.

### part one: html layout and files structure 

* setup github repo 
* basic html layout of playlist 
* ensure mobile-first responsinvess for both player area and playlist area
* include buttons : play, pause, stop, forward, skip, previous, replay 
* include audio element 
* include audio files, along with image for each file. 

### part two: feature branch and controls 

* Create a JavaScript Array of Objects that represent all your mp3 files. Each object needs the following properties: title, src, img, and artist.
* Use the Array of song objects to generate the playlist HTML. This will replace the hard-coded HTML from step one.
* Listen for the durationchange event and update the total time display to show a total number of seconds.
* Listen for the click events on the play, pause, and stop buttons; and make them actually play, pause, and stop the first track from the array.
* Display the thumbnail image in the player for the currently playing track.
* Only one of the play and pause buttons should be visible at a time. If the track is playing then the play button should be hidden. If the track is paused or stopped then the pause button should be hidden.
* When a track is playing we need to add a CSS active class to the current list item as well as a CSS class to our media player area that can be used later for triggering animations.
* The user needs to be able to start a song playing. So, there needs to be click listener(s) for the list items in the playlist area. When a user clicks on a list item, then that song will begin playing. If the user clicks on the list item for the currently playing song you can either restart that song, OR ignore the click