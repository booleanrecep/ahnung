import * as THREE from "three"
import React, { Suspense, useRef } from "react"
import { Canvas, useFrame,useLoader} from "@react-three/fiber"
import { Loader,TrackballControls } from "@react-three/drei"

import Model from "../helpers/Model"

function Image() {
  const texture = useLoader(THREE.TextureLoader, "/static/me.png")
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[8, 8]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
    </mesh>
  )
}

function Rig({ children }) {
  const outer = useRef<THREE.Group>(null!)
  const inner = useRef<THREE.Group>(null!)
  useFrame(({ camera, clock }) => {
    outer.current.position.y = THREE.MathUtils.lerp(outer.current.position.y, 0, 0.05)
    inner.current.rotation.y = Math.sin(clock.getElapsedTime() / 8) * Math.PI
    inner.current.position.z = 5 + -Math.sin(clock.getElapsedTime() / 2) * 10
    inner.current.position.y = -5 + Math.sin(clock.getElapsedTime() / 2) * 2
  })
  return (
    <group position={[0, -100, 0]} ref={outer}>
      <group ref={inner}>{children}</group>
    </group>
  )
}

export default function Gallery(props) {
  return (
    <div style={{borderRadius: "10px",
      border: "2px solid #21094e",height:"100%"}}>
      <Canvas linear camera={{ position: [0, 15, 30], fov: 70 }}>
        <fog attach="fog" args={[0xfff0ea, 10, 60]} />
        <ambientLight intensity={6} />
        <Suspense fallback={null}>
          <Rig>
            <Model />
            <mesh scale={[1000, 1000, 1]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry />
              <meshBasicMaterial transparent opacity={0.7} color="skyblue" />
            </mesh>
          </Rig>
          <Image/>
        </Suspense>
        <TrackballControls {...props}/>
      </Canvas>
      <Loader />
    </div>
  )
}
