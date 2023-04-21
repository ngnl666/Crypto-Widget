import { useEffect, DependencyList } from 'react';
import useCountDown from './useCountDown';

/**
 * @param callback What to do when the delay is over
 * @param delay How long the delay is
 * @param dependencies When the dependencies change, the delay will be reset.
 */
export default function useDebounce(callback: () => void, delay: number, dependencies: DependencyList) {
	const { reset } = useCountDown(callback, delay);
	useEffect(reset, [...dependencies, reset]);
}
