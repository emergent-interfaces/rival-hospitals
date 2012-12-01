var Cursor = IgeEntity.extend({
	classId: 'Cursor',

	init: function() {
		var self = this;
		this._super();
		this.drawBounds(false);

		self.addComponent(IgeAnimationComponent);

		self._characterTexture = new IgeCellSheet('./assets/images/cursor.svg', 2, 1);
		self._characterTexture.on('loaded', function() {
			self.texture(self._characterTexture).dimensionsFromCell();
		}, false, true)

		this.cell(0);

		this.addBehaviour('followMouse', this.followMouse);
	},

	followMouse: function(ctx) {
		this._translate.x = ige._mousePos.x + ige._currentCamera._translate.x;
		this._translate.y = ige._mousePos.y + ige._currentCamera._translate.y;
		console.log
	}
})