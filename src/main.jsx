import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {observe} from "./logic.js";

const root = ReactDOM.createRoot(document.getElementById('root'))
observe((pictureIndex) =>
    root.render(
        <App pictureIndex={pictureIndex} />
    )
)

