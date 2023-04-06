import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BarChartIcon from '@mui/icons-material/BarChart';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AppsIcon from '@mui/icons-material/Apps';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import type SvgIcon from '@mui/material/SvgIcon/SvgIcon';

import GridSystem from './components/gridSystem';
import { NavBtn } from './components/navBtn';
import { LoginDialog } from './components/loginDialog';
import { CollectionDialog } from './components/collectionDialog';
import { GridPopper } from './components/gridPopper';
import { checkIfTokenExpired } from '@/api/firebase/auth';
import { CSSTransition } from 'react-transition-group';
import { RootState } from '@/redux/createStore';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '@/redux/reducers/alert';
import { signOut } from '@/api/firebase/auth';
import { storeGridImageAndLayout } from '@/api/firebase/grid/index';
import { CompLayout } from './components/gridSystem';
import html2canvas from 'html2canvas';
import './style.scss';

export function Dashboard() {
	const [showNav, setShowNav] = useState<boolean>(false);
	const [user, setUser] = useState<RootState['user']>();
	const [selectedLayout, setSelectedLayout] = useState<CompLayout[]>([]);
	const [showCollectionDialog, setShowCollectionDialog] = useState<boolean>(false);
	const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
	const [showPopper, setShowPopper] = useState<boolean>(false);
	const [clearLayout, setClearLayout] = useState<boolean>(false);

	const dispatch = useDispatch();
	const userStore = useSelector((state: RootState) => state.user);
	const nodeRef = useRef(null);
	const gridRef = useRef(null);
	const layoutRef = useRef(null);
	const popperRef = useRef(null);
	interface IconComp {
		comp: typeof SvgIcon;
		id: number;
	}

	interface SideItem extends IconComp {
		name: 'Gas' | 'DataTable' | 'News' | 'Market';
		area: { w: number; h: number; comp: string };
	}
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
			comp: QueryStatsIcon,
			name: 'Market',
			id: 3,
			area: { w: 3, h: 8, comp: 'Market' },
		},
	];

	interface NavItem extends IconComp {
		name: 'Layout' | 'Collection' | 'Login/out';
	}
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
		const result = canvas.toDataURL('image/png');

		// store screenshot to firebase & store layout
		if (result && user && layoutRef.current) {
			const res = await storeGridImageAndLayout(user.uid, result, layoutRef.current as Array<CompLayout>);
			res ? dispatch(setAlert('收藏成功！', 'success')) : dispatch(setAlert('收藏失敗！', 'error'));
		} else {
			dispatch(setAlert('收藏失敗！', 'error'));
		}
	};

	const handleNav = async (name: NavItem['name']) => {
		if (name === 'Layout') {
			if (await checkIfTokenExpired()) {
				dispatch(setAlert('Token 已過期，請重新登入！', 'warning'));
				setShowLoginDialog(true);
				return;
			}
			setShowNav((prev) => !prev);
		}
		if (name === 'Collection') {
			if (user?.uid) {
				setShowCollectionDialog(true);
			} else {
				dispatch(setAlert('Token 已過期，請重新登入！', 'warning'));
				setShowLoginDialog(true);
			}
		}
		if (name === 'Login/out') {
			if (user?.uid) {
				await signOut();
				localStorage.removeItem('user');
				setShowNav(false);
				dispatch(setAlert('登出成功！', 'success'));
				setUser(undefined);
			} else {
				setShowLoginDialog(true);
			}
		}
	};

	useEffect(() => {
		setUser(userStore);
	}, [userStore]);

	return (
		<>
			<CSSTransition nodeRef={nodeRef} in={showNav} timeout={1000} unmountOnExit appear classNames="slide">
				{/* sidebar */}
				<div
					ref={nodeRef}
					className="fixed top-0 bottom-0 left-0 w-20 rounded-tr-xl rounded-br-xl bg-[#1d1e1f]/80 pt-10 duration-300"
				>
					<menu>
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
					</menu>
				</div>
			</CSSTransition>
			<div className="mx-auto w-[60%] pt-24 font-main">
				{/* navBar */}
				<nav className="mb-6 flex justify-between rounded-md bg-secondary py-4 px-6">
					<ul className="flex gap-x-3 text-xl">
						{showNav && (
							<div className="flex gap-x-3 self-center" ref={popperRef}>
								<CheckCircleIcon className="cursor-pointer text-green-400 hover:opacity-80" onClick={() => setShowPopper(true)} />
								<CancelIcon className="cursor-pointer text-red-500 hover:opacity-80" onClick={() => setClearLayout(true)} />
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
						<p className="text-white">{user?.displayName || 'Please SignIn'}</p>
						<div className="h-10 w-10 overflow-hidden rounded-full border-2 border-secondary/60 bg-white">
							{user?.photoURL ? (
								<img className="h-full w-full rounded-full" src={user?.photoURL} alt="user" />
							) : (
								<PersonIcon className="!h-full !w-full text-[#3e4063]" />
							)}
						</div>
					</div>
				</nav>
				<div ref={gridRef}>
					<GridSystem
						ref={layoutRef}
						showNav={showNav}
						clearLayout={clearLayout}
						setClearLayout={setClearLayout}
						selectedLayout={selectedLayout}
					></GridSystem>
				</div>
				<CollectionDialog
					open={showCollectionDialog}
					setShowCollectionDialog={setShowCollectionDialog}
					setSelectedLayout={setSelectedLayout}
				/>
				<LoginDialog open={showLoginDialog} setShowLoginDialog={setShowLoginDialog} />
				<GridPopper open={showPopper} popperRef={popperRef} closePopper={closePopper} />
			</div>
		</>
	);
}
