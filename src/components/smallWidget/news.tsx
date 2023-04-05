import Button from '@mui/material/Button';
import Carousel from 'react-material-ui-carousel';
import { useEffect, useState, memo } from 'react';
import { getNews } from '@/api/firebase/news';
import NewsDialog from '../global/newsDialog';

export interface News {
	title: string;
	content: string;
	url: string;
	date: string;
	link: string;
	category: string[];
}

const News = memo(() => {
	const [news, setNews] = useState<News[]>([]);
	const [selectedNews, setSelectedNews] = useState<News | null>(null);
	const [openDialog, setOpenDialog] = useState(false);

	const openDialogHandler = (news: News) => {
		setSelectedNews(news);
		setOpenDialog(true);
	};

	useEffect(() => {
		const getNewsData = async () => {
			const news = (await getNews(0)) as News[];
			setNews(news);
		};
		getNewsData();
	}, []);

	return (
		<>
			<div className="h-full rounded-lg bg-secondary">
				<Carousel
					className="!h-full !w-full px-2"
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
								{prev && 'Prev'}
							</Button>
						);
					}}
				>
					{news.length &&
						news.map((item) => (
							<div key={item.url} className="pt-8" onClick={() => openDialogHandler(item)}>
								<h2 className="mb-2 text-white">{item.title}</h2>
								{item.url.startsWith('data:image/') ? (
									<img
										src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
										className="min-h-[70%] w-full object-contain"
										alt="title"
									/>
								) : (
									<img
										draggable="false"
										src={item.url}
										className="!h-[260px] w-full cursor-pointer select-none object-contain"
										alt="title"
									/>
								)}
							</div>
						))}
				</Carousel>
			</div>
			<NewsDialog news={selectedNews} setOpenDialog={setOpenDialog} open={openDialog} />
		</>
	);
});

export default News;
