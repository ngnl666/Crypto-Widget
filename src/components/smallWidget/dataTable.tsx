import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getCryptoIcon, getUserWalletDoc } from '@/api/firebase/icons';
import { RootState } from '@/redux/createStore';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface UserWalletDoc {
	change: number;
	createdAt: Date;
	currency: { url: string; label: string };
	price: number;
	uid: string;
	value: number;
}

const columns: GridColDef[] = [
	{
		field: 'currency',
		headerName: 'Currency',
		width: 150,
		renderCell: (params) => {
			return (
				<>
					<Avatar src={params.value.url} sx={{ width: 24, height: 24 }} />
					<p className="ml-2 font-main">{params.value.label}</p>
				</>
			);
		},
	},
	{ field: 'value', headerName: 'Value', width: 130, valueFormatter: (params) => params.value.toLocaleString('en-US') },
	{
		field: 'price',
		headerName: 'Price',
		width: 130,
		valueFormatter: (params) => params.value.toLocaleString('en-US'),
	},
	{
		field: 'change',
		headerName: '24h Change',
		width: 90,
		align: 'right',
		renderCell: (params) => {
			return (
				<>
					<p className={`ml-2 ${params.value > 0 ? 'text-green-500' : 'text-red-500'}`}>{params.value} %</p>
				</>
			);
		},
	},
];

const getCryptoIconUrl = async (currency: string) => {
	const url = await getCryptoIcon(currency);
	return url;
};

export default function DataTable() {
	const [rows, setRows] = useState<UserWalletDoc[]>([]);
	const userStore = useSelector((state: RootState) => state.user);

	useEffect(() => {
		async function getRow(uid: string) {
			const datas = await getUserWalletDoc(uid);
			const res = [];
			if (datas) {
				for (const data of datas) {
					const url = (await getCryptoIconUrl(data.currency)) || '';
					const tempData: UserWalletDoc = { ...data, currency: { url, label: data.currency } };
					tempData.currency = { url, label: data.currency };
					res.push(tempData);
				}
			}
			setRows(res);
		}
		getRow(userStore.uid);
	}, []);

	return (
		<div className="h-full w-full bg-[#5a5c8a]">
			{/* <Button size="small" className="-mb-4">
				<p className="font-main text-white">ADD</p>
			</Button> */}
			{Array.isArray(rows) && (
				<DataGrid
					sx={{ color: 'white', border: 'none', height: '100%' }}
					rows={rows}
					columns={columns}
					getRowId={(row) => String(row.createdAt)}
					hideFooter
					checkboxSelection
				/>
			)}
		</div>
	);
}
