var Character = IgeEntityBox2d.extend({
	classId: 'Character',

	init: function() {
		var self = this;
		this._super();

		self.addComponent(IgeAnimationComponent)
			.addComponent(IgeVelocityComponent)
			.depth(1);

		self._characterTexture = new IgeCellSheet('./assets/images/char113.png', 3, 4);
		self._characterTexture.on('loaded', function() {
			self.texture(self._characterTexture).dimensionsFromCell();
		}, false, true);

		self.animation.define('walkDown', [1, 2, 3, 2], 8, -1);
		self.animation.define('walkLeft', [4, 5, 6, 5], 8, -1);
		self.animation.define('walkRight', [7, 8, 9, 8], 8, -1);
		self.animation.define('walkUp', [10, 11, 12, 11], 8, -1);
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

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Character; }