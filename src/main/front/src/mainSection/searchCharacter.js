import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';

function SearchCharacter() {

    const navigate = useNavigate();
    const location = useLocation();
    const [searchCharacter, setSearchCharacter] = useState(location.state?.searchCharacter || '');
    const [characterData, setCharacterData] = useState({
      profiles: null,
      equipment: [],
      avatars: [],
      combatSkills: [],
      engravings: [],
      cards: {Cards: [], Effects: []},
      gems: [],
      collectibles: []
    });


    useEffect(() => {
      AOS.init();
      
      if (searchCharacter) { 
        const fetchData = async () => {
          try {
            const [
              profilesResponse,
              equipmentResponse,
              avatarsResponse,
              combatSkillsResponse,
              engravingsResponse,
              cardsResponse,
              gemsResponse,
              collectiblesResponse
            ] = await Promise.all([
              axios.get('http://localhost:8080/api/characters/profiles/' + searchCharacter, { withCredentials: true }),
              axios.get('http://localhost:8080/api/characters/equipment/' + searchCharacter, { withCredentials: true }),
              axios.get('http://localhost:8080/api/characters/avatars/' + searchCharacter, { withCredentials: true }),
              axios.get('http://localhost:8080/api/characters/combat-skills/' + searchCharacter, { withCredentials: true }),
              axios.get('http://localhost:8080/api/characters/engravings/' + searchCharacter, { withCredentials: true }),
              axios.get('http://localhost:8080/api/characters/cards/' + searchCharacter, { withCredentials: true }),
              axios.get('http://localhost:8080/api/characters/gems/' + searchCharacter, { withCredentials: true }),
              axios.get('http://localhost:8080/api/characters/collectibles/' + searchCharacter, { withCredentials: true })
            ]);

            setCharacterData({
              profiles: profilesResponse.data,
              equipment: equipmentResponse.data,
              avatars: avatarsResponse.data,
              combatSkills: combatSkillsResponse.data,
              engravings: engravingsResponse.data,
              cards: cardsResponse.data,
              gems: gemsResponse.data,
              collectibles: collectiblesResponse.data
            });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchData();
      }
    }, [searchCharacter]);

  // 검색 핸들러
    // const handleChange2 = (event) => {
    //   event.preventDefault();
    //   setSearchCharacter(event.target.value);
    // };

    const handleSearch2 = (event) => {
      event.preventDefault();
      setSearchCharacter(event.target.value);
      navigate('/searchCharacter/' + searchCharacter, { state: { searchCharacter } });
    };


  // 태그 제외
    const removeHtmlTags = (str) => {
      return str.replace(/<[^>]*>/g, '');
  };

  // 태그 제외 + 한글자 추출
  const getFirstChar = (str) => {
    str.replace(/<[^>]*>/g, '');
    const cleanedStr = removeHtmlTags(str);
    return cleanedStr.slice(0, 4);
  };

  
    const parseTooltip = (tooltip) => {
      try {
        const parsed = JSON.parse(tooltip);
    
        const element005Value = parsed.Element_005?.value;
        if (element005Value && element005Value.Element_001) {
          return removeHtmlTags(element005Value.Element_001);
        }
    
        const element006Value = parsed.Element_006?.value;
        if (element006Value && element006Value.Element_001) {
          return removeHtmlTags(element006Value.Element_001);
        }
    
        return '';
    
      } catch (e) {
        console.log('툴팁 오류: ' + e);
        return '';
      }
    };

    
    const profileTooltip = (tooltipArray) => {
      // 툴팁 배열이 없거나 빈 배열인 경우 빈 문자열 반환
      if (!tooltipArray || tooltipArray.length === 0) {
        return '';
      }
      
      // 배열의 항목을 줄 바꿈으로 구분하여 결합
      return tooltipArray.join('\n');
    };




        
  return (
    <div id="about" className="about section">
      <div className="container section-title" data-aos="fade-up">

      <form className='input-character-container'>
            <input type='text' className='input-character' id='searchCharacter' name='searchCharacter' placeholder='캐릭터명을 입력해주세요' required></input>
            <button className='btn-two green small rounded' type='button' onClick={handleSearch2}>검색</button>
          </form>

        {characterData.profiles ? (
          <>




            <div className="container" data-aos="fade-up">
              <div className="row g-4 g-lg-5" data-aos="fade-up" data-aos-delay="200">
                <div className="col-lg-5">
                  <div>
                    <img src={characterData.profiles.CharacterImage} style={{width:'430px',height:'500px'}} className="img-fluid" alt=""/>
                  </div>
                  <div className="character-info">
                    <div className="info-row">
                      <div className="label">서버:</div>
                      <div className="value">{characterData.profiles.ServerName}</div>
                    </div>
                    <div className="info-row">
                      <div className="label">캐릭터 명:</div>
                      <div className="value">{characterData.profiles.CharacterName}</div>
                    </div>
                    <div className="info-row">
                      <div className="label">원정대 레벨:</div>
                      <div className="value">{characterData.profiles.ExpeditionLevel}</div>
                    </div>
                    <div className="info-row">
                      <div className="label">칭호:</div>
                      <div className="value">{characterData.profiles.Title}</div>
                    </div>
                    <div className="info-row">
                      <div className="label">길드:</div>
                      <div className="value">{characterData.profiles.GuildName}</div>
                    </div>
                    <div className="info-row">
                      <div className="label">아이템 레벨:</div>
                      <div className="value">{characterData.profiles.ItemMaxLevel}</div>
                    </div>
                    <div className="info-row">
                      <div className="label">전투 레벨:</div>
                      <div className="value">{characterData.profiles.CharacterLevel}</div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7">
                  <ul className="nav nav-pills mb-3">
                    <li><a className="nav-link" data-bs-toggle="pill" href="#about-tab1">캐릭터 정보</a></li>
                    <li><a className="nav-link" data-bs-toggle="pill" href="#about-tab2">장비 및 아바타</a></li>
                    <li><a className="nav-link" data-bs-toggle="pill" href="#about-tab3">내실</a></li>
                  </ul>

                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="about-tab1">


                  <div className='container-island' style={{textAlign: 'left'}}>
                      {characterData.profiles.Stats && characterData.profiles.Stats.map((profiles, index) => (
                            

                            <div key={index} style={{ position: 'relative' }}>
                            <p 
                              style={{ cursor: 'pointer' }} 
                              data-tooltip-id={`tooltip-${index}`} 
                              data-tooltip-content={profileTooltip(profiles.Tooltip)}
                            >
                              {profiles.Type}: {profiles.Value}
                            </p>
                            <Tooltip 
                              id={`tooltip-${index}`} 
                              place="top" 
                              type="dark" 
                              effect="float" 
                              multiline 
                            />
                          </div>



                        ))}
                    </div>


                      <div style={{textAlign: 'left'}}>
                        {characterData.engravings.Effects && characterData.engravings.Effects.map((effect, index) => (
                              <p key={index} style={{fontWeight: 'bold'}}><img src={effect.Icon} style={{width:'40px', height:'40px' , borderRadius: '20px'}}></img>  {effect.Name}</p>
                          ))}
                      </div>


                      <div style={{textAlign: 'left', display: 'flex', flexWrap: 'wrap' }}>
                        {characterData.gems.Gems && characterData.gems.Gems.map((gem, index) => (
                            <p key={index} style={{ margin: '5px', textAlign: 'center' }}>
                                <img src={gem.Icon} style={{ width: '40px', height: '40px', display: 'block',margin: '0 auto' }} data-tooltip-id={`tooltip-${index}`} data-tooltip-content={parseTooltip(gem.Tooltip)}/>
                                <Tooltip id={`tooltip-${index}`} place="top" type="dark" effect="float" multiline />
                                <span className='badge-gems'>{getFirstChar(gem.Name)}</span>
                            </p>
                        ))}
                      </div>
                      

                      <div style={{textAlign: 'left', display: 'flex', flexWrap: 'wrap' }}>
                        {characterData.cards.Cards && characterData.cards.Cards.map((card, index) => (
                          <p key={index} style={{ margin: '5px', textAlign: 'center', position: 'relative' }}>
                            <img className='container-island' src={card.Icon} style={{ width: '90px', height: '100px', display: 'block', margin: '0 auto'}} />
                            <span className='badge-cards'>
                              {card.AwakeCount}
                            </span>
                          </p>
                          ))}
                          {characterData.cards.Effects && characterData.cards.Effects.length > 0 ? (
                            characterData.cards.Effects.map((effect, index) => (
                                <div key={index}>
                                  {effect.Items.map((item, itemIndex) => (
                                    <p key={itemIndex}>
                                      <span className='badge-cards-effect'>{item.Name}</span>
                                      <br />
                                      <span style={{fontWeight: 'bold'}}>{item.Description}</span>
                                    </p>
                                  ))}
                                </div>
                              ))
                            ) : (
                              <p>효과 정보가 없습니다.</p>
                            )}
                    </div>

              
                        {/* 추후에 따로 뺴놓을 것
                      <div className='container-island' style={{textAlign: 'left'}}>
                        {characterData.collectibles && characterData.collectibles.map((collectible, index) => (
                            <p key={index}><img src={collectible.Icon} style={{width:'20px', height:'20px'}}></img>{collectible.Type}{collectible.Point}</p>
                        ))}
                      </div> */}

                    </div>

                    <div className="tab-pane fade" id="about-tab2">
                      <p className="fst-italic">Consequuntur inventore voluptates consequatur aut vel et. Eos doloribus expedita. Sapiente atque consequatur minima nihil quae aspernatur quo suscipit voluptatem.</p>
                      <div className="d-flex align-items-center mt-4">
                        <i className="bi bi-check2"></i>
                        <h4>5번 소개</h4>
                      </div>
                      <p>Laborum omnis voluptates voluptas qui sit aliquam blanditiis. Sapiente minima commodi dolorum non eveniet magni quaerat nemo et.</p>
                      <div className="d-flex align-items-center mt-4">
                        <i className="bi bi-check2"></i>
                        <h4>6번 소개</h4>
                      </div>
                      <p>Non quod totam minus repellendus autem sint velit. Rerum debitis facere soluta tenetur. Iure molestiae assumenda sunt qui inventore eligendi voluptates nisi at. Dolorem quo tempora. Quia et perferendis.</p>
                      <div className="d-flex align-items-center mt-4">
                        <i className="bi bi-check2"></i>
                        <h4>7번 소개</h4>
                      </div>
                      <p>Eius alias aut cupiditate. Dolor voluptates animi ut blanditiis quos nam. Magnam officia aut ut alias quo explicabo ullam esse. Sunt magnam et dolorem eaque magnam odit enim quaerat. Vero error error voluptatem eum.</p>
                    </div>

                    <div className="tab-pane fade" id="about-tab3">
                      <p className="fst-italic">Consequuntur inventore voluptates consequatur aut vel et. Eos doloribus expedita. Sapiente atque consequatur minima nihil quae aspernatur quo suscipit voluptatem.</p>
                      <div className="d-flex align-items-center mt-4">
                        <i className="bi bi-check2"></i>
                        <h4>8번 소개</h4>
                      </div>
                      <p>Laborum omnis voluptates voluptas qui sit aliquam blanditiis. Sapiente minima commodi dolorum non eveniet magni quaerat nemo et.</p>
                      <div className="d-flex align-items-center mt-4">
                        <i className="bi bi-check2"></i>
                        <h4>9번 소개</h4>
                      </div>
                      <p>Non quod totam minus repellendus autem sint velit. Rerum debitis facere soluta tenetur. Iure molestiae assumenda sunt qui inventore eligendi voluptates nisi at. Dolorem quo tempora. Quia et perferendis.</p>
                      <div className="d-flex align-items-center mt-4">
                        <i className="bi bi-check2"></i>
                        <h4>10번 소개</h4>
                      </div>
                      <p>Eius alias aut cupiditate. Dolor voluptates animi ut blanditiis quos nam. Magnam officia aut ut alias quo explicabo ullam esse. Sunt magnam et dolorem eaque magnam odit enim quaerat. Vero error error voluptatem eum.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>해당 캐릭터는 존재하지 않습니다.</p>
        )}
      </div>
    </div>
  );
}

export default SearchCharacter;
