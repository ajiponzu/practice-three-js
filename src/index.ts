import * as THREE from "three";
import { Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

window.addEventListener("load", (): void => {
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
  renderer.setPixelRatio(window.devicePixelRatio); // デバイスごとに解像度を変える
  document.body.appendChild(renderer.domElement); // 作成したレンダラーをhtmlのbodyタグの子要素として紐づけ

  const sphereTexture = new THREE.TextureLoader().load("./assets/earth.jpg");

  const sphereGeo = new THREE.SphereGeometry(100, 64, 32); // 球体の点群データを作成
  const sphereMate = new THREE.MeshPhysicalMaterial({ map: sphereTexture }); // 材質の作成
  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMate); // 上記のデータを用いてメッシュ化する
  scene.add(sphereMesh); // sceneに追加

  const dirLight = new THREE.DirectionalLight(0xffffff, 2); // 平行光源
  dirLight.position.set(1, 1, 1);
  scene.add(dirLight); // sceneに追加

  const ptLight = new THREE.PointLight(0xffffff, 1); // 点光源
  scene.add(ptLight);

  const ptLightHelper = new THREE.PointLightHelper(ptLight, 30); // 点光源の可視化
  scene.add(ptLightHelper);

  const _controls = new OrbitControls(camera, renderer.domElement); // カメラをマウスでコントロール

  /* ウィンドウサイズの更新に対応 */
  window.addEventListener("resize", (): void => {
    renderer.setSize(window.innerWidth, window.innerHeight); // レンダラーのサイズの更新
    camera.aspect = window.innerWidth / window.innerHeight; // アスペクト比の更新
    camera.updateProjectionMatrix(); // アスペクト比を更新したら必ず呼ぶ
  });
  /* end */

  /* update描画処理作成 */
  const update = (): void => {
    sphereMesh.rotation.y += 0.01; // y軸を回転軸として，その回転方向に毎フレーム0.01rad加える
    ptLight.position.set(
      200 * Math.sin(Date.now() / 500),
      200 * Math.sin(Date.now() / 1000),
      200 * Math.cos(Date.now() / 500)
    ); // x = zかつx^2 + z^2 = 1を満たし, yが周期運動をするため, 螺旋運動する
    renderer.render(scene, camera); // 描画処理実行，つまりアップデート処理の末尾に置く
    requestAnimationFrame(update); // このラムダオブジェクトをフレーム単位で呼び出すコールバックとして登録
  };
  /* end */

  update(); // 描画
});
