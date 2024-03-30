# MONITORING APP (NOC) WITH CLEAN ARCHITECTURE

## Node con TS - TS-Node-dev

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

# Dev:

1. Clone env.example file to .env
2. Configure environment variables:

```
PORT= 3000

MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false
```

3. Install dependencies:

```
npm i
```

4. Raise database with the command:

```
docker-compose up -d
```

5. Raise the project in development:

```
npm run dev
```

6. Compile project for production:

```
npm run start
```
