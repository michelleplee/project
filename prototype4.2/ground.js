//this script runs things to be rendered

//three.js vars



var controls, renderer, scene, camera;
var audioAmpMeter;
var audioContext;
var particle;
var knot, knot2, knot3;
 
var pointSize = 3;

var torusGeo1 = 500;




function init(){
scene = new THREE.Scene();



//audio vars
audioAmpMeter = null;
    audioContext= null;

//create new camera
   camera = new THREE.PerspectiveCamera(500, window.innerWidth /    window.innerHeight, 1, 1000);

    
   controls = new THREE.OrbitControls( camera );
				//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
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

/*//add a hemisphere light
var light = new THREE.HemisphereLight(0xffffbb, 0x000000, 2);
light.position.set(50,150,150);
scene.add(light);*/

var spotLight = new THREE.SpotLight (0x007DFF, 10); 
spotLight.position.set (50,150,150);
scene.add (spotLight);
//create new torus
/*var torusGeometry = new THREE.TorusGeometry(torusRadius, torusTube, torusRadialSegments, torusTubularSegments);
var torusMaterial = new THREE.MeshLambertMaterial({
    color: 0xffff00
});
var torus1 = new THREE.Mesh(torusGeometry, torusMaterial);
//confirm torus
console.log("draw a torus");
scene.add(torus1);
torus1.position.z = 15;*/


 


console.log("draw the scene");
    
    
    
    
 
    //TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale)
    
    // use it like this
    var geom = new THREE.TorusKnotGeometry(  10,30,100,26  );
    knot = createPointCloud(geom);
    
   
    
    
    
    var geom2 = new THREE.TorusKnotGeometry(  torusGeo1,400,200,26  );
  
     knot3 = createPointCloud(geom2);
    

    
    scene.add(knot);
    
     scene.add(knot3);
    
    
    
    // create the particle variables
    var particleCount = 1800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 20,
    transparent:true,

    });

    // now create the individual particles
    for (var p = 0; p < particleCount; p++) {
    // create a particle with random
    // position values, -250 -> 250
    var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vector3( new THREE.Vector3(pX, pY, pZ)
      );

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

				renderer.setSize( window.innerWidth, window.innerHeight );

        
        
    
			}




    function generateSprite() {
        var canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        var context = canvas.getContext('2d');
    
    var gradient = context.createRadialGradient(canvas.width / 2,
canvas.height / 2, 0, canvas.width / 2, canvas.height / 2,
canvas.width / 2);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(0, 255,255,1)');
        gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,1)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
 
    }


    function createPointCloud(geom) {
        var material = new THREE.PointCloudMaterial({
        color: 0xffffff,
        opacity: 1,
        size: pointSize,
        transparent: true,
        blending: THREE.AdditiveBlending,
        map: generateSprite(),
            transparent:true,
        });
        var cloud = new THREE.PointCloud(geom, material);
        cloud.sortParticles = true;
        return cloud;
    }







function animate(){
    requestAnimationFrame(animate);
    controls.update();

}

function render() {
   
   //get the frame
    requestAnimationFrame( render );

    //render the scene
    renderer.render( scene, camera );
        
        
    knot.rotation.x += 0.01;
    knot.scale.x = 15 * audioAmpMeter.volume;
    knot.scale.y = 10 * audioAmpMeter.volume;

        
    knot3.rotation.x += 0.001;
    knot3.rotation.y += 0.001;

 
}



init();
animate();
generateSprite();



//Declare three.js variables 
/*
var controls, camera, scene, renderer;

var audioContext;
var audioAmpMeter;

var particle;
var knot, knot2, knot3;
 
var pointSize = 3;

var torusGeo1 = 500;



//assign three.js objects to each variable
function init(){
 audioContext = null;
    audioAmpMeter = null;
    //camera
    camera = new THREE.PerspectiveCamera(500, window.innerWidth /    window.innerHeight, 1, 1000);

    
    
       controls = new THREE.OrbitControls( camera );
				//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				controls.enableZoom = false;

    
    
    camera.position.z = 100;
 
    //scene
    scene = new THREE.Scene();
    camera.lookAt(scene.position);
this.perspective = "Perspective";
scene.add(camera);
 
    //renderer
    renderer = new THREE.WebGLRenderer();
    //set the size of the renderer
    renderer.setSize( window.innerWidth, window.innerHeight );
 
    //add the renderer to the html document body
    document.body.appendChild( renderer.domElement );
    
    //TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale)
    
    // use it like this
    var geom = new THREE.TorusKnotGeometry(  10,30,100,26  );
    knot = createPointCloud(geom);
    
   
    
    
    
    var geom2 = new THREE.TorusKnotGeometry(  torusGeo1,400,200,26  );
  
     knot3 = createPointCloud(geom2);
    

    
    scene.add(knot);
    
     scene.add(knot3);
    
    
    
    // create the particle variables
    var particleCount = 1800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 20,
    transparent:true,

    });

    // now create the individual particles
    for (var p = 0; p < particleCount; p++) {
    // create a particle with random
    // position values, -250 -> 250
    var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vertex( new THREE.Vector3(pX, pY, pZ)
      );

    // add it to the geometry
    particles.vertices.push(particle);
    }

    // create the particle system
    var particleSystem = new THREE.ParticleSystem(
    particles, pMaterial);

    // add it to the scene
    scene.addChild(particleSystem);
    
    }
 






    function generateSprite() {
        var canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        var context = canvas.getContext('2d');
    
    var gradient = context.createRadialGradient(canvas.width / 2,
canvas.height / 2, 0, canvas.width / 2, canvas.height / 2,
canvas.width / 2);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(0, 255,255,1)');
        gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,1)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
 
    }


    function createPointCloud(geom) {
        var material = new THREE.PointCloudMaterial({
        color: 0xffffff,
        opacity: 1,
        size: pointSize,
        transparent: true,
        blending: THREE.AdditiveBlending,
        map: generateSprite(),
            transparent:true,
        });
        var cloud = new THREE.PointCloud(geom, material);
        cloud.sortParticles = true;
        return cloud;
    }

	function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}



    function animate(){
    requestAnimationFrame(animate);
    controls.update();

}

    function render() {
    //get the frame
    requestAnimationFrame( render );

    //render the scene
    renderer.render( scene, camera );
        
        
    knot.rotation.x += 0.01;
    knot.scale.x = 15 * audioAmpMeter.volume;
    knot.scale.y = 10 * audioAmpMeter.volume;

        
    knot3.rotation.x += 0.001;
    knot3.rotation.y += 0.001;
   
    }




 
init();

animate();
generateSprite();

render();*/