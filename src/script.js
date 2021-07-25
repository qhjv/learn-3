import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

//kết cấu cửa
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
//kết cấu tường
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
//cỏ
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
//Kết cấu quá lớn. cần lặp lại từng kết cấu cỏ với repeat 
grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

//thay đổi các thuộc tính wrapS và wrapTthuộc tính để kích hoạt lặp lại:

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

/**
 * House
 */

// Temporary sphere
// const sphere = new THREE.Mesh(
//     new THREE.SphereBufferGeometry(1, 32, 32),
//     new THREE.MeshStandardMaterial({ roughness: 0.7 })
// )
// sphere.position.y = 1
// scene.add(sphere)


// Ngôi nhà container

const ngoinha = new THREE.Group()
scene.add(ngoinha)

const hinhchunhat = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ 
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
hinhchunhat.position.y = 1.25
hinhchunhat.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(hinhchunhat.geometry.attributes.uv.array, 2))
ngoinha.add(hinhchunhat)

//mái nhà

const mainha = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: 'red' })
)
mainha.position.y = 2.5 + 0.5
mainha.rotation.y = Math.PI * 0.25
ngoinha.add(mainha)

// cửa nhà

const cuanha = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2),
    new THREE.MeshStandardMaterial({ 
        // tạo vật liệu cho ngôi nhà
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
cuanha.position.y = 1
cuanha.position.z = 2 + 0.01
cuanha.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(cuanha.geometry.attributes.uv.array, 2))
ngoinha.add(cuanha)


// bụi cây
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const buicay1 = new THREE.Mesh(bushGeometry, bushMaterial)
buicay1.scale.set(0.5, 0.5, 0.5)
buicay1.position.set(0.8, 0.2, 2.2)

const buicay2 = new THREE.Mesh(bushGeometry, bushMaterial)
buicay2.scale.set(0.25, 0.25, 0.25)
buicay2.position.set(1.4, 0.1, 2.1)

const buicay3 = new THREE.Mesh(bushGeometry, bushMaterial)
buicay3.scale.set(0.4, 0.4, 0.4)
buicay3.position.set(- 0.8, 0.1, 2.2)

const buicay4 = new THREE.Mesh(bushGeometry, bushMaterial)
buicay4.scale.set(0.15, 0.15, 0.15)
buicay4.position.set(- 1, 0.05, 2.6)

ngoinha.add(buicay1,buicay2,buicay3,buicay4)

//bóng đổ
hinhchunhat.castShadow = true
buicay1.castShadow = true
buicay2.castShadow = true
buicay3.castShadow = true
buicay4.castShadow = true

// sàn
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.receiveShadow = true
scene.add(floor)

/**
 * MA
 */
const conMa1 = new THREE.PointLight('#ff00ff', 2, 3)
// giảm hiệu suất bỏng đổ

conMa1.shadow.mapSize.width = 256
conMa1.shadow.mapSize.height = 256
conMa1.shadow.camera.far = 7
scene.add(conMa1)

const conMa2 = new THREE.PointLight('#00ffff', 2, 3)
// giảm hiệu suất bỏng đổ

conMa2.shadow.mapSize.width = 256
conMa2.shadow.mapSize.height = 256
conMa2.shadow.camera.far = 7
scene.add(conMa2)

const conMa3 = new THREE.PointLight('#ffff00', 2, 3)
// giảm hiệu suất bỏng đổ

conMa3.shadow.mapSize.width = 256
conMa3.shadow.mapSize.height = 256
conMa3.shadow.camera.far = 7
scene.add(conMa3)


// biamo
const biaMos = new THREE.Group()
scene.add(biaMos)

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

for(let i = 0; i < 50; i++)
{
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const biaMo = new THREE.Mesh(graveGeometry, graveMaterial)

    // Position
    biaMo.position.set(x, 0.3, z)                              

    // Rotation
    biaMo.rotation.z = (Math.random() - 0.5) * 0.4
    biaMo.rotation.y = (Math.random() - 0.5) * 0.4

    // Add to the graves container
    biaMos.add(biaMo)
}

/**
 * Lights
 */


// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
//giản hiệu suất đổ bóng
moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Đèn cửa
const denCua = new THREE.PointLight('#ff7d46', 1, 7)
denCua.position.set(0, 2.2, 2.7)
//giản hiệu suất đổ bóng
denCua.shadow.mapSize.width = 256
denCua.shadow.mapSize.height = 256
denCua.shadow.camera.far = 7
ngoinha.add(denCua)

//bóng đổ
moonLight.castShadow = true
denCua.castShadow = true
conMa1.castShadow = true
conMa2.castShadow = true
conMa3.castShadow = true

/**
 * sương mù
 */

 const fog = new THREE.Fog('#262837', 1, 15)
 scene.fog = fog
//nhưng chúng ta có thể thấy một vết cắt sạch sẽ giữa các ngôi mộ và nền đen.
//chúng ta phải thay đổi màu trong của renderer và 
//sử dụng cùng màu với sương mù. Làm điều đó sau khi khởi tạo renderer:

/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor('#262837')
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setClearColor('#262837')
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5
    conMa1.position.x = Math.cos(ghost1Angle) * 4
    conMa1.position.z = Math.sin(ghost1Angle) * 4
    conMa1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = - elapsedTime * 0.32
    conMa2.position.x = Math.cos(ghost2Angle) * 5
    conMa2.position.z = Math.sin(ghost2Angle) * 5
    conMa2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = - elapsedTime * 0.18
    conMa3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    conMa3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    conMa3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()