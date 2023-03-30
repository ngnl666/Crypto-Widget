import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import '../style.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const GridSystem = () => {
	type HandleAddItem = (x: number, y: number, h: number, w: number) => void;

	const [layout, setLayout] = useState<Array<Layout>>([]);

	const handleAddItem: HandleAddItem = (x, y, w, h) => {
		setLayout([...layout, { i: (+new Date()).toString(), x, y, w, h }]);
	};

	return (
		<div>
			<button onClick={() => handleAddItem(0, 0, 1, 1)}>Add Item</button>
			<ResponsiveGridLayout
				className="layout bg-slate-300"
				layout={layout}
				cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
				rowHeight={30}
			>
				{layout.map((item, idx) => (
					<div key={item.i} className="bg-red-300">
						{idx}
					</div>
				))}
			</ResponsiveGridLayout>
		</div>
	);
};
