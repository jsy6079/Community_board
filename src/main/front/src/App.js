import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './common/NavBar';
import FreeBoard from './board/freeBoard';
import FreeBoardWrite from './board/freeBoardWrite';
import Footer from './common/footer';
import FreeBoardDetail from './board/freeBoardDetail';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<FreeBoard />} />
        <Route path="/free/freeBoardWrite" element={<FreeBoardWrite />} />
        <Route path="/api/free/detail/:freeBoardNo" element={<FreeBoardDetail/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
