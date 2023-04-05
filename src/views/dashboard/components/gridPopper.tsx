import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/material';

interface Props {
	open: boolean;
	popperRef: React.RefObject<HTMLDivElement>;
	closePopper: (status: boolean) => void;
}

export function GridPopper(props: Props) {
	const id = props.open ? 'transition-popper' : undefined;

	return (
		<div>
			<Popper id={id} open={props.open} anchorEl={props.popperRef.current} transition>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={{ enter: 350 }}>
						<Box sx={{ border: 1, p: 1, bgcolor: '#1f253d', color: 'white' }}>
							<p>要收藏此版面嗎？</p>
							<Button variant="text" sx={{ color: 'white' }} onClick={() => props.closePopper(true)}>
								確定
							</Button>
							<Button variant="text" onClick={() => props.closePopper(false)}>
								取消
							</Button>
						</Box>
					</Fade>
				)}
			</Popper>
		</div>
	);
}
