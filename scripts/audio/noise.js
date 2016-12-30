// noise algo from https://github.com/zacharydenton/noise.js/blob/master/noise.js

export function createWhiteNoise(ctx) {
    var bufferSize = 2 * ctx.sampleRate,
        noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate),
        output = noiseBuffer.getChannelData(0);

    for (var i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }    

    return noiseBuffer;
}

export function createPinkNoise(ctx) {
    // approx effects of a -3dB/octave filter using Paul Kellet’s refined method:
    // http://www.musicdsp.org/files/pink.txt ==> Filter to make pink noise from white
    // This is an approximation to a -10dB/decade filter using a weighted sum
    // of first order filters. It is accurate to within +/-0.05dB above 9.2Hz 
    // (44100Hz sampling rate). Unity gain is at Nyquist, but can be adjusted
    // by scaling the numbers at the end of each line
    // almost gaussian level distribution.

    var bufferSize = 2 * ctx.sampleRate,
        noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate),
        output = noiseBuffer.getChannelData(0),
        b = [0,0,0,0,0,0,0];
        
    for (var i = 0; i < bufferSize; i++) {
        var white = Math.random() * 2 - 1;

        b[0] = 0.99886 * b[0] + white * 0.0555179;
        b[1] = 0.99332 * b[1] + white * 0.0750759;
        b[2] = 0.96900 * b[2] + white * 0.1538520;
        b[3] = 0.86650 * b[3] + white * 0.3104856;
        b[4] = 0.55000 * b[4] + white * 0.5329522;
        b[5] = -0.7616 * b[5] - white * 0.0168980;

        output[i] = b[0] + b[1] + b[2] + b[3] + b[4] + b[5] + b[6] + white * 0.5362;
        output[i] *= 0.11; // (roughly) compensate for gain

        b[6] = white * 0.115926;
    }
    return noiseBuffer;
}

export function createBrownNoise(ctx) {
    // aka. red noise
    // Brownian noise decreases in power by 12dB/octave, 
    // and sounds like a waterfall. 

    var lastOut = 0.0,
        bufferSize = 2 * ctx.sampleRate, // 2sec || 4096
        noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate),
        output = noiseBuffer.getChannelData(0);        

    for (var i = 0; i < bufferSize; i++) {
        var white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // (roughly) compensate for gain
    }

    return noiseBuffer;
}