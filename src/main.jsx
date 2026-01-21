import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import Swiper from 'swiper'
import 'swiper/css' 

window.Swiper = Swiper

// const $ = window.jQuery

import './scss/style.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
