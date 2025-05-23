const socket = io();
const audio = document.getElementById('audio');

// Send play event
audio.addEventListener('play', () => {
  socket.emit('play', { currentTime: audio.currentTime });
});

// Send pause event
audio.addEventListener('pause', () => {
  socket.emit('pause');
});

// Send seek event
audio.addEventListener('seeked', () => {
  socket.emit('seek', { currentTime: audio.currentTime });
});

// Receive play event
socket.on('play', (data) => {
  if (audio.paused) {
    audio.currentTime = data.currentTime;
    audio.play();
  }
});

// Receive pause event
socket.on('pause', () => {
  if (!audio.paused) audio.pause();
});

// Receive seek event
socket.on('seek', (data) => {
  audio.currentTime = data.currentTime;
});
