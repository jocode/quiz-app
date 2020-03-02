# Quiz App

This test application is developed with ReactJS. In this practice exercise we will see how to make an application like ICFES or who wants to be a millionaire.

## Creando el proyecto

- `npx create-react-app quiz-app`

- `npm start`

Ahora, vamos a eliminar algunos archivos que vienen por defecto en React. Eliminamos `App.test.js`, `logo.svg`, `setupTest.js`, `index.css` y `App.css`.

Se crea la estructura del proyecto junto con las carpetas **components**, **styles**, **assets** dentro de `src`

```
src
├── components
├── styles
└── assets
      └── styles.scss
```

Como se va a usar sass para este proyecto, debemos instalar siguientes las dependencias:

- **`npm install node-sass --save-dev`**

- **`npm install node-sass react-helmet react-router-dom @mdi/font materialize-css classnames --save`**

**react-helmet** Lo usamos para cambiar el nombre del título de la Págin

Los **componentes de clase** tienen **_estado_**, los componentes funcionales no tienen, aunque se pueden utilizar los hooks para hacer las funcionalidades.

Al usar sass, automáticamente lo compila y ejecuta los estilos en nuestra aplicación.

Tan sólo hay que importar **`import './styles/styles.scss';`** al archivo [App.js](srcApp.js).
Dentro de [styles.scss](src/styles/styles.scss), importamos los estilos de cada componentes que se almacenan en la carpeta **components**. Como se usa los import, en **sass** se debe nombrar los archivos con guión bajo, por ejemplo **`_home.scss`** e importarlo en el archivo de entrada **`@import './components/home';`**.

> :star: **Scripts y Links e interés**. La siguiente descripción fué tomada de [barman47/quiz-app](https://github.com/barman47/quiz-app/blob/master/README.md)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
