import { Input } from '../generic/Input';

interface TimerSettingsProps {
    type: string;
    minValue?: number;
    secValue?: number;
    workMinValue?: number;
    workSecValue?: number;
    restMinValue?: number;
    restSecValue?: number;
    roundsValue?: number;
    setMinValue?: (value: number) => void;
    setSecValue?: (value: number) => void;
    setWorkMinValue?: (value: number) => void;
    setWorkSecValue?: (value: number) => void;
    setRestMinValue?: (value: number) => void;
    setRestSecValue?: (value: number) => void;
    setRoundsValue?: (value: number) => void;
}

const TimerSettings = ({ 
    type,
    minValue,
    secValue,
    workMinValue,
    workSecValue,
    restMinValue,
    restSecValue,
    roundsValue,
    setMinValue,
    setSecValue,
    setWorkMinValue,
    setWorkSecValue,
    setRestMinValue,
    setRestSecValue,
    setRoundsValue 
}: TimerSettingsProps) => {

    const xyTimer = type === 'XY';
    const tabataTimer = type === 'Tabata';
    
    // Display timer settings inputs
    return (
        <div>
            <div className="mt-8 flex flex-row justify-center items-center space-x-8">
                {!tabataTimer ? (
                    <div>
                        <div>
                            <p className="font-bold mb-2">Time</p>
                        </div>
                        <div className="flex flex-row justify-center items-center mb-6">
                            <Input
                                label="Min"
                                value={minValue}
                                onChange={setMinValue}
                                placeholder="#"
                            />
                            <Input
                                label="Sec"
                                value={secValue}
                                onChange={setSecValue}
                                placeholder="#"
                            />
                        </div>
                    </div>
                ) : (
                    <div className=" flex flex-row justify-center items-center space-x-8">
                        <div className="mb-6">
                            <p className="font-bold mb-2">Work</p>
                            <div className="flex flex-row justify-center items-center">
                                <Input
                                    label="Min"
                                    value={workMinValue}
                                    onChange={setWorkMinValue}
                                    placeholder="#"
                                />
                                <Input
                                    label="Sec"
                                    value={workSecValue}
                                    onChange={setWorkSecValue}
                                    placeholder="#"
                                />
                            </div>
                        </div>
                    
                        <div className="mb-6">
                            <p className="font-bold mb-2">Rest</p>
                            <div className="flex flex-row justify-center items-center">
                                <Input
                                    label="Min"
                                    value={restMinValue}
                                    onChange={setRestMinValue}
                                    placeholder="#" 
                                />
                                <Input
                                    label="Sec"
                                    value={restSecValue}
                                    onChange={setRestSecValue}
                                    placeholder="#"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {(xyTimer || tabataTimer) && (
                <Input
                    label="Rounds"
                    value={roundsValue}
                    onChange={setRoundsValue}
                    min={1}
                    placeholder="#"
                />
            )}
        </div>
    );
};

export default TimerSettings;