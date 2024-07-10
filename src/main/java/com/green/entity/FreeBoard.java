package com.green.entity;

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
@Table(name="freeBoard")
@Setter
@Getter
public class FreeBoard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="freeBoardNo")
	private Long freeBoardNo;

	
	// 제목 글씨수 제한 30글자이하
	@Column(name="freeBoardTitle",nullable = false, length = 90)
	private String freeBoardTitle;
	
	@Lob
	@Column(name="freeBoardContent", nullable = false)
	private String freeBoardContent;
	
	@Column(name="freeBoardWriter", nullable = false)
	private String freeBoardWriter;
	
	@Column(name="freeBoardDate", nullable = false)
	private Date freeBoardDate;
	
	@Column(name="freeBoardView", nullable = false)
	private Long freeBoardView = 0L;
	
    @PrePersist
    protected void onCreate() {
        this.freeBoardDate = new Date();
    }
}
