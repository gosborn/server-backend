define([
	'jquery',
	'underscore',
	'backbone',
	'app/views/Dashboard',
	'app/views/Devices',
	'app/views/Actions'
], function(
	$,
	_,
	Backbone,
	Dashboard,
	Devices,
	Actions
){

	// Store the loaded views in an object,
	// so that we don't have to load them mutliple times.
	var views = {};


	return Backbone.Router.extend({

		routes: {
			'': 'Dashboard',
			'devices': 'Devices',
			'actions': 'Actions'
		},
		
		initialize: function(args) {
			this.el = args.el;
			this.on('route', function(currentView) {

				if (!views[currentView]) {
					var viewPrototype = eval(currentView);
					if (viewPrototype) {
						views[currentView] = new viewPrototype({
							indigoModel: args.indigoModel
						});
						this.el.append(views[currentView].$el);
					}
				}

				for (var key in views) {
					if (views.hasOwnProperty(key)) {
						var v = views[key];
						if (v.name !== currentView) {
							v.hide();
						} else {
							v.show();
						}
					}
				}
			})
		},

		Dashboard: function() {
			console.log('route to Dashboard');
			// if (!views.dashboard) {
			// 	views.dashboard = new Dashboard({});
			// 	this.el.append(views.dashboard.$el);
			// }
			//views.dashboard.show();
		},

		Devices: function() {
			console.log('route to Devices');
		},

		Actions: function() {
			console.log('route to Actions');
		}
		
		
	});



	
});