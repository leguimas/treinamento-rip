package br.com.dextra.treinamento.fab.pessoa.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.persistence.Query;

import org.mycontainer.annotation.MycontainerLocalBinding;

import br.com.dextra.treinamento.fab.infra.persistencia.EntidadeServiceBean;
import br.com.dextra.treinamento.fab.infra.utils.QueryUtils;
import br.com.dextra.treinamento.fab.infra.utils.StringUtils;
import br.com.dextra.treinamento.fab.pessoa.entidade.Patente;
import br.com.dextra.treinamento.fab.pessoa.entidade.Pessoa;

@Stateless
@MycontainerLocalBinding(value = PessoaService.JNDI_LOCAL)
public class PessoaServiceBean extends EntidadeServiceBean implements
		PessoaService {

	@SuppressWarnings("unchecked")
	@Override
	public List<Pessoa> buscarPessoasPorFiltro(FiltroPessoa filtro) {
		Map<String, Object> mapaDeParametros = new HashMap<String, Object>();

		StringBuilder sql = new StringBuilder();
		sql.append("select pessoa ");
		sql.append("from   Pessoa pessoa ");
		sql.append("where  1 = 1 ");

		if (StringUtils.isNotEmpty(filtro.getNome())) {
			sql.append("  and  upper(pessoa.nome) like :nome ");
			mapaDeParametros.put("nome", filtro.getNome().toUpperCase() + "%");
		}

		if (filtro.getPatente() != null) {
			sql.append("  and  pessoa.patente = :patente ");
			mapaDeParametros.put("patente", filtro.getPatente());
		}

		if (filtro.getDataIngressoInicial() != null) {
			sql.append("  and  pessoa.dataIngresso >= :dataInicial ");
			mapaDeParametros.put("dataInicial", filtro.getDataIngressoInicial());
		}

		if (filtro.getDataIngressoFinal() != null) {
			sql.append("  and  pessoa.dataIngresso <= :dataFinal ");
			mapaDeParametros.put("dataFinal", filtro.getDataIngressoFinal());
		}

		sql.append("order by pessoa.nome");

		Query query = em.createQuery(sql.toString());
		query = QueryUtils.setQueryParameters(mapaDeParametros, query);

		return query.getResultList();
	}

	@Override
	public List<Patente> buscarPatentesCadastradas() {
		return this.buscarTodos(Patente.class.getSimpleName(), "hierarquia");
	}

	@Override
	public void excluirPessoa(Long idDaPessoa) {
		Pessoa pessoa = this.buscarPorId(Pessoa.class, idDaPessoa);
		em.remove(pessoa);
	}

}
