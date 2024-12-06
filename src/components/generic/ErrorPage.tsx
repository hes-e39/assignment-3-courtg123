import type { FallbackProps } from 'react-error-boundary';
import { Button } from './Button';

export const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
        <div className="flex flex-col items-center p-4">
            <div className="bg-red-950/50 border-red-500 p-6 text-center rounded-xl">
                <h2 className="text-2xl font-bold text-red-500 text-center">Sorry, there's been an error!</h2>
                <p className="text-center mb-8  text-red-400 font-mono font-bold">{error.message}</p>
                <Button onClick={resetErrorBoundary}>Refresh</Button>
            </div>
        </div>
    );
};
