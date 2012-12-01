var PlayerComponent = IgeClass.extend({
	classId: 'PlayerComponent',
	componentId: 'player',

	init: function(entity, options) {
		var self = this;
		this._entity = entity;
		this._options = options;

		ige.input.mapAction('walkLeft', ige.input.key.a);
		ige.input.mapAction('walkRight', ige.input.key.d);
		ige.input.mapAction('walkUp', ige.input.key.w);
		ige.input.mapAction('walkDown', ige.input.key.s);
		ige.input.on('keyUp', function (event, keyCode) { self._keyUp(event, keyCode); });

		this._entity.addBehaviour('playerComponent_move', this._move);
		this._entity.addBehaviour('playerComponent_look', this._look);

		this.target = {x: 0, y: 0, angle: 0, range: 0};
	},

	_keyUp: function (event, keyCode) {
		// Do something
	},

	_look: function (ctx) {
		var x = null, y = null;

		mouse_x = ige._mousePos.x + ige._currentCamera._translate.x;
		mouse_y = ige._mousePos.y + ige._currentCamera._translate.y;

		this.player.target.x = mouse_x - this._translate.x;
		this.player.target.y = mouse_y - this._translate.y;
		this.player.target.angle = Math.atan2(this.player.target.y, this.player.target.x);
		this.player.target.range = Math.sqrt(Math.pow(this.player.target.x, 2) + Math.pow(this.player.target.y, 2));

		this.look_towards(this.player.target.angle);
	},

	_move: function (ctx) {
		var vel = 6;
		var direction = '';

		if (ige.input.actionState('walkUp')) { direction += 'N'; }
		if (ige.input.actionState('walkDown')) { direction += 'S'; }
		if (ige.input.actionState('walkLeft')) { direction += 'W'; }
		if (ige.input.actionState('walkRight')) { direction += 'E'; }

		var directionMap = {};
		directionMap["S"] = 90 * Math.PI/180;
		directionMap["SW"] = 135 * Math.PI/180;
		directionMap["W"] = 180 * Math.PI/180;
		directionMap["NW"] = -135 * Math.PI/180;
		directionMap["N"] = -90 * Math.PI/180;
		directionMap["NE"] = -45 * Math.PI/180;
		directionMap["E"] = 0 * Math.PI/180;
		directionMap["SE"] = 45 * Math.PI/180;

		if (direction !== "" && direction in directionMap) {
			var move_angle = directionMap[direction];

			this._box2dBody.SetLinearVelocity(
				new IgePoint(Math.cos(move_angle)*vel, Math.sin(move_angle)*vel, 0)
				);
			this._box2dBody.SetAwake(true);
			this.bottom.animation.select('walk');
			
			// Walk backwards if we are looking in the opposite direction we're moving
			var angle_delta = this.player.target.angle - move_angle
			while (angle_delta <= -Math.PI) angle_delta += 2*Math.PI;
		    while (angle_delta > Math.PI) angle_delta -= 2*Math.PI;
			if (angle_delta > Math.PI/2 || angle_delta < -Math.PI/2) {
				move_angle += Math.PI;
			}

			this.align_feet(move_angle);
		} else {
			this._box2dBody.SetLinearVelocity(new IgePoint(0, 0, 0));
			this.bottom.animation.select('stand');
		}
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = PlayerComponent; }