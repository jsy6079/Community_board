import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="navbar-brand">
          <span>&#x1F340;</span>Community<span>&#x1F340;</span>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="#">자유 게시판</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">구매 게시판</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">판매 게시판</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">질문과 답변</Link>
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <button className="btn btn-outline-light me-2" type="button" onClick={() => window.location.href='/user/login'}>로그인</button>
          <button className="btn btn-outline-light" type="button" onClick={() => window.location.href='/user/joinMember'}>회원가입</button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
