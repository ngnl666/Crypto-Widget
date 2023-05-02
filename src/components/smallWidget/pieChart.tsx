import { getUserWalletDoc } from '@/api/firebase/icons';
import { RootState } from '@/redux/createStore';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CoinList from '@/assets/data/coin';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

/* Styled Components */
const StyledReactApexChart = styled(ReactApexChart)`
	.apexcharts-legend {
		padding-right: 20px !important;
		&-text {
			color: white !important;
		}
	}
`;

export default function PieChart() {
	const userStore = useSelector((state: RootState) => state.user);
	const priceStore = useSelector((state: RootState) => state.price);
	const [pieChart, setPieChart] = useState<any>({});

	useEffect(() => {
		async function getUserWallet(uid: string) {
			const datas = await getUserWalletDoc(uid);

			datas &&
				setPieChart({
					series: datas.map((item) => {
						const coin = CoinList.find((coin) => coin.symbol === item.currency);
						if (!coin) return item.value;
						return Math.round((priceStore[coin.id]?.usd ?? 1) * item.value);
					}),
					options: {
						chart: {
							type: 'pie',
						},
						labels: datas.map((item) => item.currency),
						responsive: [
							{
								breakpoint: 2561,
								options: {
									chart: {
										width: 420,
									},
								},
							},
							{
								breakpoint: 1560,
								options: {
									chart: {
										width: 380,
									},
								},
							},
							{
								breakpoint: 1280,
								options: {
									chart: {
										width: 320,
									},
								},
							},
							{
								breakpoint: 960,
								options: {
									legend: {
										position: 'bottom',
									},
								},
							},
							{
								breakpoint: 725,
								options: {
									chart: {
										width: 280,
									},
								},
							},
						],
					},
				});
		}
		getUserWallet(userStore.uid);
	}, [priceStore]);

	return (
		<div className="flexCenter h-full w-full bg-secondary">
			{pieChart.series && <StyledReactApexChart options={pieChart.options} series={pieChart.series} type="pie" width="100%" />}
		</div>
	);
}
