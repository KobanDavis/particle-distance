import { Vector, Canvas, Rectangle } from '@kobandavis/canvas'

interface Dot {
	computedDistance: Vector
}

class Dot {
	constructor(
		private _position: Vector,
		private _boundary: Rectangle,
		private _direction: Vector,
		private _velocity: number,
		private _radius: number
	) {
		this.computedDistance = new Vector(_direction).scale(_velocity)
	}
	public draw(ctx: CanvasRenderingContext2D): void {
		this.move()
		this.show(ctx)
	}

	public getPosition(): Vector {
		return this._position
	}

	private move() {
		const invertX = () => this.computedDistance.setX(-this.computedDistance.position.x)
		const invertY = () => this.computedDistance.setY(-this.computedDistance.position.y)
		if (this._boundary.contains(this._position.position)) {
			this._position.add(this.computedDistance)
		} else {
			if (this._position.position.x < 0) invertX()
			if (this._position.position.x > this._boundary.width) invertX()
			if (this._position.position.y < 0) invertY()
			if (this._position.position.y > this._boundary.height) invertY()
			this._position.add(this.computedDistance)
		}
	}

	private show(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = 'white'
		Canvas.circle(ctx, this._position.position, this._radius)
	}
}

export default Dot
