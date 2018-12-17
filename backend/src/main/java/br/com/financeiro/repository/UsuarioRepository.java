package br.com.financeiro.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.financeiro.models.Usuario;
import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    public List<Usuario> findAllByEmailEquals(String email);

    public Usuario findByEmailEquals(String email);

    public Boolean existsUsuarioByEmailEquals(String email);
}
