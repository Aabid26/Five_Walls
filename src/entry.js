import * as THREE from 'three';

// init

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 50 ;   

const scene = new THREE.Scene();

// defining dimentins of walls
const geometry0 = new THREE.BoxGeometry(5,7,3);
const geometry1 = new THREE.BoxGeometry( 5,7,3 );
const geometry2 = new THREE.BoxGeometry(5,7,3);
const geometry3 = new THREE.BoxGeometry( 5,7,3 );
const geometry4 = new THREE.BoxGeometry(5,7,3);

const geometry5 = new THREE.BoxGeometry(1,1.5,5);

// different color materials for each wall 
const material0 = new THREE.MeshStandardMaterial({color:'#87b500' ,transparent:true ,opacity:'0.3'});
const material1 = new THREE.MeshStandardMaterial({color:'#01fffe',  });
const material2 = new THREE.MeshStandardMaterial({color:'#0174fe',transparent:true ,opacity:'0.3' });
const material3 = new THREE.MeshStandardMaterial({color:'#01742a'  });
const material4 = new THREE.MeshStandardMaterial({color:'#b0742a' });
const material5 = new THREE.MeshStandardMaterial({color:'#fe0001' });

//creating texture (frame)
const mesh5 = new THREE.Mesh( geometry5, material5 );
const texture = new THREE.CubeTextureLoader().load(mesh5);
material0.envmap = texture; 

 // creating mesh of all five walls 
const mesh0 = new THREE.Mesh( geometry0, material0 );
mesh0.position.x=0;       // assigning the x axis position to prevent them from over lapping 
const mesh1 = new THREE.Mesh( geometry1, material1 );
mesh1.position.x=7;
const mesh2 = new THREE.Mesh( geometry2, material2 );
mesh2.position.x=14;
const mesh3 = new THREE.Mesh( geometry3, material3 );
mesh3.position.x=-7;
const mesh4 = new THREE.Mesh( geometry4, material4 );
mesh4.position.x=-14;

//scene.add( material);

scene.add( mesh0 ,mesh1,mesh2,mesh3,mesh4,texture);

//adding Light so that mesh can be visible
const color = '#fffffe';
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
//renderer.setAnimationLoop( animation );
renderer.render(scene,camera);
//renderer.render(scene1,camera);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function render() {

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {

		intersects[ i ].object.material.color.set( 0xff0000 );

	}

	renderer.render( scene, camera );

}

window.addEventListener( 'pointermove', onPointerMove );

window.requestAnimationFrame(render);
document.body.appendChild( renderer.domElement );
