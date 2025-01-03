import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TimerContext } from '../context/TimerContext';

import { Button } from '../components/generic/Button';
import { Panel } from '../components/generic/Panel';
import { Select } from '../components/generic/Select';

import TimerSettings from '../components/timers/TimerSettings';
import type { Timer } from '../types/timers';
import { convertToMs } from '../utils/helpers';

export default function AddTimer() {
    const navigate = useNavigate();
    const [selectedTimer, setSelectedTimer] = useState<string>('Stopwatch');
    const { timers, addTimer, updateTimer } = useContext(TimerContext);

    // timer index from URL
    const { index } = useParams();

    // state for this timer
    const [roundsValue, setRoundsValue] = useState(1);
    const [timerTime, setTimerTime] = useState({ minutes: 0, seconds: 0 });
    const [workTime, setWorkTime] = useState({ minutes: 0, seconds: 0 });
    const [restTime, setRestTime] = useState({ minutes: 0, seconds: 0 });
    const [description, setDescription] = useState('');

    // Timer types for dropdown
    const timerOptions = [
        { id: 1, value: 'Stopwatch', label: 'Stopwatch' },
        { id: 2, value: 'Countdown', label: 'Countdown' },
        { id: 3, value: 'XY', label: 'XY' },
        { id: 4, value: 'Tabata', label: 'Tabata' },
    ];

    // Change timer type when dropdown option selected
    const handleTimerChange = (value: string | number) => {
        if (typeof value === 'string') {
            setSelectedTimer(value);
        }
    };

    // Display timer settings by timer type
    const displayTimer = () => {
        if (selectedTimer === 'Stopwatch' || selectedTimer === 'Countdown') {
            return (
                <TimerSettings
                    type={selectedTimer}
                    description={description}
                    minValue={timerTime.minutes}
                    secValue={timerTime.seconds}
                    setMinValue={value => setTimerTime({ ...timerTime, minutes: Number(value) })}
                    setSecValue={value => setTimerTime({ ...timerTime, seconds: Number(value) })}
                    setDescription={(value: string | number) => setDescription(String(value))}
                />
            );
        }
        if (selectedTimer === 'XY') {
            return (
                <TimerSettings
                    type={selectedTimer}
                    description={description}
                    minValue={timerTime.minutes}
                    secValue={timerTime.seconds}
                    roundsValue={roundsValue}
                    setMinValue={value => setTimerTime({ ...timerTime, minutes: Number(value) })}
                    setSecValue={value => setTimerTime({ ...timerTime, seconds: Number(value) })}
                    setRoundsValue={value => setRoundsValue(Number(value))}
                    setDescription={(value: string | number) => setDescription(String(value))}
                />
            );
        }
        if (selectedTimer === 'Tabata') {
            return (
                <TimerSettings
                    type={selectedTimer}
                    description={description}
                    workMinValue={workTime.minutes}
                    workSecValue={workTime.seconds}
                    restMinValue={restTime.minutes}
                    restSecValue={restTime.seconds}
                    roundsValue={roundsValue}
                    setWorkMinValue={value => setWorkTime({ ...workTime, minutes: Number(value) })}
                    setWorkSecValue={value => setWorkTime({ ...workTime, seconds: Number(value) })}
                    setRestMinValue={value => setRestTime({ ...restTime, minutes: Number(value) })}
                    setRestSecValue={value => setRestTime({ ...restTime, seconds: Number(value) })}
                    setRoundsValue={value => setRoundsValue(Number(value))}
                    setDescription={(value: string | number) => setDescription(String(value))}
                />
            );
        }
    };

    // Load an existing timer
    useEffect(() => {
        // If not editing existing timer
        if (index === undefined) {
            return;
        }

        // existing timer from the array
        const timer = timers[Number.parseInt(index)];
        if (!timer) {
            return;
        }

        setSelectedTimer(timer.type);
        setDescription(timer.description || '');

        // Settings for Countdown and Stopwatch
        if (timer.type === 'Countdown' || timer.type === 'Stopwatch') {
            const totalSeconds = timer.settings.totalSeconds;
            setTimerTime({ minutes: Math.floor((totalSeconds || 0) / 60), seconds: (totalSeconds || 0) % 60 });
        }
        // Settings for XY
        else if (timer.type === 'XY') {
            const totalSeconds = timer.settings.totalSeconds;
            setTimerTime({ minutes: Math.floor((totalSeconds || 0) / 60), seconds: (totalSeconds || 0) % 60 });
            setRoundsValue(timer.settings.rounds || 1);
        }
        // Settings for Tabata
        else if (timer.type === 'Tabata') {
            const workSeconds = timer.settings.workSeconds;
            const restSeconds = timer.settings.restSeconds;
            setWorkTime({ minutes: Math.floor((workSeconds || 0) / 60), seconds: (workSeconds || 0) % 60 });
            setRestTime({ minutes: Math.floor((restSeconds || 0) / 60), seconds: (restSeconds || 0) % 60 });
            setRoundsValue(timer.settings.rounds || 1);
        }
    }, [index, timers]); // Added dependencies for timer index and timers = re-run if index or array changes

    // Save timer with settings
    const handleSave = () => {
        let settings = {};

        // if timer is Countdown or Stopwatch
        if (selectedTimer === 'Countdown' || selectedTimer === 'Stopwatch') {
            // minutes and seconds cannot be 0
            if (timerTime.minutes === 0 && timerTime.seconds === 0) {
                alert('Timer time must be greater than 0');
                return;
            }
            const totalSeconds = convertToMs(timerTime.minutes, timerTime.seconds) / 1000;
            settings = { totalSeconds };
        }
        // if timer is XY
        else if (selectedTimer === 'XY') {
            // minutes and seconds cannot be 0
            if (timerTime.minutes === 0 && timerTime.seconds === 0) {
                alert('Timer time must be greater than 0');
                return;
            }
            const totalSeconds = convertToMs(timerTime.minutes, timerTime.seconds) / 1000;
            settings = {
                totalSeconds,
                rounds: roundsValue,
            };
        }
        // if timer is Tabata
        else if (selectedTimer === 'Tabata') {
            if ((workTime.minutes === 0 && workTime.seconds === 0) || (restTime.minutes === 0 && restTime.seconds === 0)) {
                alert('Timer work and rest times must be greater than 0');
                return;
            }

            const workSeconds = convertToMs(workTime.minutes, workTime.seconds) / 1000;
            const restSeconds = convertToMs(restTime.minutes, restTime.seconds) / 1000;
            settings = {
                workSeconds,
                restSeconds,
                rounds: roundsValue,
            };
        }

        // Create timer with settings
        const timerWithSettings: Timer = {
            type: selectedTimer,
            description: description,
            settings,
            state: 'not_started',
        };

        // If not editing an existing timer, add as new
        if (index !== undefined) {
            updateTimer(Number.parseInt(index), timerWithSettings);
        } else {
            addTimer(timerWithSettings);
        }
        navigate('/');
    };

    // Display timer settings inputs
    return (
        <div className="flex flex-col items-center">
            <h1>Update Timer</h1>

            <Select label="Timer Type" value={String(selectedTimer)} options={timerOptions} onChange={handleTimerChange} />

            <Panel title={String(selectedTimer)}>{displayTimer()}</Panel>

            <div>
                <Button onClick={() => navigate('/')}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>
    );
}
