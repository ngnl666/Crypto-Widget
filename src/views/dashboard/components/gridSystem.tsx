import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import type { CompLayout } from '@/views/dashboard';
import styled from 'styled-components';
import { memo, Suspense, lazy } from 'react';

/* Styled Components */
const ReactGridLayout = WidthProvider(RGL);
const StyledGridLayout = styled(ReactGridLayout)`
	&.react-grid-item {
		transition: all 200ms ease;
		transition-property: left, top;
		&.cssTransforms {
			transition-property: transform;
		}
		&.react-draggable-dragging {
			transition: none;
			z-index: 3;
			will-change: transform;
		}
		&.react-grid-placeholder {
			background: #1f253d;
			opacity: 0.35;
			transition-duration: 100ms;
			z-index: 2;
			user-select: none;
		}
	}
	&.react-grid-layout {
		transition: height 200ms ease;
		position: relative;
	}
`;

/* SmallWidget Components */
const Gas = lazy(() => import('@/components/smallWidget/gas'));
const DataTable = lazy(() => import('@/components/smallWidget/dataTable'));
const News = lazy(() => import('@/components/smallWidget/news'));
const PieChart = lazy(() => import('@/components/smallWidget/pieChart'));

/* Types */
interface Props {
	layout: CompLayout[];
	setLayout: (prev: CompLayout[]) => void;
}
type Pos = Pick<CompLayout, 'w' | 'h' | 'comp'>;

const GridSystem = (props: Props) => {
	const OnLayoutDrop = (_: Array<Layout>, layoutItem: Layout, e: DragEvent) => {
		if (e.dataTransfer) {
			if (!e.dataTransfer.getData('text/plain')) return;
			const pos: Pos = JSON.parse(e.dataTransfer.getData('text/plain'));
			props.setLayout(getNewLayoutOnDrop(props.layout, layoutItem, pos));
		}
	};

	const getNewLayoutOnDrop = (prevLayout: CompLayout[], layoutItem: Layout, pos: Pos) => {
		return [...prevLayout, { ...layoutItem, ...pos, i: (+new Date()).toString() }];
	};

	const onLayoutChange = (tempNewLayout: CompLayout[]) => {
		props.setLayout(getNewLayoutOnChange(props.layout, tempNewLayout));
	};

	const getNewLayoutOnChange = (prevLayout: CompLayout[], tempNewLayout: CompLayout[]) => {
		return prevLayout.map((item: CompLayout) => {
			const target = tempNewLayout.find((i: CompLayout) => i.i === item.i);
			if (target) {
				item.x = target?.x;
				item.y = target?.y;
			}
			return item;
		});
	};

	return (
		<>
			<StyledGridLayout
				className="bg-secondary/60"
				layout={props.layout}
				isDroppable={true}
				rowHeight={30}
				maxRows={15}
				cols={6}
				onDrop={OnLayoutDrop}
				onLayoutChange={onLayoutChange}
			>
				{props.layout.map((Component) => (
					<div key={Component.i}>
						<Suspense fallback={<div className="h-full w-full animate-pulse rounded-sm bg-primary/60"></div>}>
							{Component.comp === 'Gas' && <Gas></Gas>}
							{Component.comp === 'DataTable' && <DataTable></DataTable>}
							{Component.comp === 'News' && <News></News>}
							{Component.comp === 'PieChart' && <PieChart></PieChart>}
						</Suspense>
					</div>
				))}
			</StyledGridLayout>
		</>
	);
};

export default memo(GridSystem);
