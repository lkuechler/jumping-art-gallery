import { DirectionalLight, AmbientLight } from "three";
import { Wall } from "../../entities/walls";
import { Picture } from "../../entities/picture";

export function generateLevel1(gameWorld) {
	const directionalLight = new DirectionalLight(0xffffff, 0.5);
	directionalLight.position.set(0, 1, 0.5);
	directionalLight.castShadow = true;
	directionalLight.shadow.camera.top = 500;
	directionalLight.shadow.camera.bottom = -500;
	directionalLight.shadow.camera.left = 500;
	directionalLight.shadow.camera.right = -500;
	gameWorld.scene.add(directionalLight);
	gameWorld.scene.add(new AmbientLight(0xffffff));

	gameWorld.addEntity(
		new Wall({
			width: 300,
			position: {
				x: 0,
				y: 50,
			},
		})
	);

	gameWorld.addEntity(
		new Wall({
			width: 250,
			position: {
				x: 180,
				y: 0,
			},
		})
	);

	gameWorld.addEntity(
		new Wall({
			width: 10,
			height: 40,
			position: {
				x: 145,
				y: 25,
			},
		})
	);

	const hauntedByDucksUrl = new URL(
		"images/haunted-by-ducks.jpg",
		import.meta.url
	);
	gameWorld.addEntity(
		new Picture({
			url: hauntedByDucksUrl.href,
			width: 250,
			height: 173.25,
			position: {
				x: 180,
				y: -90,
			},
		})
	);

	gameWorld.addEntity(
		new Wall({
			width: 10,
			height: 40,
			position: {
				x: 300,
				y: 25,
			},
		})
	);

	gameWorld.addEntity(
		new Wall({
			width: 40,
			height: 10,
			position: {
				x: 315,
				y: 50,
			},
		})
	);

	gameWorld.addEntity(
		new Wall({
			width: 10,
			height: 40,
			position: {
				x: 340,
				y: 65,
			},
		})
	);

	gameWorld.addEntity(
		new Wall({
			width: 400,
			height: 10,
			position: {
				x: 535,
				y: 90,
			},
		})
	);

	const hauntedByDucks2Url = new URL(
		"images/haunted-by-ducks.jpg",
		import.meta.url
	);
	gameWorld.addEntity(
		new Picture({
			url: hauntedByDucksUrl.href,
			width: 250,
			height: 173.25,
			position: {
				x: 535,
				y: 0,
			},
		})
	);
}
