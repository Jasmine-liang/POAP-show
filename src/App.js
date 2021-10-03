import React, { Suspense ,useRef} from 'react'
import { Canvas, extend, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Effects, Loader, useTexture } from '@react-three/drei'
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass'
import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader'

extend({ LUTPass })

function Grading() {
  const { texture3D } = useLoader(LUTCubeLoader, '/cubicle-99.CUBE')
  return <Effects children={<lUTPass attachArray="passes" lut={texture3D} />} />
}

function Sphere(props) {
  const mesh = useRef()
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))

  const texture = useTexture('/beijing.jpg')
  return (
    <mesh
    ref={mesh} {...props}>
      <sphereBufferGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial envMapIntensity={0.4} map={texture} clearcoat={0.8} clearcoatRoughness={0} roughness={1} metalness={0.9} />
    </mesh>
  )
}

export default function App() {
  return (
    <>
      <Canvas frameloop="always" dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <spotLight intensity={0.5} angle={0.2} penumbra={1} position={[5, 15, 10]} />
        <pointLight position={[-20, -5, -10]} color="red" intensity={0.8} />
        <Suspense fallback={null}>
          <Sphere />
          <Grading />
          <Environment preset="warehouse" />
        </Suspense>
        <OrbitControls />
        
      </Canvas>
      <Loader />
    </>
  )
}
