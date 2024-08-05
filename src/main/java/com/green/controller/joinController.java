package com.green.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.green.entity.Member;
import com.green.service.memberService;

@RestController
@RequestMapping("/api/join")
public class joinController {
	
	@Autowired
	private memberService memberservice;
	
	// 회원가입
	@PostMapping("/regist")
	public ResponseEntity<String> joinMember(@RequestBody Member member){
		if(memberservice.isIdTaken(member.getId())) {
			return ResponseEntity.badRequest().body("아이디가 중복됩니다. 다시 확인해주세요.");
		}
		if(memberservice.isNickname(member.getNickname())) {
			return ResponseEntity.badRequest().body("닉네임이 중복됩니다. 다시 확인해주세요.");
		}
		memberservice.saveMember(member);
		return ResponseEntity.ok("가입이 완료되었습니다.");
	} 

}
