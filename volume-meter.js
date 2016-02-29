//3D global variables
var width = 800;
var height = 400;
//creates a new scene
var scene = new THREE.Scene();

//audio global variables
var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH = 500;
var HEIGHT = 50;
var rafID = null;

//these are the variables that control the radisu/tube/radialsegments/tubular segments. This is where you should plug in your sound variables 
var torusRadius = 8;
var torusTube = 2;
var torusRadialSegments = 16;
var torusTubularSegments = 100;

window.onload = function () {

    // grab our canvas
    canvasContext = document.getElementById("meter").getContext("2d");

    // Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        //getUserMedia
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


    function didntGetStream() {
        alert('Stream generation failed.');
    }

    var mediaStreamSource = null;

    function gotStream(stream) {
        // Create an AudioNode from the stream.
        mediaStreamSource = audioContext.createMediaStreamSource(stream);

        // Create a new volume meter and connect it.
        meter = createAudioMeter(audioContext);
        mediaStreamSource.connect(meter);

        // kick off the visual updating
        drawLoop();
    }

    var x = 1;


    //prepare scene
    //(z axis position, width, height, 1, 1000);
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

    //positions the camera 500 above the scene in an aerial view
    camera.position.z = 500;

    camera.lookAt(scene.position);
    this.perspective = "Perspective";

    scene.add(camera);

    //THREE.WEBGLRenderer is the canvas
    var renderer = new THREE.WebGLRenderer();
    //renderer creates canvas

    //this makes the renderer the size of your original window
    renderer.setSize(window.innerWidth, window.innerHeight);

    //change renderer color to white
    renderer.setClearColor(0xffffff, 255);
    document.body.appendChild(renderer.domElement);

    //add a hemisphere light
    var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    //creates the basis for a torus
    var torusGeometry = new THREE.TorusGeometry(torusRadius, torusTube, torusRadialSegments, torusTubularSegments);
    //defines the material that will be on the torus
    var torusMaterial = new THREE.MeshLambertMaterial({
        color: 0xffff00
    });

    //draw a grid of torus
    for (var i = -40; i < 10; i++) {
        console.log("draw a torus");
        //for (var j = -40; j < 10; j++) {
            var torus = new THREE.Mesh(torusGeometry, torusMaterial);
            torus.position.x = 50 //* i;
            torus.position.y = 50 //* j;
            scene.add(torus);
        //}

        //the render function is what makes the animation happen and renders / generates the entire scene
        var render = function () {

            requestAnimationFrame(render);
            renderer.render(scene, camera);
        };


        function drawLoop(time) {
            //torusRadius = torusRadius + 1;
            render();
            //x = x + 1;
            console.log('Is this where animation happens? ' + torusRadius);

            // clear the background
            canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

            // draw a bar based on the current volume
            canvasContext.fillRect(0, 0, meter.volume * WIDTH * 1.4, HEIGHT);

            // set up the next visual callback
            rafID = window.requestAnimationFrame(drawLoop);
        }
    }


    function createAudioMeter(audioContext, clipLevel, averaging, clipLag) {
        var processor = audioContext.createScriptProcessor(512);
        processor.onaudioprocess = volumeAudioProcess;
        processor.clipping = false;
        processor.lastClip = 0;
        processor.volume = 0;
        //processor.clipLevel = clipLevel || 0.98;
        processor.averaging = averaging || 0.95;
        processor.clipLag = clipLag || 750;

        // this will have no effect, since we don't copy the input to the output,
        // but works around a current Chrome bug.
        processor.connect(audioContext.destination);

        /*
	processor.checkClipping =
		function(){
			if (!this.clipping)
				return false;
			if ((this.lastClip + this.clipLag) < window.performance.now())
				this.clipping = false;
			return this.clipping;
		};
    */

        processor.shutdown =
            function () {
                this.disconnect();
                this.onaudioprocess = null;
            };

        return processor;
    }

    function volumeAudioProcess(event) {
        var buf = event.inputBuffer.getChannelData(0);
        var bufLength = buf.length;
        var sum = 0;
        var x;

        // Do a root-mean-square on the samples: sum up the squares...
        for (var i = 0; i < bufLength; i++) {
            x = buf[i];
            if (Math.abs(x) >= this.clipLevel) {
                this.clipping = true;
                this.lastClip = window.performance.now();
            }
            sum += x * x;
        }

        // ... then take the square root of the sum.
        var rms = Math.sqrt(sum / bufLength);

        // Now smooth this out with the averaging factor applied
        // to the previous sample - take the max here because we
        // want "fast attack, slow release."
        this.volume = Math.max(rms, this.volume * this.averaging);
    }
}