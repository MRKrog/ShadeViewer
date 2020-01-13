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
      StatsStatus: true,
      RendererAAStatus: false,
      PCLightsStatus: false,
      LightHelperStatus: "",
      LightingScenario: 0,
      EnvironmentStatus: true,
      ToneMappingConfig: "",
      ToneMappingExposure: 0,
      ColorSpace: "",
      ControlType: 0,
      ControlDampeningStatus: true,
      ControlDampeningFactor: 0,
      ControlScrenPanning: false,
      isiOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
      isAndroid: /Android/i.test(navigator.userAgent),
      isCriOS: /CriOS/i.test(navigator.userAgent),
      isInstagram: /Instagram/i.test(navigator.userAgent),
      isSnapchat: /Snapchat/i.test(navigator.userAgent),
      isFxiOS: /FxiOS/i.test(navigator.userAgent),
    };
  }

   componentDidMount() {
    console.log('You reached componentDidMount');
    var { StatsStatus } = this.state;
    var { RendererAAStatus } = this.state;
    var { PCLightsStatus } = this.state;
    var { LightHelperStatus } = this.state;
    var { LightingScenario } = this.state;
    var { EnvironmentStatus } = this.state;
    var { ToneMappingConfig } = this.state;
    var { ToneMappingExposure } = this.state;
    var { ColorSpace } = this.state;
    var { ControlType } = this.state;
    var { ControlDampeningStatus } = this.state;
    var { ControlDampeningFactor } = this.state;
    var { ControlScrenPanning } = this.state;
    

    const { isiOS } = this.state;
    const { isAndroid } = this.state;
    const { isCriOS } = this.state;
    const { isInstagram } = this.state;
    const { isSnapchat } = this.state;
    const { isFxiOS } = this.state;

    console.log(isAndroid,isiOS);

    //Feature Detection

    if (isiOS) {
      if (isCriOS) {
        RendererAAStatus = true;
        PCLightsStatus = true;
        LightHelperStatus = false;
        LightingScenario = 0;
        EnvironmentStatus = true;
        ToneMappingConfig = THREE.ACESFilmicToneMapping;
        ToneMappingExposure = 3;
        ColorSpace = THREE.LinearEncoding;
        ControlType = 1;
        ControlDampeningStatus = true;
        ControlDampeningFactor = 0.5;
        ControlScrenPanning = true;
      } else if (isFxiOS) {
        RendererAAStatus = true;
        PCLightsStatus = true;
        LightHelperStatus = false;
        LightingScenario = 0;
        EnvironmentStatus = true;
        ToneMappingConfig = THREE.ACESFilmicToneMapping;
        ToneMappingExposure = 3;
        ColorSpace = THREE.LinearEncoding;
        ControlType = 1;
        ControlDampeningStatus = true;
        ControlDampeningFactor = 0.5;
        ControlScrenPanning = true;
      } else if (isSnapchat) {
        RendererAAStatus = false;
        PCLightsStatus = true;
        LightHelperStatus = false;
        LightingScenario = 1;
        EnvironmentStatus = false;
        ToneMappingConfig = THREE.ACESFilmicToneMapping;
        ToneMappingExposure = 1;
        ColorSpace = THREE.sRGBEncoding;
        ControlType = 1;
        ControlDampeningStatus = true;
        ControlDampeningFactor = 0.5;
        ControlScrenPanning = true;
      } else if (isInstagram) {
        RendererAAStatus = false;
        PCLightsStatus = true;
        LightHelperStatus = false;
        LightingScenario = 1;
        EnvironmentStatus = false;
        ToneMappingConfig = THREE.ACESFilmicToneMapping;
        ToneMappingExposure = 1;
        ColorSpace = THREE.sRGBEncoding;
        ControlType = 1;
        ControlDampeningStatus = true;
        ControlDampeningFactor = 0.5;
        ControlScrenPanning = true;
      }
    } else if (isAndroid) {
      RendererAAStatus = false;
      PCLightsStatus = true;
      LightHelperStatus = false;
      LightingScenario = 1;
      EnvironmentStatus = false;
      ToneMappingConfig = THREE.ACESFilmicToneMapping;
      ToneMappingExposure = 1;
      ColorSpace = THREE.sRGBEncoding;
      ControlType = 1;
      ControlDampeningStatus = true;
      ControlDampeningFactor = 0.5;
      ControlScrenPanning = true;
    } else {
      RendererAAStatus = true;
      PCLightsStatus = true;
      LightHelperStatus = false;
      LightingScenario = 0;
      EnvironmentStatus = true;
      ToneMappingConfig = THREE.ACESFilmicToneMapping;
      ToneMappingExposure = 1;
      ColorSpace = THREE.sRGBEncoding;
      ControlType = 1;
      ControlDampeningStatus = true;
      ControlDampeningFactor = 0.5;
      ControlScrenPanning = true;
    }

    if (StatsStatus) {
      console.log('startStats initiated');
      this.stats = new Stats();
      this.StatsStatus = true;
      this.mount.appendChild( this.stats.dom );
    }
    
    this.startScene();
    this.startRenderer(RendererAAStatus,PCLightsStatus,ToneMappingConfig,ToneMappingExposure,ColorSpace);
    this.startControls(ControlType,ControlDampeningStatus,ControlDampeningFactor,ControlScrenPanning);
    this.startLights(LightingScenario,LightHelperStatus);
    this.startEnvironment(EnvironmentStatus);
    this.startGLTFLoader(glbAsset);
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

  startScene = () => {
    console.log('setScene initiated');

    this.width = this.mount.clientWidth;
    this.height = this.mount.clientHeight;

    this.scene = new THREE.Scene();

    console.log('startCamera initiated');

    this.camera = new THREE.PerspectiveCamera(75,this.width / this.height,0.2,3000);
    this.camera.position.set( 0, 15, 50 );

    console.log('setRenderer initiated');
  };

  startRenderer = (a,b,c,d,e) => {
    this.renderer = new THREE.WebGLRenderer( { a } );
    this.renderer.setSize(this.width,this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.physicallyCorrectLights = b;
    this.renderer.toneMapping = c;
    this.renderer.toneMappingExposure = d;
    this.renderer.outputEncoding = e;
    // mount using React ref
    this.mount.appendChild(this.renderer.domElement);  
  };

  startControls = (a,b,c,d) => {
    console.log('setControls initiated');
    if (a === 1) {
      this.controls = new OrbitControls(this.camera,this.mount);
      this.controls.target.set(0,3,0);
      this.controls.enableDamping = b;
      this.controls.dampingFactor = c;
      this.controls.screenSpacePanning = d;
      this.controls.update();
    };
  };

  startLights = (a,b) => {
    if (a === 1) {
      var standaLight = [];
      standaLight[0] = new THREE.PointLight(0xffd6d6,1300,200,2);
      standaLight[1] = new THREE.PointLight(0xd7d6ff,1300,200,2);
      standaLight[2] = new THREE.PointLight(0xffd6d6,1300,200,2);
      standaLight[3] = new THREE.PointLight(0xd7d6ff,1300,200,2);
      standaLight[4] = new THREE.PointLight(0xffd6d6,1300,200,2);
      standaLight[5] = new THREE.PointLight(0xd7d6ff,1300,200,2);

      standaLight[0].position.set(0,10,30);
      standaLight[1].position.set(0,10,-30);
      standaLight[2].position.set(30,10,0);
      standaLight[3].position.set(-30,10,0);
      standaLight[4].position.set(0,35,0);
      standaLight[5].position.set(0,-15,0);

      console.log(standaLight)

      standaLight.forEach(i => {
        i.castShadow = true;
        this.scene.add(i);
      })
    } else if (a === 2) {
      RectAreaLightUniformsLib.init();
    
      const rectLight = [];
      const rectLightHelper = [];
  
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
  
      if (b) {
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

  startEnvironment = (a) => {
    this.levARpmremGenerator = new THREE.PMREMGenerator(this.renderer);
    
    if (a) {
      new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load(hdrENV, (texture) => {
        var envMap = this.levARpmremGenerator.fromEquirectangular(texture).texture;
        this.levARpmremGenerator.dispose();

        this.scene.environment = envMap;
    }
    );
    this.levARpmremGenerator.compileEquirectangularShader();
    };
    

    new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .load(hdrBKD, (texture) => {
    	var bkdMap = this.levARpmremGenerator.fromEquirectangular(texture).texture;
    	this.levARpmremGenerator.dispose();

    	this.scene.background = bkdMap;
    }
    );
    this.levARpmremGenerator.compileEquirectangularShader();
  };

  startGLTFLoader = (a) => {
    new GLTFLoader().load(a, (glb) => {
  		this.scene.add(glb.scene);
    });
    
    console.log('handleCamera initiated');

    this.levARcomposer = new EffectComposer(this.renderer);
    this.levARcomposer.addPass( new RenderPass( this.scene, this.camera ) );
    
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
