import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';



function Board() {

  const [boardData, setBoardData] = useState({ list: [] });

  


  axios.get('http://localhost:8080/api/test')
  .then(response => {
    console.log(response.data); 

    if (response.data && Array.isArray(response.data)) {
      setBoardData({ list: response.data });
    } else {
      console.error('Invalid data format:', response.data);
    }
  })
  .catch(error => console.log('Error fetching data:', error));

    // 날짜 포맷팅
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  

  return (
    <div className="container" style={{marginTop: '50px'}}>

            <div className="row">
                {boardData.list.map(board => (
                    <div className="col-xl-3 col-lg-4 col-md-6 mt-4" key={board.Title}>
                    <div className="card blog blog-primary rounded border-0 shadow overflow-hidden">
                        <div className="position-relative">
                            <img src={board.Thumbnail}style={{ width: '100%', height: 'auto' }} className="card-img-top" alt="..." />
                           
                            <div className="overlay rounded-top"></div>
                        </div>
                        <div className="card-body content" style={{margin: '0px', paddingTop: '20px', paddingBottom: '0px'}}>
                            <p>{board.Title}</p>
                            <p className="post-meta d-flex justify-content-between mt-2" style={{ display: 'flex', alignItems: 'center'}}>
                              <span> {formatDate(board.StartDate)}  ~ {formatDate(board.EndDate)} </span> 
                          </p>
                        </div>
                        <div className="author">
                        </div>
                    </div>
                </div>          
                ))}                       
            </div>
      <div className="d-flex justify-content-end">
      </div>

      <div className="row">

      </div>
    </div>
  );
}

export default Board;
