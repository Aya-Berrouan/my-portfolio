# Aya Berrouan Portfolio

A personal portfolio website built with React, featuring:

- Responsive design for all device sizes
- Theme toggling between light and dark modes
- Color theme customization
- Internationalization support for multiple languages (English, French)
- Modern UI with smooth animations and transitions

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Internationalization

This project supports multiple languages using the `i18next` library. Currently supported languages:

- English (default)
- French

### How to add a new language

1. Create a new folder in `src/locales/[language-code]` (e.g., `src/locales/es` for Spanish)
2. Add a `translation.json` file inside this folder with the translated strings
3. Import the new translation file in `src/i18n.js` and add it to the resources object

### Translation File Structure

All translation files follow the same structure with nested objects for different sections of the application:

```json
{
  "header": {
    "title": "YourTitle",
    "bio": "Your bio text"
  },
  "navigation": {
    "bio": "Bio",
    "portfolio": "Portfolio",
    "elevatorPitch": "Elevator Pitch"
  },
  ...
}
```

## Theme Customization

### Dark/Light Mode

The portfolio comes with a built-in dark and light mode toggle. The selected mode is saved in localStorage and persists between sessions.

### Color Themes

Multiple color themes are available through the color picker button. The selected theme is saved in localStorage and persists between sessions. Available themes:

- Pink (default)
- Blue
- Green
- Purple
- Orange
- Teal
- Red
- Yellow
- Cyan

## License

MIT

## Contact

Aya Berrouan - [GitHub](https://github.com/aya-berrouan) - [LinkedIn](https://linkedin.com/in/aya-berrouan)
