import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import NewsDialog from '@/components/global/newsDialog';
import { useEffect, useState, useRef } from 'react';
import { News } from '@/components/smallWidget/news';
import { getNews } from '@/api/firebase/news';
import useOnScreen from '@/hooks/useOnScreen';

export function AllNews() {
	const [news, setNews] = useState<News[]>([]);
	const [selectedNews, setSelectedNews] = useState<News | null>(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [currPage, setCurrPage] = useState(0);
	const bottomRef = useRef(null);
	const visible: boolean = useOnScreen(bottomRef);

	const openDialogHandler = (news: News) => {
		setSelectedNews(news);
		setOpenDialog(true);
	};

	const getNewsData = async () => {
		const news = (await getNews(currPage)) as News[];
		setNews((prev) => [...prev, ...news]);
		setCurrPage((prev) => prev + 1);
	};

	useEffect(() => {
		(async () => {
			await getNewsData();
		})();
	}, []);

	useEffect(() => {
		if (visible && currPage > 0) getNewsData();
	}, [visible]);

	return (
		<>
			<div className="pt-24 font-main">
				{news.length &&
					news.map((item) => (
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
							key={item.url}
							onClick={() => openDialogHandler(item)}
						>
							<CardMedia
								sx={{ height: 140 }}
								image={
									item.url.startsWith('data:image/')
										? 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'
										: item.url
								}
								title="news"
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									{item.title}
								</Typography>
								<Typography variant="body2" color="#94A3B8" component="span">
									<div
										className="overflow-hidden text-slate-200"
										dangerouslySetInnerHTML={{ __html: item.content.slice(0, 100) || '' }}
									></div>
								</Typography>
							</CardContent>
							<CardActions>
								<div className="flex gap-x-2">
									{item.category.map((tag, index) => (
										<div key={index} className="self-center rounded-md bg-slate-600 px-2 py-1 font-main text-xs text-slate-400">
											{tag}
										</div>
									))}
								</div>
							</CardActions>
						</Card>
					))}
				<div ref={bottomRef} className="h-10 w-full"></div>
			</div>
			<NewsDialog news={selectedNews} setOpenDialog={setOpenDialog} open={openDialog} />
		</>
	);
}
