import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BarChartIcon from '@mui/icons-material/BarChart';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PersonIcon from '@mui/icons-material/Person';
import AppsIcon from '@mui/icons-material/Apps';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LoginIcon from '@mui/icons-material/Login';

import { GridSystem } from './components/gridSystem';
import { CSSTransition } from 'react-transition-group';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import './style.css';

export function Dashboard() {
	const [showNav, setShowNav] = useState<boolean>(false);
	const nodeRef = useRef(null);

	return (
		<>
			<CSSTransition nodeRef={nodeRef} in={showNav} timeout={1000} unmountOnExit classNames="slide">
				<div
					ref={nodeRef}
					className="fixed top-0 bottom-0 left-0 w-20 rounded-tr-xl rounded-br-xl bg-[#1d1e1f]/80 pt-10 duration-300"
				>
					<nav>
						<List className="flex flex-col items-center gap-y-6">
							<ListItem className="h-12 !w-12 cursor-pointer rounded-xl bg-secondary" draggable="true" disablePadding>
								<ListItemIcon className="flexCenter !min-w-full">
									<LocalGasStationIcon className=" text-white" />
								</ListItemIcon>
							</ListItem>
							<ListItem className="h-12 !w-12 cursor-pointer rounded-xl bg-secondary" draggable="true" disablePadding>
								<ListItemIcon className="flexCenter !min-w-full">
									<BarChartIcon className=" text-white" />
								</ListItemIcon>
							</ListItem>
							<ListItem className="h-12 !w-12 cursor-pointer rounded-xl bg-secondary" draggable="true" disablePadding>
								<ListItemIcon className="flexCenter !min-w-full">
									<NewspaperIcon className=" text-white" />
								</ListItemIcon>
							</ListItem>
							<ListItem className="h-12 !w-12 cursor-pointer rounded-xl bg-secondary" draggable="true" disablePadding>
								<ListItemIcon className="flexCenter !min-w-full">
									<QueryStatsIcon className=" text-white" />
								</ListItemIcon>
							</ListItem>
						</List>
					</nav>
				</div>
			</CSSTransition>
			<div className="mx-auto w-[60%] pt-24 font-main">
				<nav className="mb-6 flex justify-between rounded-md bg-secondary py-4 px-6">
					{/* navList */}
					<ul className="flex gap-x-3 text-xl">
						<NavBtn
							className="relative z-10 flex cursor-pointer items-center gap-x-1 py-2 px-3 text-white"
							onClick={() => setShowNav((prev) => !prev)}
						>
							<AppsIcon />
							<p>Layout</p>
						</NavBtn>
						<NavBtn className="relative z-10 flex cursor-pointer items-center gap-x-1 py-2 px-3 text-white">
							<CollectionsBookmarkIcon />
							<p>Collection</p>
						</NavBtn>
						<NavBtn className="relative z-10 flex cursor-pointer items-center gap-x-1 py-2 px-3 text-white">
							<LoginIcon />
							<p>Login</p>
						</NavBtn>
					</ul>
					{/* profile */}
					<div className="flex items-center gap-x-4 font-main-bold text-xl">
						<p className="text-white">Arron</p>
						<div className="h-10 w-10 rounded-full border-2 border-secondary/60 bg-white">
							<PersonIcon className="!h-full !w-full text-[#3e4063]" />
						</div>
					</div>
				</nav>
				<GridSystem></GridSystem>
			</div>
		</>
	);
}

const NavBtn = styled.li`
	transition: all 350ms cubic-bezier(0.77, 0, 0.175, 1);
	&::before,
	&::after {
		content: '';
		width: 100%;
		position: absolute;
		left: 0;
		height: 0;
		transition: inherit;
		z-index: -1;
	}
	&::before {
		top: 0;
		border-left: 1px solid #ffffff;
		border-right: 1px solid #ffffff;
	}
	&::after {
		bottom: 0;
	}
	&:hover {
		color: #3e4063;
		transition-delay: 0.15s;
		& .navIcon {
			transition-delay: 0.2s;
			color: #3e4063;
		}
		&::before,
		&::after {
			height: 100%;
		}
		&::before {
			transition-delay: 0s;
		}
		&::after {
			background-color: #ffffff;
			transition-delay: 0.08s;
		}
	}
`;
