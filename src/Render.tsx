import React from 'react';

// import {
//   //   FreeCamera,
//   //   Vector3,
//   //   HemisphericLight,
//   MeshBuilder,
// } from '@babylonjs/core';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import SceneComponent from './SceneComponent'; // ^^ point to file we created above or 'babylonjs-hook' NPM.
import './App.css';
import {
  //  getSwitchCenters,
  getSwitchCentersFromKeys,
  getSwitchPlateCutouts,
  getSwitchBounds,
  convexHull,
} from './generate';
import { deserialize, KLERow } from './deserialize';

interface Props {
  rows: KLERow[];
}

export default (props: Props) => {
  // let focus: BABYLON.Mesh;
  const onSceneReady = (scene: BABYLON.Scene) => {
    //Adding a light
    var light = new BABYLON.PointLight(
      'Omni',
      new BABYLON.Vector3(20, 20, 100),
      scene
    );

    //Adding an Arc Rotate Camera
    var camera = new BABYLON.ArcRotateCamera(
      'Camera',
      0,
      0.8,
      100,
      BABYLON.Vector3.Zero(),
      scene
    );
    const canvas = scene.getEngine().getRenderingCanvas();
    if (canvas !== null) {
      camera.attachControl(canvas, false);
    }

    //Polygon shape in XoZ plane
    // var shape = [
    //   new BABYLON.Vector3(-15, 0, -15),
    //   new BABYLON.Vector3(15, 0, -15),
    //   new BABYLON.Vector3(15, 0, 15),
    //   new BABYLON.Vector3(-15, 0, 15),
    // ];
    if (props.rows.length > 0) {
      const keys = deserialize(props.rows);
      const centers = getSwitchCentersFromKeys(keys);
      const bounds = getSwitchBounds(centers);
      const hull = convexHull(bounds.flat());
      const cutouts = getSwitchPlateCutouts(centers);

      var mesh = BABYLON.MeshBuilder.ExtrudePolygon(
        'polygon',
        {
          shape: hull,
          holes: cutouts,
          depth: 0.1,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        },
        scene,
        require('earcut')
      );

      // var mat = new BABYLON.StandardMaterial('mat1', scene);
      // mat.alpha = 1.0;
      // mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
      // mat.backFaceCulling = false;
      // mesh.material = mat;

      // camera.setTarget(mesh.getBoundingInfo().boundingBox.centerWorld); // Find center & set target
      // camera.radius = 300; // Distance
      // camera.beta = 1; // Rotation, up/down
      // camera.alpha = -2.0; // Rotation, left/right

      // BABYLON.SceneLoader.ImportMesh(
      //   '',
      //   '/',
      //   'Case_tydubs_solid.stl',
      //   scene,
      //   (meshes) => {
      //     console.log(`${meshes.length} meshes`);
      //     let mesh = meshes[0];
      // focus = mesh;
      camera.setTarget(mesh.getBoundingInfo().boundingBox.centerWorld); // Find center & set target
    }

    camera.radius = 12; // Distance
    camera.beta = 1; // Rotation, up/down
    camera.alpha = -2.0; // Rotation, left/right
    //   },
    //   (sceneLoaderProgressEvent) => {
    //     console.log(
    //       `${sceneLoaderProgressEvent.loaded}/${sceneLoaderProgressEvent.total}`
    //     );
    //   },
    //   () => {
    //     console.log('called c');
    //   }
    // );

    // Move the light with the camera
    scene.registerBeforeRender(function () {
      light.position = camera.position;
    });
    //   MeshBuilder.CreateGround('ground', { width: 2000, height: 2000 }, scene);
    return scene;
  };

  // const onSceneReady = (scene) => {
  //   // This creates and positions a free camera (non-mesh)
  //   var camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);

  //   // This targets the camera to scene origin
  //   camera.setTarget(Vector3.Zero());

  //   const canvas = scene.getEngine().getRenderingCanvas();

  //   // This attaches the camera to the canvas
  //   camera.attachControl(canvas, true);

  //   // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  //   var light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  //   // Default intensity is 1. Let's dim the light a small amount
  //   light.intensity = 0.7;

  //   // Our built-in 'box' shape.
  //   box = MeshBuilder.CreateBox('box', { size: 2 }, scene);

  //   // Move the box upward 1/2 its height
  //   box.position.y = 1;

  //   // Our built-in 'ground' shape.
  //   MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);
  // };

  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (scene: BABYLON.Scene, rows: KLERow[]) => {
    if (rows.length > 0) {
      const keys = deserialize(rows);
      const centers = getSwitchCentersFromKeys(keys);
      const bounds = getSwitchBounds(centers);
      const hull = convexHull(bounds.flat());
      const cutouts = getSwitchPlateCutouts(centers);
      // var mesh =
      BABYLON.MeshBuilder.ExtrudePolygon(
        'polygon',
        {
          shape: hull,
          holes: cutouts,
          depth: 0.1,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        },
        scene,
        require('earcut')
      );
    }

    // if (focus !== undefined) {
    //   var deltaTimeInMillis = scene.getEngine().getDeltaTime();
    //   const rpm = 10;
    //   focus.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    // }
  };

  return (
    <div>
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        rows={props.rows}
      />
    </div>
  );
};
