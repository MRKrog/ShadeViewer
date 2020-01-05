import React, { Component } from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import hdrTest from "../../assets/pedestrian_overpass_1k.hdr";
import glbAsset from "../../assets/glb/piqhx0.glb";

const style = {
    height: "500px",
    width: "50%" // we can control scene size by setting container dimensions
};

class ThreeD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AAStatus: true,
      PCStatus: true,
      height: "",
      width: "",
      shoe: ''
    };
  }

   componentDidMount() {
    console.log('hello');
    this.setScene();
    this.setCamera();
    this.startRenderer();
    this.setControls();
    this.handleLighting();
    this.startEnvironment();
    this.startGLTF();
    this.startTestGeo();
    this.startAnimationLoop();
    this.startRenderLoop();

    window.addEventListener('resize', this.handleWindowResize);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  };

  setScene = () => {
    this.width = this.mount.clientWidth;
    this.height = this.mount.clientHeight;

    this.scene = new THREE.Scene();
  };

  setCamera = () => {
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      this.width / this.height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.z = 9; // is used here to set some distance from a cube that is located at z = 0
  };

  startRenderer = () => {
    const { AAStatus } = this.state;
    this.renderer = new THREE.WebGLRenderer( { antialias: AAStatus } );
    this.renderer.setSize( this.width, this.height );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.mount.appendChild( this.renderer.domElement ); // mount using React ref
  };

  setControls = () => {
    this.controls = new OrbitControls( this.camera, this.mount );
  };

  startEnvironment = () => {
    const { PCStatus } = this.state;
    this.renderer.physicallyCorrectLights = PCStatus;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  };

  handleLoader = () => {

  }

  startGLTF = async () => {
   const pmremGeneratorTest = new THREE.PMREMGenerator( this.renderer );

    new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .load(hdrTest, (texture) => {
    	var envMap = pmremGeneratorTest.fromEquirectangular(texture).texture;
    	pmremGeneratorTest.dispose();
    	this.scene.background = envMap;
    	this.scene.environment = envMap;

      new GLTFLoader().load(glbAsset, (glb) => {
    		this.scene.add(glb.scene);
    	});
    });

    pmremGeneratorTest.compileEquirectangularShader();
  };

  startTestGeo = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial( {
      color: 0x156289,
      metalness: 1,
      roughness: 0.2,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: false
    });
    this.cube = new THREE.Mesh( geometry, material );
    this.scene.add(this.cube);
  };

  handleLighting = () => {
    const lights = [];
    lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[1] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[2] = new THREE.PointLight( 0xffffff, 1, 0 );

    lights[0].position.set( 0, 200, 0 );
    lights[1].position.set( 100, 200, 100 );
    lights[2].position.set( -100, -200, -100 );

    this.scene.add( lights[0] );
    this.scene.add( lights[1] );
    this.scene.add( lights[2] );
  }

  startAnimationLoop = () => {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    this.requestID = window.requestAnimationFrame(this.startRenderLoop);

  };

  startRenderLoop = () => {
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    this.renderer.render( this.scene, this.camera );
  };

  handleWindowResize = () => {
    this.width = this.mount.clientWidth;
    this.height = this.mount.clientHeight;

    this.renderer.setSize( this.width, this.height );
    this.camera.aspect = this.width / this.height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    return <div style={style} className="threeD" ref={ref => (this.mount = ref)} />;
  }
}

export default ThreeD;
