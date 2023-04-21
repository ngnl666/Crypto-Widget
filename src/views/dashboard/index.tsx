import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BarChartIcon from '@mui/icons-material/BarChart';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import DataUsageIcon from '@mui/icons-material/DataUsage';
// import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AppsIcon from '@mui/icons-material/Apps';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import type SvgIcon from '@mui/material/SvgIcon/SvgIcon';

import html2canvas from 'html2canvas';
import styled from 'styled-components';
import LoginDialog from './components/loginDialog';
import CollectionDialog from './components/collectionDialog';
import type { Layout } from 'react-grid-layout';
import { CSSTransition } from 'react-transition-group';
import { NavBtn } from './components/navBtn';
import { GridPopper } from './components/gridPopper';
import { RootState } from '@/redux/createStore';
import { setAlert } from '@/redux/reducers/alert';
import { clearUser } from '@/redux/reducers/user';
import { signOut, checkIfTokenExpired } from '@/api/firebase/auth';
import { storeGridImageAndLayout, defaultLayout } from '@/api/firebase/grid/index';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect, useCallback, Suspense, lazy } from 'react';

/* Styled Components */
const SlideMenu = styled.menu`
	&.slide-enter,
	.slide-appear {
		transform: translateX(-100%);
	}
	&.slide-enter-active {
		transform: translateX(0%);
	}
	&.slide-exit {
		transform: translateX(-100%);
	}
	&.slide-exit-active {
		transition: all 0.4s ease-out;
	}
`;

/* lazy Component */
const GridSystem = lazy(() => import('./components/gridSystem'));

/* Types */
export interface CompLayout extends Layout {
	comp?: string;
}
interface IconComp {
	comp: typeof SvgIcon;
	id: number;
}
interface SideItem extends IconComp {
	name: 'Gas' | 'DataTable' | 'News' | 'PieChart';
	area: { w: number; h: number; comp: string };
}
interface NavItem extends IconComp {
	name: 'Layout' | 'Collection' | 'Login/out';
}

