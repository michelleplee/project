//this script runs things to be rendered

//three.js vars



var controls, renderer, scene, camera;
var audioAmpMeter;
var audioContext;
var particle;
var knot, knot2, knot3, knot4;
var changeKnot1, changeKnot2, changeKnot3, changeKnot4, changeKnot5;

var pointSize = 3;



/*   changeKnot1 = createPointCloud(geom); //blue
    changeKnot2 = createPointCloud2(geom); //white 
    changeKnot3 = createPointCloud3(geom); //orange
    changeKnot4 = createPointCloud4(geom); //yellow
    changeKnot5 = createPointCloud5(geom); //red
    */


//blue cloud
var colorRange1 = 'rgba(255,255,255,1)'; //white
var colorRange2 = 'rgba(0, 255,255,1)';  //light blue

var colorRange3 = 'rgba(0,0,64,1)'; //dark blue
var colorRange4 = 'rgba(0,0,0,1)'; //black




var colorRange5 = 'rgba(255,0,255,1)'; //magenta
var colorRange6 = 'rgba(255,0,255,1)'; //magenta


var whiteRange1 = 'rgba(255,255,255,1)';
var whiteRange2 = 'rgba(255,255,255,1)';//'rgba (235,255,235, 0)'; 
var whiteRange3 = 'rgba(94, 179,179, 1)'; 
var whiteRange4 = 'rgba(0,0,0,1)'; 


var yellowRange1 = 'rgba(255,255,255,1)';
var yellowRange2 = 'rgba(255,234,0,1)';
var yellowRange3 = 'rgba(145,133,0,1)';
var yellowRange4 = 'rgba(0,0,0,1)';


var orangeRange1 = 'rgba(255,255,255,1)';
var orangeRange2 = 'rgba(255, 204, 51, 1)';
var orangeRange3 = 'rgba(255,153, 51, 1)';
var orangeRange4 = 'rgba(0,0,0,1)';



var redRange1 = 'rgba(255,255,255,1)';
var redRange2 = 'rgba(255, 55, 0, 1)';
var redRange3 = 'rgba(99,17,0, 1)';
var redRange4 = 'rgba(0,0,0,1)'; //black




var generateSpriteFunction = generateSprite();


function init() {
    scene = new THREE.Scene();



    //audio vars
    audioAmpMeter = null;
    audioContext = null;

    //create new camera
    camera = new THREE.PerspectiveCamera(500, window.innerWidth / window.innerHeight, 1, 1000);


    controls = new THREE.OrbitControls(camera);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    //set up camera
    camera.position.z = 100;

    camera.lookAt(scene.position);
    this.perspective = "Perspective";
    scene.add(camera);
    //create new renderer
    renderer = new THREE.WebGLRenderer();
    //set up renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 255);
    document.body.appendChild(renderer.domElement);

    var spotLight = new THREE.SpotLight(0x007DFF, 10);
    spotLight.position.set(50, 150, 150);
    scene.add(spotLight);

    console.log("draw the scene");

    // use it like this
    var geom = new THREE.TorusKnotGeometry(15, 15, 100, 30);
    
    knot = createPointCloud(geom);

    
    
   // knot5 = createPointCloud(geom);
    
    
    
    
    



    var geom2 = new THREE.TorusKnotGeometry(500, 500, 200, 26);

    knot3 = createPointCloudBackground(geom2);

    
   /*var geom3 = new THREE.OctahedronGeometry(13, 1);
    var material = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        wireframe:true,
        //vertexColors: 0x00000,
    });
    */
    
    //scene.add(knot);

    
    // here is where i am adding the real things
    
    changeKnot1 = createPointCloud(geom); //blue
    changeKnot2 = createPointCloud2(geom); //white 
    changeKnot3 = createPointCloud3(geom); //orange
    changeKnot4 = createPointCloud4(geom); //yellow
    changeKnot5 = createPointCloud5(geom); //red
    
    
    
    //scene.add(knot5);
    
    scene.add(knot3);
    
    scene.add(changeKnot1);
    
    scene.add(changeKnot2);
    
    scene.add(changeKnot3);
    
    scene.add(changeKnot4);
    
    scene.add(changeKnot5);
    
    

   // scene.add(knot4);


    // create the particle variables
    var particleCount = 1800,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.ParticleBasicMaterial({
            color: 0xFFFFFF,
            size: 20,
            transparent: true,

        });

    // now create the individual particles
    for (var p = 0; p < particleCount; p++) {
        // create a particle with random
        // position values, -250 -> 250
        var pX = Math.random() * 500 - 250,
            pY = Math.random() * 500 - 250,
            pZ = Math.random() * 500 - 250,
            particle = new THREE.Vector3(new THREE.Vector3(pX, pY, pZ));

        // add it to the geometry
        particles.vertices.push(particle);
    }

    // create the particle system
    var particleSystem = new THREE.ParticleSystem(
        particles, pMaterial);

    // add it to the scene
    scene.add(particleSystem);



}






