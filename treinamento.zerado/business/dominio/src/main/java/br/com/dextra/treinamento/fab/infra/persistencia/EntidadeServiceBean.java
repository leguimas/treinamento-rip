package br.com.dextra.treinamento.fab.infra.persistencia;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.jboss.ejb3.annotation.LocalBinding;
import org.mycontainer.annotation.MycontainerLocalBinding;

import br.com.dextra.treinamento.fab.infra.utils.StringUtils;

@LocalBinding(jndiBinding = EntidadeService.JNDI_LOCAL)
@MycontainerLocalBinding(value = EntidadeService.JNDI_LOCAL)
@Stateless
public class EntidadeServiceBean implements EntidadeService {

	@PersistenceContext(unitName = "dextra-treinamento-pu")
	protected EntityManager em;

	@Override
	public <T extends Entidade> T buscarPorId(Class<T> classe, Long id) {
		return em.find(classe, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public <T extends Entidade> List<T> buscarTodos(String entidade,
			String orderBy) {
		StringBuilder sqlQuery = new StringBuilder();
		sqlQuery.append(" FROM ").append(entidade);

		if (StringUtils.isNotEmpty(orderBy)) {
			sqlQuery.append(" ORDER BY ").append(orderBy);
		}

		Query query = em.createQuery(sqlQuery.toString());
		return query.getResultList();
	}

	@Override
	public <T extends Entidade> T salvar(T entidade) {
		entidade = em.merge(entidade);
		em.persist(entidade);

		return entidade;
	}

}
