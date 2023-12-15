# bwHC Frontend

__bwHC Frontend__ is a web application developed using the [nuxt.js](https://nuxtjs.org/docs/get-started/installation/) framework. It is designed to run complementary with the bwHC Backend application.

--------

## 1. Installation with Install script

* Define the directory for the installation
* Run the install script

```
foo@bar: ./install.sh /path/to/target/dir
...
```
* Follow the instructions

## 2. Manual Installation

### 2.1. Pre-requisites

* [node.js](https://nodejs.org/en/download/) (version > 10.23.0)
* [npm](https://www.npmjs.com/) (version > 6.14.8)
* active internet connection for npm to access and download the necessary packages

In case your Linux distribution's repositories do not contain a high-enough version of Node.js, instructions for manual installation can be found [here](https://github.com/nodesource/distributions/blob/master/README.md).

--------

### 2.2. Installation

* Unzip application package
* Change into unpacked directory

```
foo@bar: unzip bwhc-frontend.zip -d bwhc-frontend
...
foo@bar: cd bwhc-frontend

Next NPM must set up the folder "node_modules" containing all JavaScript packages the application depends on:

foo@bar: npm install
...
```

--------

### 2.3. Server configuration

By default, the Node.js server running the frontend will run on __localhost__ and __port 3000__. This can be changed in _package.json_:

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

--------

### 2.4. Backend Access Set-up / Web Page generation

As explained above, the data displayed in the web portal is fetched directly from the backend by the browser. This connection must therefore be configured so that the web pages can be generated accordingly from templates.
In _nuxt.config.js_ adapt the PROTOCOL, HOSTNAME, and PORT of the __backend__ server:

```javascript
...
env: {
    baseUrl: process.env.BASE_URL || 'PROTOCOL://HOSTNAME',
    port: process.env.port || ':PORT'
}
...
```

Then have NPM generate the application's pages with the configured connectivity settings.

```
foo@bar: npm run generate
...
```

--------

### 2.5. Operation

__Starting__ the frontend service:

```
foo@bar: npm start &
```

__Stopping__ the frontend service (WORK IN PROGRESS):
Look for the node process ID and [kill it manually](https://dev.to/dvddpl/how-to-kill-a-node-process-5d13).

Initial Login ⚠️
Login credentials into the freshly installed system, without any users: admin/admin
This allows log-in as a temp-user to create a first real user account, and becomes effectless once a user has been created in the system.
The first created user MUST thus be given "Admin" rights to be able to create more user accounts.

## 3 Docker image

Use the following command to build the docker image

```
docker build -t bwhc-frontend .
```

This will create the image using default build arguments and mark it as `bwhc-frontend`. To customize the build, spezify custom values.

* `NUXT_HOST` and `NUXT_PORT`: Server configuration, see 2.3 of bwHC manual for more information.
* `BACKEND_PROTOCOL`, `BACKEND_HOSTNAME` and `BACKEND_PORT`: Backend access, see 2.4 of bwHC manual for more information.

e.g.:

```
docker build -t bwhc-frontend --build-arg NUXT_PORT=1234 .
```

## License Information

MIT License

Copyright (c) 2022 University Hospital Tübingen, Aydın Can Polatkan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Nuxt.js](https://nuxtjs.org), [Vuetify](https://vuetifyjs.com) and [Font Awesome](https://fontawesome.com) are released under the [MIT-License](https://opensource.org/licenses/MIT).