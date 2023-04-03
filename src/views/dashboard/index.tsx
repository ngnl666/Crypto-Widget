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
import type SvgIcon from '@mui/material/SvgIcon/SvgIcon';

import { GridSystem } from './components/gridSystem';
import { NavBtn } from './components/navBtn';
import { SlideupDialog } from './components/slideupDialog';
import { checkIfTokenExpired } from '@/api/firebase/auth';
import { CSSTransition } from 'react-transition-group';
import { RootState } from '@/redux/createStore';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '@/redux/reducers/alert';
import './style.scss';

export function Dashboard() {
	const [showNav, setShowNav] = useState<boolean>(false);
	const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
	const [user, setUser] = useState<RootState['user']>();

	const dispatch = useDispatch();
	const userStore = useSelector((state: RootState) => state.user);
	const nodeRef = useRef(null);
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
			area: { w: 1, h: 1, comp: 'Gas' },
		},
		{
			comp: BarChartIcon,
			name: 'DataTable',
			id: 1,
			area: { w: 3, h: 2, comp: 'DataTable' },
		},
		{
			comp: NewspaperIcon,
			name: 'News',
			id: 2,
			area: { w: 2, h: 3, comp: 'News' },
		},
		{
			comp: QueryStatsIcon,
			name: 'Market',
			id: 3,
			area: { w: 3, h: 3, comp: 'Market' },
		},
	];

	interface NavItem extends IconComp {
		name: 'Layout' | 'Collection' | 'Login';
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
			name: 'Login',
			id: 2,
		},
	];

	const handleNav = async (name: NavItem['name']) => {
		if (name === 'Layout') {
			if (await checkIfTokenExpired()) {
				dispatch(setAlert('Token 已過期，請重新登入！', 'warning'));
				setShowLoginDialog((prev) => !prev);
				return;
			}
			setShowNav((prev) => !prev);
		}
		// if (name === 'Collection') setShowNav((prev) => !prev);
		if (name === 'Login') {
			setShowLoginDialog((prev) => !prev);
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
						{navList.map((Component) => (
							<NavBtn key={Component.id} onClick={() => handleNav(Component.name)}>
								<Component.comp />
								<p>{Component.name}</p>
							</NavBtn>
						))}
					</ul>
					<div className="flex items-center gap-x-4 font-main-bold text-xl">
						<p className="text-white">{user?.displayName || 'User01'}</p>
						<div className="h-10 w-10 overflow-hidden rounded-full border-2 border-secondary/60 bg-white">
							{user?.photoURL ? (
								<img className="h-full w-full rounded-full" src={user?.photoURL} alt="user" />
							) : (
								<PersonIcon className="!h-full !w-full text-[#3e4063]" />
							)}
						</div>
					</div>
				</nav>
				<GridSystem showNav={showNav}></GridSystem>
				<SlideupDialog open={showLoginDialog} />
			</div>
		</>
	);
}
