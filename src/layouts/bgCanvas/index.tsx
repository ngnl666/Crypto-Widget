import { MutableRefObject, RefObject, useEffect, useRef } from 'react';
import githubWhite from '@/assets/images/githubWhite.png';

interface Imouse {
	x: number;
	y: number;
}

interface Istars extends Imouse {
	radius: number;
	vx: number;
	vy: number;
}

export function BgCanvas() {
	const canvas = useRef<HTMLCanvasElement>(null);
	const ctx = useRef<CanvasRenderingContext2D | null>(canvas.current ? canvas.current.getContext('2d') : null);

	const FPS: number = 60;
	const x: number = 70; // Number of stars
	const stars: Istars[] = [];
	const mouse: Imouse = {
		x: 0,
		y: 0,
	};

	function drawScene(ctx: MutableRefObject<CanvasRenderingContext2D | null>, canvas: RefObject<HTMLCanvasElement>) {
		if (canvas.current && ctx.current) {
			ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
			ctx.current.globalCompositeOperation = 'lighter';

			for (let i = 0, x = stars.length; i < x; i++) {
				const s = stars[i];

				ctx.current.fillStyle = '#fff';
				ctx.current.beginPath();
				ctx.current.arc(s.x, s.y, s.radius, 0, Math.PI);
				ctx.current.fill();
				ctx.current.fillStyle = 'black';
				ctx.current.stroke();
			}

			ctx.current.beginPath();

			for (let i = 0, x = stars.length; i < x; i++) {
				const starI = stars[i];
				ctx.current.moveTo(starI.x, starI.y);

				if (twoPointsdistance(mouse, starI) < 150) ctx.current.lineTo(mouse.x, mouse.y);

				for (let j = 0, x = stars.length; j < x; j++) {
					const starII = stars[j];
					if (twoPointsdistance(starI, starII) < 150) ctx.current.lineTo(starII.x, starII.y);
				}
			}

			ctx.current.lineWidth = 0.05;
			ctx.current.strokeStyle = 'white';
			ctx.current.stroke();
		}
	}

	function updateStarLocations(canvas: RefObject<HTMLCanvasElement>) {
		if (canvas.current) {
			for (let i = 0, x = stars.length; i < x; i++) {
				const s = stars[i];

				s.x += s.vx / FPS;
				s.y += s.vy / FPS;

				if (s.x < 0 || s.x > canvas.current.width) s.vx = -s.vx;
				if (s.y < 0 || s.y > canvas.current.height) s.vy = -s.vy;
			}
		}
	}

	function twoPointsdistance(point1: Istars | Imouse, point2: Istars) {
		let xs = 0;
		let ys = 0;

		xs = point2.x - point1.x;
		xs = xs * xs;

		ys = point2.y - point1.y;
		ys = ys * ys;

		return Math.sqrt(xs + ys);
	}

	/** Update and draw in per frame */
	function tick() {
		drawScene(ctx, canvas);
		updateStarLocations(canvas);
		requestAnimationFrame(tick);
	}

	function mouseTrack(e: any) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}

	useEffect(() => {
		if (canvas.current) {
			canvas.current.width = window.innerWidth;
			canvas.current.height = window.innerHeight;
			ctx.current = canvas.current.getContext('2d');

			/** Push stars to array */
			for (let i = 0; i < x; i++) {
				stars.push({
					x: Math.random() * canvas.current.width,
					y: Math.random() * canvas.current.height,
					radius: Math.random() * 1 + 1,
					vx: Math.floor(Math.random() * 50) - 25,
					vy: Math.floor(Math.random() * 50) - 25,
				});
			}

			canvas.current.addEventListener('mousemove', mouseTrack);

			tick();
		}

		return () => {
			if (canvas.current) {
				canvas.current.removeEventListener('mousemove', mouseTrack);
			}
		};
	}, []);

	return (
		<div className="absolute -z-[10] box-border min-h-[100vh] w-full overflow-hidden bg-primary">
			{/*  canvas background  */}
			<canvas ref={canvas} className="absolute top-0 left-0 -z-10"></canvas>
			<slot></slot>
			{/* copyright  */}
			<div className="absolute bottom-0 right-0 flex justify-end gap-x-3 pb-4 pr-4 text-slate-300">
				<a href="https://github.com/ngnl666/Crypto-Dashboard" target="_blank" rel="noreferrer">
					<img src={githubWhite} alt="github" className="h-5 w-5" />
				</a>
				<p>Copyright © 2023 Arron</p>
			</div>
		</div>
	);
}
