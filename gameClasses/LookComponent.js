var LookComponent = IgeClass.extend({
	classId: 'LookComponent',
	componentId: 'look',

	init: function(entity, options) {
		var self = this;
		this._entity = entity;
		this._options = options;
	}
}