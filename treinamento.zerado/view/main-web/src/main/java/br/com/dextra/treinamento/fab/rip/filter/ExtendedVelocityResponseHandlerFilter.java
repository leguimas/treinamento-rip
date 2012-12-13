package br.com.dextra.treinamento.fab.rip.filter;

import br.com.dextra.restinpeace.VelocityResponseHandlerFilter;

public class ExtendedVelocityResponseHandlerFilter extends
		VelocityResponseHandlerFilter {

	@Override
	public String resolvePathByConvention(String resourceIdentifier,
			String operationIdentifier) {
		String path = super.resolvePathByConvention(resourceIdentifier,
				operationIdentifier);

		path = "/template/br/com/dextra/captus/view" + path;
		return path;
	}

}
