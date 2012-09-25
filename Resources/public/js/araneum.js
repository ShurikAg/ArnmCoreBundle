/*
 * This file contains the javascript for araneum functionality
 */

var AjaxTemplateFetcher = AjaxContentFetcher.extend({
	success : function(response, textStatus) {
		this._super(response, textStatus);
		if (response.status == 'OK' && response.entity) {
			$('.ajax-container').trigger("load-template-organizer", [ response.entity ]);
		}
	}
});
/**
 * Loads the template organizer
 */
var AjaxPageTemplateFormSubmitter = AjaxFormSubmitter.extend({
	success : function(response, textStatus) {
		this._super(response, textStatus);
		if (response.status == 'OK' && response.entity) {
			$('.ajax-container').trigger("load-template-organizer", [ response.entity ]);
		}
	}
});
/**
 * This service responsible to handle widget sorting and placement into the
 * template
 */
var AjaxWidgetSortController = AjaxService.extend({
	init : function(callerObj, serviceParams) {
		this._super(callerObj, serviceParams);
		
		// get the data
		var data = {};
		data.title = $(this.caller.item).attr("data-widget-title");
		data.bundle = $(this.caller.item).attr("data-widget-bundle");
		data.controller = $(this.caller.item).attr("data-widget-controller");
		if($(this.caller.item).attr("data-widget-id")){
			data.widgetId = $(this.caller.item).attr("data-widget-id");
		}
		// get the area that the widget was dropped into
		data.area = $(this.caller.item).parent().attr("id");
		// get the order of the item
		data.index = $(this.caller.item).index();
		console.debug("DATA: ", data);
		this.params.data = $.param(data);
		// url
		this.params.url = sortWidgetUrl;
	},
	beforeSend : function(qXHR, settings) {
		
	},
	success : function(response, textStatus) {
		console.debug("Response: ", response);
		// check the status
		if (response.status == "OK") {
			// message the user
			if(response.widget && response.widget.id) {
				$(this.caller.item).attr('data-widget-id', response.widget.id);
				$("button.edit", this.caller.item).attr('href', response.widget.edit_action);
				$("button.delete", this.caller.item).attr('href', response.widget.delete_action);
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
		
	}
});
/**
 * This service is responsible for handling widgets editing
 */
var AjaxWidgetEditController = AjaxService.extend({
	init : function(callerObj, serviceParams) {
		this._super(callerObj, serviceParams);
		// url
		this.params.url = $(this.caller).attr('href');
	},
	beforeSend : function(qXHR, settings) {
		// save the data before we loose the text
		$("#widget-edit-dialog").data('title', $("#widget-edit-dialog .modal-header h3").text());
		$("#widget-edit-dialog").data('body', $("#widget-edit-dialog .modal-body").html());
	},
	success : function(response, textStatus) {
		console.debug("Response: ", response);
		// check the status
		if (response.status == "OK") {
			// title
			$("#widget-edit-dialog .modal-header h3").text(response.title);
			// body
			$("#widget-edit-dialog .modal-body").html(response.body);
			// body
			$("#widget-edit-dialog form").attr("action", response.form_action);
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
		
	}
});
/**
 * This service is responsible for handling widgets deletion
 */
var AjaxWidgetDeleteController = AjaxService.extend({
	init : function(callerObj, serviceParams) {
		this._super(callerObj, serviceParams);
		// url
		this.params.url = $(this.caller).attr('href');
	},
	beforeSend : function(qXHR, settings) {
		
	},
	success : function(response, textStatus) {
		console.debug("Response: ", response);
		// check the status
		if (response.status == "OK") {
			//remove the widget from the view
			$('div.widget[data-widget-id="'+response.id+'"]').remove();
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
		
	}
});
/**
 * Handles widget form submits
 */
var WidgetFormSubmitter = AjaxFormSubmitter.extend({
	success : function(response, textStatus) {
		if (response.status == 'OK') {
			$("#widget-edit-dialog").modal("hide");
		} else if(response.status == 'ERROR' && response.body) {
			$("#widget-edit-dialog .modal-body").html(response.body);
		} else if (response.status == "FAILED") {
			$('.ajax-container').trigger("show-error", [ response.reason ]);
		} else {
			console.error(response);
		}
	}
});
/**
 * Service factory definitions for araneum functionality
 */
var ServiceFactory = {
	"AjaxContentFetcher" : AjaxContentFetcher,
	"AjaxTemplateFetcher" : AjaxTemplateFetcher,
	"AjaxFormSubmitter" : AjaxFormSubmitter,
	"AjaxPageTemplateFormSubmitter" : AjaxPageTemplateFormSubmitter,
	"AjaxWidgetSortController" : AjaxWidgetSortController,
	"AjaxWidgetEditController" : AjaxWidgetEditController,
	"AjaxWidgetDeleteController" : AjaxWidgetDeleteController,
	"WidgetFormSubmitter" : WidgetFormSubmitter
};
/**
 * Service locator for araneum functionality
 */
var AraneumServiceLocator = ServiceLocator.extend({
	map : {
		"default" : {
			global : false,
			url : '',
			type : "GET",
			dataType : "json",
			async : true,
			data : '',
			workerClass : null
		},
		contentFetcher : {
			workerClass : 'AjaxContentFetcher',
			type : "GET"
		},
		templateFetcher : {
			workerClass : 'AjaxTemplateFetcher',
			type : "GET"
		},
		formSubmitter : {
			workerClass : 'AjaxFormSubmitter'
		},
		templateFormSubmitter : {
			workerClass : 'AjaxPageTemplateFormSubmitter'
		},
		widgetSortController : {
			workerClass : 'AjaxWidgetSortController',
			type: "POST",
			async : false
		},
		widgetEditController : {
			workerClass : 'AjaxWidgetEditController',
			type: "GET",
			async : false
		},
		widgetDeleteController : {
			workerClass : 'AjaxWidgetDeleteController',
			type: "POST",
			async : false
		},
		widgetFormSubmitter : {
			workerClass : 'WidgetFormSubmitter'
		},
	}
});

$(document).ready(
		function() {
			// tooltip
			$('#container').tooltip({
				'placement' : 'right',
				'selector' : '*[rel="tooltip"]',
				'delay' : {
					'show' : 500,
					'hide' : 100
				}
			});
			// create the service locator instance
			var serviceLocator = new AraneumServiceLocator();

			// bind all ajax driven links and buttons
			$('#container').on(
					'click',
					'*[data-toggle="ajax-control"][rel]',
					function(event) {
						try {
							serviceLocator.getService(this, "contentFetcher").execute();
						} catch (e) {
							console.error("Error: ", e);
						}
						return false;
					});
			$('#container').on(
					'click',
					'*[data-toggle="ajax-control-template"][rel]',
					function(event) {
						try {
							serviceLocator.getService(this, "templateFetcher").execute();
						} catch (e) {
							console.error("Error: ", e);
						}
						return false;
					});
			// bind all ajax driven forms
			$('#container').on(
					'submit',
					'form[data-toggle="ajax-form"]',
					function(event) {
						console.debug('Ajax menu item clicked: ', this);
						try {
							serviceLocator.getService(this, "formSubmitter").execute();
						} catch (e) {
							console.error("Error: ", e);
						}
						event.stopPropagation();
						event.preventDefault();
					});
			$('#container').on(
					'submit',
					'form[data-toggle="ajax-form-template"]',
					function(event) {
						console.debug('Ajax menu item clicked: ', this);
						try {
							serviceLocator.getService(this, "templateFormSubmitter").execute();
						} catch (e) {
							console.error("Error: ", e);
						}
						event.stopPropagation();
						event.preventDefault();
					});
			$('.ajax-container').on('load-template-organizer',
					function(event, entity) {
						console.debug("Template to load: ", entity);
						$("#template-organizer-toggle").trigger('click');
					});
			$("#container").on("sortstop", ".column", function(event, ui){
				try{
					serviceLocator.getService(ui, "widgetSortController").execute();
					if (ui.item.hasClass("new")) {
			            // This is a new item
			            ui.item.removeClass("new");
			        }
				} catch(err) {
					console.error(err);
					$(this).sortable('cancel');
				}
			});
			// edit widget event
			$("#container").on('click', "div.widget .edit", function(event){
				console.debug("Widget Edit Clicked: ", this);
				try{
					$('#widget-edit-dialog').modal('show');
					serviceLocator.getService(this, "widgetEditController").execute();
				} catch(err) {
					console.error(err);
				}
			});
			// delete widget event
			$("#container").on('click', "div.widget .delete", function(event){
				console.debug("Widget delete Clicked: ", this);
				try{
					if(!confirm("Are you sure?")){
						return;
					}
					serviceLocator.getService(this, "widgetDeleteController").execute();
				} catch(err) {
					console.error(err);
				}
			});
			
			//clear the dialog to initial state
			$('#container').on('hidden', "#widget-edit-dialog", function () {
				var title = $("#widget-edit-dialog").data('title');
				var body = $("#widget-edit-dialog").data('body');
				if(title){
					$("#widget-edit-dialog .modal-header h3").text(title);
				}
				if(body){
					$("#widget-edit-dialog .modal-body").html(body);
				}
				$("#widget-edit-dialog form").attr("action", '');
			});
			$('#container').on(
					'submit',
					'#widget-edit-dialog form',
					function(event) {
						console.debug('Widget Form Submitted: ', this);
						try {
							serviceLocator.getService(this, "widgetFormSubmitter").execute();
						} catch (e) {
							console.error("Error: ", e);
						}
						event.stopPropagation();
						event.preventDefault();
					});
			$("#container").on('click', "a.delete-confirm, button.delete-confirm", function(event){
					return confirm("Are you sure?");
			});
		});