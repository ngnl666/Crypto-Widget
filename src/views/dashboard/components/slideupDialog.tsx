import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import GoogleIcon from '@mui/icons-material/Google';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useEffect, useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/redux/reducers/alert';
import { setUser } from '@/redux/reducers/user';
import { signInWithGoogle, signInWithEmail } from '@/api/firebase/auth';

interface Props {
	open: boolean;
}

// handle the slide transition for the dialog
const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export function SlideupDialog(props: Props) {
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();
	const e_mail = 'dadada880131@gmail.com';
	const pwd = 'asdf5678';

	const handleClose = () => setOpen(false);

	const signIn = async (type: 'email' | 'google') => {
		const userInfo = await (type === 'email' ? signInWithEmail(e_mail, pwd) : signInWithGoogle());
		if (userInfo) {
			localStorage.setItem('user', JSON.stringify(userInfo));
			dispatch(setUser(userInfo));
			dispatch(setAlert('登入成功', 'success'));
		} else {
			dispatch(setAlert('登入失敗', 'error'));
		}
		handleClose();
	};

	useEffect(() => {
		setOpen(true);
	}, [props.open]);

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				PaperProps={{
					style: {
						backgroundColor: '#3E4063',
					},
				}}
			>
				<DialogTitle>
					<p className="tracking-wider text-white	">選擇登入方式</p>
				</DialogTitle>
				<DialogContent>
					<div className="flex flex-col gap-y-8 px-16">
						<Button variant="contained" endIcon={<SendIcon />} onClick={() => signIn('email')}>
							使用 Demo 帳號登入
						</Button>
						<Button color="info" variant="contained" endIcon={<GoogleIcon />} onClick={() => signIn('google')}>
							使用 Google 登入
						</Button>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>
						<p className="font-main text-white">Close</p>
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
