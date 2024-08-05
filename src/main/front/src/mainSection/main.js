import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,navigate, useNavigate } from 'react-router-dom';

function Main() {
  const [events, setEvents] = useState({ list: [] });
  const [notices, setNotices] = useState({ list: [] });
  const [calenders, setCalenders] = useState({ list: [] });
  const [fildBosses, setFildBosses] = useState({ list: [] });
  const [chaosGates, setChaosGates] = useState({ list: [] });
  const [noticeLists, setNoticeLists] = useState({ list: [] });
  const [nextFieldBossEvent, setNextFieldBossEvent] = useState('');
  const [nextChaosGateEvent, setNextChaosGateEvent] = useState('');
  const [fieldBossTimeRemaining, setFieldBossTimeRemaining] = useState('');
  const [chaosGateTimeRemaining, setChaosGateTimeRemaining] = useState('');
  const [searchCharacter,setSearchCharacter] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventResponse, noticeResponse, calendarResponse, noticeBoardResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/event'),
          axios.get('http://localhost:8080/api/notice'),
          axios.get('http://localhost:8080/api/calender'),
          axios.get('http://localhost:8080/api/notice/noticeBoardListResent'),
        ]);

        if (eventResponse.data && Array.isArray(eventResponse.data)) {  
          const eventDate = new Date();
          const filteredEvents = eventResponse.data.filter(event => new Date(event.EndDate) >= eventDate);
          setEvents({ list: filteredEvents});
        }

        if (noticeResponse.data && Array.isArray(noticeResponse.data)) {
          const top5Notices = noticeResponse.data.slice(0, 5);
          setNotices({ list: top5Notices });
        }

        if (calendarResponse.data && Array.isArray(calendarResponse.data)) {
          const now = new Date();
          const formattedToday = now.toISOString().slice(0, 10);

          const adventureIslandCalendars = calendarResponse.data.filter(item =>
            item.CategoryName === '모험 섬' && Array.isArray(item.StartTimes) &&
            item.StartTimes.some(startTime => startTime.startsWith(formattedToday))
          );
          setCalenders({ list: adventureIslandCalendars });

          const fieldBossCalendars = calendarResponse.data.filter(item =>
            item.ContentsName === '세베크 아툰' && Array.isArray(item.StartTimes) &&
            item.StartTimes.some(startTime => startTime.startsWith(formattedToday))
          );
          setFildBosses({ list: fieldBossCalendars });
          calculateNextEvent(fieldBossCalendars, 'fieldBoss');

          const chaosGateCalendars = calendarResponse.data.filter(item =>
            item.ContentsName === '일렁이는 악마군단 (쿠르잔 북부)' && Array.isArray(item.StartTimes) &&
            item.StartTimes.some(startTime => startTime.startsWith(formattedToday))
          );
          setChaosGates({ list: chaosGateCalendars });
          calculateNextEvent(chaosGateCalendars, 'chaosGate');
        }

        if (noticeBoardResponse.data && Array.isArray(noticeBoardResponse.data)) {
          setNoticeLists({ list: noticeBoardResponse.data });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  


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
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const futureEvents = calenders
      .flatMap(item => item.StartTimes.map(time => new Date(time)))
      .filter(time => time > now)
      .sort((a, b) => a - b);

    const todayEvents = futureEvents.filter(event => {
      const eventDate = new Date(event.getFullYear(), event.getMonth(), event.getDate());
      return formatDate(eventDate.toISOString()) === formatDate(today.toISOString());
    });

    if (type === 'fieldBoss') {
      if (todayEvents.length > 0) {
        const nextEventTime = todayEvents[0];
        setNextFieldBossEvent(nextEventTime.toISOString());
      } else {
        setNextFieldBossEvent('');
        setMessage('오늘은 등장하지 않아요!');
      }
    } else if (type === 'chaosGate') {
      if (todayEvents.length > 0) {
        const nextEventTime = todayEvents[0];
        setNextChaosGateEvent(nextEventTime.toISOString());
      } else {
        setNextChaosGateEvent('');
        setMessage('오늘은 등장하지 않아요!');
      }
    }
  };

  const calculateTimeRemaining = (eventTime, type) => {
    const now = new Date();
    const diffMs = eventTime - now;

    if (diffMs <= 0) {
      // Handle event has passed
      if (type === 'fieldBoss') {
        const futureEvents = fildBosses.list
          .flatMap(item => item.StartTimes.map(time => new Date(time)))
          .filter(time => time > now)
          .sort((a, b) => a - b);

        if (futureEvents.length > 0) {
          const nextEventTime = futureEvents[0];
          setNextFieldBossEvent(nextEventTime.toISOString());
          calculateTimeRemaining(nextEventTime, 'fieldBoss');
        } else {
          setFieldBossTimeRemaining('');
        }
      } else if (type === 'chaosGate') {
        const futureEvents = chaosGates.list
          .flatMap(item => item.StartTimes.map(time => new Date(time)))
          .filter(time => time > now)
          .sort((a, b) => a - b);

        if (futureEvents.length > 0) {
          const nextEventTime = futureEvents[0];
          setNextChaosGateEvent(nextEventTime.toISOString());
          calculateTimeRemaining(nextEventTime, 'chaosGate');
        } else {
          setChaosGateTimeRemaining('');
        }
      }
      return;
    }

    const diffSecs = Math.floor(diffMs / 1000);
    const hours = Math.floor(diffSecs / 3600);
    const minutes = Math.floor((diffSecs % 3600) / 60);
    const seconds = diffSecs % 60;

    const padNumber = (num) => num.toString().padStart(2, '0');
    const timeString = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;

    if (type === 'fieldBoss') {
      setFieldBossTimeRemaining(prev => prev !== timeString ? timeString : prev);
    } else if (type === 'chaosGate') {
      setChaosGateTimeRemaining(prev => prev !== timeString ? timeString : prev);
    }
  };

  const getType = (Type) => {
    switch (Type) {
      case "점검":
        return "badge text-bg-danger";
      case "공지":
        return "badge text-bg-primary";
      case "상점":
        return "badge text-bg-secondary";
      case "이벤트":
        return "badge text-bg-success";
    }
  }

  const getLoaType = (noticeBoardType) => {
    switch (noticeBoardType) {
      case "점검":
        return "badge text-bg-danger";
      case "공지":
        return "badge text-bg-primary";
    }
  }

  const handleChange = (event) => {
    setSearchCharacter(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate('/searchCharacter/'+searchCharacter, { state: { searchCharacter } });
  };

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };



  return (

    <div className="container" style={{marginTop: '50px'}}>

    <div>
    <form className='input-character-container' onSubmit={handleSearch}>
      <input type='text' className='input-character' id='searchCharacter' name='searchCharacter' onChange={handleChange} placeholder='캐릭터명을 입력해주세요' required></input>
      <button className='btn-two green small rounded' type='button'>검색</button>
    </form>

    
      <div style={{ display: 'flex' }}>
            <div id="featured-services" className="featured-services section" style={{ maxWidth: '50%', marginRight: '5%' }}>
                <h4 className="mb-2" style={{ textAlign: 'left' }}>Today Island</h4>
                <div className="container-island">
                  <div className="row gy-4">
                    {calenders.list.map((calender, index) => (
                      <div key={index} className="col-xl-4 col-md-6 d-flex" data-aos-delay="100">
                        <div className="service-item position-relative">
                          <div className="text-center">
                            <img src={calender.ContentsIcon} style={{borderRadius: '5px'}} alt="Contents Icon" />
                          </div>
                          <div className="text-center">
                            <h5 className="badge text-bg-danger">{calender.ContentsName}</h5>
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
  
             <h4 className="mb-2" style={{ textAlign: 'left' }}>Today Calenders</h4>

                  <div className="container-boss">
                        <div className="row gy-4" style={{ width: '100%', height: '225px', overflowY: 'auto' }}>
                        
                      {chaosGates.list.length === 0 ? (
                        <div className="d-flex align-items-center">
                          <img
                            style={{ width: '40px', height: '40px', borderRadius: '10px', marginRight: '10px' }}
                            src='/assets/img/noCG.png'
                            alt="No Chaos Gate Icon"
                          />
                          <span
                            className="text-label"
                            style={{
                              color: '#c81919',
                              fontSize: '20px',
                              fontWeight: '900',
                            }}
                          >
                            오늘은 등장하지 않아요!
                          </span>
                        </div>
                      ) : (
                        chaosGates.list.slice(0, 3).map((chaosGate, index) => (
                          <div key={index} className="d-flex" data-aos-delay="100">
                            <div className="d-flex align-items-center">
                              <img
                                style={{ width: '40px', height: '40px', borderRadius: '10px', marginRight: '10px' }}
                                src={chaosGate.ContentsIcon}
                                alt="Chaos Gate Icon"
                              />
                              <span
                                className="text-label"
                                style={{
                                  color: '#c81919',
                                  fontSize: '20px',
                                  fontWeight: '900',
                                }}
                              >
                                {chaosGateTimeRemaining || message}
                              </span>
                            </div>
                          </div>
                        )))
                      }

                      {fildBosses.list.length === 0 ? (
                        <div className="d-flex align-items-center">
                          <img
                            style={{ width: '40px', height: '40px', borderRadius: '10px', marginRight: '10px' }}
                            src='/assets/img/noFB.png' 
                            alt="No Field Boss Icon"
                          />
                          <span
                            className="text-label"
                            style={{
                              color: '#c81919',
                              fontSize: '20px',
                              fontWeight: '900',
                            }}
                          >
                            오늘은 등장하지 않아요!
                          </span>
                        </div>
                      ) : (
                        fildBosses.list.slice(0, 3).map((fildBoss, index) => (
                          <div key={index} className="d-flex" data-aos-delay="100">
                            <div className="d-flex align-items-center">
                              <img
                                style={{ width: '40px', height: '40px', borderRadius: '10px', marginRight: '10px' }}
                                src={fildBoss.ContentsIcon}
                                alt="Field Boss Icon"
                              />
                              <span
                                className="text-label"
                                style={{
                                  color: '#c81919',
                                  fontSize: '20px',
                                  fontWeight: '900',
                                }}
                              >
                                {fieldBossTimeRemaining || message}
                              </span>
                            </div>
                          </div>
                        )))
                      }
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
                                      <span className={getType(notice.Type)}>{notice.Type}</span>  <a href={notice.Link} target='_blank' style={{textDecoration: 'none'}}>{notice.Title}</a>
                                      </p><hr className="custom-hr"/>
                                  </div>
                                  ))}
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="section-title text-center text-md-start">
                              <h4 className="mb-1">LoaMong 공지사항
                              <a href='/noticeBoard' className="text-muted readmore plus-button" 
                                  style={{ cursor: 'pointer', fontSize: '20px',marginLeft: '10px' }}>
                                  더 보기 <i className="uil uil-angle-right-b align-right"></i>
                              </a>
                              </h4>
                              <hr className="custom-hr-head"/>

                              {noticeLists.list.map(noticeList=>(
                                  <div>
                                      <p className="readmore custom-section-content" style={{ display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', maxWidth: '100%' }}>
                                      <span className={getLoaType(noticeList.noticeBoardType)}>{noticeList.noticeBoardType}</span> <Link to={`/noticeBoardDetail/${noticeList.noticeBoardNo}`} style={{textDecoration: 'none'}}>{noticeList.noticeBoardTitle}</Link>
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
                          <div className="card-body content" style={{paddingBottom: '0px',marginTop: '0px',marginBottom: '0px'}}>
                              <p style={{
                                  maxWidth: '200px',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}><a href={event.Link} target='_blank'>{event.Title}</a></p>
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
