var TwistableBottom = IgeEntity.extend({
	classId: 'TwistableBottom',

	init: function() {
		var self = this;
		this._super();
		this.drawBounds(false);

		self.addComponent(IgeAnimationComponent)
			.depth(1);

		self._characterTexture = new IgeCellSheet('./assets/images/hert.svg', 4, 2);
		self._characterTexture.on('loaded', function() {
			self.texture(self._characterTexture).dimensionsFromCell();
			self.cell(5);
		}, false, true);
	}
});