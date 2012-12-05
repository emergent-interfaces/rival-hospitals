var ActorComponent = IgeClass.extend({
	classId: 'ActorComponent',
	componentId: 'actor',

	init: function(entity, options) {
		ige.input.mapAction('act', ige.input.key.e);
		this._entity = entity;

		var self = this;
		ige.input.on('keyUp', function (event, keyCode) { self._keyUp(event, keyCode); });
	},

	_keyUp: function(event, keyCode) {
		if (keyCode == ige.input.key.e) {
			this.act();
		}
	},

	act: function() {
		console.log(this);
		this._entity.addComponent(DriverComponent, {driveable: ige.$('car1')});
		this._entity.removeComponent(DriverComponent); // THIS DOESN"T WORK?
	},
});	
