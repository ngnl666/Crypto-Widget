export const gasPrice = async () => {
	const res = await fetch('https://api.blocknative.com/gasprices/blockprices', {
		headers: new Headers({
			Authorization: '0f542366-ab22-4224-9d54-f540f50f8003',
		}),
	})
		.then((res) => res.json())
		.then((data) => data.blockPrices[0]);
	return res;
};