function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);




}


//blue cloud

function generateSprite() {
    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    var context = canvas.getContext('2d');

    var gradient = context.createRadialGradient(canvas.width / 2,
        canvas.height / 2, 0, canvas.width / 2, canvas.height / 2,
        canvas.width / 2);
   
    gradient.addColorStop(0, colorRange1);
   gradient.addColorStop(0.2, colorRange2);
   gradient.addColorStop(0.4, colorRange3);
    gradient.addColorStop(1, colorRange4);
    
    
       /*var gradient2 = context.createRadialGradient(canvas.width / 2,
        canvas.height / 2, 0, canvas.width / 2, canvas.height / 2,
        canvas.width / 2);
   
    gradient2.addColorStop(0, colorRange1);
   gradient2.addColorStop(0.2, colorRange2);
   gradient2.addColorStop(0.4, colorRange3);
    gradient2.addColorStop(1, colorRange4);
    */
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;

}


// white cloud
function generateSprite2() {
    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    var context = canvas.getContext('2d');

    var gradient = context.createRadialGradient(canvas.width / 2,
        canvas.height / 2, 0, canvas.width / 2, canvas.height / 2,
        canvas.width / 2);
   
    gradient.addColorStop(0, whiteRange1);
   gradient.addColorStop(0.2, whiteRange2);
   gradient.addColorStop(0.4, whiteRange3);
    gradient.addColorStop(1, whiteRange4);
    
    
       /*var gradient2 = context.createRadialGradient(canvas.width / 2,
        canvas.height / 2, 0, canvas.width / 2, canvas.height / 2,
        canvas.width / 2);
   
    gradient2.addColorStop(0, colorRange1);
   gradient2.addColorStop(0.2, colorRange2);
   gradient2.addColorStop(0.4, colorRange3);
    gradient2.addColorStop(1, colorRange4);
    */
    
    
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;

}



//yellow cloud

function generateSprite3() {
    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    var context = canvas.getContext('2d');

    var gradient = context.createRadialGradient(canvas.width / 2,
        canvas.height / 2, 0, canvas.width / 2, canvas.height / 2,
        canvas.width / 2);
   
    gradient.addColorStop(0, yellowRange1);
   gradient.addColorStop(0.2, yellowRange2);
   gradient.addColorStop(0.4, yellowRange3);
    gradient.addColorStop(1, yellowRange4);
    
    
       /*var gradient2 = context.createRadialGradient(canvas.width / 2,
        canvas.height / 2, 0, canvas.width / 2, canvas.height / 2,
        canvas.width / 2);
   
    gradient2.addColorStop(0, colorRange1);
   gradient2.addColorStop(0.2, colorRange2);
   gradient2.addColorStop(0.4, colorRange3);
    gradient2.addColorStop(1, colorRange4);
    */
    
    
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;

}


//orange cloud


