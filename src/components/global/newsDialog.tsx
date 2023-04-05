import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import { SlideupTransition } from '@/components/global/slideupTransition';
import { News } from '../smallWidget/news';
import { Link } from 'react-router-dom';

interface Props {
	open: boolean;
	news: News | null;
	setOpenDialog: (open: boolean) => void;
}

export default function NewsDialog(props: Props) {
	return (
		<>
			<div>
				<Dialog
					open={props.open}
					TransitionComponent={SlideupTransition}
					keepMounted
					maxWidth="md"
					scroll="body"
					onClose={() => props.setOpenDialog(false)}
					aria-describedby="alert-dialog-slide-description"
					PaperProps={{
						style: {
							backgroundColor: '#3E4063',
						},
					}}
				>
					<DialogTitle>
						<Link to="/news" className="flex items-center text-base text-slate-400 hover:underline">
							<TurnLeftIcon /> <p className="pt-1">所有新聞</p>
						</Link>
						<p className="text-center tracking-wider text-white">{props.news?.title}</p>
					</DialogTitle>
					<DialogContent>
						<p className="text-center text-base text-slate-400">
							‘‘ 以下文章皆由本人透過爬蟲取得，圖片或文字出現不完整屬正常現象！’’
						</p>
						<div className="mt-4 flex justify-between">
							<div className="flex gap-x-2">
								{props.news?.category.map((tag, index) => (
									<div key={index} className="self-center rounded-md bg-slate-600 px-2 py-1 font-main text-xs text-slate-400">
										{tag}
									</div>
								))}
							</div>
							<div>
								<p className="text-base text-slate-400">{props.news?.date}</p>
								<a href={props.news?.link} target="_blank" className="text-base text-slate-400 underline" rel="noreferrer">
									原始文章
								</a>
							</div>
						</div>
						<div className="overflow-hidden text-slate-200" dangerouslySetInnerHTML={{ __html: props.news?.content || '' }}></div>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => props.setOpenDialog(false)}>
							<p className="font-main text-white">Close</p>
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</>
	);
}
