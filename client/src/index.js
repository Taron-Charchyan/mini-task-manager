import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, compose, legacy_createStore } from "redux";
import reducer from "./store/reducer";
import { thunk } from "redux-thunk";
import { Provider } from "react-redux";
import { SocketProvider } from './context/SocketContext';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <SocketProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </SocketProvider>
    </Provider>
);

reportWebVitals();