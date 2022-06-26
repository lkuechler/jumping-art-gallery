import { TextureLoader, PlaneGeometry, Mesh, MeshPhongMaterial } from "three";

import { Entity } from "../";

export class Picture extends Entity {
	constructor(options = {}) {
		const { width = 10, height = 10, position, url } = options;
		position.z = 0;

		const geometry = new PlaneGeometry(width, height);
		const map = new TextureLoader().load(url);
		const material = new MeshPhongMaterial({
			map: map,
			reflectivity: 0,
			shininess: 0,
		});
		const renderEntity = new Mesh(geometry, material);
		renderEntity.receiveShadow = true;

		super({
			...options,
			renderEntity,
			position,
			width,
			height,
			withoutPhysics: true,
		});
	}
}
