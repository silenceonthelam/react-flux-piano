export const SynthModel = {
    bal: {
        displayName: "Bal",
        id: "bal",
        max: 1,
        min: 0,
        step: .05,
        val: .5
    },
    detune: {
        displayName: "Detune",
        id: "detune",
        max: 50,
        min: -50,
        step: 1,
        val: 0
    },
    env: {
        a: 0.1,
        d: 0.5,
        s: 0.3,
        r: 0.1
    },
    gain: {
        displayName: "Gain",
        id: "gain",
        max: 1,
        min: 0,
        step: .05,
        val: .5
    },
    noise: {
        displayName: "Noise",
        id: "noise",
        opts: "noiseTypes",        
        val: "none"
    },
    osc: {
        displayName: "Oscs",
        id: "osc",
        opts: "oscTypes",
        val: "sine"
    },
    tuning: {
        displayName: "Tuning",
        id: "tuning",
        opts: "tunings",        
        val: "equal"
    }
};