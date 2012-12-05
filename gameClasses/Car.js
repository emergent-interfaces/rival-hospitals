var Car = IgeEntityBox2d.extend({
	classId: 'Car',

	init: function() {
		var self = this;
		this._super();

		self.addComponent(IgeAnimationComponent);
		self.addComponent(DriveableComponent);

		self._characterTexture = new IgeCellSheet('./assets/images/car.png', 1, 1);
		self._characterTexture.on('loaded', function() {
			self.texture(self._characterTexture).dimensionsFromCell();
		}, false, true);

		self.depth(1);

		self.box2dBody({
			type: 'dynamic',
			linearDamping: 5.0,
			angularDamping: 5.0,
			allowSleep: true,
			bullet: true,
			gravitic: true,
			fixedRotation: false,
			fixtures: [{
				density: 1.0,
				friction: 1.0,
				restitution: 0.2,
				shape: {
					type: 'rectangle'
				}
			}]
		});
	},

	set_collision_group: function(id) {
		for (var fixture = this._box2dBody.GetFixtureList();
			 fixture;
			 fixture = fixture.GetNext()) {
			var filter = fixture.GetFilterData();
			filter.groupIndex = id;
			fixture.SetFilterData(filter);
		}		
	},

	tick: function(ctx) {
		this.depth(this._translate.y);
		this._super(ctx);
	},

	destroy: function() {
		if (this._characterTexture) {
			this._characterTexture.destroy();
		}

		this._super();
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Car; }