import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';



function Board() {

  const [boardData, setBoardData] = useState({ list: [] });
  const [notices,setNotices] = useState({list: []});
  const [calenders,setCalenders] = useState({list: []});

  
  axios.get('http://localhost:8080/api/test')
  .then(response => {
    if (response.data && Array.isArray(response.data)) {
      setBoardData({ list: response.data });
    } else {
      console.error('Invalid data format:', response.data);
    }
  })
  .catch(error => console.log('Error fetching data:', error));


  axios.get('http://localhost:8080/api/notice')
  .then(response => {
    if (response.data && Array.isArray(response.data)) {
      const top5Notices = response.data.slice(0,5);
      setNotices({ list: top5Notices });
    } else {
      console.error('Invalid data format:', response.data);
    }
  })
  .catch(error => console.log('Error fetching data:', error));


  axios.get('http://localhost:8080/api/calender')
  .then(response => {
    if (response.data && Array.isArray(response.data)) {
      const todayCalenders = response.data
      .filter(item => item.CategoryName === '모험 섬')
      .slice(0,3);
      setCalenders({ list: todayCalenders });
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




   
      {/* <div className="d-flex align-items-center justify-content-center" style={{marginTop: '50px'}}>
          <table className="table">
              <thead className="table-secondary">
                  <tr>
                      <th scope="col" style={{width: '5%'}}>분류</th>
                      <th scope="col" style={{width: '40%'}}>제목</th> 
                      <th scope="col" style={{width: '15%'}}>날짜</th> 
                  </tr>
              </thead>
              <tbody>
                {notices.list.map(notice=>(
                   <tr>
                              <td>{notice.Type}</td>
                              <td><a href={notice.Link} className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover">{notice.Title}</a></td>
                              <td>{formatDate(notice.Date)}</td>
                   </tr>))}
                  </tbody>
              </table>          
        </div> */}


        {/* <div className="container mt-60">
              <div className="row align-items-center mb-4 pb-2">
                    <div className="col-md-6 ">
                        <div className="section-title text-center text-md-start">
                            <h4 className="mb-1">공지사항  
                            <a href='https://lostark.game.onstove.com/News/Notice/List' target='_blank' className="text-muted readmore plus-button" 
                                style={{ cursor: 'pointer', fontSize: '20px',marginLeft: '10px' }}>
                                더 보기 <i className="uil uil-angle-right-b align-right"></i>
                            </a>
                            </h4>
                            <hr className="custom-hr-head"/>

                            {notices.list.map(notice=>(
                                <div>
                                    <p className="readmore custom-section-content" style={{ display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', maxWidth: '100%' }}>
                                    <span className="badge text-bg-primary" >{notice.Type}</span>  {notice.Title}
                                    </p><hr className="custom-hr"/>
                                </div>
                                ))}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="section-title text-center text-md-start">
                            <h4 className="mb-1">공지사항</h4>
                            <a className="text-muted readmore plus-button" 
                                style={{ cursor: 'pointer' }} >
                                더 보기 <i className="uil uil-angle-right-b align-right"></i>
                            </a>
                            <hr className="custom-hr-head"/>
              
                            <p>테스트</p>
                            <p>테스트</p>
                            <p>테스트</p>
                            <p>테스트</p>
                        </div>
                    </div>
                </div> 
         </div> 





 
      <div className="row">
          {boardData.list.map(board => (
              <div className="col-xl-3 col-lg-4 col-md-6 mt-4" key={board.Title}>
              <div className="card blog blog-primary rounded border-0 shadow overflow-hidden">
                  <div className="position-relative">
                      <img style={{ width: '100%', height: 'auto' }} className="card-img-top" alt="..." />
                      
                      <div className="overlay rounded-top"></div>
                  </div>
                  <div className="card-body content" style={{margin: '0px', paddingTop: '20px', paddingBottom: '0px'}}>
                      <p><a href={board.Link} target='_blank'>{board.Title}</a></p>
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

    </div> */}



        <div>

          <div id="featured-services" className="featured-services section">
            <div className="container">
              <div className="row gy-4">

              {calenders.list.map(calender=>(
                <div className="col-xl-3 col-md-6 d-flex" data-aos-delay="100">
                  <div className="service-item position-relative">
                    <div><img src={calender.ContentsIcon}></img>
                    <div>
                      {calender.RewardItems.map(rewardItem => (
                        rewardItem.Items.map(item => (
                          <img key={item.Name} src={item.Icon} alt={item.Name} />
                        ))
                      ))}
                    </div>
                    </div>
                    <h4>{calender.ContentsName}</h4>
                    <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>



          <div className="container mt-60">
                <div className="row align-items-center mb-4 pb-2">
                      <div className="col-md-6 ">
                          <div className="section-title text-center text-md-start">
                              <h4 className="mb-1">공지사항  
                              <a href='https://lostark.game.onstove.com/News/Notice/List' target='_blank' className="text-muted readmore plus-button" 
                                  style={{ cursor: 'pointer', fontSize: '20px',marginLeft: '10px' }}>
                                  더 보기 <i className="uil uil-angle-right-b align-right"></i>
                              </a>
                              </h4>
                              <hr className="custom-hr-head"/>

                              {notices.list.map(notice=>(
                                  <div>
                                      <p className="readmore custom-section-content" style={{ display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', maxWidth: '100%' }}>
                                      <span className="badge text-bg-primary" >{notice.Type}</span>  <a href={notice.Link} target='_blank'>{notice.Title}</a>
                                      </p><hr className="custom-hr"/>
                                  </div>
                                  ))}
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="section-title text-center text-md-start">
                              <h4 className="mb-1">공지사항</h4>
                              <a className="text-muted readmore plus-button" 
                                  style={{ cursor: 'pointer' }} >
                                  더 보기 <i className="uil uil-angle-right-b align-right"></i>
                              </a>
                              <hr className="custom-hr-head"/>
                
                              <p>테스트</p>
                              <p>테스트</p>
                              <p>테스트</p>
                              <p>테스트</p>
                          </div>
                      </div>
                  </div> 
          </div> 

      </div>

        <div id="services" className="services section">

              <div className="row">
                  {boardData.list.map(board => (
                      <div className="col-xl-3 col-lg-4 col-md-6 mt-4" key={board.Title}>
                      <div className="card blog blog-primary rounded border-0 shadow overflow-hidden">
                          <div className="position-relative">
                              <img src={board.Thumbnail} style={{ width: '100%', height: 'auto' }} className="card-img-top" alt="..." />
                              
                              <div className="overlay rounded-top"></div>
                          </div>
                          <div className="card-body content" style={{margin: '0px', paddingTop: '20px', paddingBottom: '0px'}}>
                              <p><a href={board.Link} target='_blank'>{board.Title}</a></p>
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

        </div>

</div>

  );
}

export default Board;
