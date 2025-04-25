import './App.css'
import Home from "../components/Home"
import Navbar from "../components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Generate from '../components/Generate'
import Gallary from '../components/Gallary'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Subscription from '../components/Subscription'


function App() {
  const [modelType, setModelType] = useState(null)

  const openModel = (type) => { setModelType(type) }
  const closeModel = () => { setModelType(null) }
  const { isAuthenticated } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Navbar openModel={openModel} />
        {modelType === "Login" && !isAuthenticated && <Login onClose={closeModel} openModel={openModel} />}
        {modelType === "Signup" && !isAuthenticated && <Signup onClose={closeModel} openModel={openModel} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate openModel={openModel} />} />
          <Route path="/gallary" element={<Gallary />} />
          {isAuthenticated &&
            <Route path="/subscription" element={<Subscription />} />
          }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
