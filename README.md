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
