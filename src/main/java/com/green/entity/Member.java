package com.green.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="member")
@Setter
@Getter
public class Member {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="memberNo")
	private Long memberNo;
	
	@Column(name="id", nullable = false)
	private String id;
	
	@Column(name="password", nullable = false)
	private String password;
	
	@Column(name="nickname", nullable = false)
	private String nickname;
	
	@Column(name="joinDate", nullable = false)
	private LocalDateTime joinDate;
	
	@Column(name="role", nullable = false)
	private String role;
	
    @PrePersist
    protected void onCreate() {
        this.joinDate = LocalDateTime.now();
    }
}
