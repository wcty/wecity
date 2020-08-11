import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'
import 'core-js'
import 'raf/polyfill'
import './styles/index.css'

ReactDOM.unstable_createRoot(document.getElementById('root')).render(<App />);
