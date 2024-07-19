package com.green.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.green.entity.NoticeBoard;
import com.green.service.noticeBoardService;

@RestController
@RequestMapping("/api/notice")
@CrossOrigin(origins = "http://localhost:3000")
public class noticeBoardController {
	
	@Autowired
	private noticeBoardService noticeboardService;
	
	
	// 게시판 최근 목록 4개 노출
	
	@GetMapping("/noticeBoardListResent")
	public ResponseEntity<List<NoticeBoard>> getBoardList() {
		
		List<NoticeBoard> response = noticeboardService.getRecentBoard();

		return ResponseEntity.ok(response);
	}
	
	// 게시판 전체 목록 api
	@GetMapping("/noticeBoardList")
	public ResponseEntity<Map<String, Object>> getBoardList(
		
		@RequestParam(defaultValue = "1") int pageNum,
		@RequestParam(defaultValue = "10") int amount) {
		
        PageRequest pageRequest = PageRequest.of(pageNum - 1, amount, Sort.by(Sort.Direction.DESC,"noticeBoardNo"));
        Page<NoticeBoard> noticeBoardPage = noticeboardService.getAllBoard(pageRequest);
        
        Map<String, Object> response = new HashMap<>();
        response.put("list", noticeBoardPage.getContent());
        response.put("page", getPageInfo(noticeBoardPage));

        
		return ResponseEntity.ok(response);
	}
	
    // 페이지 정보 생성
    public Map<String, Object> getPageInfo(Page<NoticeBoard> couponPage) {
        Map<String, Object> pageInfo = new HashMap<>();
        
        int totalPages = couponPage.getTotalPages();
        int currentPage = couponPage.getNumber() + 1; // 현재 페이지 번호 (1부터 시작)
        int pageSize = 5; // 한 번에 표시할 페이지 번호 수

        int startPage = ((currentPage - 1) / pageSize) * pageSize + 1;
        int endPage = Math.min(startPage + pageSize - 1, totalPages);

        boolean prev = couponPage.hasPrevious(); // 이전 페이지 여부
        boolean next = couponPage.hasNext(); // 다음 페이지 여부

        pageInfo.put("startPage", startPage);
        pageInfo.put("endPage", endPage);
        pageInfo.put("prev", startPage > 1); // 이전 페이지 그룹이 있는지 여부
        pageInfo.put("next", endPage < totalPages); // 다음 페이지 그룹이 있는지 여부
        pageInfo.put("pagingInfo", Map.of(
            "pageNum", currentPage,
            "amount", couponPage.getSize()
        ));
        
        return pageInfo;
    }

    // 게시판 상세보기 api
    @GetMapping("detail/{noticeBoardNo}")
    public ResponseEntity<NoticeBoard> getBoardDetail(@PathVariable("freeBoardNo") long noticeBoardNo){
    	NoticeBoard response = noticeboardService.getBoardById(noticeBoardNo);
  
    	return ResponseEntity.ok(response);
    }
    
	// 게시판 글 삭제
	@DeleteMapping("delete/{noticeBoardNo}")
	public ResponseEntity<NoticeBoard> freeBoardDelete(@PathVariable("freeBoardNo") Long noticeBoardNo) {
		noticeboardService.deleteFreeBoards(noticeBoardNo);
		return ResponseEntity.noContent().build();
	}
    
	// 게시판 글 등록
	@PostMapping("/post")
	public ResponseEntity<NoticeBoard> saveBoard(@RequestBody NoticeBoard noticeBoardNo){
		NoticeBoard response = noticeboardService.saveBoard(noticeBoardNo);
		return ResponseEntity.ok(response);
	}
//	
//	// 자유게시판 글 등록
//	@PostMapping("/freeBoardWrite")
//	public String saveBoard(@ModelAttribute FreeBoard freeboard) {
//		freeboardService.saveBoard(freeboard);
//		return "redirect:/main";
//	}
//
//	// 자유게시판 글 수정 폼 데이터 가져오기
//	@GetMapping("/free/freeBoardEdit/{freeBoardNo}")
//	public String showEditFreeBoard(@PathVariable("freeBoardNo") Long freeBoardNo, Model model) {
//		FreeBoard freeboard = freeboardService.getEditBoardById(freeBoardNo);
//		model.addAttribute("board",freeboard);
//		return "free/freeBoardEdit";
//	}
//	
//    // 자유게시판 수정 처리
//    @PostMapping("/free/freeBoardEditSubmit/{freeBoardNo}")
//    public String freeBoardEditForm(
//            @PathVariable Long freeBoardNo,
//            @RequestParam("freeBoardTitle") String freeBoardTitle,
//            @RequestParam("freeBoardContent") String freeBoardContent,
//            @RequestParam("freeBoardWriter") String freeBoardWriter,
//            @RequestParam("freeBoardView") Long freeBoardView,
//            @RequestParam("freeBoardDate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date freeBoardDate,
//            Model model) {
//    	
//    	// 이전 조회수를 가져옴
//        FreeBoard existingFreeBoard = freeboardService.getBoardById(freeBoardNo);
//        Long previousViewCount = existingFreeBoard.getFreeBoardView();
//
//        FreeBoard freeBoard = new FreeBoard();
//        freeBoard.setFreeBoardNo(freeBoardNo);
//        freeBoard.setFreeBoardTitle(freeBoardTitle);
//        freeBoard.setFreeBoardContent(freeBoardContent);
//        freeBoard.setFreeBoardWriter(freeBoardWriter);
//        freeBoard.setFreeBoardView(freeBoardView);
//        freeBoard.setFreeBoardDate(freeBoardDate);
//
//        freeboardService.updateFreeBoards(freeBoard);
//        
//        // 수정 전의 조회수와 현재 조회수를 비교하여 차이를 계산하고, 차이만큼 조회수 감소
//        Long viewCountDifference = previousViewCount - freeBoardView;
//        if (viewCountDifference > 0) {
//            freeboardService.decreaseViewCount(freeBoardNo, viewCountDifference);
//        }
//
//        return "redirect:/freeBoardDetails/"+freeBoardNo;
//    }
//	
//	

	
}
