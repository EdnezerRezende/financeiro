package br.com.financeiro.service;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.financeiro.models.Role;
import br.com.financeiro.repository.RoleRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> listaRoles() {

        return roleRepository.findAll();
    }

    public void salvar(Role role) {

        roleRepository.saveAndFlush(role);

    }
}
