import { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';
import { formatTime } from '../../utils/helpers';
import { Button, FastForwardButton, PlayPauseButton, ResetButton } from '../generic/Button';
import { DisplayRounds } from '../generic/DisplayRounds';
import { DisplayTime } from '../generic/DisplayTime';

interface TimerDisplayProps {
    timeInMs: number;
    type: string;
    roundsValue?: number;
    currentRound?: number;
    currentPhase?: 'Work' | 'Rest';
    description?: string;
    running: boolean;
    completed: boolean;
    hasStarted: boolean;
    isFirstTimer: boolean;
    handleStart: () => void;
    handleReset: () => void;
    handleFastForward: () => void;
}

const TimerDisplay = ({
    timeInMs,
    roundsValue,
    currentRound,
    currentPhase,
    description,
    running,
    completed,
    type,
    hasStarted,
    isFirstTimer,
    handleStart,
    handleReset,
    handleFastForward,
}: TimerDisplayProps) => {
    const { totalTimeRemaining } = useContext(TimerContext);

    const showRounds = type === 'XY' || type === 'Tabata';
    const showPhase = type === 'Tabata';

    // If first timer and not started
    if (isFirstTimer && !hasStarted) {
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <h2 className="text-xl">Ready to workout?</h2>
                <div className="text-md">Total Time: {formatTime(totalTimeRemaining)}</div>
                <Button onClick={handleStart}>Start Workout</Button>
            </div>
        );
    }

    // If workout completed
    if (completed) {
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <h2 className="text-xl text-yellow-200">Workout complete! Way to go!</h2>
                <Button onClick={handleReset}>Reset Workout</Button>
            </div>
        );
    }

    // Display timer
    return (
        <div className="h-full flex flex-col justify-between">
            <div className="h-[calc(100%-4rem)] flex flex-col">
                {hasStarted && !completed && <div className="text-gray-400 mb-2">Remaining Time: {formatTime(totalTimeRemaining)}</div>}
                <DisplayTime timeInMs={timeInMs} />
                {showRounds && roundsValue && currentRound && <DisplayRounds currentRound={currentRound} totalRounds={roundsValue} phase={showPhase ? currentPhase : undefined} />}
            </div>
            {description && <div>{description}</div>}
            <div className="mt-auto space-x-2 h-16 flex items-center justify-center">
                <ResetButton onClick={handleReset} />
                <PlayPauseButton onClick={handleStart} isRunning={running} />
                <FastForwardButton onClick={handleFastForward} />
            </div>
        </div>
    );
};

export default TimerDisplay;
