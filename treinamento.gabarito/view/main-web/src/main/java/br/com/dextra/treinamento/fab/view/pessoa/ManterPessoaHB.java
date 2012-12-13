package br.com.dextra.treinamento.fab.view.pessoa;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;

import br.com.dextra.treinamento.fab.entidade.common.Sexo;
import br.com.dextra.treinamento.fab.pessoa.entidade.Patente;
import br.com.dextra.treinamento.fab.pessoa.entidade.Pessoa;
import br.com.dextra.treinamento.fab.pessoa.service.FiltroPessoa;
import br.com.dextra.treinamento.fab.pessoa.service.PessoaService;
import br.com.dextra.treinamento.fab.view.BaseHB;

public class ManterPessoaHB extends BaseHB {

	private static final long serialVersionUID = -3082078630990527958L;

	private static final String CONSULTA_DE_PESSOAS = "template/br/com/dextra/treinamento/fab/view/pessoa/ManterPessoaHB/consultarPessoas.velocity";
	private static final String GRID_CONSULTA_DE_PESSOAS = "template/br/com/dextra/treinamento/fab/view/pessoa/ManterPessoaHB/gridPessoas.velocity";
	private static final String CADASTRO_DE_PESSOA = "template/br/com/dextra/treinamento/fab/view/pessoa/ManterPessoaHB/cadastroPessoa.velocity";

	private Pessoa pessoa = new Pessoa();
	private List<Pessoa> pessoasCadastradas = new ArrayList<Pessoa>();
	private FiltroPessoa filtro = new FiltroPessoa();

	@EJB(name = PessoaService.JNDI_LOCAL)
	private PessoaService servico;

	public String iniciar() {
		return CONSULTA_DE_PESSOAS;
	}

	public String buscarPessoasPorFiltro() {
		this.pessoasCadastradas = servico.buscarPessoasPorFiltro(filtro);

		this.messages.addSuccess(this.bundleMessages.get(
				"aplicacao.info.registrosEncontrados",
				this.pessoasCadastradas.size()));

		return GRID_CONSULTA_DE_PESSOAS;
	}

	public String incluir() {
		return CADASTRO_DE_PESSOA;
	}

	public String editar(Long idDaPessoa) {
		this.pessoa = servico.buscarPorId(Pessoa.class, idDaPessoa);
		return CADASTRO_DE_PESSOA;
	}

	public String salvar() {
		servico.salvar(this.pessoa);

		this.messages.addSuccess(this.bundleMessages
				.get("aplicacao.info.registrosSalvo"));

		return iniciar();
	}

	public String cancelar() {
		this.messages.addInfo(this.bundleMessages
				.get("aplicacao.info.operacaoCancelada"));

		return iniciar();
	}

	public String excluir(Long idDaPessoa) {
		this.servico.excluirPessoa(idDaPessoa);

		this.messages.addSuccess(this.bundleMessages
				.get("aplicacao.info.registrosExcluido"));

		return buscarPessoasPorFiltro();
	}

	public String getGridDePessoas() {
		return GRID_CONSULTA_DE_PESSOAS;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public FiltroPessoa getFiltro() {
		return filtro;
	}

	public List<Patente> getPatentesCadastradas() {
		return servico.buscarPatentesCadastradas();
	}

	public Sexo[] getSexosPossiveis() {
		return Sexo.values();
	}

	public List<Pessoa> getPessoasCadastradas() {
		return this.pessoasCadastradas;
	}

	public boolean getEstaEditando() {
		return pessoa != null && pessoa.getId() != null;
	}

}
