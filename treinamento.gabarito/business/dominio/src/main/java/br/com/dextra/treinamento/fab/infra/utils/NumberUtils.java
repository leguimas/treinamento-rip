package br.com.dextra.treinamento.fab.infra.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.Format;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Locale;

/**
 * Classe utilit&aacute;ria para a manipula&ccedil;&atilde;o de valores
 * num&eacute;ricos no sistema. Utilize esta classe para criar novos valores ou
 * setar o padr&atilde;o de casas decimais utilizados pelo sistema.
 *
 */
public class NumberUtils {

	/**
	 * Quantidade de casas decimais utilizadas em valores.
	 */
	public static final int CASAS_DECIMAIS_VALORES = 2;

	/**
	 * Quantidade de casas decimais utilizadas para as taxas.
	 */
	public static final int CASAS_DECIMAIS_TAXAS = 6;

	/**
	 * Quantidade de casas decimais utilizadas para as taxas.
	 */
	public static final int CASAS_DECIMAIS_PERCENTUAL = 2;

	/**
	 * Quantidade de casas decimais utilizadas na divis&atilde;o.
	 */
	public static final int CASAS_DECIMAIS_DIVISAO = 10;

	/**
	 * M&eacute;todo respons&aacute;vel por converter uma string em um
	 * BigDecimal.
	 *
	 * @param number
	 *            Texto a ser convertido em BigDecimal.
	 * @return BigDecimal com CASAS_DECIMAIS_TAXAS casas decimais.
	 */
	public static BigDecimal asBigDecimal(String number) {
		DecimalFormat formater = new DecimalFormat("#,#######",
				new DecimalFormatSymbols(new Locale("pt", "br")));
		try {
			return new BigDecimal(formater.parse(number).doubleValue())
					.setScale(CASAS_DECIMAIS_TAXAS, RoundingMode.HALF_UP);
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * Cria um novo BigDecimal com CASAS_DECIMAIS_TAXAS casas decimais.
	 */
	public static BigDecimal asTaxa(Double d) {
		return new BigDecimal(d).setScale(CASAS_DECIMAIS_TAXAS,
				RoundingMode.HALF_UP);
	}

	/**
	 * Cria um novo BigDecimal com CASAS_DECIMAIS_VALORES casas decimais.
	 */
	public static BigDecimal asValor(Double d) {
		return new BigDecimal(d).setScale(CASAS_DECIMAIS_VALORES,
				RoundingMode.HALF_UP);
	}

	/**
	 * Cria um novo BigDecimal com CASAS_DECIMAIS_TAXAS casas decimais.
	 */
	public static BigDecimal asTaxa(Integer i) {
		return new BigDecimal(i).setScale(CASAS_DECIMAIS_TAXAS,
				RoundingMode.HALF_UP);
	}

	/**
	 * Cria um novo BigDecimal com CASAS_DECIMAIS_VALORES casas decimais.
	 */
	public static BigDecimal asValor(Integer i) {
		return new BigDecimal(i).setScale(CASAS_DECIMAIS_VALORES,
				RoundingMode.HALF_UP);
	}

	/**
	 * Cria um novo BigDecimal com CASAS_DECIMAIS_TAXAS casas decimais.
	 */
	public static BigDecimal asTaxa(String s) {
		return new BigDecimal(s).setScale(CASAS_DECIMAIS_TAXAS,
				RoundingMode.HALF_UP);
	}

	/**
	 * Cria um novo BigDecimal com CASAS_DECIMAIS_VALORES casas decimais.
	 */
	public static BigDecimal asValor(String s) {
		return new BigDecimal(s).setScale(CASAS_DECIMAIS_VALORES,
				RoundingMode.HALF_UP);
	}

	/**
	 * Cria um novo BigDecimal com CASAS_DECIMAIS_TAXAS casas decimais.
	 */
	public static BigDecimal asTaxa(BigDecimal b) {
		return b.setScale(CASAS_DECIMAIS_TAXAS, RoundingMode.HALF_UP);
	}

	/**
	 * Cria um novo BigDecimal com CASAS_DECIMAIS_VALORES casas decimais.
	 */
	public static BigDecimal asValor(BigDecimal b) {
		if (b == null) {
			return null;
		}

		return b.setScale(CASAS_DECIMAIS_VALORES, RoundingMode.HALF_UP);
	}

	/**
	 * Realiza a divis&atilde;o entre dois n&uacute;meros padronizando o modo de
	 * divis&atilde;o no sistema todo.
	 * @param dividendo
	 * @param divisor
	 */
	public static BigDecimal divide(BigDecimal dividendo, BigDecimal divisor) {
		if (divisor.compareTo(BigDecimal.ZERO) == 0) {
			return BigDecimal.ZERO;
		}

		BigDecimal result = dividendo.divide(divisor, CASAS_DECIMAIS_DIVISAO,
				RoundingMode.HALF_UP);

		return result;
	}

	/**
	 * Realiza a divis&atilde;o entre dois n&uacute;meros padronizando o modo de
	 * divis&atilde;o no sistema todo.
	 * @param dividendo
	 * @param divisor
	 */
	public static BigDecimal divide(Double dividendo, BigDecimal divisor) {
		if (divisor.compareTo(BigDecimal.ZERO) == 0) {
			return BigDecimal.ZERO;
		}

		return divide(new BigDecimal(dividendo), divisor);
	}

	/**
	 * Realiza a divis&atilde;o entre dois n&uacute;meros padronizando o modo de
	 * divis&atilde;o no sistema todo.
	 */
	public static BigDecimal divide(BigDecimal dividendo, Double divisor) {
		if (divisor == 0) {
			return BigDecimal.ZERO;
		}

		return divide(dividendo, new BigDecimal(divisor));
	}

	/**
	 * Realiza a divis&atilde;o entre dois n&uacute;meros padronizando o modo de
	 * divis&atilde;o no sistema todo.
	 */
	public static BigDecimal divide(BigDecimal dividendo, Integer divisor) {
		if (divisor == 0) {
			return BigDecimal.ZERO;
		}

		return divide(dividendo, new BigDecimal(divisor));
	}

	public static String formatarInteiro(Integer valor) {
		return formatar(new BigDecimal(valor), 0, 0);
	}

	public static String formatarMoeda(BigDecimal valor) {
		return formatar(valor, NumberUtils.CASAS_DECIMAIS_VALORES,
				NumberUtils.CASAS_DECIMAIS_VALORES);
	}

	public static String formatarMoedaSemCasasDecimais(BigDecimal valor) {
		return formatar(valor, NumberUtils.CASAS_DECIMAIS_VALORES, 0);
	}

	public static String formatarTaxa(BigDecimal valor) {
		return formatar(valor, NumberUtils.CASAS_DECIMAIS_TAXAS,
				NumberUtils.CASAS_DECIMAIS_TAXAS);
	}

	public static String formatarPercentual(BigDecimal valor) {
		return formatar(valor, NumberUtils.CASAS_DECIMAIS_PERCENTUAL,
				NumberUtils.CASAS_DECIMAIS_PERCENTUAL);
	}

	private static String formatar(BigDecimal valor, int minimumFractionDigits, int maximumFractionDigits) {
		if (valor != null) {
			NumberFormat numberFormat = getNumberFormatter(
					minimumFractionDigits, maximumFractionDigits);
			return numberFormat.format(valor.doubleValue());
		} else {
			return "";
		}
	}

	public static NumberFormat getNumberFormatter(int minimumFractionDigits,
			int maximumFractionDigits) {
		NumberFormat numberFormat = NumberFormat.getInstance(new Locale(
				"pt", "BR"));
		numberFormat
				.setMinimumFractionDigits(minimumFractionDigits);
		numberFormat
				.setMaximumFractionDigits(maximumFractionDigits);
		return numberFormat;
	}

	public static String formatarMoeda(Double valor) {
		return formatarMoeda(new BigDecimal(valor));
	}

	public static BigDecimal max(BigDecimal a, BigDecimal b) {
		if (a.compareTo(b) > 0) {
			return a;
		} else {
			return b;
		}
	}

	public static BigDecimal abs(BigDecimal valor) {
		if (valor.compareTo(BigDecimal.ZERO) < 0) {
			return valor.multiply(new BigDecimal(-1));
		} else {
			return valor;
		}
	}

	public static Format getPorcentagemFormat() {
		return new DecimalFormat("#,000.00");
	}

	public static boolean iguais(BigDecimal a, BigDecimal b) {
		if (a == null && b == null) {
			return true;
		} else if (a == null) {
			return false;
		} else if (b == null) {
			return false;
		}

		return a.compareTo(b) == 0;
	}
}
