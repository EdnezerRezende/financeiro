package br.com.financeiro.conf;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import br.com.financeiro.security.AppUserDetailService;
import br.com.financeiro.security.jwt.JWTConfigurer;
import br.com.financeiro.security.jwt.TokenProvider;
import br.com.financeiro.service.UsuarioService;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AppUserDetailService appUserDetailService;

    public SecurityConfiguration(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .cors()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/**").permitAll()
           //     .antMatchers("/api/login/**").permitAll()
           //     .antMatchers("/api/signup").hasRole(("ADMIN"))
           //     .antMatchers("/api/pedidos/**").hasRole(("ADMIN"))
           //     .antMatchers("/api/usuario/**").hasRole(("ADMIN"))
           //     .antMatchers("/api/produto/**").hasRole(("ADMIN"))
           //     .antMatchers("/api/fornecedor/**").hasRole(("ADMIN"))
           //     .antMatchers("/api/estoque/**").hasRole(("ADMIN"))
            //    .antMatchers("/api/email/**").hasRole(("ADMIN"))
             //   .antMatchers("/api/categoria/**").hasRole(("ADMIN"))
                .anyRequest().authenticated()
                .and().apply(new JWTConfigurer(tokenProvider))
                .and().sessionManagement()
        ;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(appUserDetailService)
                .passwordEncoder(new BCryptPasswordEncoder(12));
    }

    // Forma recomendada de ignorar no filtro de segurança as requisições para recursos estáticos
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/resources/**");
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}
