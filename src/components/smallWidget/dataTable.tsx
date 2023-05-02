import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import CoinList from '@/assets/data/coin';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
	getCryptoIcon,
	getUserWalletDoc,
	addUserWalletDoc,
	updateUserWalletDoc,
	deleteUserWalletDoc,
} from '@/api/firebase/icons';
import { getPrice } from '@/api/price/index';
import { RootState } from '@/redux/createStore';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPrice } from '@/redux/reducers/price';

/* types */
interface UserWalletDoc {
	change: number;
	createdAt: Date;
	currency: { url: string; label: string };
	price: number;
	uid: string;
	value: number;
}

interface CurrencyData {
	currency: string;
	value: number | string;
}

const CssTextField = styled(TextField)({
	'& label.Mui-focused': {
		color: 'white',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: 'white',
	},
	'& .MuiInputLabel-root': {
		color: 'white',
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: 'white',
		},
		'&:hover fieldset': {
			borderColor: 'white',
		},
		'&.Mui-focused fieldset': {
			borderColor: 'white',
		},
	},
	'& .MuiInputBase-input': {
		color: 'white',
	},
});

const CssDataGrid = styled(DataGrid)({
	'.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
		outline: 'none',
	},
	'.MuiDataGrid-root .MuiDataGrid-cell:focus': {
		outline: 'none',
	},
});

const columns = (handleRow: Function): GridColDef[] => {
	return [
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
		{
			field: 'value',
			headerName: 'Value',
			width: 130,
			disableColumnMenu: true,
			valueFormatter: (params) => params.value.toLocaleString('en-US'),
		},
		{
			field: 'price',
			headerName: 'Price',
			width: 130,
			disableColumnMenu: true,
			valueFormatter: (params) => params.value.toLocaleString('en-US'),
		},
		{
			field: 'change',
			headerName: '24h Change',
			width: 130,
			align: 'right',
			sortable: false,
			disableColumnMenu: true,
			renderCell: (params) => {
				return (
					<>
						<p className={`ml-2 ${params.value > 0 ? 'text-green-500' : 'text-red-500'}`}>{params.value} %</p>
					</>
				);
			},
		},
		{
			field: 'Actions',
			headerName: 'Actions',
			width: 180,
			headerAlign: 'center',
			align: 'right',
			disableColumnMenu: true,
			renderCell: (params) => {
				return (
					<>
						<Button variant="contained" color="info" size="small" className="!mr-2" onClick={() => handleRow('edit', params.row)}>
							Edit
						</Button>
						<Button variant="contained" color="error" size="small" onClick={() => handleRow('delete', params.row)}>
							Delete
						</Button>
					</>
				);
			},
		},
	];
};

export default function DataTable() {
	const [rows, setRows] = useState<UserWalletDoc[]>([]);
	const [buttonText, setButtonText] = useState<string>('NEW');
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [newCurrencyData, setNewCurrencyData] = useState<CurrencyData>({
		currency: '',
		value: 1,
	});
	const userStore = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	const createNewCurrencyData = async (buttonText: string) => {
		if (buttonText === 'NEW') {
			setButtonText('CANCEL');
			return;
		}
		if (buttonText === 'CANCEL') {
			setNewCurrencyData({ currency: '', value: 1 });
			setButtonText('NEW');
			return;
		}
		if (buttonText === 'ADD') {
			const existCurrency = rows.find((row) => row.currency.label === newCurrencyData.currency);
			if (existCurrency) {
				isEdit ? (existCurrency.value = +newCurrencyData.value) : (existCurrency.value += +newCurrencyData.value);
				setIsEdit(false);
				await updateUserWalletDoc({ uid: userStore.uid, currency: existCurrency.currency.label, value: existCurrency.value });
			} else {
				await addUserWalletDoc({ uid: userStore.uid, currency: newCurrencyData.currency, value: +newCurrencyData.value });
			}
			setNewCurrencyData({ currency: '', value: 1 });
			setButtonText('NEW');
			await getRow(userStore.uid);
			return;
		}
	};

	const handleRow = async (type: string, row: UserWalletDoc) => {
		if (type === 'delete') {
			await deleteUserWalletDoc(userStore.uid, row.currency.label);
			await getRow(userStore.uid);
			return;
		}
		setIsEdit(true);
		setNewCurrencyData({ currency: row.currency.label, value: row.value });
		setButtonText('ADD');
	};

	const getRandomNumber = () => {
		const min = -22.5;
		const max = 22.5;
		const randomNumber = Math.random() * (max - min) + min;
		return Math.round(randomNumber * 100) / 100;
	};

	async function getRow(uid: string) {
		let datas = await getUserWalletDoc(uid);
		const res = [];
		const coins: string[] = [];

		if (datas) {
			for (const data of datas) {
				const url = (await getCryptoIcon(data.currency)) || '';
				const tempData: UserWalletDoc = {
					...data,
					currency: { url, label: data.currency },
					price: 300,
					change: getRandomNumber(),
				};
				const coin = CoinList.find((coin) => coin.symbol === data.currency);

				if (coin) coins.push(coin.id);
				tempData.currency = { url, label: data.currency };
				res.push(tempData);
			}

			const prices = await getPrice(coins);
			dispatch(setPrice(prices));
			res.forEach((row, index) => {
				row.price = prices[coins[index]].usd > 0.01 ? prices[coins[index]].usd : 0.01;
			});
		}
		setRows(res);
	}

	useEffect(() => {
		if (buttonText === 'NEW') return;
		newCurrencyData.currency && +newCurrencyData.value > 0 ? setButtonText('ADD') : setButtonText('CANCEL');
	}, [newCurrencyData]);

	useEffect(() => {
		getRow(userStore.uid);
	}, []);

	return (
		<div className="h-full w-full bg-[#5a5c8a]">
			<div className="mb-2 flex w-full items-center justify-end p-4">
				{/* insert inputs */}
				{buttonText !== 'NEW' && (
					<Box component="form" noValidate autoComplete="off" sx={{ marginRight: '40px' }}>
						<CssTextField
							label="Currency"
							variant="standard"
							size="small"
							disabled={isEdit}
							sx={{ marginRight: '20px' }}
							value={newCurrencyData.currency}
							onChange={(e) => setNewCurrencyData({ ...newCurrencyData, currency: e.target.value.toLowerCase() })}
						/>
						<CssTextField
							label="Value"
							variant="standard"
							size="small"
							type="number"
							value={newCurrencyData.value}
							onChange={(e) => setNewCurrencyData({ ...newCurrencyData, value: e.target.value })}
						/>
					</Box>
				)}
				<Button size="small" variant="contained" className="!bg-secondary" onClick={() => createNewCurrencyData(buttonText)}>
					<p className="font-main text-white">{buttonText}</p>
				</Button>
			</div>
			{Array.isArray(rows) && (
				<CssDataGrid
					sx={{
						height: '75%',
						color: 'white',
						paddingLeft: '10px',
					}}
					rows={rows}
					columns={columns(handleRow)}
					checkboxSelection={false}
					getRowId={(row) => String(row.createdAt)}
					hideFooter
				/>
			)}
		</div>
	);
}
