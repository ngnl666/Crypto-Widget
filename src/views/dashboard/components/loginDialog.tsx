import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import GoogleIcon from '@mui/icons-material/Google';

import { SlideupTransition } from '@/components/global/slideupTransition';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/redux/reducers/alert';
import { setUser } from '@/redux/reducers/user';
import { signInWithGoogle, signInWithEmail } from '@/api/firebase/auth';
import { memo } from 'react';

/* Types */
interface Props {
	open: boolean;
	setShowLoginDialog: (show: boolean) => void;
}

function LoginDialog(props: Props) {
	const dispatch = useDispatch();
	const e_mail = 'dadada880131@gmail.com';
	const pwd = 'asdf5678';

	const signIn = async (type: 'email' | 'google') => {
		const userInfo = await (type === 'email' ? signInWithEmail(e_mail, pwd) : signInWithGoogle());
		if (userInfo) {
			localStorage.setItem('user', JSON.stringify(userInfo));
			dispatch(setUser(userInfo));
			dispatch(setAlert('登入成功', 'success'));
		} else {
			dispatch(setAlert('登入失敗', 'error'));
		}
		props.setShowLoginDialog(false);
	};

	return (
		<div>
			<Dialog
				open={props.open}
				TransitionComponent={SlideupTransition}
				keepMounted
				onClose={() => props.setShowLoginDialog(false)}
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
					<Button onClick={() => props.setShowLoginDialog(false)}>
						<p className="font-main text-white">Close</p>
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default memo(LoginDialog);
