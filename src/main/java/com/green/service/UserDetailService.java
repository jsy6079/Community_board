package com.green.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.green.entity.Member;
import com.green.repository.memberRepository;

//@service
//@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {



//  private final UserRepository userRepository;

	@Autowired
	private memberRepository memberrepository;

	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
	    // Optional<Member>를 사용하여 Member 객체를 가져옵니다.
	    Optional<Member> memberOptional = memberrepository.findById(id);

	    // Optional에서 값을 꺼내고, 값이 없으면 예외를 던집니다.
	    Member member = memberOptional.orElseThrow(() -> 
	        new UsernameNotFoundException("해당 유저가 없습니다.")
	    );

	    // Spring Security의 User 클래스를 사용하여 UserDetails를 구현합니다.
	    return new org.springframework.security.core.userdetails.User(
	        member.getId(),    // 사용자의 이름 (username)
	        member.getPassword(),    // 사용자의 비밀번호 (password)
	        buildAdminAuthority()   // 사용자 권한 목록
	    );
	}


  private Set<GrantedAuthority> buildAdminAuthority() {	//ROLE_USER 권한 부여

      Set<GrantedAuthority> setAuths = new HashSet<GrantedAuthority>();

      setAuths.add(new SimpleGrantedAuthority("ROLE_USER"));

      return setAuths;
  }
}