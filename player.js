// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause");
let next_btn = document.querySelector(".next");
let prev_btn = document.querySelector(".prev");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
  {
    name: "Ukulele",
    artist: "Benjamin Tissot",
    image: "https://www.bensound.com/bensound-img/ukulele.jpg",
    path: "./music/bensound-ukulele.mp3"
  },
  {
    name: "Better Days",
    artist: "Benjamin Tissot",
    image: "https://www.bensound.com/bensound-img/betterdays.jpg",
    path: "./music/bensound-betterdays.mp3"
  },
  {
    name: "Sunny",
    artist: "Benjamin Tissot",
    image: "https://www.bensound.com/bensound-img/sunny.jpg",
    path: "./music/bensound-sunny.mp3",
  },
];

function loadTrack(index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();
  
  // Load a new track
  curr_track.src = track_list[index].path;
  curr_track.load();
  
  // Update details of the track
  track_art.style.backgroundImage = `url(${track_list[index].image})`;

  track_name.textContent = track_list[index].name;
  track_artist.textContent = track_list[index].artist;
  now_playing.textContent = `PLAYING ${index + 1} OF ${track_list.length}`;
  
  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);
  
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
  
  // Apply a random background color
  random_bg_color();
}
  
function random_bg_color() {
  // (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  
  // Construct a color withe the given values
  let bgColor = `rgb(${red}, ${green}, ${blue})`;
  
  // Set the background to the new color
  // document.body.style.background = bgColor;
  document.querySelector(".player").style.background = bgColor;
}

// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}
  
function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;
  
  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
  
function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;
  
  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
    
function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (index < track_list.length - 1)
    index += 1;
  else index = 0;

  // Load and play the new track
  loadTrack(index);
  playTrack();
}

function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (index > 0)
    index -= 1;
  else index = track_list.length - 1;
    
  // Load and play the new track
  loadTrack(index);
  playTrack();
}
    
function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  let seekto = curr_track.duration * (seek_slider.value / 100);

  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}
      
function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    // Display the updated duration
    curr_time.textContent = formatTime(curr_track.currentTime);
    total_duration.textContent = formatTime(curr_track.duration);
  }
}

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return `${('0'+ min).slice(-2)}:${('0'+ sec).slice(-2)}`;
}

// Load the first track in the tracklist
loadTrack(index);
//playTrack();