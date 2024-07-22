import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';
import { Link } from 'react-router-dom';



function Main() {

  const [events, setEvents] = useState({ list: [] });
  const [notices,setNotices] = useState({list: []});
  const [calenders,setCalenders] = useState({list: []});
  const [fildBosses,setFildBosses] = useState({list: []});
  const [chaosGates,setChaosGates] = useState({list: []});
  const [noticeLists,setNoticeLists] =useState({list: []});
  const [nextFieldBossEvent, setNextFieldBossEvent] = useState('');
  const [nextChaosGateEvent, setNextChaosGateEvent] = useState('');
  const [fieldBossTimeRemaining, setFieldBossTimeRemaining] = useState('');
  const [chaosGateTimeRemaining, setChaosGateTimeRemaining] = useState('');

  
  useEffect(() => {

    axios.get('http://localhost:8080/api/event')
    .then(response => {
      if (response.data && Array.isArray(response.data)) {
        setEvents({ list: response.data });
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
        const today = new Date();
        const formattedToday = today.toISOString().slice(0,10);
        const filteredCalenders = response.data.filter(item => {
          return item.CategoryName === '모험 섬' && Array.isArray(item.StartTimes) &&
          item.StartTimes.some(startTime => startTime.startsWith(formattedToday));
        });
        setCalenders({ list: filteredCalenders });
      } else {
        console.error('Invalid data format:', response.data);
      }
    })
    .catch(error => console.log('Error fetching data:', error));



    axios.get('http://localhost:8080/api/calender')
    .then(response => {
      if (response.data && Array.isArray(response.data)) {
        const now = new Date();
        const formattedToday = now.toISOString().slice(0, 10);

        const filteredCalenders = response.data.filter(item =>
          item.ContentsName === '세베크 아툰' && Array.isArray(item.StartTimes) &&
          item.StartTimes.some(startTime => startTime.startsWith(formattedToday))
        );
        setFildBosses({ list: filteredCalenders });

        // 다음 이벤트 계산
        calculateNextEvent(filteredCalenders, 'fieldBoss');
      } else {
        console.error('Invalid data format:', response.data);
      }
    })
    .catch(error => console.log('Error fetching data:', error));



    axios.get('http://localhost:8080/api/calender')
    .then(response => {
      if (response.data && Array.isArray(response.data)) {
        const now = new Date();
        const formattedToday = now.toISOString().slice(0, 10);
        
        const filteredCalenders = response.data.filter(item =>
          item.ContentsName === '일렁이는 악마군단 (쿠르잔 북부)' && Array.isArray(item.StartTimes) &&
          item.StartTimes.some(startTime => startTime.startsWith(formattedToday))
        );
        setChaosGates({ list: filteredCalenders });

        // 다음 이벤트 계산
        calculateNextEvent(filteredCalenders,'chaosGate');
      } else {
        console.error('Invalid data format:', response.data);
      }
    })
    .catch(error => console.log('Error fetching data:', error));






    



    axios.get('http://localhost:8080/api/notice/noticeBoardListResent')
    .then(response => {
      if (response.data && Array.isArray(response.data)) {
        setNoticeLists({ list: response.data });
      } else {
        console.error('Invalid data format:', response.data);
      }
    })
    .catch(error => console.log('Error fetching data:', error));

  },[]);




  useEffect(() => {
    const interval = setInterval(() => {
      if (nextFieldBossEvent) {
        calculateTimeRemaining(new Date(nextFieldBossEvent), 'fieldBoss');
      }
      if (nextChaosGateEvent) {
        calculateTimeRemaining(new Date(nextChaosGateEvent), 'chaosGate');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextFieldBossEvent, nextChaosGateEvent]);

  const calculateNextEvent = (calenders, type) => {
    const now = new Date();
    const futureEvents = calenders
      .flatMap(item => item.StartTimes.map(time => new Date(time)))
      .filter(time => time > now) // 현재 시간보다 미래인 이벤트만 필터링
      .sort((a, b) => a - b); // 시간 오름차순 정렬

    if (type === 'fieldBoss') {
      if (futureEvents.length > 0) {
        const nextEventTime = futureEvents[0];
        setNextFieldBossEvent(nextEventTime.toISOString());
      } else {
        setNextFieldBossEvent(null);
      }
    } else if (type === 'chaosGate') {
      if (futureEvents.length > 0) {
        const nextEventTime = futureEvents[0];
        setNextChaosGateEvent(nextEventTime.toISOString());
      } else {
        setNextChaosGateEvent(null);
      }
    }
  };

  const calculateTimeRemaining = (eventTime, type) => {
    const now = new Date();
    const diffMs = eventTime - now;

    if (diffMs <= 0) {
      if (type === 'fieldBoss') {
        setFieldBossTimeRemaining('');
      } else if (type === 'chaosGate') {
        setChaosGateTimeRemaining('');
      }
      return;
    }

    const diffSecs = Math.floor(diffMs / 1000); // 전체 초 단위로 변환
    const hours = Math.floor(diffSecs / 3600); // 전체 시간
    const minutes = Math.floor((diffSecs % 3600) / 60); // 남은 분
    const seconds = diffSecs % 60; // 남은 초
    
    let timeString = '';
    if (hours > 0) {
      timeString += `${hours}시간 `;
    }
    timeString += `${minutes}분 ${seconds}초`;
    
    if (type === 'fieldBoss') {
      setFieldBossTimeRemaining(timeString);
    } else if (type === 'chaosGate') {
      setChaosGateTimeRemaining(timeString);
    }
  }


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

    <div>

      <div style={{ display: 'flex' }}>
            <div id="featured-services" className="featured-services section" style={{ maxWidth: '50%', marginRight: '5%' }}>
                <h4 className="mb-1">Today Island</h4>
                <div className="container-island">
                  <div className="row gy-4">
                    {calenders.list.map((calender, index) => (
                      <div key={index} className="col-xl-4 col-md-6 d-flex" data-aos-delay="100">
                        <div className="service-item position-relative">
                          <div className="text-center">
                            <img src={calender.ContentsIcon} style={{borderRadius: '5px'}} alt="Contents Icon" />
                          </div>
                          <div className="text-center">
                            <h5 className="badge text-bg-primary">{calender.ContentsName}</h5>
                          </div>
                          <p>
                            {calender.RewardItems.map((rewardItem, rewardIndex) =>
                              rewardItem.Items.map((item, itemIndex) => (
                                <img
                                  style={{ width: '30px', height: '30px' }}
                                  key={`${rewardIndex}-${itemIndex}`}
                                  src={item.Icon}
                                  alt={item.Name}
                                />
                              ))
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            <div id="featured-services" className="featured-services section" style={{ maxWidth: '50%'}}>
  
             <h4 className="mb-1">Today Calenders</h4>

             
              <div className="container-boss">
                <div className="row gy-4" style={{ width: '100%', height: '225px', overflowY: 'auto' }}>
                
                  {chaosGates.list.slice(0, 3).map((chaosGate, index) => (
                    <div key={index} className="d-flex" data-aos-delay="100">
                      <div className="d-flex align-items-center">
                        <img style={{ width: '40px', height: '40px', borderRadius: '10px', marginRight: '10px'}} src={chaosGate.ContentsIcon} alt="Chaos Gate Icon" />
                        <span
                          className="text-label"
                          style={{
                            color: '#735bd2', // 폰트 색상
                            fontSize: '20px', // 폰트 크기
                            fontWeight: 'bold', // 폰트 두께
                            fontFamily: 'Arial, sans-serif', // 폰트 패밀리
                          }}
                        >
                          {chaosGateTimeRemaining}
                        </span>
                      </div>
                    </div>
                ))}
                  {fildBosses.list.slice(0, 3).map((fildBoss, index) => (
                    <div key={index} className="d-flex" data-aos-delay="100">
                      <div className="d-flex align-items-center">
                        <img style={{ width: '40px', height: '40px', borderRadius: '10px', marginRight: '10px'}} src={fildBoss.ContentsIcon} alt="Field Boss Icon" />
                        <span
                          className="text-label"
                          style={{
                            color: '#735bd2', // 폰트 색상
                            fontSize: '20px', // 폰트 크기
                            fontWeight: 'bold', // 폰트 두께
                            fontFamily: 'Arial, sans-serif', // 폰트 패밀리
                          }}
                        >
                          {fieldBossTimeRemaining}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
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
                              <h4 className="mb-1">공지사항
                              <Link style={{ cursor: 'pointer', fontSize: '20px',marginLeft: '10px' }} to="/noticeBoard">
                                  더 보기 <i className="uil uil-angle-right-b align-right"></i>
                              </Link>
                              </h4>
                              <hr className="custom-hr-head"/>

                              {noticeLists.list.map(noticeList=>(
                                  <div>
                                      <p className="readmore custom-section-content" style={{ display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', maxWidth: '100%' }}>
                                      <span className="badge text-bg-primary" >{noticeList.noticeBoardType}</span> <a href='#' target='_blank'>{noticeList.noticeBoardTitle}</a>
                                      </p><hr className="custom-hr"/>
                                  </div>
                                  ))}
                          </div>
                      </div>
                  </div> 
          </div> 

      </div>

        <div id="services" className="services section">

              <div className="row">
                  {events.list.map(event => (
                      <div className="col-xl-3 col-lg-4 col-md-6 mt-4" key={event.Title}>
                      <div className="card blog blog-primary rounded border-0 shadow overflow-hidden">
                          <div className="position-relative">
                          <a href={event.Link} target="_blank">
                            <img src={event.Thumbnail} style={{ width: '100%', height: 'auto' }} className="card-img-top" alt="..." />
                          </a>
                              <div className="overlay rounded-top"></div>
                          </div>
                          <div className="card-body content" style={{margin: '0px', paddingTop: '20px', paddingBottom: '0px'}}>
                              <p><a href={event.Link} target='_blank'>{event.Title}</a></p>
                              <p className="post-meta d-flex justify-content-between mt-2" style={{ display: 'flex', alignItems: 'center'}}>
                                <span> {formatDate(event.StartDate)}  ~ {formatDate(event.EndDate)} </span> 
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

export default Main;
