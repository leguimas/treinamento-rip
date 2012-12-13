package br.com.dextra.treinamento.fab.rip.parser;

import java.util.Locale;

import br.com.dextra.lib.parseutils.DateReferenceParser;
import br.com.dextra.lib.parseutils.ParseException;
import br.com.dextra.treinamento.fab.infra.utils.StringUtils;

public class ExtendedDateReferenceParser extends DateReferenceParser {

	@Override
	public Object parseToType(String value, Class<?> clazz, Locale locale) throws ParseException {
		if (StringUtils.isNotEmpty(value)) {
			return super.parseToType(value.replace("\\",""), clazz, locale);
		} else {
			return null;
		}
	}

}
