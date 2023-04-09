import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { News } from '@/components/smallWidget/news';

/* Types */
interface Props {
	openDialogHandler: (news: News) => void;
	news: News;
}

export function NewsCard(props: Props) {
	return (
		<Card
			sx={{
				maxWidth: 500,
				width: 500,
				background: '#3E4063',
				color: 'white',
				paddingBottom: '10px',
				margin: 'auto',
				marginBottom: '50px',
			}}
			key={props.news.url}
			onClick={() => props.openDialogHandler(props.news)}
		>
			<CardMedia
				sx={{ height: 140 }}
				image={
					props.news.url.startsWith('data:image/')
						? 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'
						: props.news.url
				}
				title="news"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{props.news.title}
				</Typography>
				<Typography variant="body2" color="#94A3B8" component="span">
					<div
						className="overflow-hidden text-slate-200"
						dangerouslySetInnerHTML={{ __html: props.news.content.slice(0, 100) || '' }}
					></div>
				</Typography>
			</CardContent>
			<CardActions>
				<div className="flex gap-x-2">
					{props.news.category.map((tag, index) => (
						<div key={index} className="self-center rounded-md bg-slate-600 px-2 py-1 font-main text-xs text-slate-400">
							{tag}
						</div>
					))}
				</div>
			</CardActions>
		</Card>
	);
}
