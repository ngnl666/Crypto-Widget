import { getUserWalletDoc } from '@/api/firebase/icons';
import { RootState } from '@/redux/createStore';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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

export default function Market() {
	const userStore = useSelector((state: RootState) => state.user);
	const [pieChart, setPieChart] = useState<any>({});

	useEffect(() => {
		async function getUserWallet(uid: string) {
			const datas = await getUserWalletDoc(uid);

			datas &&
				setPieChart({
					series: datas.map((item) => item.value),
					options: {
						chart: {
							width: 380,
							type: 'pie',
						},
						labels: datas.map((item) => item.currency),
						responsive: [
							{
								breakpoint: 480,
								options: {
									chart: {
										width: 200,
									},
									legend: {
										position: 'bottom',
									},
								},
							},
						],
					},
				});
		}
		getUserWallet(userStore.uid);
	}, []);

	return (
		<div className="flexCenter h-full w-full bg-secondary">
			{pieChart.series && <StyledReactApexChart options={pieChart.options} series={pieChart.series} type="pie" width={380} />}
		</div>
	);
}
