package br.com.dextra.treinamento.fab.pessoa.entidade;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.com.dextra.treinamento.fab.entidade.common.Sexo;
import br.com.dextra.treinamento.fab.infra.persistencia.Entidade;

@Entity
public class Pessoa extends Entidade {

	private static final long serialVersionUID = 843634238865776524L;

	@Column(length = 80, nullable = false)
	public String nome;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	public Sexo sexo;

	@Temporal(TemporalType.DATE)
	public Date dataNascimento;

	@Temporal(TemporalType.DATE)
	public Date dataIngresso;

	@ManyToOne(optional = false)
	public Patente patente;

	public String getNome() {
		return nome;
	}

	public Sexo getSexo() {
		return sexo;
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public Date getDataIngresso() {
		return dataIngresso;
	}

	public Patente getPatente() {
		return patente;
	}

	@Override
	public String toString() {
		return "Pessoa [nome=" + nome + ", id=" + getId() + "]";
	}

}
