import { displayTimerDetails } from '../context/TimerContext';
import { usePersistedState } from '../hooks/usePersistedState';
import type { Timer } from '../types/timers';
import { formatTime } from '../utils/helpers';

interface WorkoutHistory {
    id: string;
    date: string;
    timers: Timer[];
    totalDuration: number;
}

const HistoryView = () => {
    const [workoutHistory] = usePersistedState<WorkoutHistory[]>('workout_history', []);

    if (workoutHistory.length === 0) {
        return (
            <div className="flex flex-col items-center w-full">
                <h1>History</h1>
                <p>No workouts completed yet.</p>
            </div>
        );
    }

    // TO DO: repeat workout button? + descriptions
    return (
        <div className="flex flex-col items-center w-full mb-20">
            <h1 className="mb-2">History</h1>
            <div className="w-full max-w-2xl px-4 space-y-4">
                {workoutHistory.map(log => (
                    <div key={log.id} className="bg-slate-900/50 rounded-md p-4 w-full border border-stone-900">
                        <div className="flex flex-col space-y-2">
                            <div className="flex justify-between items-center mb-3">
                                <div className="text-gray-300">{new Date(Number(log.id)).toLocaleString()}</div>
                                <div className="text-gray-400">Duration: {formatTime(log.totalDuration)}</div>
                            </div>

                            <div className="space-y-1">
                                {log.timers.map((timer, index) => (
                                    <div key={index} className="text-sm text-gray-400 pl-4">
                                        &bull; {displayTimerDetails(timer)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryView;
