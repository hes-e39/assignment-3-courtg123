interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

interface CustomButtonProps {
    onClick: () => void;
    disabled?: boolean;
    isRunning?: boolean;
}

export const Button = ({ 
    children,
    onClick,
    className = '',
    disabled = false
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-6 py-3 bg-gray-900 hover:bg-gray-800 text-stone-300 border-stone-950 border rounded-xl m-1
                ${disabled ? 'opacity-50 cursor-not-allowed hover:bg-gray-900' : ''}
                ${className}`}
        >
            {children}
        </button>
    );
};

export const PlayPauseButton = ({ onClick, disabled }: CustomButtonProps) => (
    <Button onClick={onClick} disabled={disabled}>
        {/* icon svg from icons8.com */}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-10 h-10"
        >
            <title id="playpause">Play/Pause</title>
            <path
                fill="currentColor" 
                d="M 2.6585,4.24744 C 2.36321,3.98906 1.9441,3.92725 1.58678,4.08938 1.22947,4.25152 1,4.60764 1,5.00002 v 14 c 0,0.3924 0.22947,0.7485 0.58678,0.9106 0.35732,0.1622 0.77643,0.1004 1.07172,-0.158 l 8,-7 C 10.8755,12.56272 11,12.28842 11,12.00002 c 0,-0.2883 -0.1245,-0.5627 -0.3415,-0.7526 l -8,-6.99996 z M 13,4 c -0.5523,0 -1,0.44772 -1,1 v 14 c 0,0.5523 0.4477,1 1,1 h 3 c 0.5523,0 1,-0.4477 1,-1 V 5 C 17,4.44772 16.5523,4 16,4 Z m 6,0 c -0.5523,0 -1,0.44772 -1,1 v 14 c 0,0.5523 0.4477,1 1,1 h 3 c 0.5523,0 1,-0.4477 1,-1 V 5 C 23,4.44772 22.5523,4 22,4 Z"
            />
        </svg>
    </Button>
)

export const FastForwardButton = ({ onClick, disabled }: CustomButtonProps) => (
    <Button onClick={onClick} disabled={disabled}>
        {/* icon svg from icons8.com */}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-10 h-10"
        >
            <title id="fastforward">Fast Forward to next Timer</title>
            <path
                fill="currentColor" 
                d="M 4,4.24744 C 3.70471,3.98906 3.2856,3.92725 2.92828,4.08938 2.57097,4.25152 2.3415,4.60764 2.3415,5.00002 v 14 c 0,0.3924 0.22947,0.7485 0.58678,0.9106 0.35732,0.1622 0.77643,0.1004 1.07172,-0.158 l 8,-7 C 12.2170,12.56272 12.3415,12.28842 12.3415,12.00002 12.3415,11.71172 12.2170,11.43732 12,11.24742 l -8,-6.99996 z M 14.3415,4.24744 C 14.04621,3.98906 13.6271,3.92725 13.26978,4.08938 12.91247,4.25152 12.683,4.60764 12.683,5.00002 v 14 c 0,0.3924 0.22947,0.7485 0.58678,0.9106 0.35732,0.1622 0.77643,0.1004 1.07172,-0.158 l 8,-7 C 22.5585,12.56272 22.683,12.28842 22.683,12.00002 22.683,11.71172 22.5585,11.43732 22.3415,11.24742 l -8,-6.99996 z"
            />
        </svg>
    </Button>
)

export const ResetButton = ({ onClick, disabled }: CustomButtonProps) => (
    <Button onClick={onClick} disabled={disabled}>
        {/* icon svg from icons8.com */}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-10 h-10"
        >
            <title id="reset">Reset Workout</title>
            <path
                fill="currentColor" 
                d="M 12 3 C 9.5110102 3 7.1735459 4.0349773 5.4980469 5.7910156 L 3.8535156 4.1464844 C 3.6585156 3.9514844 3.3414844 3.9514844 3.1464844 4.1464844 C 3.0494844 4.2444844 3 4.372 3 4.5 L 3 9 A 1 1 0 0 0 4 10 L 8.5 10 C 8.628 10 8.7565156 9.9515156 8.8535156 9.8535156 C 9.0485156 9.6585156 9.0485156 9.3414844 8.8535156 9.1464844 L 6.9140625 7.2070312 C 8.2196399 5.820863 10.049247 5 12 5 C 15.52 5 18.502453 7.6320469 18.939453 11.123047 C 19.002453 11.629047 19.432688 12 19.929688 12 C 19.970688 12 20.012687 11.998187 20.054688 11.992188 C 20.602688 11.924188 20.991828 11.424953 20.923828 10.876953 C 20.362828 6.3869531 16.526 3 12 3 z M 3.9453125 12.007812 C 3.3973125 12.075812 3.0071719 12.575047 3.0761719 13.123047 C 3.6371719 17.613047 7.474 21 12 21 C 14.48642 21 16.807752 19.987199 18.5 18.207031 L 20.146484 19.853516 C 20.341484 20.048516 20.658516 20.048516 20.853516 19.853516 C 20.950516 19.755516 21 19.628 21 19.5 L 21 15 A 1 1 0 0 0 20 14 L 15.5 14 C 15.372 14 15.243484 14.048484 15.146484 14.146484 C 14.951484 14.341484 14.951484 14.658516 15.146484 14.853516 L 17.085938 16.792969 C 15.766846 18.198726 13.949132 19 12 19 C 8.48 19 5.4975469 16.367953 5.0605469 12.876953 C 4.9925469 12.328953 4.4893125 11.936813 3.9453125 12.007812 z"
                />
        </svg>
    </Button>
)