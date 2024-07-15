import React, { useEffect, useState } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import axios from 'axios';

function FreeBoardWrite() {

    const [title,setTitle] = useState('');
    const [writer,setWriter] = useState('');
    const [content,setContent] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

    const formData = {
        freeBoardTitle: title,
        freeBoardWriter: writer,
        freeBoardContent: content,
        freeBoardDate: new Date(),
        freeBoardView: 0
    };

    axios.post('http://localhost:8080/api/free/post',formData)
    .then(response => {
        window.alert('글이 등록되었습니다.');
        navigate('/');
    })
    .catch(error => {
        console.log('글 등록 실패 '+error);
        console.log(title);
        console.log(content);
        console.log(writer);
    });
};

    return (
        <div className="container" style={{border: '1px solid #ccc',marginTop: '50px',padding: '20px'}}>	
            <form onSubmit={handleSubmit}>
            <div>
                <label>제목:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>내용:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
            </div>
            <div>
                <label>작성자:</label>
                <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} required />
            </div>
            <button type="submit">등록</button>
            </form>
        </div>
    );
}

export default FreeBoardWrite;