import RGL, { WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import { defaultLayout } from '@/api/firebase/grid';
import { useState, useMemo, memo, Suspense, lazy, useEffect, forwardRef, useImperativeHandle } from 'react';
import { RootState } from '@/redux/createStore';
import { useSelector } from 'react-redux';
import '../style.scss';

export interface CompLayout extends Layout {
	comp?: string;
}

interface Props {
	showNav: boolean;
	clearLayout: boolean;
	selectedLayout: CompLayout[];
	setClearLayout: (status: boolean) => void;
}

const GridSystem = forwardRef((props: Props, ref) => {
	const userStore = useSelector((state: RootState) => state.user);
	const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);

	/* smallWidget components */
	const Gas = lazy(() => import('@/components/smallWidget/gas'));
	const DataTable = lazy(() => import('@/components/smallWidget/dataTable'));
	const News = lazy(() => import('@/components/smallWidget/news'));
	const Market = lazy(() => import('@/components/smallWidget/market'));

	type Area = Pick<CompLayout, 'w' | 'h' | 'comp'>;

	const [layout, setLayout] = useState<Array<CompLayout>>([]);

	useImperativeHandle(
		ref,
		() => ({
			layout,
		}),
		[layout],
	);

	const handleOnDrop = (_: Array<Layout>, layoutItem: Layout, e: DragEvent) => {
		if (e.dataTransfer) {
			if (!e.dataTransfer.getData('text/plain')) return;
			const area: Area = JSON.parse(e.dataTransfer.getData('text/plain'));
			setLayout((prev) => {
				return [...prev, { ...layoutItem, ...area, i: (+new Date()).toString() }];
			});
		}
	};

	const onLayoutChange = (layout: Array<CompLayout>) => {
		setLayout((prev: Layout[]) => {
			return prev.map((item: Layout) => {
				const target = layout.find((i: Layout) => i.i === item.i);
				if (target) {
					item.x = target?.x;
					item.y = target?.y;
				}
				return item;
			});
		});
	};

	useEffect(() => {
		props.clearLayout && setLayout([]);
		props.setClearLayout(false);
	}, [props.clearLayout]);

	useEffect(() => {
		setLayout((prev) => {
			return prev.map((item) => ({ ...item, static: !props.showNav, isDraggable: props.showNav }));
		});
	}, [props.showNav]);

	useEffect(() => {
		setLayout(props.selectedLayout);
	}, [props.selectedLayout]);

	useEffect(() => {
		userStore.uid && setLayout(defaultLayout);
	}, [userStore.uid]);

	return (
		<>
			{!layout.length && !props.showNav ? (
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
					onLayoutChange={onLayoutChange}
					maxRows={15}
					cols={6}
				>
					{layout.map((Component) => (
						<div key={Component.i}>
							<Suspense fallback={<div className="h-full w-full animate-pulse rounded-sm bg-primary/60"></div>}>
								{Component.comp === 'Gas' && <Gas></Gas>}
								{Component.comp === 'DataTable' && <DataTable></DataTable>}
								{Component.comp === 'News' && <News></News>}
								{Component.comp === 'Market' && <Market></Market>}
							</Suspense>
						</div>
					))}
				</ReactGridLayout>
			)}
		</>
	);
});

export default memo(GridSystem);
