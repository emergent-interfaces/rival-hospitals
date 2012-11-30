var TwistableCharacter = IgeEntityBox2d.extend({
	classId: 'TwistableCharacter',

	init: function() {
		var self = this;
		this._super();

		this.top = new TwistableTop().mount(this);
		this.bottom = new TwistableBottom().mount(this);

		self.addComponent(IgeAnimationComponent)
			.addComponent(IgeVelocityComponent)
			.depth(1);
	},

	tick: function(ctx) {
		this.depth(this._translate.y);
		this._super(ctx);
	},

	look_towards: function(angle) {
		this.top.rotateTo(0, 0, -angle);
	},

	align_feet: function(angle) {
		this.bottom.rotateTo(0, 0, angle);
	},

	destroy: function() {
		if (this._characterTexture) {
			this._characterTexture.destroy();
		}

		this._super();
	}
});