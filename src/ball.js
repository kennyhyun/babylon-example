import { Mesh, MeshBuilder } from "babylonjs";

export const generateRenderer = ({
  object,
  margin = 2,
  intervalMs = 3000,
  height = 10,
}) => {
  let startTime = new Date().getTime();
  let logCnt = 0;
  let bounceCounter = 0;
  const { _x: x, _y: y, _z: z } = object.position;
  const startPosition = { x, y, z };
  const gravity = 98;
  const dropTimeMs = Math.sqrt((height * 2) / gravity) * 1000;

  return () => {
    const time = new Date().getTime();
    let pastMs = time - startTime;
    const times = pastMs / dropTimeMs / 2;
    if (times > 1) {
      startTime += parseInt(parseInt(times) * dropTimeMs * 2);
      bounceCounter += parseInt(times);
      pastMs = time - startTime;
    }
    const dTimeMs = pastMs < dropTimeMs ? pastMs : 2 * dropTimeMs - pastMs;
    const dTime = dTimeMs / 1000;
    object.position.y =
      startPosition.y + height - (1 / 2) * gravity * dTime * dTime;

    if (!(logCnt % 10))
      console.log(bounceCounter, {
        bounceCounter,
        past: (pastMs / 1000).toFixed(3),
        y: object.position.y.toFixed(3),
        gravity,
      });
    logCnt += 1;
  };
};

export const createObjects = ({
  canvas,
  engine,
  scene,
  diameter = 2,
  distance = 20,
} = {}) => {
  const sphereHeight = diameter * 8;
  const sphere = MeshBuilder.CreateSphere(
    "sphere1",
    {
      segments: (((100 * diameter) / distance) >> 1) << 1,
      diameter,
      sideOrientation: Mesh.FRONTSIDE,
    },
    scene
  );
  sphere.position.y = -diameter / 2 - sphereHeight / 2;

  const ground = MeshBuilder.CreateGround(
    "ground1",
    {
      width: diameter * 4,
      height: diameter * 4,
      subdivisions: 2,
      updatable: false,
    },
    scene
  );
  ground.position.y = -diameter - sphereHeight / 2;

  return { ground, sphere };
};
