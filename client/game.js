let socket;
let ctx;
let canvas;
let players = [];
let thisPlayer = {};

const init = () => {
  socket = io.connect();
}

window.onload = init;

