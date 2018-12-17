package br.com.financeiro.security;


import br.com.financeiro.models.Usuario;
import br.com.financeiro.service.UsuarioService;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class AppUserDetailService implements UserDetailsService {

    private final UsuarioService userService;

    public AppUserDetailService(UsuarioService userService) {
        this.userService = userService;
    }

    @Override
    public final UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = userService.lookup(email);

        if (usuario == null) {
            throw new UsernameNotFoundException("Usuario " + email + " não foi encontrado");
        }

//        return usuario;
        return org.springframework.security.core.userdetails.User.withUsername(email)
                .password(usuario.getSenha()).authorities(usuario.getAuthorities())
                .accountExpired(false).accountLocked(false).credentialsExpired(false)
                .disabled(false).build();
    }
}
