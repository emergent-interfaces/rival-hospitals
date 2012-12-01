var Client = IgeClass.extend({
	classId: 'Client',

	init: function() {
		ige.showStats(1);
		ige.globalSmoothing(true);

		var self = this;
		this.obj = [];

		ige.createFrontBuffer(true);

		ige.addComponent(IgeBox2dComponent)
			.box2d.sleep(true)
			.box2d.gravity(0, 0)
			.box2d.createWorld()
			.box2d.start();

		self.textures = {};
		self.textures.tiles = new IgeCellSheet('./assets/images/tiles.png', 8, 8);

		ige.on('texturesLoaded', function() {
			ige.start(function (success) {
				if (success) {
					self.mainScene = new IgeScene2d()
						.id('mainScene');

					self.scene1 = new IgeScene2d()
						.id('scene1')
						.layer(0)
						.mount(self.mainScene);

					self.vp1 = new IgeViewport().id('vp1')
						.autoSize(true)
						.scene(self.mainScene)
						.drawBounds(false)
						.mount(ige);

					self.backgroundLayer = new IgeTextureMap().id('background')
						.depth(0)
						.tileWidth(64).tileHeight(64)
						.drawBounds(false)
						.mount(self.scene1);
					self.backgroundLayer.addTexture(self.textures.tiles);

					self.backgroundLayer.paintTile(0, 2, 0, 57);
					self.backgroundLayer.paintTile(1, 2, 0, 57);
					self.backgroundLayer.paintTile(2, 2, 0, 57);
					self.backgroundLayer.paintTile(3, 2, 0, 57);
					self.backgroundLayer.paintTile(4, 2, 0, 58);
					self.backgroundLayer.paintTile(4, 1, 0, 50);

					self.medic = new TwistableCharacter()
						.id('medic1')
						.addComponent(PlayerComponent)
						.box2dBody({
							type: 'dynamic',
							linearDamping: 0.0,
							angularDamping: 0.0,
							allowSleep: true,
							bullet: true,
							gravitic: true,
							fixedRotation: true,
							fixtures: [{
								density: 1.0,
								friction: 0.5,
								restitution: 0.2,
								shape: {
									type: 'rectangle'
								}
							}]
						})
						.drawBounds(false)
						.mount(self.scene1);

					self.cursorScene = new IgeScene2d()
						.id('uiScene')
						.layer(1)
						.mount(self.mainScene);

					self.cursor = new Cursor()
						.id('cursor1')
						.mount(self.cursorScene);

					// Look at the player
					self.vp1.camera.lookAt(self.medic);
					self.vp1.camera.trackTranslate(self.medic, 10);

					// For testing
					ige.sceneGraph();
				} else {

				}
			});
		});
	}
});