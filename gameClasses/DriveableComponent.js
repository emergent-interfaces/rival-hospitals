var DriveableComponent = IgeClass.extend({
	classId: 'DriveableComponent',
	componentId: 'driveable',

	init: function(entity, options) {
		var self = this;
		this._entity = entity;
		this._options = options;

		entity.addComponent(IgeVelocityComponent);

		this.state = {steering: 0, velocity: 0};

		entity.addBehaviour('driverComponent_forces', this._forces);
	},

	_forces: function(ctx) {
		var vel = this.driveable.state.velocity;
		var move_angle = 0;

		this._box2dBody.ApplyImpulse(
			{
				x: this.driveable.state.velocity,
			 	y: 0
			 },
			this._box2dBody.GetWorldCenter()
			);
	}
});