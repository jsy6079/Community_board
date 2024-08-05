import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';
import { Link } from 'react-router-dom';


const Signup = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [nickname, setNickname] = useState('');
    const [message, setMessage] = useState('');
    const [idMessage, setIdMessage] = useState('');
    const [nicknameMessage, setNicknameMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (password && confirm && password !== confirm) {
            setMessage('비밀번호가 일치하지 않습니다.');
        } else {
            setMessage('');
        }

    }, [password, confirm]);


    const handleSignup = async (event) => {
        event.preventDefault();

        if(password === confirm) {
            try {
                const response = await axios.post('http://localhost:8080/api/join/regist', { id,password,nickname });
                setMessage(response.data);
                alert('회원가입이 완료되었습니다.');
                navigate('/');
            } catch (error) {
                    if (error.response) {
                        const errorMessage = error.response.data;
                        if (errorMessage === '아이디가 중복됩니다.') {
                            setIdMessage('아이디가 중복됩니다.');
                        } else if (errorMessage === '닉네임이 중복됩니다.') {
                            setNicknameMessage('닉네임이 중복됩니다.');
                        } else {
                            setMessage('가입 실패: ' + errorMessage);
                        }
                    } else {
                        setMessage('가입 실패: ' + error.message);
                    }
            }
        }else {
            alert('비밀번호가 일치하지않습니다.');
        }
    }


    return (
        <div className="container" style={{marginTop: '50px'}}>
        <div className="container mt-5">
            <h2 className="mb-4">회원가입</h2>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor="id">아이디</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="id" 
                        value={id} 
                        onChange={(e) => setId(e.target.value)} 
                        placeholder='아이디를 입력해주세요.'
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
                        placeholder='비밀번호를 입력해주세요.'
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호 확인</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="confirm" 
                        value={confirm} 
                        onChange={(e) => setConfirm(e.target.value)} 
                        placeholder='입력했던 비밀번호를 다시 입력해주세요.'
                        required 
                    />
                </div>
                {message && <p style={{ color: 'red' }}>{message}</p>}
                <div className="form-group">
                    <label htmlFor="nickname">닉네임</label>
                    <input 
                        type="test" 
                        className="form-control" 
                        id="nickname" 
                        value={nickname} 
                        onChange={(e) => setNickname(e.target.value)} 
                        placeholder='닉네임을 입력해주세요. 닉네임은 추후에 변경 가능합니다.'
                        required 
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">가입하기</button>
            </form>
        </div>
        </div>
    );
};

export default Signup;
