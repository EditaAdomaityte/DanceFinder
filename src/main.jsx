import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import {App} from "./App";
// in your main.js or index.js
import 'bulma/css/bulma.css';



const container = document.getElementById("root")
const root=ReactDOM.createRoot(container);

root.render(
    
    <BrowserRouter>
    <App/>
    </BrowserRouter>

);