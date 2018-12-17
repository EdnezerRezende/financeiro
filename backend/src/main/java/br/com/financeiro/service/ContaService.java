package br.com.financeiro.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.financeiro.models.Conta;
import br.com.financeiro.models.Usuario;
import br.com.financeiro.repository.ContaRepository;
import br.com.financeiro.repository.UsuarioRepository;

@Service
@Transactional
public class ContaService {

	@Autowired
	private ContaRepository contaRepository;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public List<Conta> obterListaConta(){
		return contaRepository.findAll();
	}
	
	public void salvarEAtualizar(Conta conta, Long idConta) {
			
		contaRepository.save(conta);
		//Usuario usuario = usuarioRepository.getOne(idConta);
		//usuario.setConta(null);
		//List<Usuario> usuarios = new ArrayList<Usuario>();
		//usuarios.add(usuario); 
		//conta.setUsuarios(usuarios);
		//contaRepository.save(conta);
	}
	
	public void incluirUsuario(Usuario usuario, Long idConta) {
		Conta conta = contaRepository.getOne(idConta);
		
		List<Usuario> usuarios = new ArrayList<Usuario>();
		usuarios.addAll(conta.getUsuarios());
		usuarios.add(usuario);
		
		conta.setUsuarios(usuarios);
		
		contaRepository.save(conta);
	}
	
	public void excluirConta(Long idConta) {
		contaRepository.deleteById(idConta);
	}
	
	public Optional<Conta> obterContaById(Long id) {
		return contaRepository.findById(id);
	}
	
}
