import type { Timer } from '../types/timers';
import { usePersistedState } from './usePersistedState';

export interface WorkoutHistoryLog {
    id: string;
    timers: Timer[];
    totalDuration: number;
}

export const useWorkoutHistory = () => {
    const [history, setHistory] = usePersistedState<WorkoutHistoryLog[]>('workout_history', []);
    const [completedWorkoutIds, setCompletedWorkoutIds] = usePersistedState<string[]>('completed_workout_ids', []);

    const addWorkoutToHistory = (timers: Timer[], totalDuration: number) => {
        const workoutId = timers[0].workoutId;
        if (!workoutId || completedWorkoutIds.includes(workoutId)) {
            return;
        }

        const log: WorkoutHistoryLog = {
            id: Date.now().toString(),
            timers,
            totalDuration,
        };
        setHistory([log, ...history]);
        setCompletedWorkoutIds([...completedWorkoutIds, workoutId]);
    };

    const clearHistory = () => {
        setHistory([]);
        setCompletedWorkoutIds([]);
    };

    return {
        history,
        addWorkoutToHistory,
        clearHistory,
    };
};
