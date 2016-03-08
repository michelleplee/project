//this is the first script. it checks to see if the mic works. if so, it runs render();

window.onload = function () {
    
    $("section#overlay h1").animate({
            opacity: 1
        },
        2000,
        'swing',
        function () {
            // add a callback function here to change opacity and left values to get a fade/slide effect over .75 second  
            $('section#overlay h2').animate({
                    opacity: 1
                },
                2000,
                'swing'
            )
        }
    );
    
    //monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    //create audio context
    audioContext = new AudioContext();

    //attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia({
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }

}

//run if mic cannot be accessed
function didntGetStream() {
    alert('Stream generation failed.');
}


function gotStream(stream) {
    $("section#overlay h2").animate({
            opacity: 0
        },
        2000,
        'swing',
        function () {
            // add a callback function here to change opacity and left values to get a fade/slide effect over .75 second  
            $('section#overlay').animate({
                    opacity: 0
                },
                2000,
                'swing'
            )
            $('section#overlay h1').animate({
                    opacity: 0
                },
                2000,
                'swing'
            )
        }
    );
    
    var mediaStreamSource = null;
    
    //create an AudioNode from the stream
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    //create an audio amplitude meter and connect it to the audio context
    audioAmpMeter = createAudioAmpMeter(audioContext);
    mediaStreamSource.connect(audioAmpMeter);

    // kick off the visual updating
    render();
}