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

interface DescriptionInputProps {
    label: string;
    value?: string;
    placeholder?: string;
    className?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    rows?: number;
}

export const DescriptionInput = ({
    label,
    value = '',
    placeholder = '',
    className = 'm-1 w-full rounded-md p-3 text-white text-opacity-80 disabled:text-white disabled:text-opacity-25 bg-opacity-5 bg-white text-lg',
    onChange,
    disabled,
    rows = 3,
}: DescriptionInputProps) => {
    const handleChange = (e: { target: { value: string } }) => {
        onChange?.(e.target.value);
    };

    return (
        <div className="flex flex-col w-full">
            <label htmlFor={label} className="text-stone-300 text-opacity-80 font-light mb-2">
                {label}
            </label>
            <textarea id={label} value={value} placeholder={placeholder} className={className} disabled={disabled} onChange={handleChange} rows={rows} />
        </div>
    );
};
