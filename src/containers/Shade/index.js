import React, { Component } from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import hdrENV from "../../assets/overpass_1k.hdr"; //Environment (lights objects)
import hdrBKD from "../../assets/bridge_1k.hdr";  //Background (visible in viewport)
import glbAsset from "../../assets/glb/piqhx0.glb"; //Zipped GLTF AR Asset

const style = {
    height: "1000px",
    width: "50%" // we can control scene size by setting container dimensions
};

class Shade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AAStatus: true, //Enables Anti-Aliasing on the OpenGL Renderer 
      PCStatus: true, //Enables Physically Correct Lighting
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
    this.handleCameraControls();
    this.animationLoop();
    this.renderLoop();
    /*Set is used for "invisible" high-level scene construction. 
    Start is used for objects in said scene. 
    Handle is for making later changes to a set/start, or when an external file (glb, hdr) is used in the method
    Loops do not have prefixes
    */

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
    console.log('startCamera initiated');
    this.camera = new THREE.PerspectiveCamera(75,this.width / this.height,0.2,300);
    this.camera.position.set( 0, 20, 20 ); 
  };

  setRenderer = () => {
    console.log('setRenderer initiated');
    const { AAStatus } = this.state;
    this.renderer = new THREE.WebGLRenderer( { antialias: AAStatus } );
    this.renderer.setSize(this.width,this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.mount.appendChild(this.renderer.domElement); // mount using React ref
  };

  setControls = () => {
    console.log('setControls initiated');
    this.controls = new OrbitControls(this.camera,this.mount);
  };

  startLighting = () => {
    console.log('startLighting initiated');
    const pointL = [];
    pointL[0] = new THREE.PointLight(0xffffff,10,40,2);
    pointL[1] = new THREE.PointLight(0xffffff,10,40,2);
    pointL[2] = new THREE.PointLight(0xffffff,10,40,2);

    pointL[0].position.set(0,20,0);
    pointL[1].position.set(10,10,10);
    pointL[2].position.set(-10,-10,-10);

    console.log(pointL)

    pointL.forEach(point => {
      point.castShadow = true;
      this.scene.add(point);
    })

  }

  setEnvironment = () => {
    console.log('setEnvironment initiated');

    const { PCStatus } = this.state;
    this.renderer.physicallyCorrectLights = PCStatus;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  };

  handleEnvironment = () => {
    console.log('handleEnvironment initiated');
    
    const pmremGeneratorTest = new THREE.PMREMGenerator(this.renderer);

    new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .load(hdrENV, (texture) => {
    	var envMap = pmremGeneratorTest.fromEquirectangular(texture).texture;
    	pmremGeneratorTest.dispose();
    	
    	this.scene.environment = envMap;
    }
    );

    new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .load(hdrBKD, (texture) => {
    	var envMap = pmremGeneratorTest.fromEquirectangular(texture).texture;
    	pmremGeneratorTest.dispose();
    	
    	this.scene.background = envMap;
    }
    
    );
    

    pmremGeneratorTest.compileEquirectangularShader();
  }

  handleGLTF = () => {
    console.log('handleGLTF initiated');

    new GLTFLoader().load(glbAsset, (glb) => {
  		this.scene.add(glb.scene);
  	});
  };

  startRefGeo = () => {
    console.log('startRefGeo initiated');
    
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial( {
      color: 0x156289,
      metalness: 1,
      roughness: 0.2,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: false
    });
    
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.set(15,0,0);
    this.scene.add(this.cube);
  };

  handleCameraControls = () => {
    console.log('handleCamera initiated');

    this.controls.target.set(15,0,0);
    this.controls.update();
  };

  animationLoop = () => {
    this.requestID = window.requestAnimationFrame(this.renderLoop);
  };

  renderLoop = () => {
    this.requestID = window.requestAnimationFrame(this.animationLoop);
    this.renderer.render(this.scene,this.camera);
  };

  handleWindowResize = () => {
    this.width = this.mount.clientWidth;
    this.height = this.mount.clientHeight;

    this.renderer.setSize(this.width,this.height);
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
