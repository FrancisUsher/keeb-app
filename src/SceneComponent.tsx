import { Engine, Scene } from '@babylonjs/core';
import React, { useEffect, useRef, useState } from 'react';
import { KLERow } from './deserialize';

interface Props {
  antialias: boolean;
  engineOptions?: BABYLON.EngineOptions;
  adaptToDeviceRatio?: boolean;
  sceneOptions?: BABYLON.SceneOptions;
  onRender: Function;
  onSceneReady: Function;
  rows: KLERow[];
}

export default (props: Props) => {
  const reactCanvas = useRef(null);
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    ...rest
  } = props;

  const [loaded, setLoaded] = useState(false);
  const [scene, setScene] = useState(null as Scene | null);

  useEffect(() => {
    if (window) {
      const resize = () => {
        if (scene) {
          scene.getEngine().resize();
        }
      };
      window.addEventListener('resize', resize);

      return () => {
        window.removeEventListener('resize', resize);
      };
    }
  }, [scene]);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      const engine = new Engine(
        reactCanvas.current,
        antialias,
        engineOptions,
        adaptToDeviceRatio
      );
      const scene = new Scene(engine, sceneOptions);
      setScene(scene);
      if (scene.isReady()) {
        props.onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((scene) => props.onSceneReady(scene));
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === 'function') {
          onRender(scene, props.rows);
        }
        scene.render();
      });
    }

    return () => {
      if (scene === null) {
        return;
      } else {
        scene.dispose();
      }
    };
  }, [
    adaptToDeviceRatio,
    antialias,
    engineOptions,
    loaded,
    onRender,
    props,
    reactCanvas,
    scene,
    sceneOptions,
  ]);

  return (
    <canvas
      className="scene-canvas"
      width="800"
      height="600"
      ref={reactCanvas}
      {...rest}
    />
  );
};
