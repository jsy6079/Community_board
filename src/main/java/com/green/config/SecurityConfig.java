package com.green.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(request -> {
                var corsConfig = new org.springframework.web.cors.CorsConfiguration();
                corsConfig.setAllowedOrigins(List.of("http://localhost:3000")); // 클라이언트 출처
                corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE")); // 허용 메서드
                corsConfig.setAllowedHeaders(List.of("*")); // 허용 헤더
                return corsConfig;
            }))
            .csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화 (개발 환경에서만)
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/**").permitAll() // 인증 없이 접근 허용
                    .anyRequest().authenticated() // 인증된 사용자만 접근 허용
            );

        return http.build();
    }

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                    .addMapping("/**") // 모든 엔드포인트에 대해 CORS 설정 적용
                    .allowedOrigins("http://localhost:3000") // 허용할 출처
                    .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드
                    .allowedHeaders("*"); // 허용할 헤더
            }
        };
    }
}

