package com.green.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.green.entity.Member;
import com.green.repository.memberRepository;

@Service
public class memberService {
	
	@Autowired
	private memberRepository memberrepository;
	
	private PasswordEncoder passwordencoder = new BCryptPasswordEncoder();
	
	public void saveMember(Member member) {
		member.setPassword(passwordencoder.encode(member.getPassword()));
		member.setRole("ROLE_USER");
		memberrepository.save(member);
	}
	
	// 이미 사용중인 아이디라면
	public boolean isIdTaken(String id) {
		return memberrepository.findById(id).isPresent();
	}
	
	// 이미 사용중인 닉네임이라면
	public boolean isNickname(String nickname) {
		return memberrepository.findByNickname(nickname).isPresent();
	}
}
