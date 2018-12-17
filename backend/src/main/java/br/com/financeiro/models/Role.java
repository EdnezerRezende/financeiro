package br.com.financeiro.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Role implements GrantedAuthority {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    private String perfil;

    private String descricao;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "usuario_perfil", joinColumns = {@JoinColumn(name = "perfil_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "usuario_id", referencedColumnName = "id")})
    @JsonIgnore
    private List<Usuario> usuario;


    @Override
    public String getAuthority() {
        return perfil;
    }

}
