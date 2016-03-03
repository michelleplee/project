//this script runs things to be rendered

//three.js vars
var scene = new THREE.Scene();

//torus vars
var torusRadius = 10;
var torusTube = 3;
var torusRadialSegments = 16;
var torusTubularSegments = 100;
var boxWidth = 10;
var boxHeight = 10;
var boxDepth = 10;

//audio vars
var audioContext = null;
var audioAmpMeter = null;


//create new camera
camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 800);
//set up camera
camera.position.z = 300;
camera.position.x=100;
camera.position.y=300;
camera.lookAt(scene.position);
this.perspective = "Perspective";
scene.add(camera);
//create new renderer
var renderer = new THREE.WebGLRenderer();
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





/* starting to draw boxes here */


//boxGeometry = BoxGeometry(width,height,depth);
    var boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    var boxMaterial = new THREE.MeshPhongMaterial ( { color: 0x2194ce, shininess: 50});
    
        var box = new THREE.Mesh( boxGeometry, boxMaterial);
        
        box.position.x = 10;
        box.position.y = 20;
        scene.add(box);

        

        var box2 = new THREE.Mesh( boxGeometry, boxMaterial);
        
        box2.position.x = 22;
        box2.position.y = 20;
        scene.add(box2);

        


        var box3 = new THREE.Mesh( boxGeometry, boxMaterial);
        
        box3.position.x = -2;
        box3.position.y = 20;
        scene.add(box3);


        var box4 = new THREE.Mesh( boxGeometry, boxMaterial);
        
        box4.position.x = -2;
        box4.position.y = 20;
        box4.position.z = 12;
        scene.add(box4);



        var box5 = new THREE.Mesh( boxGeometry, boxMaterial);
        box5.position.x = 10;
        box5.position.y = 20;
        box5.position.z = 12;  
        scene.add(box5);

        


        var box6 = new THREE.Mesh( boxGeometry, boxMaterial);
        box6.position.x = 22;
        box6.position.y = 20;
        box6.position.z = 12;
        scene.add(box6);

        

        var box7 = new THREE.Mesh( boxGeometry, boxMaterial);
        box7.position.x = -2;
        box7.position.y = 20;
        box7.position.z = 24;  
        scene.add(box7);    




        var box8 = new THREE.Mesh( boxGeometry, boxMaterial);
        box8.position.x = 10;
        box8.position.y = 20;
        box8.position.z = 24; 
        scene.add(box8);


    
        var box9 = new THREE.Mesh( boxGeometry, boxMaterial);
        box9.position.x = 22;
        box9.position.y = 20;
        box9.position.z = 24;
        scene.add(box9);

        var box10 = new THREE.Mesh( boxGeometry, boxMaterial);
        box10.position.x = -2;
        box10.position.y = 20;
        box10.position.z = 36;
        scene.add(box10);

        var box11 = new THREE.Mesh( boxGeometry, boxMaterial);
        box11.position.x = 10;
        box11.position.y = 20;
        box11.position.z = 36;
        scene.add(box11);

        var box12 = new THREE.Mesh( boxGeometry, boxMaterial);
        box12.position.x = 22;
        box12.position.y = 20;
        box12.position.z = 36;
        scene.add(box12);


        var box13 = new THREE.Mesh( boxGeometry, boxMaterial);
        box13.position.x = -14;
        box13.position.y = 20;
        box13.position.z = 36;
        scene.add(box13);
        
        var box14 = new THREE.Mesh( boxGeometry, boxMaterial);
        box14.position.x = -14;
        box14.position.y = 20;
        box14.position.z = 24;
        scene.add(box14);

        var box15 = new THREE.Mesh( boxGeometry, boxMaterial);
        box15.position.x = -14;
        box15.position.y = 20;
        box15.position.z = 12;
        scene.add(box15);

        var box16 = new THREE.Mesh( boxGeometry, boxMaterial);
        box16.position.x = -14;
        box16.position.y = 20;
        box16.position.z = -2;
        scene.add(box16);

/*scene.add(box3);
scene.add(box4);
scene.add(box5);
scene.add(box6);
scene.add(box7);
scene.add(box8);
scene.add(box9);
scene.add(box10);
scene.add(box11);
scene.add(box12);
scene.add(box13);
scene.add(box14);
scene.add(box15);
scene.add(box16);*/



console.log("draw a cube");


var render = function () {
    //the render function is what makes the animation happen and renders / generates the entire scene
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    //rotates the torus and positions on z axis + 15

    //torus1.rotation.x += 0.01 + audioAmpMeter.volume;
    //torus1.rotation.y += 0.01 + audioAmpMeter.volume;
    
    
    box.scale.y = 2 +audioAmpMeter.volume * 10;
    box2.scale.y=  2+ audioAmpMeter.volume*20;
    
    box3.scale.y = 2 +audioAmpMeter.volume * 50;
    box4.scale.y=  2+ audioAmpMeter.volume* 30;
    box5.scale.y = 2 +audioAmpMeter.volume * 70;
    box6.scale.y=  2+ audioAmpMeter.volume * 2 ;
    box7.scale.y = 2 +audioAmpMeter.volume * 10.5;
    box8.scale.y=  2+ audioAmpMeter.volume*20;
    
    box9.scale.y = 2 +audioAmpMeter.volume * 7;
    
    
    box10.scale.y = 2 +audioAmpMeter.volume * 10.5;
    box11.scale.y=  2+ audioAmpMeter.volume*20;
    
    box12.scale.y = 2 +audioAmpMeter.volume * 7;
    
    
     box13.scale.y = 2 +audioAmpMeter.volume * 30;
    
    
    box14.scale.y = 2 +audioAmpMeter.volume * 10.5;
    box15.scale.y=  2+ audioAmpMeter.volume*20;
    
    box16.scale.y = 2 +audioAmpMeter.volume * 37;
        

    //console.log(audioAmpMeter.volume);
}