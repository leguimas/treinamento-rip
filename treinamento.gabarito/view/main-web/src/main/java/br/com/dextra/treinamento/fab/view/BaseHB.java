package br.com.dextra.treinamento.fab.view;

import java.io.Serializable;

import javax.servlet.http.HttpServletRequest;

import br.com.dextra.restinpeace.BundleMessages;
import br.com.dextra.restinpeace.Messages;
import br.com.dextra.restinpeace.annotations.Inject;
import br.com.dextra.restinpeace.annotations.Unbindable;

public class BaseHB implements Serializable {

	private static final long serialVersionUID = 9114791603487751414L;

	@Unbindable
	@Inject
	protected transient HttpServletRequest request;

	@Unbindable
	@Inject
	protected transient Messages messages;

	@Unbindable
	@Inject
	protected transient BundleMessages bundleMessages;

	protected static final String MESSAGES = "messages.velocity";
	protected static final String INDEX = "index.velocity";

	public HttpServletRequest getRequest() {
		return request;
	}

	public Messages getMessages() {
		return messages;
	}

	public BundleMessages getBundleMessages() {
		return bundleMessages;
	}

	protected String getSuggestionParameter() {
		return request.getParameter("q");
	}

}
