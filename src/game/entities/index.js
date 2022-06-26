import { Mesh, BoxGeometry, MeshBasicMaterial } from "three";
import Matter from "matter-js";
import { v4 as uuidV4 } from "uuid";

const defaultGeometry = new BoxGeometry(10, 10, 10);
const defaultMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
const defaultRenderEntity = new Mesh(defaultGeometry, defaultMaterial);

export class Entity {
	constructor(options = {}) {
		const {
			uuid,
			position = { x: 0, y: 0, z: 0 },
			width,
			height,
			renderEntity = defaultRenderEntity,
			isStatic = false,
			circle = false,
			withoutPhysics = false,
		} = options;
		this.withoutPhysics = withoutPhysics;
		this.uuid = uuid || uuidV4();
		this.renderEntity = renderEntity;

		this.renderEntity.position.x = position.x || 0;
		this.renderEntity.position.y = position.y * -1 || 0;
		this.renderEntity.position.z = position.z || 0;

		if (!withoutPhysics) {
			this.physicsEntity = circle
				? Matter.Bodies.polygon(
						position.x || 0,
						position.y || 0,
						50,
						width
				  )
				: Matter.Bodies.rectangle(
						position.x || 0,
						position.y || 0,
						width,
						height
				  );
			Matter.Body.setStatic(this.physicsEntity, isStatic);
		}
	}

	animate() {
		if (!this.withoutPhysics) {
			this.renderEntity.position.x = this.physicsEntity.position.x;
			this.renderEntity.position.y = this.physicsEntity.position.y * -1;
		}
	}
}
