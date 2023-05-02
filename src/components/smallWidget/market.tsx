import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useState, useEffect } from 'react';

/* types */
interface WebSocketJsonData {
	data: string;
}

interface WebSocketData {
	E: number; // 事件時間
	s: string; // 交易對
	c: string; // 最新成交價格
}

export default function Market() {
	const options: ApexOptions = {
		chart: {
			type: 'area',
			height: 350,
			zoom: {
				enabled: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'straight',
		},
		title: {
			text: 'BTC/USDT',
			align: 'left',
			style: {
				color: 'white',
				fontFamily: '@/assets/fonts/Orbitron-VariableFont_wght.ttf',
				fontSize: '15px',
			},
		},
		subtitle: {
			text: 'Real-time Price',
			align: 'left',
			style: {
				color: 'white',
				fontFamily: '@/assets/fonts/Orbitron-VariableFont_wght.ttf',
			},
		},
		xaxis: {
			type: 'datetime',
			categories: [],
		},
		yaxis: {
			opposite: true,
		},
		legend: {
			horizontalAlign: 'left',
		},
	};

	const [stroke, setStroke] = useState({
		series: [
			{
				name: 'BTCUSDT',
				data: [] as number[],
			},
		],
		options: options,
	});

	useEffect(() => {
		const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@miniTicker');

		ws.onopen = () => {
			console.log('WebSocket opened!');
		};
		ws.onmessage = (data: WebSocketJsonData) => {
			const json: WebSocketData = JSON.parse(data.data);
			addSeriesData(Math.round(+json.c), json.E);
		};
		ws.onclose = () => {
			console.log('WebSocket closed!');
		};

		return () => {
			ws.close();
		};
	}, []);

	const addSeriesData = (newPrice: number, newDate: number) => {
		setStroke((prevState: typeof stroke) => {
			if (!prevState.options.xaxis) return prevState;
			if (prevState.series[0].data.length > 100) {
				prevState.series[0].data.shift();
				prevState.options.xaxis.categories.shift();
			}

			const series = [{ name: prevState.series[0].name, data: [...prevState.series[0].data, newPrice] }];
			const xaxis = {
				...prevState.options.xaxis,
				categories: [...prevState.options.xaxis.categories, new Date(newDate).toISOString()],
			};
			return { ...prevState, series, options: { ...prevState.options, xaxis } };
		});
	};

	return (
		<div className="h-full w-full bg-[#5a5c8a] p-1">
			<ReactApexChart options={stroke.options} series={stroke.series} type="area" height={350} />
		</div>
	);
}
