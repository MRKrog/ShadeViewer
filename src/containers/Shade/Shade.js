import React, { Component } from 'react';
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

import hdrBKD from "../../assets/apple_1k.hdr"; //Environment (lights objects)
import hdrENV from "../../assets/autoshop_1k.hdr";  //Background (visible in viewport)
import glbAsset from "../../assets/glb/m2tlya.glb"; //Zipped GLTF AR Asset

const style = {
    height: "1000px",
    width: "100%"
    
};

class Shade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StatsStatus: "",
      LightHelperStatus: true,
      RendererAAStatus: true,
      PCLightsStatus: true,
      ToneMappingConfig: THREE.ACESFilmicToneMapping,
      ToneMappingExposure: 3,
      ColorSpace: THREE.LinearEncoding,
      ControlDampeningStatus: true,
      ControlDampeningFactor: true,
      ControlScrenPanning: true

    };
  }

   componentDidMount() {
    console.log('You reached componentDidMount');
    
    this.startStats();
    this.startlevARviewer();
    // this.startLighting();
    this.startRefGeo();
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

  startStats = () => {
    console.log('startStats initiated');
    this.stats = new Stats();
    this.StatsStatus = true;
    this.mount.appendChild( this.stats.dom );
  };
  startlevARviewer = () => {
    const { RendererAAStatus } = this.state;
    const { PCLightsStatus } = this.state;
    const { ToneMappingConfig } = this.state;
    const { ToneMappingExposure } = this.state;
    const { ColorSpace } = this.state;
    const { ControlDampeningStatus } = this.state;
    const { ControlDampeningFactor } = this.state;
    const { ControlScrenPanning } = this.state;

    console.log('setScene initiated');

    this.perfStatus = 0; //0 = Linear High, 1 = sRGB High, 2 = sRGB Low
    this.width = this.mount.clientWidth;
    this.height = this.mount.clientHeight;
    this.scene = new THREE.Scene();

    console.log('startCamera initiated');
    
    this.camera = new THREE.PerspectiveCamera(75,this.width / this.height,0.2,3000);

    console.log('setRenderer initiated');

    this.renderer = new THREE.WebGLRenderer( { RendererAAStatus } );
    this.renderer.setSize(this.width,this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    
    // mount using React ref
    
    this.mount.appendChild(this.renderer.domElement); 
  
    console.log('setControls initiated');

    this.controls = new OrbitControls(this.camera,this.mount);

    console.log('setEnvironment initiated');

    
    this.renderer.physicallyCorrectLights = PCLightsStatus;
    this.renderer.toneMapping = ToneMappingConfig;
    this.renderer.toneMappingExposure = ToneMappingExposure;
    this.renderer.outputEncoding = ColorSpace;
    
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

    new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .load(hdrBKD, (texture) => {
    	var bkdMap = this.levARpmremGenerator.fromEquirectangular(texture).texture;
    	this.levARpmremGenerator.dispose();

    	this.scene.background = bkdMap;
    }
    );
    this.levARpmremGenerator.compileEquirectangularShader();

    console.log('handleGLTF initiated');

    new GLTFLoader().load(glbAsset, (glb) => {
  		this.scene.add(glb.scene);
    });
    
    console.log('handleCamera initiated');
    this.camera.position.set( 0, 15, 50 );
    this.controls.target.set(0,3,0);
    this.controls.enableDamping = ControlDampeningStatus;
    this.controls.dampingFactor = ControlDampeningFactor;
    this.controls.screenSpacePanning = ControlScrenPanning;
    this.controls.update();

    this.levARcomposer = new EffectComposer(this.renderer);
    this.levARcomposer.addPass( new RenderPass( this.scene, this.camera ) );
    
  };

  startLighting = () => {
    console.log('startLighting initiated');
    if (this.perfStatus < 2) {
      RectAreaLightUniformsLib.init();
    
      const rectLight = [];
      const rectLightHelper = [];
      const { LightHelperStatus } = this.state;
  
      const rectlLightColor = 0xFFFFFF;
      const rectlLightColorblue = 0x0000FF;
      const rectlLightColororange = 0xFFA500;
      const rectLightIntensity = 70;
      const rectLightWidth = 20;
      const rectLightHeight = 10;
  
      rectLight[0] = new THREE.RectAreaLight(rectlLightColor, rectLightIntensity, rectLightWidth, rectLightHeight);
      rectLight[0].position.set(0, 80, 0);
      rectLight[0].rotation.x = THREE.Math.degToRad(-90);
      rectLightHelper[0] = new RectAreaLightHelper(rectLight[0]);
      rectLight[0].add(rectLightHelper[0]);
  
      rectLight[1] = new THREE.RectAreaLight(rectlLightColor, rectLightIntensity, rectLightWidth, rectLightHeight);
      rectLight[1].position.set(0, -60, 0);
      rectLight[1].rotation.x = THREE.Math.degToRad(90);
      rectLightHelper[1] = new RectAreaLightHelper(rectLight[1]);
  
      rectLight[2] = new THREE.RectAreaLight(rectlLightColororange, rectLightIntensity, rectLightWidth, rectLightHeight);
      rectLight[2].position.set(60, 35, 60);
      rectLight[2].rotation.z = THREE.Math.degToRad(90);
      rectLight[2].rotation.y = THREE.Math.degToRad(45);
      rectLightHelper[2] = new RectAreaLightHelper(rectLight[2]);
  
      rectLight[3] = new THREE.RectAreaLight(rectlLightColorblue, rectLightIntensity, rectLightWidth, rectLightHeight);
      rectLight[3].position.set(60, -5, -60);
      rectLight[3].rotation.z = THREE.Math.degToRad(90);
      rectLight[3].rotation.y = THREE.Math.degToRad(135);
      rectLightHelper[3] = new RectAreaLightHelper(rectLight[3]);
      
      rectLight[4] = new THREE.RectAreaLight(rectlLightColorblue, rectLightIntensity, rectLightWidth, rectLightHeight);
      rectLight[4].position.set(-60, -5, 60);
      rectLight[4].rotation.z = THREE.Math.degToRad(90);
      rectLight[4].rotation.y = THREE.Math.degToRad(-45);
      rectLightHelper[4] = new RectAreaLightHelper(rectLight[4]);
      
      rectLight[5] = new THREE.RectAreaLight(rectlLightColororange, rectLightIntensity, rectLightWidth, rectLightHeight);
      rectLight[5].position.set(-60, 35, -60);
      rectLight[5].rotation.z = THREE.Math.degToRad(90);
      rectLight[5].rotation.y = THREE.Math.degToRad(-135);
      rectLightHelper[5] = new RectAreaLightHelper(rectLight[5]);
  
      if (LightHelperStatus) {
        rectLight[1].add(rectLightHelper[1]);
        rectLight[2].add(rectLightHelper[2]);
        rectLight[3].add(rectLightHelper[3]);
        rectLight[4].add(rectLightHelper[4]);
        rectLight[5].add(rectLightHelper[5]);
      }
  
      rectLight.forEach(i => {
        i.castShadow = true;
        this.scene.add(i);
      })
    }
    
    
  };

  startRefGeo = () => {
    console.log('startRefGeo initiated');

    const heroGeometry = new THREE.SphereGeometry(4, 64, 64);

    const heroMaterialMirror = new THREE.MeshStandardMaterial( {
      color: 0x7C7C7C,
      metalness: 1,
      roughness: 0,
      side: THREE.DoubleSide,
      flatShading: false
    });

    const heroMaterialFlat = new THREE.MeshStandardMaterial( {
      color: 0x7C7C7C,
      metalness: 0,
      roughness: 0.8,
      side: THREE.DoubleSide,
      flatShading: false
    });

    const heroMaterialGlossy = new THREE.MeshStandardMaterial( {
      color: 0x7C7C7C,
      metalness: 0,
      roughness: 0.05,
      side: THREE.DoubleSide,
      flatShading: false
    });

    this.heroSphereMirror = new THREE.Mesh(heroGeometry, heroMaterialMirror);
    this.heroSphereMirror.position.set(0,-10,0);

    this.heroSphereFlat = new THREE.Mesh(heroGeometry, heroMaterialFlat);
    this.heroSphereFlat.position.set(0,-10,12);

    this.heroSphereGlossy = new THREE.Mesh(heroGeometry, heroMaterialGlossy);
    this.heroSphereGlossy.position.set(0,-10,-12);
    this.scene.add(this.heroSphereMirror, this.heroSphereFlat, this.heroSphereGlossy);
  };

  renderLoop = () => {
    this.requestID = window.requestAnimationFrame(this.renderLoop);
    this.levARcomposer.render();
    if (this.StatsStatus) {
      this.stats.update();
    }
    // console.log(this.perfStatus);
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
