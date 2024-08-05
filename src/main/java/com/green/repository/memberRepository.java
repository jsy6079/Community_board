package com.green.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.green.entity.Member;

public interface memberRepository extends JpaRepository<Member, Long> {
	
	// 아이디 중복 찾기
	Optional<Member> findById(String id);
	
	// 닉네임 중복 찾기
	Optional<Member> findByNickname(String nickname);
	
}

