import Matter from "matter-js";
import { BoxGeometry, MeshPhongMaterial, Mesh } from "three";

import { Entity } from "../";

const width = 6;
const height = 12;
const geometry = new BoxGeometry(width, height, 5);
const material = new MeshPhongMaterial({ color: 0xffff00 });
const renderEntity = new Mesh(geometry, material);
renderEntity.receiveShadow = true;
renderEntity.castShadow = true;

export class Player extends Entity {
	constructor(options = {}) {
		super({
			...options,
			position: { ...options.position, z: 5 },
			renderEntity,
			width,
			height,
			geometry,
			material,
		});
		material.color.setColorName("red");
		this.physicsEntity.inertia = Infinity;
		this.physicsEntity.inverseInertia = 0;
		this.physicsEntity.friction = 1;
	}

	handleInput(inputs) {
		if (inputs.up) {
			this.jumping = true;
			if (
				this.physicsEntity.velocity.y < 0.05 &&
				this.physicsEntity.velocity.y > -0.05
			) {
				Matter.Body.setVelocity(this.physicsEntity, {
					x: this.physicsEntity.velocity.x,
					y: -8,
				});
			}
		}
		if (inputs.left) {
			Matter.Body.setVelocity(this.physicsEntity, {
				x: -2,
				y: this.physicsEntity.velocity.y,
			});
		}
		if (inputs.right) {
			Matter.Body.setVelocity(this.physicsEntity, {
				x: 2,
				y: this.physicsEntity.velocity.y,
			});
		}
	}

	animate() {
		super.animate();
		const previousColor = material.color.getHSL({});
		previousColor.h = previousColor.h + 0.001;
		material.color.setHSL(
			previousColor.h,
			previousColor.s,
			previousColor.l
		);
	}
}
