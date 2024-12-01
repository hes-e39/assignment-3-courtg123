interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    label: string;
    value?: string | number;
    options: SelectOption[];
    className?: string; 
    onChange?: (value: string | number) => void;
    disabled?: boolean;
}

export const Select = ({ 
    label,
    value = '',
    options,
    className = 'm-1 min-w-20 mb-4 rounded-md pl-3 pr-4 py-5 text-white text-opacity-80 disabled:text-white disabled:text-opacity-25 bg-opacity-5 bg-white text-2xl font-bold font-mono text-center mr-3',
    onChange,
    disabled,
}: SelectProps) => {
    return (
        <div className="flex flex-col items-center relative">
            <label
                htmlFor={label}
                className="text-stone-300 text-opacity-80 font-light"
            >
                {label}
            </label>
            <select
                id={label}
                value={value}
                className={className}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};