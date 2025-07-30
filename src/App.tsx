import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home/Home'
import { RouterProvider } from '@tanstack/react-router';
import {router} from '../src/router/router';
function App() {

  return (
    <>
         <Home/>

    </>
  )
}

export default App
