/**
 * This file contains all the AJAX base generic service classes
 */

/**
 * Service locator that deals with ajax based services This class shoud be
 * extended with more specific configurations on application level
 */
var AjaxServiceLocator = ServiceLocator.extend({
	map : {
		"default" : {
			global : false,
			url : '',
			type : "GET",
			dataType : "json",
			async : true,
			data : '',
			workerClass : null
		}
	}
});

/**
 * Abstract ajax based service
 */
var AjaxService = Service.extend({
	execute : function(data) {
		if (this.preExecute() === false) {
			return;
		}
		$.ajax({
			global : this.params.global,
			url : this.params.url,
			type : this.params.type,
			dataType : this.params.dataType,
			async : this.params.async,
			data : this.params.data,
			beforeSend : this.beforeSend,
			success : this.success,
			error : this.complete,
			complete : this.complete,
			context : this
		});
	},
	/**
	 * This function gets executed before the ajax call. The execution of ajax
	 * call relize on the fact that this method returns true or false. If the
	 * return from this function is TRUE, ajax will be execute; if FALSE - it
	 * will not.
	 * 
	 * @returns {Boolean}
	 */
	preExecute : function() {
		return true;
	},
	beforeSend : function(qXHR, settings) {
	},
	success : function(response, textStatus) {
	},
	error : function(XMLHttpRequest, textStatus, errorThrown) {
	},
	complete : function(qXHR, textStatus) {
	}
});

/**
 * Fetcher of the content through ajax Fetched content will be populated into
 * the element with ID that defined in 'rel' attribute of the caller
 */
var AjaxContentFetcher = AjaxService.extend({
	targetElement : null,
	init : function(callerObj, serviceParams) {
		this._super(callerObj, serviceParams);
		this.params.url = $(callerObj).attr('href');
		this.targetElement = $(callerObj).attr('rel');
	},
	beforeSend : function(qXHR, settings) {
		$(this.caller).attr("disabled", "disabled");
		$(this.caller).addClass("disabled");
	},
	success : function(response, textStatus) {
		console.debug("Response: ", response);
		// check the status
		if (response.status == "OK") {
			// message the user
			$('#' + this.targetElement).html(response.content);
		} else if (response.status == "FAILED") {
			$('.ajax-container').trigger("show-error", [ response.reason ]);
		} else {
			console.error(response);
		}
	},
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		var error = "Request Error: " + XMLHttpRequest.status + " - "
				+ XMLHttpRequest.statusText;
		$('.ajax-container').trigger("show-error", [ error ]);
	},
	complete : function(qXHR, textStatus) {
		$(this.caller).removeAttr("disabled");
		$(this.caller).removeClass("disabled");
	}
});

/**
 * Form submitter through AJAX
 */
var AjaxFormSubmitter = AjaxService.extend({
	targetElement : null,
	init : function(callerObj, serviceParams) {
		this._super(callerObj, serviceParams);
		// get the action
		this.params.url = $(callerObj).attr('action');
		this.params.type = $(callerObj).attr('method');
		this.params.data = $(callerObj).serialize();
		this.targetElement = $(callerObj).attr('rel');
		console.debug("Target Element: ", this.targetElement);
	},
	beforeSend : function() {
		$("a, button, input:submit", this.caller).attr("disabled", "disabled");
		$("a, button, input:submit", this.caller).addClass("disabled");
	},
	success : function(response, textStatus) {

		// check the status
		if (response.status == "OK") {
			console.debug("Form Submit Response: ", response);
			// message the user
			$('.ajax-container').trigger("show-info", [ response.message ]);
			if ($(this.caller).hasClass("new")) {
				$('#' + this.targetElement).append(response.content);
				$(this.caller).parent().empty();
			} else {
				$('#' + this.targetElement).html(response.content);
			}
		} else if (response.status == "FAILED") {
			$('.ajax-container').trigger("show-error", [ response.reason ]);
		} else {
			console.error(response);
		}
	},
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		var error = "Request Error: " + XMLHttpRequest.status + " - "
				+ XMLHttpRequest.statusText;
		$('.ajax-container').trigger("show-error", [ error ]);
	},
	complete : function(qXHR, textStatus) {
		$("a, button, input:submit", this.caller).removeAttr("disabled");
		$("a, button, input:submit", this.caller).removeClass("disabled");
	}
});