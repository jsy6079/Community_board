import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';
import { Link } from 'react-router-dom';


const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [massage, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', new URLSearchParams({
                id,
                password
            }).toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true // 쿠키를 포함하여 요청 전송
            });

            if (response.status === 200) {
                // 로그인 성공 시
                window.location.href = '/'; // 리디렉션
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    return (
        <div className="container" style={{marginTop: '50px'}}>
        <div className="container mt-5">
            <h2 className="mb-4">로그인</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="id">아이디</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="id" 
                        value={id} 
                        onChange={(e) => setId(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">로그인</button>
            </form>
        </div>
        </div>
    );
};

export default Login;
