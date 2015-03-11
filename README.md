# isomorphic-react-template

A starting template for building an isomorphic single page app using [react.js](http://www.reactjs.org) on [express](http://www.expressjs.com) with a [Flux](http://facebook.github.io/flux/) architecture.

**Work in progress notice**

> This version does not include yet Flux. My efforts for making it working with Flux are in the [reflux branch](https://github.com/gpbl/isomorphic-react-template/tree/reflux).

> There's also my [fluxible](https://github.com/yahoo/fluxible) take in the [fluxible-app branch](https://github.com/gpbl/isomorphic-react-template/tree/fluxible-app), where I'm trying to get an isomorphic app for browsing 500px photos.

### Main goals 

- [x] React components are rendered on the server first, then mounted on the client.
- [x] Share the same routes server and client-side with [react-router](https://github.com/rackt/react-router).
- [ ] The initial state of the app can be fetched consuming REST APIs (in progress).
- [ ] Make it working with a Flux architecture ([in progress](https://github.com/gpbl/isomorphic-react-template/issues/4)).
- [ ] i18n made easy  ([todo](https://github.com/gpbl/isomorphic-react-template/issues/2))
- [x] Have a nice build script with cache busting.
- [x] Live development for React components with [react-hot-loader](https://github.com/gaearon/react-hot-loader) and for scss.

### Setup

```bash
# Clone the repository
git clone https://github.com/gpbl/isomorphic-react-template.git

# Install dependencies
cd isomorphic-react-template
npm install

# Run the development server
./scripts/dev
```

## App structure

```bash
.
├── app.js         # Run the express server
│
├── server.jsx     # Send the server-rendered HTML document as response
├── client.jsx     # Entry point for the browser: mounts the <App /> component on document.body.
├── routes.jsx     # Define the react-router handlers 
│
├── cachebuster.js # Used by express in production for serving cache-busted URLs
│ 
├── components     # React's components container
│   ├── App.jsx    # The App component where the routes are mounted
│   ├── Html.jsx   # Renders the whole HTML document server side (via server.jsx)
│   ├── Index.jsx  # The "index" route (as example)
│   └── Place.jsx  # The "place" route (as example) 
│
├── style           # Container for .scss files
│
├── public          # Container for the static files. Cache-busted on build.
│
├── scripts
│   ├── dev        # Useful scripts to run the development server
│   └── prod       # ...or to test the production server
│
├── dev-tools.js   # Runs the webpack dev server, livereload, and watches for .scss changes
├── gulpfile.js    # Contains the gulp tasks for the build
│
├── webpack.config.js    			 # Webpack config for the build task
└── webpack.config.dev.js      # Webpack config for development

```

## Development 

Routes are a key part of the app: read the [react-router](https://github.com/rackt/react-router) documentation to understand how the routes handlers work. You change the routes in [routes.jsx](routes.jsx).

The main component is [App.jsx](components/App.jsx). The `<App />` component is mounted with [client.jsx](client.jsx), which is the entry point for the browser.

If you have some questions feel free to open an issue in the project, since this template is still under development. :)

### Running the development server

```bash
./scripts/dev
open http://localhost:3000
```

* it watches for js changes with nodemon
* it runs a webpack dev server with hot modules replacement for react components
* it starts a livereload server watching the public files (install the [browser extensions](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions)).

## Building

The build task:

1. compiles the client's js files with webpack
2. compiles the main.scss file
2. copies the app sources
3. cache buster the public files

```bash
# Create a build in the /build directory
gulp build

# Test the production server on localhost:8080
PORT=8080 ./scripts/prod
```

## Credits

The example app is inspired by the [react-router](https://github.com/rackt/react-router) examples.
