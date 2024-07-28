import React, { useEffect, useState } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import axios from 'axios';

const BoardDetail = () => {

    const {noticeBoardNo} = useParams();
    const navigate = useNavigate();

    const [board,setBoard] = useState({
        noticeBoardNo: 0,
        noticeBoardTitle: "",
        noticeBoardContent: "",
        noticeBoardWriter: "",
        noticeBoardDate: "",
        noticeBoardView: 0,
    });

    useEffect(() => {
         
        if (noticeBoardNo) {
            axios.get('http://localhost:8080/api/notice/detail/' + noticeBoardNo, { withCredentials: true })
                .then(response => {
                    console.log('API Response:', response.data); // 디버깅용 API 응답 출력
                    const fetchedBoard = {
                        noticeBoardNo: response.data.noticeBoardNo,
                        noticeBoardTitle: response.data.noticeBoardTitle,
                        noticeBoardContent: response.data.noticeBoardContent,
                        noticeBoardWriter: response.data.noticeBoardWriter,
                        noticeBoardDate: response.data.noticeBoardDate,
                        noticeBoardView: response.data.noticeBoardView
                    };
                    setBoard(fetchedBoard);

                })
                .catch(error => console.log(error));
        }
        
    }, [noticeBoardNo]);
  
//   const handleEdit = () => {
//     // 수정 버튼 클릭 시 처리 로직 추가
//   };

//   const handleDelete = (noticeBoardNo) => {

//     if(window.confirm('삭제하시겠습니까?')){
//         axios.delete(`http://localhost:8080/api/free/delete/${freeBoardNo}`)
//         .then(response => {
//             if(response.status===204){
//                 window.alert('삭제되었습니다.');
//                 navigate('/');
//             }else {
//                 console.log('글 삭제 실패');
//             }
//         })
//         .catch(error => {
//             console.log('글 삭제 실패 : '+error);
//         });
      
//     } else {
//         window.alert('삭제를 취소했습니다.');
//     }
// }




//   const handleSubmitComment = (event) => {
//     event.preventDefault();
//     // 댓글 등록 폼 제출 처리 로직 추가
//   };

  return (
    <>
    <div className="container" style={{ border: '1px solid #ccc', marginTop: '50px', padding: '20px' }}>
          <input className="form-control" type="text" value={board.noticeBoardTitle} aria-label="Disabled input example" disabled readOnly />

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span>작성자 : {board.noticeBoardWriter}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span>📅 {new Date(board.noticeBoardDate).toLocaleString('ko-KR', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span>👁 {board.noticeBoardView}</span>
          </div>

          <div>
              <div>
                  <button type="button" className="btn btn-primary" >수정</button>
                  {/* <button type="button" className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={() => handleDelete(board.noticeBoardNo)}>삭제</button> */}
              </div>
          </div>

          <textarea className="form-control" id="floatingTextarea2Disabled" style={{ height: '500px', marginTop: '10px' }} disabled value={board.noticeBoardContent}></textarea>
      </div>
      {/* <div className="container" style={{ marginTop: '50px' }}>
              <h5>댓글 추가</h5>

              <form id="commentForm" className="mt-4" onSubmit={handleSubmitComment}>
                  <div className="form-group">
                      <label htmlFor="commentId">작성자</label>
                      <input type="text" className="form-control" id="commentId" name="commentId" required />
                  </div>
                  <div className="form-group">
                      <label htmlFor="commentContent">내용</label>
                      <textarea className="form-control" id="commentContent" name="commentContent" rows="3" required placeholder="비방글은 관리자에 의해 삭제될 수 있습니다."></textarea>
                  </div>

                  <div className="d-flex justify-content-end" style={{ marginTop: '10px' }}>
                      <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>등록</button>
                  </div>
              </form>

              <hr />
        </div> */}
          </>
  );
};

export default BoardDetail;
