import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
} from "babylonjs";
import { generateRenderer, createObjects } from "./ball";
import { createVector } from "./utils/vector";

export const init = (canvas, { scale = 2 } = {}) => {
  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });
  engine.setHardwareScalingLevel(1 / scale);
  const scene = new Scene(engine);

  const cameraHeight = 5;

  const camera = new FreeCamera(
    "camera1",
    createVector({ x: 0, y: cameraHeight, z: -cameraHeight * 4 * 2 }),
    scene
  );
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, false);

  const light = new HemisphericLight(
    "light1",
    createVector({ x: 0, y: 1, z: 0 }),
    scene
  );

  const resp = createObjects({ engine, canvas, scene });
  // console.log(resp.sphere.boundingBox);

  scene.beforeRender = generateRenderer({
    object: resp.sphere,
    height: 10,
  });

  engine.runRenderLoop(() => scene.render());

  return { ...resp, light, camera, scene, engine };
};
