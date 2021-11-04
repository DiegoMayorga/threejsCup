import * as THREE from './module/three.module.js'
import { GLTFLoader } from './module/GLTFLoader.js'
import { OrbitControls } from './jsm/OrbitControls.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x333333)
const lightDirectional = new THREE.DirectionalLight(0xffffff, 1)
lightDirectional.position.set(5, 5, 5)
scene.add(lightDirectional)

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener("resize", resize);

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 5
camera.position.y = 2
camera.position.z = 10
scene.add(camera)

const loader = new GLTFLoader()

loader.load("./cup.glb", function(gltf){
    const model = gltf.scene
    scene.add(model)
})

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true


const animate = () => {
    requestAnimationFrame(animate)
    controls.update();
    renderer.render(scene, camera)
}

animate()