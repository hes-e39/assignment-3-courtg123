import { useSearchParams } from 'react-router-dom';
import type { Timer } from '../types/timers';

export const useUrlState = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getTimersFromUrl = () => {
        const timersParam = searchParams.get('timers');
        if (!timersParam) return [];
        try {
            return JSON.parse(decodeURIComponent(timersParam));
        } catch {
            return [];
        }
    };

    const setTimersInUrl = (timers: Timer[]) => {
        const encodedTimers = encodeURIComponent(JSON.stringify(timers));
        searchParams.set('timers', encodedTimers);
        setSearchParams(searchParams);
    };

    return { getTimersFromUrl, setTimersInUrl };
};
