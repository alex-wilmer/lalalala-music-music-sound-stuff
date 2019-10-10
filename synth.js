import AudioKeys from "audiokeys";

let ctx = new AudioContext();

// create a keyboard
var keyboard = new AudioKeys();

let oscMap = {};

keyboard.down(function(note) {
  let osc = ctx.createOscillator();
  osc.frequency.value = note.frequency;
  osc.connect(ctx.destination);
  osc.start();

  oscMap[note.frequency] = osc;
});

keyboard.up(function(note) {
  let osc = oscMap[note.frequency];
  osc.stop();
  // do things with the note object
});
