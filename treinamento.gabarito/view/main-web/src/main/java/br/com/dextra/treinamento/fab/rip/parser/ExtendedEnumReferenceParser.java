package br.com.dextra.treinamento.fab.rip.parser;

import java.util.Locale;

import br.com.dextra.lib.parseutils.EnumReferenceParser;
import br.com.dextra.lib.parseutils.ParseException;

public class ExtendedEnumReferenceParser extends EnumReferenceParser {

	@Override
	public Object parseToType(String value, Class<?> clazz, Locale locale) throws ParseException {
		if (value == null || value.isEmpty()) {
			return null;
		} else {
			return super.parseToType(value, clazz, locale);
		}
	}

}