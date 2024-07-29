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
      
//        @GetMapping("characters/{searchCharacter}")
//        public ResponseEntity<String> getLostArkCharacters(@PathVariable String searchCharacter) {
//            RestTemplate restTemplate = new RestTemplate();
//            String url = "https://developer-lostark.game.onstove.com/armories/characters/" + searchCharacter;
//            
//            HttpHeaders headers = new HttpHeaders();
//            headers.set("accept", "application/json");
//            headers.set("authorization", "bearer " + apiKey);
//            
//            HttpEntity<String> entity = new HttpEntity<>(headers);
//            
//            // 각 엔드포인트를 호출합니다.
//            ResponseEntity<String> profilesResponse = restTemplate.exchange(url + "/profiles", HttpMethod.GET, entity, String.class);
//            ResponseEntity<String> equipmentResponse = restTemplate.exchange(url + "/equipment", HttpMethod.GET, entity, String.class);
//            ResponseEntity<String> avatarsResponse = restTemplate.exchange(url + "/avatars", HttpMethod.GET, entity, String.class);
//            ResponseEntity<String> combatSkillsResponse = restTemplate.exchange(url + "/combat-skills", HttpMethod.GET, entity, String.class);
//            ResponseEntity<String> engravingsResponse = restTemplate.exchange(url + "/engravings", HttpMethod.GET, entity, String.class);
//            ResponseEntity<String> cardsResponse = restTemplate.exchange(url + "/cards", HttpMethod.GET, entity, String.class);
//            ResponseEntity<String> gemsResponse = restTemplate.exchange(url + "/gems", HttpMethod.GET, entity, String.class);
//            ResponseEntity<String> collectiblesResponse = restTemplate.exchange(url + "/collectibles", HttpMethod.GET, entity, String.class);
//            
//            // 결과를 Map으로 집계합니다.
//            Map<String, Object> responseMap = new HashMap<>();
//            responseMap.put("profiles", profilesResponse.getBody());
//            responseMap.put("equipment", equipmentResponse.getBody());
//            responseMap.put("avatars", avatarsResponse.getBody());
//            responseMap.put("combatSkills", combatSkillsResponse.getBody());
//            responseMap.put("engravings", engravingsResponse.getBody());
//            responseMap.put("cards", cardsResponse.getBody());
//            responseMap.put("gems", gemsResponse.getBody());
//            responseMap.put("collectibles", collectiblesResponse.getBody());
//            
//            // ObjectMapper를 사용하여 Map을 JSON 문자열로 변환합니다.
//            ObjectMapper objectMapper = new ObjectMapper();
//            String responseJson;
//            try {
//                responseJson = objectMapper.writeValueAsString(responseMap);
//            } catch (Exception e) {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating JSON response");
//            }
//            
//            return ResponseEntity.ok(responseJson);
//        }
//    

    
    
    
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