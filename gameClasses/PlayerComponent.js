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

		this._entity.addBehaviour('playerComponent_behaviour', this._behaviour);
		this._entity.addBehaviour('playerComponent_look', this._look);

		this.target = {x: 0, y: 0, angle: 0, range: 0};
	},

	_keyUp: function (event, keyCode) {
		// Do something
	},

	_look: function (ctx) {
		if (ige._mouseOverVp) {
			mouse_x = ige._mouseOverVp._mousePos.x;
			mouse_y = ige._mouseOverVp._mousePos.y;
		} else {
			mouse_x = ige._mousePos.x;
			mouse_y = ige._mousePos.y;
		}

		this.player.target.x = mouse_x - this._translate.x;
		this.player.target.y = mouse_y - this._translate.y;
		this.player.target.angle = Math.atan2(this.player.target.x, this.player.target.y);
		this.player.target.range = Math.sqrt(Math.pow(this.player.target.x, 2) + Math.pow(this.player.target.y, 2));

		this.look_towards(this.player.target.angle);
	},

	_behaviour: function (ctx) {
		var vel = 6;
		var direction = '';

		if (ige.input.actionState('walkUp')) { direction += 'N'; }
		if (ige.input.actionState('walkDown')) { direction += 'S'; }
		if (ige.input.actionState('walkLeft')) { direction += 'W'; }
		if (ige.input.actionState('walkRight')) { direction += 'E'; }

		move_angle = null;

		switch (direction) {
			case 'S':
				this._box2dBody.SetLinearVelocity(new IgePoint(0, vel, 0));
				move_angle = 0;
				break;
			case 'SW':
				this._box2dBody.SetLinearVelocity(new IgePoint(-vel*0.707, vel*0.707, 0));
				move_angle = 45;
				break;
			case 'W':
				this._box2dBody.SetLinearVelocity(new IgePoint(-vel, 0, 0));
				move_angle = 90;
				break;
			case 'NW':
				this._box2dBody.SetLinearVelocity(new IgePoint(-vel*0.707, -vel*0.707, 0));
				move_angle = 135;
				break;
			case 'N':
				this._box2dBody.SetLinearVelocity(new IgePoint(0, -vel, 0));
				move_angle = 180;
				break;
			case 'NE':
				this._box2dBody.SetLinearVelocity(new IgePoint(vel*0.707, -vel*0.707, 0));
				move_angle = 225;
				break;
			case 'E':
				this._box2dBody.SetLinearVelocity(new IgePoint(vel, 0, 0));
				move_angle = 270;
				break;
			case 'SE':
				this._box2dBody.SetLinearVelocity(new IgePoint(vel*0.707, vel*0.707, 0));
				move_angle = 315;
				break;

			default:
				this._box2dBody.SetLinearVelocity(new IgePoint(0, 0, 0));
				this.bottom.animation.select('stand');
				break;
		}

		if (direction !== "") {
			this._box2dBody.SetAwake(true);
			this.bottom.animation.select('walk');
			this.align_feet(move_angle * Math.PI/180);
		}
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = PlayerComponent; }