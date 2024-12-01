// format ms to display minutes, seconds, milliseconds
export const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 1000 / 60);
    const seconds = Math.floor((ms / 1000) % 60);
    const milliseconds = ms % 1000;

    // make sure minutes & seconds are two digits, milliseconds is 3 digits
    const displayMinutes = minutes.toString().padStart(2, '0');
    const displaySeconds = seconds.toString().padStart(2, '0');
    const displayMilliseconds = milliseconds.toString().padStart(3, '0');

    return `${displayMinutes}:${displaySeconds}.${displayMilliseconds}`;

}

// convert min and sec to milliseconds
export const convertToMs = (minutes: number, seconds: number): number => {
    return (minutes * 60 + seconds) * 1000;
}