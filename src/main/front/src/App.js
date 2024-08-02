import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './common/NavBar';
import Main from './mainSection/main';
import NoticeBoardWrite from './noticeBoard/noticeBoardWrite';
import Footer from './common/footer';
import NoticeBoardDetail from './noticeBoard/noticeBoardDetail';
import NoticeBoard from './noticeBoard/noticeBoard';
import Login from './login/login';
import Signup from './signup/signup';
import SearchCharacter from './mainSection/searchCharacter';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/noticeBoard' element={<NoticeBoard/>}/>
        <Route path="/noticeBoardWrite" element={<NoticeBoardWrite/>} />
        <Route path="/noticeBoardDetail/:noticeBoardNo" element={<NoticeBoardDetail/>}/>
        <Route path='/searchCharacter/:searchCharacter' element={<SearchCharacter/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
