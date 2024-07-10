package com.green.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.green.entity.FreeBoard;
import com.green.repository.freeBoardRepository;

@Service
public class freeBoardService {
	
	@Autowired
	private freeBoardRepository freeboardrepository;
	
    // 자유 게시판 전체 조회 (페이징 포함)
    public Page<FreeBoard> getAllBoard(Pageable pageable){
        return freeboardrepository.findAll(pageable);
    }
	
	// 게시판 상세 조회

    public FreeBoard getBoardById(Long freeBoardNo) {
        FreeBoard board = freeboardrepository.findById(freeBoardNo).orElse(null);
        if (board != null) {
            board.setFreeBoardView(board.getFreeBoardView() + 1);
            freeboardrepository.save(board);
        }
        return board;
    }
    
    
    // 자유 게시판 글 쓰기
    public FreeBoard saveBoard(FreeBoard freeboard) {
    	return freeboardrepository.save(freeboard);
    }
//    
//    
//    // 자유 게시판 페이징
//    public Page<FreeBoard> getFreeBoards(int page, int size){
//    	Pageable pageable = PageRequest.of(page, size, Sort.by("freeBoardNo").descending());
//    	return freeboardrepository.findAll(pageable);
//    }
//    
//    // 자유 게시판 수정
//    @Transactional
//    public FreeBoard updateFreeBoards(FreeBoard freeboard) {
//    	return freeboardrepository.save(freeboard);
//    }
//    
//	// 자유 게시판 수정 조회 (조회수 제거)
//    @Transactional
//    public FreeBoard getEditBoardById(Long freeBoardNo) {
//        FreeBoard board = freeboardrepository.findById(freeBoardNo).orElse(null);
//            freeboardrepository.save(board);
//        return board;
//    }
//    
//    
//    // 게시물 조회수 감소 메서드
//    public void decreaseViewCount(Long freeBoardNo, Long viewCountDifference) {
//        FreeBoard existingFreeBoard = freeboardrepository.findById(freeBoardNo)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid free board id: " + freeBoardNo));
//
//        // 이전 조회수와 차이만큼 조회수를 감소시킴
//        existingFreeBoard.setFreeBoardView(existingFreeBoard.getFreeBoardView() - viewCountDifference);
//
//        // 수정된 조회수를 저장
//        freeboardrepository.save(existingFreeBoard);
//    }
//	
    // 자유 게시판 삭제
    public void deleteFreeBoards(Long freeBoardNo) {
    	freeboardrepository.deleteById(freeBoardNo);
    }
}
