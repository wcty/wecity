import 'core-js'
import 'raf/polyfill'
import 'resize-observer-polyfill/dist/ResizeObserver.global';

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'
import './styles/index.css'
import * as serviceWorker from './serviceWorker';

ReactDOM.unstable_createRoot(document.getElementById('root')).render(<App />);
serviceWorker.unregister()