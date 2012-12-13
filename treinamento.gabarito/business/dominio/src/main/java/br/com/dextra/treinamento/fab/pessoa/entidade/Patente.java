package br.com.dextra.treinamento.fab.pessoa.entidade;

import javax.persistence.Column;
import javax.persistence.Entity;

import br.com.dextra.treinamento.fab.infra.persistencia.Entidade;

@Entity
public class Patente extends Entidade {

	private static final long serialVersionUID = -2585094151142143265L;

	@Column(length = 20, nullable = false)
	public String nome;

	@Column(nullable = false)
	public Integer hierarquia;

	public String getNome() {
		return nome;
	}

	public Integer getHierarquia() {
		return hierarquia;
	}

	@Override
	public String toString() {
		return "Patente [nome=" + nome + ", id=" + getId() + "]";
	}

}
