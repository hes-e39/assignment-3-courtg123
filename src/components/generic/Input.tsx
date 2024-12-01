interface InputProps {
    label: string;
    value?: number;
    placeholder?: string;
    className?: string; 
    min?: number;
    max?: number;
    step?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
}

export const Input = ({ 
    label,
    value = 0,
    placeholder = '',
    className = 'm-1 w-20 rounded-md pl-3 pr-2 py-5 text-white text-opacity-80 disabled:text-white disabled:text-opacity-25 bg-opacity-5 bg-white text-2xl font-bold font-mono',
    min = 0,
    max,
    step,
    onChange,
    disabled,
}: InputProps) => {
    return (
        <div className="flex flex-col items-center">
            <label
                htmlFor={label}
                className="text-stone-300 text-opacity-80 font-light"
            >
                {label}
            </label>
            <input
                id={label}
                type="number"
                value={value}
                placeholder={placeholder}
                className={className}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                onChange={(e) => onChange?.(Number(e.target.value))}
            />
        </div>
    );
};