function generateSprite4() {
    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    var context = canvas.getContext('2d');

    var gradient = context.createRadialGradient(canvas.width / 2,
        canvas.height / 2, 0, canvas.width / 2, canvas.height / 2,
        canvas.width / 2);
   
    gradient.addColorStop(0, orangeRange1);
   gradient.addColorStop(0.2, orangeRange2);
   gradient.addColorStop(0.4, orangeRange3);
    gradient.addColorStop(1, orangeRange4);
    
    
       /*var gradient2 = context.createRadialGradient(canvas.width / 2,
        canvas.height / 2, 0, canvas.width / 2, canvas.height / 2,
        canvas.width / 2);
   
    gradient2.addColorStop(0, colorRange1);
   gradient2.addColorStop(0.2, colorRange2);
   gradient2.addColorStop(0.4, colorRange3);
    gradient2.addColorStop(1, colorRange4);
    */
    
    
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;

}




//red cloud

function generateSprite5() {
    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    var context = canvas.getContext('2d');

    var gradient = context.createRadialGradient(canvas.width / 2,
        canvas.height / 2, 0, canvas.width / 2, canvas.height / 2,
        canvas.width / 2);
   
    gradient.addColorStop(0, redRange1);
   gradient.addColorStop(0.2, redRange2);
   gradient.addColorStop(0.4, redRange3);
    gradient.addColorStop(1, redRange4);
    
    
       /*var gradient2 = context.createRadialGradient(canvas.width / 2,
        canvas.height / 2, 0, canvas.width / 2, canvas.height / 2,
        canvas.width / 2);
   
    gradient2.addColorStop(0, colorRange1);
   gradient2.addColorStop(0.2, colorRange2);
   gradient2.addColorStop(0.4, colorRange3);
    gradient2.addColorStop(1, colorRange4);
    */
    
    
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;

}



function generateSpriteBackground() {
    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    var context = canvas.getContext('2d');

    var gradient = context.createRadialGradient(canvas.width / 2,
        canvas.height / 2, 0, canvas.width / 2, canvas.height / 2,
        canvas.width / 2);
   
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
   gradient.addColorStop(0.3, colorRange2);
   gradient.addColorStop(0.4, redRange4);
    gradient.addColorStop(1, redRange4);
    
    
       /*var gradient2 = context.createRadialGradient(canvas.width / 2,
        canvas.height / 2, 0, canvas.width / 2, canvas.height / 2,
        canvas.width / 2);
   
    gradient2.addColorStop(0, colorRange1);
   gradient2.addColorStop(0.2, colorRange2);
   gradient2.addColorStop(0.4, colorRange3);
    gradient2.addColorStop(1, colorRange4);
    */
    
    
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;

}





//blue cloud

function createPointCloud(geom) {
    var material = new THREE.PointCloudMaterial({
        color: 0x00ffff,
        opacity: 1,
        size: pointSize,
        transparent: true,
        blending: THREE.AdditiveBlending,
        
        
        map: generateSprite(),
        transparent: true,
    });
    var cloud = new THREE.PointCloud(geom, material);
    cloud.sortParticles = true;
    return cloud;
}





//white cloud

function createPointCloud2(geom) {
    var material = new THREE.PointCloudMaterial({
        color: 0xffffff,
        opacity: 1,
        size: pointSize,
        transparent: true,
        blending: THREE.AdditiveBlending,
        
        
        map: generateSprite2(),
        transparent: true,
    });
    var cloud = new THREE.PointCloud(geom, material);
    cloud.sortParticles = true;
    return cloud;
}



//yellow cloud cloud 

function createPointCloud3(geom) {
    var material = new THREE.PointCloudMaterial({
        color: 0xffffff,
        opacity: 1,
        size: pointSize,
        transparent: true,
        blending: THREE.AdditiveBlending,
        
        
        map: generateSprite3(),
        transparent: true,
    });
    var cloud = new THREE.PointCloud(geom, material);
    cloud.sortParticles = true;
    return cloud;
}





//orange cloud

function createPointCloud4(geom) {
    var material = new THREE.PointCloudMaterial({
        color: 0xffffff,
        opacity: 1,
        size: pointSize,
        transparent: true,
        blending: THREE.AdditiveBlending,
        
        
        map: generateSprite4(),
        transparent: true,
    });
    var cloud = new THREE.PointCloud(geom, material);
    cloud.sortParticles = true;
    return cloud;
}




