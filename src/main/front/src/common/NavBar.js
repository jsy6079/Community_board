import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const NavBar = () => {

  const navigate = useNavigate();

  const loginButton = () => {
    navigate('/login');
  }

  const signupButton = () => {
    navigate('/signup');
  }


  return (

    <header id="header" className="header d-flex align-items-center sticky-top">
    <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
      
        <h1>LoaMong</h1>

      <nav id="navmenu" className="navmenu">
        <ul>
          <li><Link to="/">메인</Link></li>
          <li><Link to="/noticeBoard">공지사항</Link></li>
          <li><Link to="#portfolio">문의사항</Link></li>
          <li className="dropdown">
            <Link to="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></Link>
            <ul>
              <li><Link to="#">Dropdown 1</Link></li>
              <li><Link to="#">Dropdown 2</Link></li>
              <li><Link to="#">Dropdown 3</Link></li>
              <li><Link to="#">Dropdown 4</Link></li>
            </ul>
          </li>
        </ul>
        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>

      <button className="btn-gradient blue small rounded" onClick={loginButton}>로그인</button>
      <button className="btn-gradient blue small rounded" onClick={signupButton}>회원가입</button>
      
    </div>
  </header>
);
}

export default NavBar;