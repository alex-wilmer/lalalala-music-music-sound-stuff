import AudioKeys from "audiokeys";
import Tone from "tone";
import { scale } from "@tonaljs/scale";
import { sample } from "lodash";
import WebMidi from "webmidi";

let ctx = new AudioContext();
var keyboard = new AudioKeys();

var synth = new Tone.PolySynth(6, Tone.Synth, {
  oscillator: {
    type: "sine"
  }
}).toMaster();

WebMidi.enable(function(err) {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    // console.log("WebMidi enabled!");
    // console.log(WebMidi.inputs);
    // console.log(WebMidi.outputs);

    let [input] = WebMidi.inputs;
    let [output] = WebMidi.outputs;
    // output.playNote("C3");

    var loop = new Tone.Loop(function(time) {
      //triggered every eighth note.
      let note = sample(notes);
      output.playNote(note);
      // synth.triggerAttackRelease(note, "8n", time);
    }, "8n").start(0);
    Tone.Transport.start();

    input.addListener("noteon", "all", val => {
      console.log(val);
      let note = val.note.name + val.note.octave;
      synth.triggerAttackRelease(note, "8n");
    });
  }
});

let scaleType1 = "c3 piongio";
let scaleType2 = "c4 piongio";

let { notes: n1 } = scale(scaleType1);
let { notes: n2 } = scale(scaleType2);
let notes = [...n1, ...n2];

// keyboard.down(function() {
//   let note = sample(notes);
//   synth.triggerAttackRelease(note, "8n");
// });
//
// keyboard.up(function(note) {
//   // do things with the note object
// });
