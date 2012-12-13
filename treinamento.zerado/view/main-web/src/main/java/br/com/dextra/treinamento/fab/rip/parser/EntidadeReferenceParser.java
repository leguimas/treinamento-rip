package br.com.dextra.treinamento.fab.rip.parser;

import java.util.Locale;

import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.apache.commons.lang.StringUtils;

import br.com.dextra.lib.parseutils.ParseException;
import br.com.dextra.lib.parseutils.ReferenceParser;
import br.com.dextra.treinamento.fab.infra.persistencia.Entidade;
import br.com.dextra.treinamento.fab.infra.persistencia.EntidadeService;

public class EntidadeReferenceParser implements ReferenceParser {

	@SuppressWarnings("unchecked")
	@Override
	public Object parseToType(String value, Class<?> clazz, Locale locale)
			throws ParseException {

		if (StringUtils.isEmpty(value)) {
			return null;
		}

		Long id = new Long(value);
		EntidadeService entidadeRepository;
		try {
			entidadeRepository = (EntidadeService) new InitialContext()
					.lookup(EntidadeService.JNDI_LOCAL);
		} catch (NamingException e) {
			throw new RuntimeException(e);
		}

		return entidadeRepository.buscarPorId(
				(Class<? extends Entidade>) clazz, id);
	}

}
