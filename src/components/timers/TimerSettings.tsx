import { DescriptionInput, Input } from '../generic/Input';

interface TimerSettingsProps {
    type: string;
    description?: string;
    minValue?: number;
    secValue?: number;
    workMinValue?: number;
    workSecValue?: number;
    restMinValue?: number;
    restSecValue?: number;
    roundsValue?: number;
    setMinValue?: (value: number | string) => void;
    setSecValue?: (value: number | string) => void;
    setWorkMinValue?: (value: number | string) => void;
    setWorkSecValue?: (value: number | string) => void;
    setRestMinValue?: (value: number | string) => void;
    setRestSecValue?: (value: number | string) => void;
    setRoundsValue?: (value: number | string) => void;
    setDescription?: (value: number | string) => void;
}

const TimerSettings = ({
    type,
    description,
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
    setRoundsValue,
    setDescription,
}: TimerSettingsProps) => {
    const xyTimer = type === 'XY';
    const tabataTimer = type === 'Tabata';

    // Display timer settings inputs
    return (
        <div className="w-full">
            <div className="mt-8 flex flex-row justify-center items-center space-x-8">
                {!tabataTimer ? (
                    <div className="flex flex-grow flex-col justify-center items-center">
                        <div>
                            <p className="font-bold mb-2">Time</p>
                        </div>
                        <div className="flex flex-row justify-center items-center mb-6">
                            <Input label="Min" value={minValue} onChange={setMinValue} placeholder="#" />
                            <Input label="Sec" value={secValue} onChange={setSecValue} placeholder="#" />
                        </div>
                    </div>
                ) : (
                    <div className=" flex flex-row justify-center items-center space-x-8">
                        <div className="mb-6">
                            <p className="font-bold mb-2">Work</p>
                            <div className="flex flex-row justify-center items-center">
                                <Input label="Min" value={workMinValue} onChange={setWorkMinValue} placeholder="#" />
                                <Input label="Sec" value={workSecValue} onChange={setWorkSecValue} placeholder="#" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="font-bold mb-2">Rest</p>
                            <div className="flex flex-row justify-center items-center">
                                <Input label="Min" value={restMinValue} onChange={setRestMinValue} placeholder="#" />
                                <Input label="Sec" value={restSecValue} onChange={setRestSecValue} placeholder="#" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {(xyTimer || tabataTimer) && <Input label="Rounds" value={roundsValue} onChange={setRoundsValue} min={1} placeholder="#" />}
            <div className="mt-6">
                <DescriptionInput label="Description" value={description} onChange={setDescription} placeholder="Set a description" />
            </div>
        </div>
    );
};

export default TimerSettings;
