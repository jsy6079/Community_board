package com.green.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
@RequestMapping("/api")

public class testController {
    
    @Value("${lostark.api.key}")
    private String apiKey;

    @GetMapping("event")
    public ResponseEntity<String> getLostArkEvents() {
        
        String url = "https://developer-lostark.game.onstove.com/news/events";
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
       
        
        return response;
    }
    
    @GetMapping("notice")
    public ResponseEntity<String> getLostArkNotice() {
        
        String url = "https://developer-lostark.game.onstove.com/news/notices";
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
       
        
        return response;
    }
    
    @GetMapping("characters")
    public ResponseEntity<String> getLostArkCharacters() {
        
        String url = "https://developer-lostark.game.onstove.com/armories/characters/새벽이슬비o/profiles";
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
       
        
        return response;
    }
    
    
    @GetMapping("calender")
    public ResponseEntity<String> getLostArkCalender() {
        
        String url = "https://developer-lostark.game.onstove.com/gamecontents/calendar";
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
               
        return response;
    }
   

}
