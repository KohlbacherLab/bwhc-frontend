# bwHealthCloud Frontend Manual

-----
## 1. Pre-requisites:

* NodeJS / NPM

-----
## 2. Installation:

* Unzip application package
* Change into unpacked directory 

```
foo@bar: unzip bwhc-frontend.zip
...
foo@bar: cd bwhc-frontend
```

--------
## 3. Configuration/Setup: 

### Frontend Server host and port (Optional):

By default, the NodeJS server running the frontend will run on __localhost__ and port __3000__.
This can be changed in __package.json__:

```javascript
...
"config": {
    "nuxt": {
      "host": "HOST",
      "port": "PORT"
    }
  }
...

```

### Backend API access:

In __nuxt.config.js__ adapt the PROTOCOL, HOSTNAME, and PORT of the __backend__ server:

```javascript
...
env: {
  baseUrl: process.env.BASE_URL || 'PROTOCOL://HOSTNAME',
  port: process.env.port || ':PORT'
}
...

```

-------
## 4. Operation:

```
foo@bar: npm run generate
...
```

In case of error related to "node_modules", reset the modules with command <code>npm ci</code> and retry <code>npm run generate</code>
```
foo@bar: npm ci
...
foo@bar: npm run generate
```

__Starting__ the frontend service:

```
foo@bar: npm start &
```

__Stopping__ the frontend service (WORK IN PROGRESS):

 Look for the node process ID and [kill it manually](https://dev.to/dvddpl/how-to-kill-a-node-process-5d13)

