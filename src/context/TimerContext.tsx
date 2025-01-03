import { createContext, useEffect, useRef, useState } from 'react';
import { useUrlState } from '../hooks/useUrlState';
import type { Timer, TimerPhase } from '../types/timers';

// Global context for Timer
export const TimerContext = createContext({
    timers: [] as Timer[],
    timeInMs: 0,
    running: false,
    currentTimer: null as Timer | null,
    currentTimerIndex: 0,
    currentPhase: 'Work',
    currentRound: 1,
    totalTimeRemaining: 0,
    addTimer: (_timer: Timer) => {},
    removeTimer: (_index: number) => {},
    updateTimer: (_index: number, _timer: Timer) => {},
    toggleRunning: () => {},
    fastForward: () => {},
    resetWorkout: () => {},
    setTimers: (_timers: Timer[]) => {},
    setTimeInMs: (_time: number) => {},
    setCurrentTimerIndex: (_index: number) => {},
    setCurrentPhase: (_phase: TimerPhase) => {},
    setCurrentRound: (_round: number) => {},
    setRunning: (_running: boolean) => {},
});

// Get timer details and display it within queue
export const displayTimerDetails = (timer: Timer) => {
    const { type, settings } = timer;

    let details = `${type}: `;

    if (settings.rounds) {
        details += `${settings.rounds} Rounds x `;
    }
    if (settings.totalSeconds) {
        details += `${Math.floor(settings.totalSeconds / 60)} min ${settings.totalSeconds % 60} sec `;
    }
    if (settings.workSeconds && settings.restSeconds) {
        const workMin = Math.floor(settings.workSeconds / 60);
        const workSec = settings.workSeconds % 60;
        const restMin = Math.floor(settings.restSeconds / 60);
        const restSec = settings.restSeconds % 60;

        details += `(${workMin}min ${workSec} sec Work & ${restMin} sec ${restSec}sec Rest)`;
    }

    return details;
};

// Total time calculation
export const totalWorkoutTime = (timers: Timer[]) => {
    return timers
        .map(timer => {
            if (timer.type === 'Tabata') {
                const rounds = timer.settings.rounds || 0;
                const workSeconds = timer.settings.workSeconds || 0;
                const restSeconds = timer.settings.restSeconds || 0;
                return (workSeconds + restSeconds) * rounds * 1000;
            } else if (timer.type === 'XY') {
                const rounds = timer.settings.rounds || 0;
                const totalSeconds = timer.settings.totalSeconds || 0;
                return totalSeconds * rounds * 1000;
            } else {
                const totalSeconds = timer.settings.totalSeconds || 0;
                return totalSeconds * 1000;
            }
        })
        .reduce((sum, ms) => sum + ms, 0);
};

