//this is what happens when createAudioAmpMeter() is called. it creates a variable from the mic amplitude that can be used in render.js.

function createAudioAmpMeter(audioContext, clipLevel, averaging, clipLag) {
    var audioProcessor = audioContext.createScriptProcessor(512);
    audioProcessor.onaudioprocess = audioAmpAvg;
    audioProcessor.lastClip = 0;
    audioProcessor.volume = 0;
    audioProcessor.clipLevel = clipLevel || 0.98;
    audioProcessor.averaging = averaging || 0.95;
    audioProcessor.clipLag = clipLag || 750;

    // this will have no effect, since we don't copy the input to the output,
    // but works around a current Chrome bug.
    audioProcessor.connect(audioContext.destination);

    audioProcessor.shutdown =
        function () {
            this.disconnect();
            this.onaudioprocess = null;
        };

    return audioProcessor;
}

function audioAmpAvg(event) {
    var audioAmpData = event.inputBuffer.getChannelData(0);
    var audioAmpDataLength = audioAmpData.length;
    var sum = 0;
    var x;

    // Do a root-mean-square on the samples: sum up the squares...

    for (var i = 0; i < audioAmpDataLength; i++) {
        x = audioAmpData[i];
        if (Math.abs(x) >= this.clipLevel) {
            this.clipping = true;
            this.lastClip = window.performance.now();
        }
        sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms = Math.sqrt(sum / audioAmpDataLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume * this.averaging);
}