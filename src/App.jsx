import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from './pages/Home'
import {NotFound} from './pages/Notfound'
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Projects } from './pages/Projects';
function App () {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/projects" element={<Projects/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
