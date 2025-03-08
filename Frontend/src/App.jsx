import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage  from './Pages/Homepage'
import Landingpage from './Pages/Landingpage'


function App() {


  return (
   <Router>
        <Routes>
          <Route path="/" element={<Landingpage/>} />
          <Route path="/home" element={<Homepage/>} />
        </Routes>
   </Router>
  )
}

export default App
