import RGL, { WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';

import { useState, memo, Suspense, lazy, useEffect } from 'react';
import '../style.scss';

const ReactGridLayout = WidthProvider(RGL);

export const GridSystem = memo(({ showNav }: { showNav: boolean }) => {
	/* smallWidget components */
	const Gas = lazy(() => import('@/components/smallWidget/gas'));
	// const DataTable = lazy(() => import('@/components/smallWidget/dataTable'));
	// const News = lazy(() => import('@/components/smallWidget/news'));
	// const Market = lazy(() => import('@/components/smallWidget/market'));

	interface CompLayout extends Layout {
		comp?: string;
	}
	type Area = Pick<CompLayout, 'w' | 'h' | 'comp'>;

	const [layout, setLayout] = useState<Array<CompLayout>>([
		{
			w: 1,
			h: 1,
			x: 2,
			y: 0,
			i: '1680245925282',
			moved: false,
			static: false,
			isDraggable: true,
			comp: 'Gas',
		},
	]);

	const handleOnDrop = (_: Array<Layout>, layoutItem: Layout, e: DragEvent) => {
		if (e.dataTransfer) {
			const area: Area = JSON.parse(e.dataTransfer.getData('text/plain'));
			setLayout((prev) => {
				return [...prev, { ...layoutItem, ...area, i: (+new Date()).toString() }];
			});
		}
	};

	useEffect(() => {
		// fetch('https://api.blocknative.com/gasprices/blockprices', {
		// 	headers: new Headers({
		// 		Authorization: '0f542366-ab22-4224-9d54-f540f50f8003',
		// 	}),
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => console.log(data));
	}, [layout]);

	return (
		<>
			{!layout.length && !showNav ? (
				<div className="flexCenter h-80 w-full bg-secondary/60 hover:bg-[#5e6089]/60">
					<p className="text-2xl text-white">點擊Layout 並拖曳側欄Icon</p>
				</div>
			) : (
				<ReactGridLayout
					className="bg-secondary/60"
					layout={layout}
					rowHeight={30}
					isDroppable={true}
					onDrop={handleOnDrop}
					maxRows={15}
				>
					{layout.map((Component) => (
						<div key={Component.i}>
							<Suspense fallback={<div className="h-full w-full animate-pulse rounded-sm bg-primary/60"></div>}>
								{Component.comp === 'Gas' && <Gas></Gas>}
								{Component.comp === 'DataTable' && <Gas></Gas>}
								{Component.comp === 'News' && <Gas></Gas>}
								{Component.comp === 'Market' && <Gas></Gas>}
							</Suspense>
						</div>
					))}
				</ReactGridLayout>
			)}
		</>
	);
});