export default function Dashboard() {
	const [layout, setLayout] = useState<Array<CompLayout>>([]);
	const [showNav, setShowNav] = useState<boolean>(false);
	const [showCollectionDialog, setShowCollectionDialog] = useState<boolean>(false);
	const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
	const [showPopper, setShowPopper] = useState<boolean>(false);

	const memoSetShowCollectionDialog = useCallback((value: boolean) => {
		setShowCollectionDialog(value);
	}, []);
	const memoSetShowLoginDialog = useCallback((value: boolean) => {
		setShowLoginDialog(value);
	}, []);

	const dispatch = useDispatch();
	const userStore = useSelector((state: RootState) => state.user);

	const nodeRef = useRef<HTMLDivElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const popperRef = useRef<HTMLDivElement>(null);

	const sideList: SideItem[] = [
		{
			comp: LocalGasStationIcon,
			name: 'Gas',
			id: 0,
			area: { w: 6, h: 3, comp: 'Gas' },
		},
		{
			comp: BarChartIcon,
			name: 'DataTable',
			id: 1,
			area: { w: 6, h: 6, comp: 'DataTable' },
		},
		{
			comp: NewspaperIcon,
			name: 'News',
			id: 2,
			area: { w: 3, h: 8, comp: 'News' },
		},
		{
			comp: DataUsageIcon, // QueryStatsIcon
			name: 'PieChart',
			id: 3,
			area: { w: 3, h: 8, comp: 'PieChart' },
		},
	];

	const navList: NavItem[] = [
		{
			comp: AppsIcon,
			name: 'Layout',
			id: 0,
		},
		{
			comp: CollectionsBookmarkIcon,
			name: 'Collection',
			id: 1,
		},
		{
			comp: LoginIcon,
			name: 'Login/out',
			id: 2,
		},
	];

	const closePopper = (status: boolean) => {
		if (status) screenShot();
		setShowPopper(false);
		setShowNav(false);
	};

	const screenShot = async () => {
		if (!gridRef.current) return;

		// convert ref to canvas and get img(base64)
		const canvas = await html2canvas(gridRef.current, {
			allowTaint: true,
			useCORS: true,
		});
		const imgUrl = canvas.toDataURL('image/png');

		// store screenshot to firebase & store layout
		const res = await storeGridImageAndLayout(userStore.uid, imgUrl, layout);
		res ? dispatch(setAlert('收藏成功！', 'success')) : dispatch(setAlert('收藏失敗！', 'error'));
	};

	const handleNav = async (name: NavItem['name']) => {
		const tokenExpired = await checkIfTokenExpired();

		if (tokenExpired) {
			dispatch(setAlert('Token 已過期，請重新登入！', 'warning'));
			setShowLoginDialog(true);
			return;
		}

		switch (name) {
			case 'Layout':
				setShowNav((prev) => !prev);
				break;
			case 'Collection':
				setShowCollectionDialog(true);
				break;
			case 'Login/out':
				await signOut();
				dispatch(setAlert('登出成功！', 'success'));
				dispatch(clearUser());
				localStorage.removeItem('user');
				setShowNav(false);
				setLayout([]);
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		setLayout((prev) => prev.map((item) => ({ ...item, static: !showNav, isDraggable: showNav })));
	}, [showNav]);

	useEffect(() => {
		if (userStore.uid) setLayout(defaultLayout);
	}, [userStore.uid]);

	return (
		<>
			<CSSTransition nodeRef={nodeRef} in={showNav} timeout={1000} unmountOnExit appear classNames="slide">
				{/* sidebar */}
				<SlideMenu
					ref={nodeRef}
					className="fixed top-0 bottom-0 left-0 w-20 rounded-tr-xl rounded-br-xl bg-[#1d1e1f]/80 pt-10 duration-300"
				>
					<List className="flex flex-col items-center gap-y-6">
						{sideList.map((Component) => (
							<Tooltip title={Component.name} placement="right" key={Component.id}>
								<ListItem
									className="h-12 !w-12 translate-x-0 translate-y-0 cursor-pointer rounded-xl bg-secondary"
									draggable="true"
									disablePadding
									onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify(Component.area))}
								>
									<ListItemIcon className="flexCenter !min-w-full">
										<Component.comp className="text-white" />
									</ListItemIcon>
								</ListItem>
							</Tooltip>
						))}
					</List>
				</SlideMenu>
			</CSSTransition>
			<div className="mx-auto w-[60%] pt-24 font-main">
				{/* navBar */}
				<nav className="mb-6 flex justify-between rounded-md bg-secondary py-4 px-6">
					<ul className="flex gap-x-3 text-xl">
						{showNav && (
							<div className="flex gap-x-3 self-center" ref={popperRef}>
								<CheckCircleIcon className="cursor-pointer text-green-400 hover:opacity-80" onClick={() => setShowPopper(true)} />
								<CancelIcon className="cursor-pointer text-red-500 hover:opacity-80" onClick={() => setLayout([])} />
								<span className="text-white">|</span>
							</div>
						)}
						{navList.map((Component) => (
							<NavBtn key={Component.id} onClick={() => handleNav(Component.name)}>
								<Component.comp />
								<p>{Component.name}</p>
							</NavBtn>
						))}
					</ul>
					<div className="flex items-center gap-x-4 font-main-bold text-xl">
						<p className="text-white">{userStore.displayName || 'Please SignIn'}</p>
						<div className="h-10 w-10 overflow-hidden rounded-full border-2 border-secondary/60 bg-white">
							{userStore.photoURL ? (
								<img className="h-full w-full rounded-full" src={userStore.photoURL} alt="user" />
							) : (
								<PersonIcon className="!h-full !w-full text-[#3e4063]" />
							)}
						</div>
					</div>
				</nav>
				<main ref={gridRef}>
					{layout.length === 0 && !showNav ? (
						<div className="flexCenter h-80 w-full bg-secondary/60 hover:bg-[#5e6089]/60">
							<p className="text-2xl text-white">點擊Layout 並拖曳側欄Icon</p>
						</div>
					) : (
						<Suspense fallback={<div className="flexCenter h-80 w-full animate-pulse bg-secondary/60"></div>}>
							<GridSystem layout={layout} setLayout={setLayout} />
						</Suspense>
					)}
				</main>
				<CollectionDialog
					open={showCollectionDialog}
					setShowCollectionDialog={memoSetShowCollectionDialog}
					setLayout={setLayout}
				/>
				<LoginDialog open={showLoginDialog} setShowLoginDialog={memoSetShowLoginDialog} />
				<GridPopper popperRef={popperRef} open={showPopper} closePopper={closePopper} />
			</div>
		</>
	);
}
