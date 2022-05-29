## 行ったセットアップ
### vscodeでコンテナを開く
### node
- npm init -y
- ＊＊ホストからだと頭に下記をつけて実行
```
  docker-compose run --rm web
```

- package.jsonが生成されるので下記を追加
```
  ,
  "scripts": {
    "build": "webpack",
    "watch": "webpack -w"
  },
  "private": true,
```

### パッケージのインストール
```
npm i -D webpack webpack-cli typescript ts-loader

npm i -S three @types/three

npm i -S express
```

### typescript
- tsconfig.jsonの記述

### webpack
- webpack.config.jsの記述
  - エディタのリファクタリング機能を使わないこと
  - 基本的に.jsファイルはtypescript形式にしないようにする

## 実行
- server.jsの作成
- src/index.tsの作成
- ```npm run build```　の実行
- ```npm start``` の実行
  - ホストから実行する場合は ```docker-compose up```でいい.
    - yamlのcommandに ```npm start```が記述されている