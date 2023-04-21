enum Api {
	gasPrice = 'https://api.blocknative.com/gasprices/blockprices',
}

const Authorization = '0f542366-ab22-4224-9d54-f540f50f8003';

export const gasPrice = async () => {
	const res = await fetch(Api.gasPrice, {
		headers: new Headers({ Authorization }),
	})
		.then((res) => res.json())
		.then((data) => data.blockPrices[0]);
	return res;
};
