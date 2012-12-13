package br.com.dextra.treinamento.fab.rip.filter;

import java.util.Date;

import br.com.dextra.lib.parseutils.Parser;
import br.com.dextra.lib.parseutils.PrimitiveReferenceParser;
import br.com.dextra.restinpeace.ExpressionLanguageBinderFilter;
import br.com.dextra.treinamento.fab.infra.persistencia.Entidade;
import br.com.dextra.treinamento.fab.rip.parser.EntidadeReferenceParser;
import br.com.dextra.treinamento.fab.rip.parser.ExtendedDateReferenceParser;
import br.com.dextra.treinamento.fab.rip.parser.ExtendedEnumReferenceParser;

public class ExtendedExpressionLanguageBinderFilter extends
		ExpressionLanguageBinderFilter {

	/**
	 * @see br.com.dextra.restinpeace.ExpressionLanguageBinderFilter#loadValueParser()
	 */
	@Override
	protected Parser loadValueParser() {
		Parser parser = new Parser();

		// parsers primitivos
		PrimitiveReferenceParser primitiveParser = new PrimitiveReferenceParser();
		parser.registerReferenceParserFor(byte.class, primitiveParser);
		parser.registerReferenceParserFor(Byte.class, primitiveParser);
		parser.registerReferenceParserFor(char.class, primitiveParser);
		parser.registerReferenceParserFor(Character.class, primitiveParser);
		parser.registerReferenceParserFor(short.class, primitiveParser);
		parser.registerReferenceParserFor(Short.class, primitiveParser);
		parser.registerReferenceParserFor(int.class, primitiveParser);
		parser.registerReferenceParserFor(Integer.class, primitiveParser);
		parser.registerReferenceParserFor(long.class, primitiveParser);
		parser.registerReferenceParserFor(Long.class, primitiveParser);
		parser.registerReferenceParserFor(float.class, primitiveParser);
		parser.registerReferenceParserFor(Float.class, primitiveParser);
		parser.registerReferenceParserFor(double.class, primitiveParser);
		parser.registerReferenceParserFor(Double.class, primitiveParser);
		parser.registerReferenceParserFor(boolean.class, primitiveParser);
		parser.registerReferenceParserFor(Boolean.class, primitiveParser);
		parser.registerReferenceParserFor(String.class, primitiveParser);
		parser.registerReferenceParserFor(String[].class, primitiveParser);

		// parsers customizados
		parser.registerReferenceParserFor(Entidade.class,
				new EntidadeReferenceParser());
		parser.registerReferenceParserFor(Date.class,
				new ExtendedDateReferenceParser());
		parser.registerComplexReferenceParser(new ExtendedEnumReferenceParser());

		return parser;
	}
}