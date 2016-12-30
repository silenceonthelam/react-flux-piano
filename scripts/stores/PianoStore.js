import {calcFreq} from"../utils/note-utils";
import {createBrownNoise, 
        createPinkNoise, 
        createWhiteNoise} from "../audio/noise";
import {generateKeys} from "../utils/piano-key-generator";
import {SynthModel} from "../synth-model";

var assign         = require("object-assign"),
    EventEmitter   = require("events").EventEmitter,
    AppDispatcher  = require("../AppDispatcher"),
    PianoConstants = require("../PianoConstants");

const CHANGE_EVENT = "change";

var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
    _pianoKeys = generateKeys(window.innerWidth).keys,
    _remainingSpace = generateKeys(window.innerWidth).remainingSpace || 0,
    _currentNote = {},
    currentGainNodes = [],
    _synthSettings = assign({}, SynthModel);

// audioParam updaters
function updateBtnGroup(id, val) {
    const newSettings = Object.assign({}, _synthSettings[id], { val: val });
    _synthSettings = Object.assign({}, _synthSettings, {[id]: newSettings});
}

function updateEnv(envId, envVal) {
    const newSettings = Object.assign({}, _synthSettings["env"], { [envId]: parseFloat(envVal, 10) });
    _synthSettings = Object.assign({}, _synthSettings, {env: newSettings});
}

function updateSlider(id, val) {
    const newSettings = Object.assign({}, _synthSettings[id], { val: parseFloat(val, 10) });
    _synthSettings = Object.assign({}, _synthSettings, {[id]: newSettings});
}

var PianoStore = assign({}, EventEmitter.prototype, {
    getAllKeys: function() {
        return _pianoKeys;
    },
    getSynthSettings: function() {
        return _synthSettings;
    },
    getCurrentNote: function() {
        return _currentNote;
    },
    getRemainingSpace: function() {
        return _remainingSpace;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

function getNoiseBuffer(color) {
    var bufferLookup = {
        "brown": createBrownNoise(audioCtx),
        "pink": createPinkNoise(audioCtx),
        "white": createWhiteNoise(audioCtx)
    };

    return bufferLookup[color];
}

function playNote(note) {
    var freq = calcFreq(note, _synthSettings.tuning.val);
    _currentNote = assign({}, note, {freq: freq});

    var noiseType = _synthSettings.noise.val;
    var env = _synthSettings.env;

    if (noiseType !== "none") {
        var noiseSrc = audioCtx.createBufferSource();
        noiseSrc.buffer = getNoiseBuffer(noiseType);
        noiseSrc.loop = true;  
    }

    var osc = audioCtx.createOscillator(),
        gainNode = audioCtx.createGain(),
        master = audioCtx.createGain(),
        panner = audioCtx.createStereoPanner();

    osc.frequency.value = freq;
    osc.detune.value = _synthSettings.detune.val;
    osc.type = _synthSettings.osc.val;
    gainNode.gain.value = 0; 
    master.gain.value = _synthSettings.gain.val;
    panner.pan.value = _synthSettings.bal.val;

    if (noiseType === "none") {
        osc.connect(gainNode);
        gainNode.connect(master);
        master.connect(panner);
        panner.connect(audioCtx.destination);
        osc.start(0);
        triggerEnv(gainNode.gain, env.a, env.d, env.s);
        currentGainNodes.push(gainNode);
    } else {
        osc.connect(gainNode);
        noiseSrc.connect(gainNode);
        gainNode.connect(master);
        master.connect(panner);
        panner.connect(audioCtx.destination);

        osc.start(0);
        noiseSrc.start(0); 

        triggerEnv(gainNode.gain, env.a, env.d, env.s);
        currentGainNodes.push(gainNode);
    }
}

function triggerEnv(param, a, d, s) {
    var now = audioCtx.currentTime;
    param.cancelScheduledValues( now );
    param.setValueAtTime( 0, now );
    param.linearRampToValueAtTime( 1, now + a );
    param.linearRampToValueAtTime( s, now + a + d );
}

function releaseEnv(param, r) {
    var now = audioCtx.currentTime;

    param.cancelScheduledValues( now );
    param.setValueAtTime( param.value, now );
    param.linearRampToValueAtTime( 0, now + r );
}

function stopNote(note) {
    var env = _synthSettings.env;   

    currentGainNodes.forEach((node) => {
        releaseEnv(node.gain, env.r);
    });

    currentGainNodes = [];
}

AppDispatcher.register(function(action) {
    switch(action.actionType) { 
        case "PIANO_RECALC_NUM_KEYS":
            _pianoKeys = generateKeys(action.winWidth).keys;
            _remainingSpace = generateKeys(action.winWidth).remainingSpace || 0;
            PianoStore.emitChange();
            break;

        // play notes with mouse
        case "PIANO_PLAY_NOTE":
            playNote(action.note);
            PianoStore.emitChange();
            break;

        case "PIANO_STOP_NOTE":
            stopNote(action.note);
            _currentNote = {};
            PianoStore.emitChange();
            break;

        // audio params
        case "PIANO_UPDATE_BTN_GROUP":
            updateBtnGroup(action.btnGroupId, action.btnGroupVal);
            PianoStore.emitChange();
            break;

        case "PIANO_UPDATE_ENV":
            updateEnv(action.envId, action.envVal);
            PianoStore.emitChange();
            break;

        case "PIANO_UPDATE_SLIDER":
            updateSlider(action.sliderId, action.sliderVal);
            PianoStore.emitChange();
            break;            

        default:
            // no op
    }
});

module.exports = PianoStore;