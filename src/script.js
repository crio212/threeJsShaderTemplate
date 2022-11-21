import './style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const canvas = document.querySelector("canvas.webGL")
const scene = new THREE.Scene()

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true
});
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const perspectiveCamera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1, 100)
perspectiveCamera.position.set(0, 0, 1)

window.addEventListener('resize', () => {
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	renderer.setSize(sizes.width,sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

	perspectiveCamera.aspect = sizes.width / sizes.height
	perspectiveCamera.updateProjectionMatrix()
})

const controls = new OrbitControls(perspectiveCamera, canvas);
controls.enableDamping = true

const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
const material = new THREE.ShaderMaterial({
	vertexShader: vertexShader,
	fragmentShader: fragmentShader,
	side: THREE.DoubleSide
})
const planeMesh = new THREE.Mesh(geometry, material)

scene.add(perspectiveCamera, planeMesh)

const tick = () =>
{
	controls.update()
	renderer.render(scene, perspectiveCamera)
	window.requestAnimationFrame(tick)
}
tick()