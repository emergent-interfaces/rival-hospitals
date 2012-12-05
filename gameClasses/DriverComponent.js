var DriverComponent = IgeClass.extend({
	classId: 'DriverComponent',
	componentId: 'driver',

	init: function(entity, options) {
		var self = this;
		this._entity = entity;
		this._options = options;

		this.driveableE = options.driveable;
		this.groupCollisionsWithDriveable();

		ige.input.mapAction('turnLeft', ige.input.key.a);
		ige.input.mapAction('turnRight', ige.input.key.d);
		ige.input.mapAction('accelerate', ige.input.key.w);
		ige.input.mapAction('decelerate', ige.input.key.s);

		entity.addBehaviour('driverComponent_control', this._control);
		entity.addBehaviour('driverComponent_sitInVehicle', this._sitInVehicle);
	},

	_control: function(ctx) {
		if (ige.input.actionState('accelerate')) {
			this.driver.driveableE.driveable.state.velocity += 0.1;
		} else if (ige.input.actionState('decelerate')) {
			this.driver.driveableE.driveable.state.velocity -= 0.05;
		} else {
			this.driver.driveableE.driveable.state.velocity = 0;
		}
	},

	_sitInVehicle: function(ctx) {
		this.translateTo(this.driver.driveableE._translate.x,this.driver.driveableE._translate.y, 0);
	},

	groupCollisionsWithDriveable: function() {
		collision_group = -1;
		this.driveableE.set_collision_group(collision_group);
	}
});