import React, { Component } from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import hdrTest from "../../assets/pedestrian_overpass_1k.hdr";
import glbAsset from "../../assets/glb/piqhx0.glb";

const style = {
    height: "1000px",
    width: "50%" // we can control scene size by setting container dimensions
};

class Shade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AAStatus: true,
      PCStatus: true,
    };
  }

   componentDidMount() {
    console.log('You reached componentDidMount');
    this.setScene();
    this.startCamera();
    this.setRenderer();
    this.setControls();
    this.startLighting();
    this.setEnvironment();
    this.handleEnvironment();
    this.handleGLTF();
    this.startRefGeo();
    this.animationLoop();
    this.renderLoop();

    window.addEventListener('resize', this.handleWindowResize);
  };

  componentWillUnmount() {
    console.log('You reached componentWillUnmount');
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  };

  setScene = () => {
    console.log('setScene initiated');
    this.width = this.mount.clientWidth;
    this.height = this.mount.clientHeight;

    this.scene = new THREE.Scene();
  };

  startCamera = () => {
    console.log('setCamera initiated');
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      this.width / this.height, // aspect ratio
      0.2, // near plane
      300 // far plane
    );
    this.camera.position.set( 0, 20, 20 ); 
  };

  setRenderer = () => {
    console.log('startRenderer initiated');
    const { AAStatus } = this.state;
    this.renderer = new THREE.WebGLRenderer( { antialias: AAStatus } );
    this.renderer.setSize( this.width, this.height );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.mount.appendChild( this.renderer.domElement ); // mount using React ref
  };

  setControls = () => {
    console.log('setControls initiated');
    this.controls = new OrbitControls( this.camera, this.mount );
  };

  startLighting = () => {
    console.log('handleLighting initiated');
    const pointL = [];
    pointL[0] = new THREE.PointLight( 0xffffff,10,40,2);
    pointL[1] = new THREE.PointLight( 0xffffff,10,40,2);
    pointL[2] = new THREE.PointLight( 0xffffff,10,40,2);

    pointL[0].position.set( 0,20,0 );
    pointL[1].position.set( 10,10,10 );
    pointL[2].position.set( -10,-10,-10 );

    console.log(pointL)

    pointL.forEach(point => {
      console.log(point);
      point.castShadow = true;
      this.scene.add(point)
    })

  }

  setEnvironment = () => {
    console.log('startEnvironment initiated');

    const { PCStatus } = this.state;
    this.renderer.physicallyCorrectLights = PCStatus;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  };

  handleEnvironment = () => {
    const pmremGeneratorTest = new THREE.PMREMGenerator( this.renderer );

    new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .load(hdrTest, (texture) => {
    	var envMap = pmremGeneratorTest.fromEquirectangular(texture).texture;
    	pmremGeneratorTest.dispose();
    	this.scene.background = envMap;
    	this.scene.environment = envMap;
    });

    pmremGeneratorTest.compileEquirectangularShader();
  }

  handleGLTF = async () => {
    console.log('startGLTF initiated');

    new GLTFLoader().load(glbAsset, (glb) => {
  		this.scene.add(glb.scene);
  	});
  };

  startRefGeo = () => {
    console.log('startTestGeo initiated');
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

  animationLoop = () => {
    this.requestID = window.requestAnimationFrame(this.renderLoop);
  };

  renderLoop = () => {
    this.requestID = window.requestAnimationFrame(this.animationLoop);
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
    return <div style={style} className="Shade" ref={ref => (this.mount = ref)} />;
  }
}

export default Shade;
