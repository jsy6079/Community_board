package com.green.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;



@RestController
@RequestMapping("/api")

public class testController {
    
    @Value("${lostark.api.key}")
    private String apiKey;
    

    // 이벤트
    @GetMapping("event")
    public ResponseEntity<String> getLostArkEvents() {
        
        String url = "https://developer-lostark.game.onstove.com/news/events";
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("Access-Control-Allow-Origin", "*"); // CORS 허용 설정
        
        return ResponseEntity
                .status(response.getStatusCode())
//                .headers(responseHeaders)
                .body(response.getBody());
    }
    

    // 공지
    @GetMapping("notice")
    public ResponseEntity<String> getLostArkNotice() {
        
        String url = "https://developer-lostark.game.onstove.com/news/notices";
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("Access-Control-Allow-Origin", "*"); // CORS 허용 설정
        
        return ResponseEntity
                .status(response.getStatusCode())
//                .headers(responseHeaders)
                .body(response.getBody());
    }
    

    
    // 프로필 기본 정보
    @GetMapping("characters/profiles/{searchCharacter}")
    public ResponseEntity<String> getLostArkProfiles(@PathVariable String searchCharacter) {
        String url = "https://developer-lostark.game.onstove.com/armories/characters/" + searchCharacter + "/profiles";

        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("Access-Control-Allow-Origin", "*"); // CORS 허용 설정
        
        return ResponseEntity
                .status(response.getStatusCode())
//                .headers(responseHeaders)
                .body(response.getBody());

    }
    
    // 아바타
    @GetMapping("characters/avatars/{searchCharacter}")
    public ResponseEntity<String> getLostArkAvatars(@PathVariable String searchCharacter) {
        String url = "https://developer-lostark.game.onstove.com/armories/characters/" + searchCharacter + "/avatars";

        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("Access-Control-Allow-Origin", "*"); // CORS 허용 설정
        
        return ResponseEntity
                .status(response.getStatusCode())
//                .headers(responseHeaders)
                .body(response.getBody());

    }
    
    // 장비
    @GetMapping("characters/equipment/{searchCharacter}")
    public ResponseEntity<String> getLostArkEquipment(@PathVariable String searchCharacter) {
        String url = "https://developer-lostark.game.onstove.com/armories/characters/" + searchCharacter + "/equipment";

        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("Access-Control-Allow-Origin", "*"); // CORS 허용 설정
        
        return ResponseEntity
                .status(response.getStatusCode())
//                .headers(responseHeaders)
                .body(response.getBody());

    }
    
    // 스킬
    @GetMapping("characters/combat-skills/{searchCharacter}")
    public ResponseEntity<String> getLostArkCombatSkills(@PathVariable String searchCharacter) {
        String url = "https://developer-lostark.game.onstove.com/armories/characters/" + searchCharacter + "/combat-skills";

        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("Access-Control-Allow-Origin", "*"); // CORS 허용 설정
        
        return ResponseEntity
                .status(response.getStatusCode())
//                .headers(responseHeaders)
                .body(response.getBody());

    }
    
    // 각인
    @GetMapping("characters/engravings/{searchCharacter}")
    public ResponseEntity<String> getLostArkEngravings(@PathVariable String searchCharacter) {
        String url = "https://developer-lostark.game.onstove.com/armories/characters/" + searchCharacter + "/engravings";

        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("Access-Control-Allow-Origin", "*"); // CORS 허용 설정
        
        return ResponseEntity
                .status(response.getStatusCode())
//                .headers(responseHeaders)
                .body(response.getBody());

    }
    
    
    // 카드
    @GetMapping("characters/cards/{searchCharacter}")
    public ResponseEntity<String> getLostArkCards(@PathVariable String searchCharacter) {
        String url = "https://developer-lostark.game.onstove.com/armories/characters/" + searchCharacter + "/cards";

        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("Access-Control-Allow-Origin", "*"); // CORS 허용 설정
        
        return ResponseEntity
                .status(response.getStatusCode())
//                .headers(responseHeaders)
                .body(response.getBody());

    }
    
    
    // 보석
    @GetMapping("characters/gems/{searchCharacter}")
    public ResponseEntity<String> getLostArkGems(@PathVariable String searchCharacter) {
        String url = "https://developer-lostark.game.onstove.com/armories/characters/" + searchCharacter + "/gems";

        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("Access-Control-Allow-Origin", "*"); // CORS 허용 설정
        
        return ResponseEntity
                .status(response.getStatusCode())
//                .headers(responseHeaders)
                .body(response.getBody());

    }
    
    // 수집품
    @GetMapping("characters/collectibles/{searchCharacter}")
    public ResponseEntity<String> getLostArkCollectibles(@PathVariable String searchCharacter) {
        String url = "https://developer-lostark.game.onstove.com/armories/characters/" + searchCharacter + "/collectibles";

        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("Access-Control-Allow-Origin", "*"); // CORS 허용 설정
        
        return ResponseEntity
                .status(response.getStatusCode())
//                .headers(responseHeaders)
                .body(response.getBody());

    }
      
    // 캘린더
    @GetMapping("calender")
    public ResponseEntity<String> getLostArkCalender() {
        
        String url = "https://developer-lostark.game.onstove.com/gamecontents/calendar";
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("authorization", "bearer " + apiKey);  // Bearer 토큰 사용
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
               
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("Access-Control-Allow-Origin", "*"); // CORS 허용 설정
        
        return ResponseEntity
                .status(response.getStatusCode())
//                .headers(responseHeaders)
                .body(response.getBody());
        
    }
   

}