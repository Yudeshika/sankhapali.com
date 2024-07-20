import React from 'react'
import { Canvas } from '@react-three/fiber'
import { useState, Suspense } from 'react'
import Loader from '../components/Loader'
import Island from '../models/Island';
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';

const home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage , setCurrentStage] = useState(1);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768 ){
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return { screenScale, screenPosition, rotation };

  }

  const adjustPlaneForScreenSize = () => {
    let planeScale, planePosition;

    if (window.innerWidth < 768 ){
      planeScale = [0.5, 0.5, 0.5];
      planePosition = [0, -1.5, 0];
    } else {
      planeScale = [1.2, 1.2, 1.2];
      planePosition = [0, -0.5, 0];
    }

    return { planeScale, planePosition};

  }
  
  const { screenScale, screenPosition, rotation } = adjustIslandForScreenSize();
  const { planeScale, planePosition } = adjustPlaneForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      {/* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        Hello There!
      </div> */}

      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000, position: [0, 0, 5] }}
      >
        <Suspense fallback={ <Loader />} >
          {/* cameras */}

          {/* lights */}

          <directionalLight intensity={0.5} position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          {/* <pointLight intensity={0.5} position={[0, 0, 5]} /> */}
          {/* <spotLight intensity={0.5} position={[0, 0, 5]} /> */}
          <hemisphereLight intensity={0.5} position={[0, 0, 5]} skyColor="#b1e1ff" groundColor="#000000" />

          {/* models */}
          <Bird />
          <Sky
            isRotating={isRotating}
          />
          <Island 
            scale={screenScale}
            position={screenPosition}
            rotation={rotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane 
            scale={planeScale}
            position={planePosition}
            rotation={ [0, 20, 0]}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
        </Suspense>
      </Canvas>

    </section>
  )
}

export default home