package com.green.entity;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="lo_noticeBoard")
@Setter
@Getter
public class NoticeBoard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="noticeBoardNo")
	private Long noticeBoardNo;

	@Column(name="noticeBoardType", nullable = false)
	private String noticeBoardType;
	
	@Column(name="noticeBoardTitle",nullable = false, length = 90)
	private String noticeBoardTitle;
	
	@Column(length=1000, name="noticeBoardContent", nullable = false)
	private String noticeBoardContent;
	
	@Column(name="noticeBoardWriter", nullable = false)
	private String noticeBoardWriter;
	
	@Column(name="noticeBoardDate", nullable = false)
	private LocalDateTime noticeBoardDate;
	
	@Column(name="noticeBoardView", nullable = false)
	private Long noticeBoardView = 0L;
	
    @PrePersist
    protected void onCreate() {
        this.noticeBoardDate = LocalDateTime.now();
    }
}
