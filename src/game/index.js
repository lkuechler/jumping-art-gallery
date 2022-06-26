import Matter from "matter-js";
import { WebGLRenderer, Color, Scene, PerspectiveCamera } from "three";
import Stats from "stats.js";

import { Player } from "./entities/player";
import { generateLevel1 } from "./level/level1";

const stats = new Stats();
stats.showPanel();
document.querySelector("#stats").appendChild(stats.dom);

export class GameWorld {
	physicsEngine = Matter.Engine.create();
	renderer = new WebGLRenderer();
	scene = new Scene();
	camera = new PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	player = new Player();
	entities = [];
	inputs = {
		up: false,
		down: false,
		left: false,
		right: false,
	};

	constructor() {
		this.scene.background = new Color(0xffffff);
		this.camera.position.z = 150;
		this.camera.lookAt(0, 0, 0);

		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.shadowMap.enabled = true;
		document.body.appendChild(this.renderer.domElement);

		this.addEntity(this.player);
		generateLevel1(this);

		this.animate();
		this.initControls();

		this.physicsRender = Matter.Render.create({
			element: document.querySelector("#physicsDebug"),
			engine: this.physicsEngine,
			options: {
				width: window.innerWidth,
				height: window.innerHeight,
				showPositions: true,
				hasBounds: true,
				showStats: true,
				showPerformance: true,
				showSleeping: true,
				showVelocity: true,
				showCollisions: true,
			},
		});
	}

	addEntity(entity) {
		this.entities.push(entity);
		this.scene.add(entity.renderEntity);
		if (entity.physicsEntity) {
			Matter.Composite.add(this.physicsEngine.world, [
				entity.physicsEntity,
			]);
		}
	}

	animate() {
		stats.begin();

		this.handleInputs();
		Matter.Engine.update(this.physicsEngine, 1000 / 60);
		this.entities.forEach((entity) => {
			entity.animate();
		});
		if (this.inputs.physicsDebug) {
			Matter.Render.lookAt(
				this.physicsRender,
				this.player.physicsEntity,
				{
					x: window.innerHeight / 10,
					y: window.innerWidth / 10,
				}
			);
		}
		this.camera.position.setX(this.player.renderEntity.position.x);
		this.camera.position.setY(this.player.renderEntity.position.y);
		// this.camera.position.setX(this.player.renderEntity.position.x - 100);
		// this.camera.position.setY(this.player.renderEntity.position.y);
		// this.camera.position.setZ(this.player.renderEntity.position.z);
		this.camera.lookAt(
			this.player.renderEntity.position.x,
			this.player.renderEntity.position.y,
			this.player.renderEntity.position.z
		);
		this.renderer.render(this.scene, this.camera);

		stats.end();
		requestAnimationFrame(this.animate.bind(this));
	}

	handleInputs() {
		this.player.handleInput(this.inputs);
	}

	initControls() {
		window.addEventListener("keydown", (event) => {
			switch (event.key) {
				case "w":
				case "ArrowUp":
					this.inputs.up = true;
					break;
				case "s":
				case "ArrowDown":
					this.inputs.down = true;
					break;
				case "a":
				case "ArrowLeft":
					this.inputs.left = true;
					break;
				case "d":
				case "ArrowRight":
					this.inputs.right = true;
					break;

				default:
					break;
			}
		});
		window.addEventListener("keyup", (event) => {
			switch (event.key) {
				case "w":
				case "ArrowUp":
					this.inputs.up = false;
					break;
				case "s":
				case "ArrowDown":
					this.inputs.down = false;
					break;
				case "a":
				case "ArrowLeft":
					this.inputs.left = false;
					break;
				case "d":
				case "ArrowRight":
					this.inputs.right = false;
					break;
				case "i":
					this.inputs.debug = !this.inputs.debug;
					stats.showPanel(this.inputs.debug ? 0 : -1);
					break;
				case "p":
					this.inputs.physicsDebug = !this.inputs.physicsDebug;
					if (this.inputs.physicsDebug) {
						Matter.Render.run(this.physicsRender);
						document.querySelector("#physicsDebug").style = "";
					} else {
						Matter.Render.stop(this.physicsRender);
						document.querySelector("#physicsDebug").style =
							"display: none";
					}
					break;
				default:
					break;
			}
		});
	}
}
