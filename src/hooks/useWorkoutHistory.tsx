import type { Timer } from '../types/timers';
import { usePersistedState } from './usePersistedState';

export interface WorkoutHistoryLog {
    id: string;
    timers: Timer[];
    totalDuration: number;
}

export const useWorkoutHistory = () => {
    const [history, setHistory] = usePersistedState<WorkoutHistoryLog[]>('workout_history', []);

    const addWorkoutToHistory = (timers: Timer[], totalDuration: number) => {
        const log: WorkoutHistoryLog = {
            id: Date.now().toString(),
            timers,
            totalDuration,
        };
        setHistory([log, ...history]);
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return {
        history,
        addWorkoutToHistory,
        clearHistory,
    };
};
