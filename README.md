# Node con TS - TS-Node-dev

1.  Install TS and other dependencies:

```
 npm i -D typescript @types/node ts-node-dev rimraf
```

2. Initialize the typescript configuration file:

```
 npx tsc --init --outDir dist/ --rootDir src
```

3. Create scripts for dev, build, start:

```
 "dev": "tsnd --respawn src/app.ts",
 "build": "rimraf ./dist && tsc",
 "start": "npm run build && node dist/app.js"
```
