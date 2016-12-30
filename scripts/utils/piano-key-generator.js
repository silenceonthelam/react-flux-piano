const pitchClassNames = ["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"];
const octaves = [0,1,2,3,4,5,6,7,8,9,10,11];
const blackKeyIndicies = [1,3,6,8,10];

function adjustForEndingBlackKey(numKeys) {
    // remove last key if black since pianos
    // all end on white keys
    return (blackKeyIndicies.indexOf(numKeys % 12) === -1) ?
             numKeys-- : numKeys;
}

function createKeys(numKeys) {
    var keys = [],
        k = 0;

    var startOctave = 0,
        startPitchClass = 0;

    // adjust the start octaves if the screen is small
    // b/c who wants a keyboard with just the lowest octave
    // well, maybe people might want that,
    // but that's a different project

    if (numKeys <= 60 && numKeys > 48) {
        startOctave = 0;
    } else if (numKeys <= 48 && numKeys > 36) {
        startOctave = 1;
    } else if (numKeys <= 36 && numKeys > 24) {
        startOctave = 2;
    } else {
        startOctave = 3;
    }

    var offset = 0;

    if (startOctave > 0) {
        offset = startOctave * 12;
    }

    var keyNumber = offset,
        x = 0;

    while (numKeys > 0) {
        var octave = parseInt((x / 12) + startOctave, 10);

        keys.push({
            keyNumber: keyNumber++,
            octave: octaves[octave],
            pitchClass: pitchClassNames[x % 12]
        });

        numKeys--;
        x++;
    }

    return keys;
}

function getNumKeys(availWidth, whiteKeyWidth) {
    var totalKeys = 0,
        i = 0;

    while (availWidth > whiteKeyWidth) {
        // since black keys don't attribute to the overall width
        // due to neg margin, don't subtract anything
        if (blackKeyIndicies.indexOf(i) === -1) {
            availWidth = availWidth - whiteKeyWidth;
        }

        totalKeys++;
        i++;

        if (i === 12) {
            i = 0;
        }
    }

    return totalKeys;
}

function getRemainingSpace(numKeys, availWidth, whiteKeyWidth) {
    // if any space remains after keys are defined,
    // we need to distribute that to make the piano look better

    var totalWidth = 0,
        i = 0,
        j = 0;

    for (i=0; i<numKeys; i++) {
        // the last key is a black one, don't count it

        if (i === numKeys.length - 1 && 
            blackKeyIndicies.indexOf(i) !== -1) {
            break;
        }

        if (blackKeyIndicies.indexOf(j) === -1) {
            totalWidth = totalWidth + whiteKeyWidth;
        }

        j++;

        if (j === 12) {
            j = 0;
        }
    }

    return (availWidth - totalWidth);
}

export function generateKeys(windowWidth) {
    var whiteKeyWidth = 60;
    var pianoSideWidth = windowWidth * 0.03;
    var windowSideWidth = windowWidth * 0.04;  
    
    if (windowWidth <= 1200) {
        pianoSideWidth = windowWidth * 0.02;
    }

    var availWidth = windowWidth - 12;

    if ( windowWidth > 650) {
        availWidth = windowWidth - pianoSideWidth - windowSideWidth;
    }

    var numKeys = getNumKeys(availWidth, whiteKeyWidth),
        adjustedNumKeys = adjustForEndingBlackKey(numKeys);

    return {
        keys: createKeys(numKeys),
        remainingSpace: getRemainingSpace(adjustedNumKeys, availWidth, whiteKeyWidth)
    };
}