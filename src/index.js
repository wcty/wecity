import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'
import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'

// ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.unstable_createRoot(document.getElementById('root')).render(<App />);
registerServiceWorker()

