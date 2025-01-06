import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import store from './store'
// import {applyMiddleware, createStore} from "redux";
// import thunk from "redux-thunk"
// import {composeWithDevTools} from "redux-devtools-extension";
// const reduxStore = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
    
  // {/* </StrictMode> */}
);
