import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TimerContext, displayTimerDetails } from '../context/TimerContext';
import type { Timer, TimerPhase } from '../types/timers';
import { convertToMs } from '../utils/helpers';

import { Button } from '../components/generic/Button';
import { Panel } from '../components/generic/Panel';

import TimerDisplay from '../components/timers/TimerDisplay';
import { usePersistedState } from '../hooks/usePersistedState';

interface WorkoutState {
    timers: Timer[];
    currentTimerIndex: number;
    running: boolean;
    timeInMs: number;
    currentPhase: TimerPhase;
    currentRound: number;
}

const initialWorkoutState: WorkoutState = {
    timers: [],
    currentTimerIndex: 0,
    running: false,
    timeInMs: 0,
    currentPhase: 'Work',
    currentRound: 1,
};

const WorkoutView = () => {
    const navigate = useNavigate();
    const {
        timers,
        removeTimer,
        running,
        timeInMs,
        currentTimer,
        currentTimerIndex,
        toggleRunning,
        currentPhase,
        currentRound,
        fastForward,
        resetWorkout,
        setTimers,
        setCurrentTimerIndex,
        setRunning,
        setTimeInMs,
        setCurrentPhase,
        setCurrentRound,
    } = useContext(TimerContext);

    // Set a max of 10 timers
    const MAX_TIMERS = 10;

    // Check if workout started
    const hasStarted = currentTimer?.state !== 'not_started';

    // Add a timer to the workout
    const addTimer = () => {
        navigate('/add');
    };

    // Edit a timer
    const editTimer = (index: number) => {
        navigate(`/edit/${index}`);
    };

    // Start workout
    const runWorkout = () => {
        toggleRunning();
    };

    // Reset workout
    const handleReset = () => {
        resetWorkout();
    };

    // Fast forward to next timer
    const handleFastForward = () => {
        fastForward();
    };

    const [workoutState, setWorkoutState] = usePersistedState<WorkoutState>('workout_state', initialWorkoutState);

    // Load persisted state if it was set previously (if saved workout state with a running timer)
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (workoutState && workoutState.timers.length > 0 && workoutState.timers.some(t => t.state === 'running') && timers.length === 0) {
            setTimers(workoutState.timers);
            setCurrentTimerIndex(workoutState.currentTimerIndex);
            setCurrentRound(workoutState.currentRound);
            setTimeInMs(workoutState.timeInMs);
            setCurrentPhase(workoutState.currentPhase);
            setRunning(false);
        }
    }, []);

    // Save persisted state (when the workout state changes)
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        // save each second
        if (timers.length > 0 && hasStarted && timeInMs % 1000 === 0) {
            setWorkoutState({
                timers: timers.map(timer => ({
                    ...timer,
                    state: timer === currentTimer ? (running ? 'running' : timer.state) : timer.state,
                })),
                currentTimerIndex,
                currentRound,
                timeInMs,
                currentPhase: currentPhase as TimerPhase,
                running,
            });
        }
    }, [currentTimerIndex, currentRound, timeInMs, currentPhase, running, hasStarted, timers, currentTimer]);

    // Render current timer
    const renderCurrentTimer = () => {
        if (!currentTimer) return null;

        const isCompleted = timers.every(timer => timer.state === 'completed');
        const isFirstTimer = currentTimerIndex === 0;

        // Time remaining calculation
        const timeRemainingMs = (() => {
            if (currentTimer.type === 'Countdown') {
                const totalMs = convertToMs(0, currentTimer.settings.totalSeconds || 0);
                return Math.max(0, totalMs - timeInMs);
            }
            return timeInMs;
        })();

        // Render timer panel
        return (
            <Panel title={(isFirstTimer && !hasStarted) || isCompleted ? undefined : `Current: ${currentTimer.type}`}>
                <TimerDisplay
                    timeInMs={timeRemainingMs}
                    type={currentTimer.type}
                    roundsValue={currentTimer.settings.rounds}
                    currentRound={currentRound}
                    currentPhase={currentPhase as TimerPhase}
                    description={currentTimer.description}
                    running={running}
                    completed={isCompleted}
                    isFirstTimer={isFirstTimer}
                    hasStarted={hasStarted}
                    handleStart={runWorkout}
                    handleReset={handleReset}
                    handleFastForward={handleFastForward}
                />
                {!((isFirstTimer && !hasStarted) || isCompleted) && <div className="text-sm text-gray-400 mt-2">{displayTimerDetails(currentTimer)}</div>}
            </Panel>
        );
    };

    // Render queue of timers
    return (
        <div className="flex flex-col items-center w-full max-w-2xl px-4 mx-auto">
            <h1>Workout</h1>

            {renderCurrentTimer()}

            <div className="w-full max-w-md">
                {timers.map((timer, index) => (
                    <div
                        key={index}
                        className={`
            flex
            justify-between
            items-center
            mb-2 
            p-2 
            rounded-lg
            bg-slate-900/50
            ${timer.state === 'completed' ? 'line-through text-gray-600' : ''}
            ${hasStarted && index === currentTimerIndex ? 'text-lime-200' : ''}
          `}
                    >
                        <div className="flex-grow text-center">{displayTimerDetails(timer)}</div>
                        <div className="flex gap-2 ml-4">
                            <Button onClick={() => editTimer(index)} disabled={(hasStarted && index <= currentTimerIndex) || timer.state === 'completed'}>
                                Edit
                            </Button>
                            <Button onClick={() => removeTimer(index)} disabled={(hasStarted && index <= currentTimerIndex) || timer.state === 'completed'}>
                                Remove
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {timers.length >= MAX_TIMERS ? (
                    <span className="text-gray-500">
                        <i>You've added the maximum number of timers.</i>
                    </span>
                ) : (
                    <Button onClick={addTimer}>+ Add Timer</Button>
                )}
            </div>
        </div>
    );
};

export default WorkoutView;