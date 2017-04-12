package com.atms.service.impl;

import com.atms.model.Developer;
import com.atms.service.DeveloperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;

/**
 * @author Alex Kazanovskiy
 */

@Service
public class DeveloperDetailsServiceImpl implements UserDetailsService {

    private final DeveloperService developerService;

    @Autowired
    public DeveloperDetailsServiceImpl(DeveloperService developerService) {
        this.developerService = developerService;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login) {
        Developer userFromDatabase = developerService.findByUsername(login);
        if (userFromDatabase == null) {
            userFromDatabase = developerService.findByEmail(login);
        }
        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (GrantedAuthority authority : userFromDatabase.getAuthorities()) {
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(authority.getAuthority());
            grantedAuthorities.add(grantedAuthority);
        }
        return new org.springframework.security.core.userdetails.User(userFromDatabase.getNickname(), userFromDatabase.getPassword(), grantedAuthorities);

    }

    private final static class UserRepositoryUserDetails extends Developer implements UserDetails {

        private static final long serialVersionUID = 1L;

        private UserRepositoryUserDetails(Developer developer) {
            super(developer);
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return getAuthorities();
        }

        @Override
        public String getUsername() {
            return getNickname();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }

}
