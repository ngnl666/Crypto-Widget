import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Carousel from 'react-material-ui-carousel';

import { SlideupTransition } from '@/components/global/slideupTransition';
import { CompLayout } from '@/views/dashboard';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/redux/reducers/alert';
import { memo } from 'react';

/* Types */
interface Props {
	open: boolean;
	setShowCollectionDialog: (show: boolean) => void;
	setLayout: (layout: CompLayout[]) => void;
}
interface CollectionLayout {
	layout: CompLayout[];
	url: string;
}

function CollectionDialog(props: Props) {
	const dispatch = useDispatch();
	const collectionLayout: Array<CollectionLayout> | null = localStorage.getItem('grid')
		? JSON.parse(localStorage.getItem('grid')!)
		: null;

	const changeLayout = (layout: CompLayout[]) => {
		props.setLayout(layout);
		props.setShowCollectionDialog(false);
		dispatch(setAlert('已套用版面', 'success'));
	};

	return (
		<div>
			<Dialog
				open={props.open}
				TransitionComponent={SlideupTransition}
				keepMounted
				onClose={() => props.setShowCollectionDialog(false)}
				aria-describedby="alert-dialog-slide-description"
				PaperProps={{
					style: {
						backgroundColor: '#3E4063',
					},
				}}
			>
				<DialogTitle>
					<p className="text-center tracking-wider text-white">選擇版面</p>
				</DialogTitle>
				<DialogContent>
					<Carousel
						className="!w-[400px]"
						NavButton={({ onClick, className, style, next, prev }) => {
							return (
								<Button
									sx={{
										color: '#ffffff',
									}}
									size="small"
									onClick={() => onClick()}
									className={className}
									style={style}
								>
									{next && 'Next'}
									{prev && 'Previous'}
								</Button>
							);
						}}
					>
						{collectionLayout &&
							collectionLayout.map((layout) => (
								<img
									className="object-cotain min-h-[160px] w-full cursor-pointer"
									key={layout.url}
									src={layout.url}
									onClick={() => changeLayout(layout.layout)}
									alt="layout"
								/>
							))}
					</Carousel>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => props.setShowCollectionDialog(false)}>
						<p className="font-main text-white">Close</p>
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default memo(CollectionDialog);
