package br.com.dextra.treinamento.fab.pessoa.service;

import java.util.Date;

import br.com.dextra.treinamento.fab.pessoa.entidade.Patente;

public class FiltroPessoa {

	private String nome;

	private Patente patente;

	private Date dataIngressoInicial;

	private Date dataIngressoFinal;

	public String getNome() {
		return nome;
	}

	public Patente getPatente() {
		return patente;
	}

	public Date getDataIngressoInicial() {
		return dataIngressoInicial;
	}

	public Date getDataIngressoFinal() {
		return dataIngressoFinal;
	}

}
