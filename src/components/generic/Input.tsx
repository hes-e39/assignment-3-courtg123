interface InputProps {
    label: string;
    value?: number | string;
    placeholder?: string;
    className?: string;
    min?: number;
    max?: number;
    step?: number;
    type?: 'number' | 'text';
    onChange?: (value: number | string) => void;
    disabled?: boolean;
}

export const Input = ({
    label,
    value = '',
    placeholder = '',
    className = 'm-1 w-20 rounded-md pl-3 pr-2 py-5 text-white text-opacity-80 disabled:text-white disabled:text-opacity-25 bg-opacity-5 bg-white text-2xl font-bold font-mono',
    min = 0,
    max,
    step,
    type = 'number',
    onChange,
    disabled,
}: InputProps) => {
    const handleChange = (e: { target: { value: string } }) => {
        if (type === 'number') {
            const numberValue = e.target.value === '' ? 0 : Number(e.target.value);
            onChange?.(numberValue);
        } else {
            onChange?.(e.target.value);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <label htmlFor={label} className="text-stone-300 text-opacity-80 font-light">
                {label}
            </label>
            <input
                id={label}
                type={type}
                value={value}
                placeholder={placeholder}
                className={className}
                min={type === 'number' ? min : undefined}
                max={type === 'number' ? max : undefined}
                step={type === 'number' ? step : undefined}
                disabled={disabled}
                onChange={handleChange}
            />
        </div>
    );
};