// Workout functionality
export function WorkoutProvider({ children }: { children: React.ReactNode }) {
    const [timers, setTimers] = useState<Timer[]>([]);
    const [running, setRunning] = useState(false);
    const [timeInMs, setTimeInMs] = useState(0);
    const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
    const [currentPhase, setCurrentPhase] = useState<'Work' | 'Rest'>('Work');
    const [currentRound, setCurrentRound] = useState(1);
    const [totalTimeRemaining, setTotalTimeRemaining] = useState(0);
    const intervalRef = useRef<number>();
    const { getTimersFromUrl, setTimersInUrl } = useUrlState();

    // Current timer by index
    const currentTimer = timers[currentTimerIndex] || null;

    // Update the total time when timers updated
    useEffect(() => {
        setTotalTimeRemaining(totalWorkoutTime(timers));
    }, [timers]);

    // Load initial timers from URL
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const urlTimers = getTimersFromUrl();
        if (urlTimers.length > 0) {
            setTimers(urlTimers);
        }
    }, []);

    // Keep URL synced when configuration changes
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (timers.length > 0 && (!running || timers.every(t => t.state === 'not_started'))) {
            setTimersInUrl(timers);
        }
    }, [timers, running]);

    // Add timer
    const addTimer = (timer: Timer) => {
        const workoutId = Date.now().toString();
        const timerWithId = {
            ...timer,
            workoutId,
        };
        setTimers([...timers, timerWithId]);
    };

    // Remove timer
    const removeTimer = (index: number) => {
        const newTimers = [...timers];
        newTimers.splice(index, 1);
        setTimers(newTimers);
    };

    // Edit/update timer
    const updateTimer = (index: number, timer: Timer) => {
        setTimers(timers => {
            const newTimers = [...timers];
            newTimers[index] = timer;
            return newTimers;
        });
    };

    // Toggle running/paused
    const toggleRunning = () => {
        const newRunningState = !running;
        setRunning(newRunningState);
    };

    // Fast forward
    const fastForward = () => {
        if (!currentTimer) return;

        // Complete current timer
        const newTimers = [...timers];
        newTimers[currentTimerIndex].state = 'completed';
        setTimers(newTimers);

        // If no next timer, complete workout
        if (currentTimerIndex < timers.length - 1) {
            setCurrentTimerIndex(prev => prev + 1);
            return;
        } else {
            setRunning(false);
            return;
        }
    };

    // Reset workout
    const resetWorkout = () => {
        setRunning(false);
        setCurrentTimerIndex(0);
        setCurrentRound(1);
        setCurrentPhase('Work');
        setTotalTimeRemaining(0);

        // Set all timers to not_started state
        const newWorkoutId = Date.now().toString();
        const resetTimers = timers.map(timer => ({
            ...timer,
            workoutId: newWorkoutId,
            state: 'not_started' as const,
        }));
        setTimers(resetTimers);

        // if not stopwatch, set initial reset time - maybe not necessary since we go back to "start workout"?
        const firstTimer = timers[0];
        if (firstTimer) {
            if (firstTimer.type === 'Stopwatch') {
                setTimeInMs(0);
            } else if (firstTimer.type === 'Tabata') {
                setTimeInMs((firstTimer.settings.workSeconds || 0) * 1000);
            } else {
                setTimeInMs((firstTimer.settings.totalSeconds || 0) * 1000);
            }
        }
    };

    // Initialize timer
    const initializeTimer = (currentTimer: Timer) => {
        if (currentTimer.type === 'Tabata') {
            setTimeInMs((currentTimer.settings.workSeconds || 0) * 1000);
            setCurrentPhase('Work');
            setCurrentRound(1);
            const newTimers = [...timers];
            newTimers[currentTimerIndex].state = 'running';
            setTimers(newTimers);
        } else if (currentTimer.type === 'XY') {
            setTimeInMs((currentTimer.settings.totalSeconds || 0) * 1000);
            setCurrentRound(1);
        } else if (currentTimer.type === 'Countdown') {
            setTimeInMs(0);
        } else {
            setTimeInMs(0);
        }
        const newTimers = [...timers];
        newTimers[currentTimerIndex].state = 'running';
        setTimers(newTimers);
    };

    // Workout timer hook
    // biome-ignore lint/correctness/useExhaustiveDependencies: initializeTimer changes every re-render so not set as dependency
    useEffect(() => {
        if (running && currentTimer) {
            // Initialize timer
            if (currentTimer.state === 'not_started') {
                initializeTimer(currentTimer);
                setTotalTimeRemaining(totalWorkoutTime(timers));
            }

            // Timer interval of 10ms
            intervalRef.current = setInterval(() => {
                setTotalTimeRemaining(prev => Math.max(0, prev - 10));

                setTimeInMs(prevTime => {
                    // Complete timer
                    const completeCurrentTimer = () => {
                        const newTimers = [...timers];
                        newTimers[currentTimerIndex].state = 'completed';
                        setTimers(newTimers);

                        // If no more timers, complete workout
                        if (currentTimerIndex < timers.length - 1) {
                            const nextIndex = currentTimerIndex + 1;

                            // Update the next timer index
                            setCurrentTimerIndex(nextIndex);
                            return 0;
                        } else {
                            setRunning(false);
                            return 0;
                        }
                    };

                    if (currentTimer.type === 'Tabata') {
                        // Check if current interval completed
                        if (prevTime <= 0) {
                            // Flip between work and rest
                            if (currentPhase === 'Work') {
                                setCurrentPhase('Rest');
                                return (currentTimer.settings.restSeconds || 0) * 1000;
                            } else if (currentPhase === 'Rest') {
                                // Check if all rounds completed
                                if (currentRound >= (currentTimer.settings.rounds || 1)) {
                                    return completeCurrentTimer();
                                }
                                // Increment round and flip back to work
                                setCurrentRound(r => r + 1);
                                setCurrentPhase('Work');
                                return (currentTimer.settings.workSeconds || 0) * 1000;
                            }
                        }
                        return prevTime - 10;
                    } else if (currentTimer.type === 'XY') {
                        // XY timer
                        if (prevTime <= 0) {
                            // Check if all rounds completed
                            if (currentRound >= (currentTimer.settings.rounds || 1)) {
                                return completeCurrentTimer();
                            }
                            // Increment round
                            setCurrentRound(r => r + 1);
                            return (currentTimer.settings.totalSeconds || 0) * 1000;
                        }
                        return prevTime - 10;
                    } else if (currentTimer.type === 'Stopwatch') {
                        // Count up for stopwatch
                        const newTime = prevTime + 10;
                        if (newTime >= (currentTimer.settings.totalSeconds || 0) * 1000) {
                            return completeCurrentTimer();
                        }
                        return newTime;
                    } else if (currentTimer.type === 'Countdown') {
                        // Count down for countdown
                        const newTime = prevTime + 10;
                        if (newTime >= (currentTimer.settings.totalSeconds || 0) * 1000) {
                            return completeCurrentTimer();
                        }
                        return newTime;
                    }
                    return prevTime;
                });
            }, 10);
        }

        // Clear the interval
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = undefined;
        };
    }, [running, currentTimer, currentTimerIndex, timers, currentPhase, currentRound]); // Dependencies for timers, current timer, timer state, phase and rounds

    // Return the timer context
    return (
        <TimerContext.Provider
            value={{
                timers,
                timeInMs,
                running,
                currentTimer,
                currentTimerIndex,
                currentPhase,
                currentRound,
                totalTimeRemaining,
                addTimer,
                removeTimer,
                updateTimer,
                toggleRunning,
                fastForward,
                resetWorkout,
                setTimers,
                setTimeInMs,
                setCurrentTimerIndex,
                setCurrentPhase,
                setCurrentRound,
                setRunning,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
}
