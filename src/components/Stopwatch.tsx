import { useRef, useState } from 'react';

function Stopwatch() {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [now, setNow] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef<number | null>(null);

    const handleStartButton = () => {
        setStartTime(Date.now() - elapsedTime)
        setNow(Date.now());

        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setNow(Date.now());
        }, 10)
    }

    const handlePauseButton = () => {
        if (startTime != null && now != null) {
            setElapsedTime(now - startTime);
        }
        clearInterval(intervalRef.current);
        setStartTime(null);
        setNow(null);
    }

    const handleResetButton = () => {
        clearInterval(intervalRef.current)
        setStartTime(null)
        setNow(null)
        setElapsedTime(0);
    }

    let secondsPassed = 0;

    if (startTime != null && now != null) {
        secondsPassed = Math.floor((now - startTime) / 1000);
    } else if (elapsedTime > 0) {
        secondsPassed = Math.floor(elapsedTime / 1000);
    }

    const hours = Math.floor(secondsPassed / 3600);
    const minutes = Math.floor((secondsPassed % 3600) / 60);
    const seconds = secondsPassed % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    
    let milliseconds = 0;
    if (startTime != null && now != null) {
        milliseconds = (now - startTime) % 1000;
    } else if (elapsedTime > 0) {
        milliseconds = elapsedTime % 1000;
    }
    const formattedMilliseconds = String(Math.floor(milliseconds / 10)).padStart(2, '0');

    return (
        <div className="flex flex-col items-center">
            <h1 className={`text-6xl font-light tracking-tight text-brand-text mb-12 tabular-nums transition-opacity duration-500 ${startTime != null ? 'opacity-100 drop-shadow-sm' : 'opacity-80'}`}>
                {formattedHours}:{formattedMinutes}:{formattedSeconds}<span className="text-3xl text-brand-muted">.{formattedMilliseconds}</span>
            </h1>
            <div className="flex gap-4 justify-center w-full">
                <button 
                    className="flex-1 bg-brand-accent text-brand-accent-text px-6 py-3.5 rounded-2xl font-medium hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] transition-all duration-300 shadow-sm outline-none focus:ring-4 focus:ring-brand-accent/20" 
                    onClick={handleStartButton}>
                    Start
                </button>
                <button 
                    className="flex-1 bg-brand-surface border border-brand-border/60 text-brand-text px-6 py-3.5 rounded-2xl font-medium hover:bg-brand-bg hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] transition-all duration-300 shadow-sm outline-none focus:ring-4 focus:ring-brand-border/50" 
                    onClick={handlePauseButton}>
                    Pause
                </button>
                <button 
                    className="flex-1 bg-brand-surface border border-brand-border/60 text-brand-text px-6 py-3.5 rounded-2xl font-medium hover:bg-brand-bg hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] transition-all duration-300 shadow-sm outline-none focus:ring-4 focus:ring-brand-border/50" 
                    onClick={handleResetButton}>
                    Reset
                </button>
            </div>
        </div>
    )
}

export default Stopwatch