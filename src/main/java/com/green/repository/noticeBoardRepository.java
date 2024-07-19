package com.green.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import com.green.entity.NoticeBoard;

public interface noticeBoardRepository extends JpaRepository<NoticeBoard, Long> {
	
	// 자유게시판 페이징
	Page<NoticeBoard> findAll(Pageable pageable);
	
	// 최근 4개 게시물
	List<NoticeBoard> findTop5ByOrderByNoticeBoardDateDesc();
	


}
