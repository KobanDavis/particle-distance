import './index.less'
import Dot from './dot'
import { QuadTree, Canvas, Vector, randomRange, Rectangle } from '@kobandavis/canvas'

const { innerWidth: width, innerHeight: height } = window
const canvas = new Canvas(width, height)
const dots: Dot[] = []

for (let i = 0; i < 200; i++) {
	const position = new Vector({ x: randomRange(0, width), y: randomRange(0, height) })
	const direction = new Vector({ x: randomRange(-1, 1), y: randomRange(-1, 1) }).normalise()
	dots[i] = new Dot(position, canvas.boundary, direction, randomRange(1, 1.3), randomRange(2, 4))
}

const drawLoop = (ctx: CanvasRenderingContext2D): void => {
	canvas.resetDraw()

	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, width, height)

	const qt = new QuadTree(canvas.boundary, 2)
	for (let i = 0; i < dots.length; i++) {
		const dot = dots[i]
		qt.insert(dot.getPosition().position, dot)
		dot.draw(ctx)
	}

	for (let i = 0; i < dots.length; i++) {
		const dot = dots[i]
		const { x, y } = dot.getPosition().position
		const bound = new Rectangle(x - 50, y - 50, 100, 100)
		const points = qt.query(bound)
		for (let point of points) {
			const dist = dot.getPosition().dist(point.position)
			const alpha = dist < 1 ? 1 : 1 / (dist ** 1 / 50)
			ctx.strokeStyle = `rgba(255,255,255,${alpha})`
			ctx.beginPath()
			ctx.moveTo(x, y)
			const pointX = point.position.x
			const pointY = point.position.y
			ctx.lineTo(pointX, pointY)
			ctx.stroke()
		}
	}
}

canvas.setDrawFunction(drawLoop)
canvas.startDrawLoop()
