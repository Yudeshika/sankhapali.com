import React, { useRef, useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import birdScene from '../assets/3d/bird.glb'

const Bird = () => {
    const birdRef = useRef();
    const { scene, animations } = useGLTF(birdScene);
    const {actions} = useAnimations(animations, birdRef);

    useEffect(() => {
        if (actions['Take 001']){
            actions['Take 001'].play();
        }
    }
    , [actions]);

    useFrame((state) => {
        const { clock, camera } = state;
        // const bird = birdRef.current;
        
        // update the y position of the bird to simulate a flying effect/ sin wave
            birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.5 + 2;

            if(birdRef.current.rotation.x > camera.position.x + 10) {
                birdRef.current.rotation.y = Math.PI;
            }else if(birdRef.current.rotation.x < camera.position.x - 10) {
                birdRef.current.rotation.y = 0;
            }

            if(birdRef.current.rotation.y === 0) {
                console.log('rotating bird');
                birdRef.current.position.x += 0.01;
                birdRef.current.position.z -= 0.01;
            }else {
                birdRef.current.position.x -= 0.01;
                birdRef.current.position.z += 0.01;
            }


    });

  return (
    <mesh position={ [-5, 1, 1] } scale={[0.003, 0.003,0.003]} ref={ birdRef } >
        <primitive object={scene} />
    </mesh>
  )
}

export default Bird