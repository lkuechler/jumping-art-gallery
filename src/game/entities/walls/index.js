import { BoxGeometry, MeshPhongMaterial, Mesh } from "three";

import { Entity } from "../";

export class Wall extends Entity {
	constructor(options = {}) {
		const { width = 10, height = 10 } = options;
		const geometry = new BoxGeometry(width, height, 10);
		const material = new MeshPhongMaterial({ color: 0xffffff });
		const renderEntity = new Mesh(geometry, material);
		renderEntity.receiveShadow = true;
		// renderEntity.castShadow = true;

		super({
			...options,
			position: { ...options.position, z: 5 },
			renderEntity,
			width,
			height,
			isStatic: true,
		});
		material.color.setColorName("gray");
	}
}
