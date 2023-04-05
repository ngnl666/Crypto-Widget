import { gasPrice } from '@/api/gas';
import { useEffect, useState } from 'react';

interface EstimatedPrices {
	confidence: number;
	price: number;
	maxPriorityFeePerGas: number;
	maxFeePerGas: number;
}
interface GasFee {
	blockNumber: number;
	estimatedTransactionCount: number;
	baseFeePerGas: number;
	estimatedPrices: Array<EstimatedPrices>;
}

export default function Gas() {
	const [gasFee, setGasFee] = useState<GasFee>();
	const [isUpdate, setIsUpdate] = useState<boolean>(false);

	const getGasPrice = async () => {
		const res = await gasPrice();
		setGasFee(res);
	};

	useEffect(() => {
		getGasPrice();
		const timer = setInterval(() => {
			getGasPrice();
		}, 30000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		setIsUpdate(true);
		const timer = setTimeout(() => {
			setIsUpdate(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, [gasFee]);

	return (
		<>
			{gasFee && (
				<div className={`flex h-full w-full gap-x-8 bg-secondary px-4 py-2 ${isUpdate ? 'animate-pulse' : ''}`}>
					<div className=" font-main-bold text-white">
						<p>Base Fee</p>
						<p className="mt-4 text-3xl">
							{gasFee.baseFeePerGas.toFixed(2)}
							<span className="ml-2 text-sm">Gwei</span>
						</p>
					</div>
					<ul className="flex gap-x-3">
						{gasFee.estimatedPrices.map((price) => (
							<li className="h-full rounded-lg bg-active px-2" key={price.confidence}>
								<p className="text-white">
									Priority <span className="text-gray-600">{price.confidence}</span>
								</p>
								<p className="text-primary">{price.maxPriorityFeePerGas.toFixed(2)}</p>
								<p className="text-white">Max Fee</p>
								<p className="text-primary">{price.maxFeePerGas.toFixed(2)}</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
}
