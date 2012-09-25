/**
 * Abstract definition of a service
 * This implementation encaptulates initialization and empty execcute function
 */
var Service = Class.extend({
	caller : null,
	params : null,
	init : function(callerObj, serviceParams) {
		this.caller = callerObj;
		this.params = serviceParams;
	},
	execute: function(){}
});

/**
 * Generic service locator class. Provides base functionality for services' life cycle management
 * 
 * At this point Service Locator requires definition of ServiceFactory class 
 * that is basically a container for service classes names
 */
var ServiceLocator = Class.extend({
	map: {
		"default": {}
	},
	
	services: {},
	
	/**
	 * Gets existing or creates new service object and return it.
	 */
	getService: function(caller, service){
		var serviceParams = $.extend(this.map["default"], this.map[service] );
		
		var serviceObj = null;
		if(this.services[service] && this.services[service] instanceof Service){
			serviceObj = this.services[service];
			// we must reinit the service
			serviceObj.init(caller, serviceParams);
		} else {
			this.services[service] = new ServiceFactory[this.map[service].workerClass](caller, serviceParams);
			serviceObj = this.services[service];
		}
		return serviceObj;
	}
});