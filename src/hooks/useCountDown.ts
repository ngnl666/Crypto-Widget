import { useCallback, useEffect, useRef } from 'react';

/**
 * @param callback What to do when the delay is over
 * @param delay  How long the delay is
 */
export default function useCountDown(callback: Function, delay: number) {
	/* Store the callback. (prevent every re-render lead to create new callback) */
	const callbackRef = useRef(callback);
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const set = useCallback(() => {
		timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
	}, [delay]);

	const clear = useCallback(() => {
		/* If the timeout is setted, clear it first. */
		timeoutRef.current && clearTimeout(timeoutRef.current);
	}, []);

	useEffect(() => {
		set();
		return () => clear();
	}, [delay, set, clear]);

	const reset = useCallback(() => {
		clear();
		set();
	}, [clear, set]);

	return { reset, clear };
}
