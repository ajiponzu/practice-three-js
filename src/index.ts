import * as THREE from "three";

const scene = new THREE.Scene();

/* カメラの初期化(角度，アスペクト比，カメラ距離二つ) */
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 500);
/* end */

const renderer = new THREE.WebGLRenderer({ alpha: true }); // レンダラーの初期化
renderer.setSize(window.innerWidth, window.innerHeight); // レンダラーサイズ
document.body.appendChild(renderer.domElement); // 作成したレンダラーをhtmlのbodyタグの子要素として紐づけ

const sphereGeo = new THREE.SphereGeometry(100, 64, 32); // 球体の点群データを作成
const sphereMate = new THREE.MeshPhysicalMaterial(); // 材質の作成
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMate); // 上記のデータを用いてメッシュ化する
scene.add(sphereMesh); // sceneに追加

const dirLight = new THREE.DirectionalLight(0xffffff, 2); // 平行光源
scene.add(dirLight); // sceneに追加

renderer.render(scene, camera); // 描画処理実行，つまりアップデート処理の末尾に置く
