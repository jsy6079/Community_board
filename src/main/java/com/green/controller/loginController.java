package com.green.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class loginController {
	
	@GetMapping("/login")
    public ResponseEntity<Map<String, Object>> login() {
      
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "로그인 성공!");
        return ResponseEntity.ok(response);

    }
	
//    @PostMapping("/login")
//    public String login(@RequestParam String username, @RequestParam String password) {
//        // 로그인 로직
//        return "loginResult";
//    }

}
