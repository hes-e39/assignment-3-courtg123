import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, Outlet, RouterProvider, createHashRouter } from 'react-router-dom';

import './index.css';
import { ErrorPage } from './components/generic/ErrorPage';
import { WorkoutProvider } from './context/TimerContext';
import AddTimerView from './views/AddTimerView';
import DocumentationView from './views/DocumentationView';
import HistoryView from './views/HistoryView';
import WorkoutView from './views/WorkoutView';

const PageIndex = () => {
    return (
        <WorkoutProvider>
            <div>
                <h1 className="text-3xl font-mono text-lime-200 font-medium text-center mt-10">Assignment #3</h1>
                <h3 className="text-xl font-mono text-green-200 font-medium text-center mb-10">Courtney Cary</h3>
                <div className="text-center m-4 font-mono mb-10">
                    <div className="text-opacity-15 text-white">
                        <Link to="/" className="mx-3 underline decoration-solid text-blue-400 hover:text-blue-200">
                            Workout
                        </Link>
                        |
                        <Link to="/history" className="mx-3 underline decoration-solid text-blue-400 hover:text-blue-200">
                            History
                        </Link>
                        |
                        <Link to="/docs" className="mx-3 underline decoration-solid text-blue-400 hover:text-blue-200">
                            Documentation
                        </Link>
                    </div>
                </div>
                <Outlet />
            </div>
        </WorkoutProvider>
    );
};

const router = createHashRouter([
    {
        path: '/',
        element: <PageIndex />,
        errorElement: <ErrorPage error={new Error('Route error')} resetErrorBoundary={() => window.location.reload()} />,
        children: [
            {
                index: true,
                element: <WorkoutView />,
            },
            {
                path: '/add',
                element: <AddTimerView />,
            },
            {
                path: '/edit/:index',
                element: <AddTimerView />,
            },
            {
                path: '/docs',
                element: <DocumentationView />,
            },
            {
                path: '/history',
                element: <HistoryView />,
            },
        ],
    },
]);

// biome-ignore lint/style/noNonNullAssertion: root html element is there
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <RouterProvider router={router} />
        </ErrorBoundary>
    </StrictMode>,
);
