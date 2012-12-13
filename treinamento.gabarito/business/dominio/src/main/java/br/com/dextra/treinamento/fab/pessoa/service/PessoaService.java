package br.com.dextra.treinamento.fab.pessoa.service;

import java.util.List;

import javax.ejb.Local;

import br.com.dextra.treinamento.fab.infra.persistencia.EntidadeService;
import br.com.dextra.treinamento.fab.pessoa.entidade.Patente;
import br.com.dextra.treinamento.fab.pessoa.entidade.Pessoa;

@Local
public interface PessoaService extends EntidadeService {

	public static final String JNDI_LOCAL = "PessoaService/local";

	public List<Pessoa> buscarPessoasPorFiltro(FiltroPessoa filtro);

	public List<Patente> buscarPatentesCadastradas();

	public void excluirPessoa(Long idDaPessoa);

}
