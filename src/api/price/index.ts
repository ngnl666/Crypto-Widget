enum Api {
	price = 'https://api.coingecko.com/api/v3/simple/price',
}

export const getPrice = async (coins: string[]) => {
	const currency = coins.join(',');
	const res = await fetch(`${Api.price}?vs_currencies=usd&ids=${currency}`)
		.then((res) => res.json())
		.then((data) => data);
	return res;
};
