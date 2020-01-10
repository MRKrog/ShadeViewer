import React, { Component } from 'react';
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

import hdrENV from "../../assets/overpass_1k.hdr"; //Environment (lights objects)
import hdrBKD from "../../assets/bridge_1k.hdr";  //Background (visible in viewport)
import glbAsset from "../../assets/glb/piqhx0.glb"; //Zipped GLTF AR Asset
import glbAssetNew from "../../assets/glb/31685891293277.glb"; //Zipped GLTF AR Asset

const style = {
    height: "1000px",
    width: "100%"
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
    // console.log('You reached componentDidMount');
    this.startStats();
    this.setScene();
    this.startCamera();
    this.setRenderer();
    this.setControls();
    this.startLighting();
    this.setEnvironment(); //Renderer settings relevant to handleEnvinronment()
    this.handleEnvironment(); //Loads Environment
    this.handleBackground(); //Loads Background
    this.handleGLTF();
    this.startRefGeo();
    this.handleCameraControls();
    this.setPostProcessing();
    this.renderLoop();
    /*Set is used for "invisible" high-level scene construction.
    Start is used for objects in said scene.
    Handle is for making later changes to a set/start, or when an external file (glb, hdr) is used in the method
    Loops do not have prefixes
    */

    window.addEventListener('resize', this.handleWindowResize);
  };

  componentWillUnmount() {
    // console.log('You reached componentWillUnmount');
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  };

  startStats = () => {
    // console.log('startStats initiated');
    this.stats = new Stats();
    this.mount.appendChild( this.stats.dom );
  }
  setScene = () => {
    // console.log('setScene initiated');
    this.width = this.mount.clientWidth;
    this.height = this.mount.clientHeight;
    this.scene = new THREE.Scene();
  };

  startCamera = () => {
    // console.log('startCamera initiated');
    this.camera = new THREE.PerspectiveCamera(75,this.width / this.height,0.2,300);
  };

  setRenderer = () => {
    // console.log('setRenderer initiated');
    const { AAStatus } = this.state;
    this.renderer = new THREE.WebGLRenderer( { antialias: AAStatus } );

    this.renderer.setSize(this.width,this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.mount.appendChild(this.renderer.domElement); // mount using React ref
  };

  setControls = () => {
    // console.log('setControls initiated');
    this.controls = new OrbitControls(this.camera,this.mount);
  };

  startLighting = () => {
    // console.log('startLighting initiated');
    const standaLight = [];
    standaLight[0] = new THREE.PointLight(0xffffff,300,40,2);
    standaLight[1] = new THREE.PointLight(0xffffff,300,40,2);
    standaLight[2] = new THREE.PointLight(0xffffff,300,40,2);
    standaLight[3] = new THREE.PointLight(0xffffff,300,40,2);

    standaLight[0].position.set(0,10,20);
    standaLight[1].position.set(20,10,0);
    standaLight[2].position.set(0,10,-20);
    standaLight[3].position.set(-20,10,0);


    // console.log(standaLight)

    standaLight.forEach(i => {
      i.castShadow = true;
      this.scene.add(i);
    })
  }

  setEnvironment = () => {
    // console.log('setEnvironment initiated');

    const { PCStatus } = this.state;
    this.renderer.physicallyCorrectLights = PCStatus;

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
  };

  handleEnvironment = () => {
    // console.log('handleEnvironment initiated');

    this.levARpmremGenerator = new THREE.PMREMGenerator(this.renderer);

    new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .load(hdrENV, (texture) => {
    	var envMap = this.levARpmremGenerator.fromEquirectangular(texture).texture;
    	this.levARpmremGenerator.dispose();

    	this.scene.environment = envMap;
    }
    );
    this.levARpmremGenerator.compileEquirectangularShader();
  }

  handleBackground = () => {
    // console.log('handleBackground initiated');


    new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .load(hdrBKD, (texture) => {
    	var bkdMap = this.levARpmremGenerator.fromEquirectangular(texture).texture;
    	this.levARpmremGenerator.dispose();

    	this.scene.background = bkdMap;
    }
    );
    this.levARpmremGenerator.compileEquirectangularShader();
  }

  handleGLTF = () => {
    // console.log('handleGLTF initiated');
    console.log(this.props.url);
    // https://shopifydependencies.s3.amazonaws.com/ar/31685891293277.glb
    // 'http://innopizza.s3-eu-west-2.amazonaws.com/'
    // this.props.url


    new GLTFLoader().load(this.props.url, (glb) => {
  		this.scene.add(glb.scene);
  	});
  };

  startRefGeo = () => {
    // console.log('startRefGeo initiated');

    const heroGeometry = new THREE.BoxGeometry(2,2,2);

    const lightGeometry = new THREE.BoxGeometry(1,1,1);

    const heroMaterial = new THREE.MeshStandardMaterial( {
      color: 0x7C7C7C,
      metalness: 1,
      roughness: 0,
      side: THREE.DoubleSide,
      flatShading: false
    });

    const lightMaterial = new THREE.MeshStandardMaterial( {
      color: 0xFFFF00,
      metalness: 0,
      roughness: 1,
      emissive: 0xFFFF00,
      side: THREE.DoubleSide,
      flatShading: false
    });

    this.heroCube = new THREE.Mesh(heroGeometry, heroMaterial);

    this.lightCube1 = new THREE.Mesh(lightGeometry, lightMaterial);
    this.lightCube2 = new THREE.Mesh(lightGeometry, lightMaterial);
    this.lightCube3 = new THREE.Mesh(lightGeometry, lightMaterial);
    this.lightCube4 = new THREE.Mesh(lightGeometry, lightMaterial);

    this.heroCube.position.set(0,10,0);

    this.lightCube1.position.set(0,10,20);
    this.lightCube2.position.set(20,10,0);
    this.lightCube3.position.set(0,10,-20);
    this.lightCube4.position.set(-20,10,0);

    this.scene.add(this.heroCube);

    this.scene.add(this.lightCube1);
    this.scene.add(this.lightCube2);
    this.scene.add(this.lightCube3);
    this.scene.add(this.lightCube4);
  };

  handleCameraControls = () => {
    // console.log('handleCamera initiated');
    this.camera.position.set( 0, 15, 50 );
    this.controls.target.set(0,3,0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.5;
    this.controls.screenSpacePanning = true;
    this.controls.update();
  };

  setPostProcessing = () => {
    // console.log('setPostProcessing initiated');

    this.levARcomposer = new EffectComposer(this.renderer);
    this.levARcomposer.addPass( new RenderPass( this.scene, this.camera ) );
  };

  renderLoop = () => {
    this.requestID = window.requestAnimationFrame(this.renderLoop);
    this.levARcomposer.render();
    this.stats.update();
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
