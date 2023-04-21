import Button from '@mui/material/Button';
import NewsDialog from '@/components/global/newsDialog';
import useOnScreen from '@/hooks/useOnScreen';
import useDebounce from '@/hooks/useDebounce';
import type { DocumentData } from 'firebase/firestore';
import type { News } from '@/components/smallWidget/news';
import { NewsCard } from './components/newsCard';
import { getNews } from '@/api/firebase/news';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export default function AllNews() {
	const [news, setNews] = useState<News[]>([]);
	const [selectedNews, setSelectedNews] = useState<News | null>(null);
	const [lastNews, SetLastNews] = useState<DocumentData>();
	const [openDialog, setOpenDialog] = useState(false);
	const bottomRef = useRef(null);
	const visible: boolean = useOnScreen(bottomRef);

	const openDialogHandler = (news: News) => {
		setSelectedNews(news);
		setOpenDialog(true);
	};

	const getNewsData = async (last?: DocumentData) => {
		const [news, lastData] = (await getNews(last)) as [News[], DocumentData];
		setNews((prev) => [...prev, ...news]);
		SetLastNews(lastData);
	};

	// custom hook to debounce the fetchTags action (Performence optimization !)
	useDebounce(
		() => {
			if (visible && lastNews) getNewsData(lastNews);
		},
		500,
		[visible],
	);

	useEffect(() => {
		getNewsData();
	}, []);

	return (
		<>
			<div className="pt-16 text-center">
				<Link to="/dashboard">
					<Button variant="contained" sx={{ background: '#3E4063' }}>
						回到首頁
					</Button>
				</Link>
			</div>
			<div className="mt-8 font-main">
				{news.length && news.map((item) => <NewsCard key={item.url} openDialogHandler={openDialogHandler} news={item} />)}
				<div ref={bottomRef} className="h-10 w-full"></div>
			</div>
			<NewsDialog news={selectedNews} setOpenDialog={setOpenDialog} open={openDialog} />
		</>
	);
}
