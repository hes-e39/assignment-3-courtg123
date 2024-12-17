import { formatTime } from '../../utils/helpers';

interface DisplayTimeProps {
    timeInMs: number;
}

export const DisplayTime = ({ timeInMs }: DisplayTimeProps) => {

    // display formatted time, and style it with Tailwind (style tags source: Tailwind CSS documentation)
    return (
        <div className="flex justify-center w-full flex-1 items-center">
            <div className="text-6xl font-bold font-mono text-lime-300 m-4 text-center items-center w-full min-w-[200px]">
                {formatTime(timeInMs)}
            </div>
        </div>
    );
}