import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// import {applyMiddleware, createStore} from "redux";
// import {Provider} from "react-redux";
// import reducers from "./reducers"
// import thunk from "redux-thunk"
// import {composeWithDevTools} from "redux-devtools-extension";
// const reduxStore = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
