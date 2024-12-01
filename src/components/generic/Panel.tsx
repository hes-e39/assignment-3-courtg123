interface PanelProps {
    title?: string;
    children: React.ReactNode;
}

export const Panel = ({ title, children }: PanelProps) => {

    return (
        <div className="p-10 rounded-xl bg-gradient-to-b from-stone-950 to-slate-900 border border-stone-900 mb-10 text-stone-300 w-full max-w-md h-[446px]">
            <h2 className="text-xl font-bold m-4 text-stone-400">{title}</h2>
            <div className="h-[calc(100%-4rem)] flex flex-col items-center text-center">
                {children}
            </div>
        </div>
    );
}