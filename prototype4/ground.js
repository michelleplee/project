//Declare three.js variables 
var camera, scene, renderer;

var audioContext;
var audioAmpMeter;

var particle;
var knot, knot2, knot3;
 
var pointSize = 3;





//assign three.js objects to each variable
function init(){
 audioContext = null;
    audioAmpMeter = null;
    //camera
    camera = new THREE.PerspectiveCamera(500, window.innerWidth /    window.innerHeight, 1, 1000);
    camera.position.z = 100;
 
    //scene
    scene = new THREE.Scene();
 
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
    
   
    
    
    
    var geom2 = new THREE.TorusKnotGeometry(  500,400,200,26  );
  
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

generateSprite();

render();