//red cloud
function createPointCloud5(geom) {
    var material = new THREE.PointCloudMaterial({
        color: 0xffffff,
        opacity: 1,
        size: pointSize,
        transparent: true,
        blending: THREE.AdditiveBlending,
        
        
        map: generateSprite5(),
        transparent: true,
    });
    var cloud = new THREE.PointCloud(geom, material);
    cloud.sortParticles = true;
    return cloud;
}





//background cloud
function createPointCloudBackground(geom) {
    var material = new THREE.PointCloudMaterial({
        color: 0xffffff,
        opacity: 1,
        size: pointSize,
        transparent: true,
        blending: THREE.AdditiveBlending,
        
        
        map: generateSpriteBackground(),
        transparent: true,
    });
    var cloud = new THREE.PointCloud(geom, material);
    cloud.sortParticles = true;
    return cloud;
}










function animate() {
    requestAnimationFrame(animate);
    controls.update();

}

function render() {

    //get the frame
    requestAnimationFrame(render);

    //render the scene
    renderer.render(scene, camera);


   // knot.rotation.x += 0.01;
    //knot.scale.x = 15 * audioAmpMeter.volume;
    //knot.scale.y = 10 * audioAmpMeter.volume;


//    knot3.rotation.x += 0.001;
  //  knot3.rotation.y += 0.001;

    
    
    changeKnot1.scale.x = 25  * audioAmpMeter.volume; // magenta cloud
    changeKnot1.scale.y = 25  * audioAmpMeter.volume; //magenta cloud
    changeKnot1.rotation.x += 0.001;
    
        
    changeKnot2.scale.x = 30* audioAmpMeter.volume; // magenta cloud
    changeKnot2.scale.y = 30 * audioAmpMeter.volume; //magenta cloud
    changeKnot2.rotation.y += 0.001;
        
    changeKnot3.scale.x = 15  * audioAmpMeter.volume; // magenta cloud
    changeKnot3.scale.y = 15  * audioAmpMeter.volume; //magenta cloud
      changeKnot3.rotation.x += 0.001;    
    
    
    changeKnot4.scale.x = 15  * audioAmpMeter.volume; // magenta cloud
    changeKnot4.scale.y = 15  * audioAmpMeter.volume; //magenta cloud
        
    
    changeKnot5.scale.x = 15  * audioAmpMeter.volume; // magenta cloud
    changeKnot5.scale.y = 15  * audioAmpMeter.volume; //magenta cloud

      changeKnot5.rotation.y += 0.001;
    
    
    
    
    
    //frequency-contingent functions
//    console.log(audioFreq);
    
    if(audioFreq == -1){
        console.log("freq stasis");  
        

    }
    if(audioFreq > -1 && audioFreq < 800){
        console.log("freq level 1"); 
        
                 changeKnot1.scale.x = 30 * audioAmpMeter.volume; //blue cloud
        changeKnot1.scale.y = 30 * audioAmpMeter.volume; //blue cloud
        
     
    }
    if(audioFreq > 800 && audioFreq < 1600){
        console.log("freq level 2");  
        
             changeKnot2.scale.x = 30 * audioAmpMeter.volume; //white cloud
        changeKnot2.scale.y = 30 * audioAmpMeter.volume; //white cloud
        
    }
    if(audioFreq > -1 && audioFreq < 2400){
        console.log("freq level 3");  
   
          changeKnot3.scale.x = 30 * audioAmpMeter.volume; //yellow
        changeKnot3.scale.y = 30 * audioAmpMeter.volume; //yellow
        
    }
    if(audioFreq > 800 && audioFreq < 3200){
        console.log("freq level 4");  
    
          changeKnot4.scale.x = 60 * audioAmpMeter.volume; //orange cloud
        changeKnot4.scale.y = 60 * audioAmpMeter.volume; //orange cloud
        
        
        
       //   knot5.scale.x = (35 * audioAmpMeter.volume);
    //knot5.scale.y =  (20 * audioAmpMeter.volume);
        
    }
    if(audioFreq > 3200){
        console.log("freq level 4");  
    
        
        changeKnot5.scale.x = 60 * audioAmpMeter.volume; //red 
        changeKnot5.scale.y = 60 * audioAmpMeter.volume; //red cloud

    }
    


}



init();
animate();
generateSprite();