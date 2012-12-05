var igeClientConfig = {
	include: [
		/* Your custom game JS scripts */
		'./gameClasses/ClientNetworkEvents.js',
		'./gameClasses/Rotator.js',
		'./gameClasses/Character.js',
		'./gameClasses/TwistableCharacter.js',
		'./gameClasses/TwistableTop.js',
		'./gameClasses/TwistableBottom.js',
		'./gameClasses/PlayerComponent.js',
		'./gameClasses/Cursor.js',
		'./gameClasses/Car.js',
		'./gameClasses/DriveableComponent.js',
		'./gameClasses/DriverComponent.js',
		'./gameClasses/ActorComponent.js',
		/* Standard game scripts */
		'./client.js',
		'./index.js'
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }