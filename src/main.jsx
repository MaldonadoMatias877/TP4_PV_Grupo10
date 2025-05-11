import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import Formulario from './assets/component/Objetos'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Formulario/>
  </StrictMode>,
)
