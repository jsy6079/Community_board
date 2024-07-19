package com.green.config;

//@Configuration
public class CorsConfig {
//	
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.addAllowedOriginPattern("http://localhost:3000");
//        config.addAllowedOriginPattern("");
//        config.setAllowedHeaders(Arrays.asList("*"));
//        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        config.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//        return source;
//    }
//
//    @Bean
//    public CorsFilter corsFilter() {
//        return new CorsFilter(corsConfigurationSource());
//    }
//	
//}

//
//@Configuration
//public class CorsConfig implements WebMvcConfigurer {
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOriginPatterns("http://localhost:3000") // 안에 해당 주소를 넣어도 됨
//                        .allowedHeaders("*")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS" , "PATCH")
//                        .exposedHeaders("Authorization", "RefreshToken");
//                //.allowCredentials(true);
//            }
//        };
//    }
//}

//		@Configuration
//		public class CorsConfig implements WebMvcConfigurer {
//		
//		    @Override
//		    public void addCorsMappings(CorsRegistry registry) {
//		        registry.addMapping("/**")
//		                .allowedOrigins("http://localhost:3000") // React 애플리케이션의 주소
//		                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//		                .allowedHeaders("*")
//		                .allowCredentials(true);
//		    }
//		    
}
