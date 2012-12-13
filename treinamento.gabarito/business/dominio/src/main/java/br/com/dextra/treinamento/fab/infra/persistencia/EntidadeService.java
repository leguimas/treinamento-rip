package br.com.dextra.treinamento.fab.infra.persistencia;

import java.util.List;

import javax.ejb.Local;

@Local
public interface EntidadeService {

	public static final String JNDI_LOCAL = "EntidadeService/local";

	public <T extends Entidade> T buscarPorId(Class<T> classe, Long id);

	public <T extends Entidade> T salvar(T entidade);

	public <T extends Entidade> List<T> buscarTodos(String entidade, String orderBy);

}
