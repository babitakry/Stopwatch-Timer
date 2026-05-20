import React, { useState, useEffect } from "react";

function Timer() {
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        let interval: any = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

        }
        return () => {
            if (interval)
                clearInterval(interval);
        };
    }, [isRunning]);

    const handleStartButton = () => {
        if (isRunning)
            return;

        if (timeLeft > 0) {
            // Resume paused timer
            setIsRunning(true);
        } else {
            // Start a new timer from input values
            const total = (hours * 3600) + (minutes * 60) + seconds;
            if (total > 0) {
                setTimeLeft(total);
                setIsRunning(true);
            }
        }
    };

    const handlePauseButton = () => {
        setIsRunning(false);
    };

    const handleResetButton = () => {
        setIsRunning(false);
        setTimeLeft(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    };

    const displayHours = isRunning || timeLeft > 0 ? Math.floor(timeLeft / 3600) : hours;
    const displayMinutes = isRunning || timeLeft > 0 ? Math.floor((timeLeft % 3600) / 60) : minutes;
    const displaySeconds = isRunning || timeLeft > 0 ? timeLeft % 60 : seconds;

    const formatNumber = (num: number) => String(num).padStart(2, "0");

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "");
        setHours(val === "" ? 0 : Number(val));
    };

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "");
        setMinutes(val === "" ? 0 : Math.min(59, Number(val)));
    };

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "");
        setSeconds(val === "" ? 0 : Math.min(59, Number(val)));
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className={`text-6xl font-light tracking-tight text-brand-text mb-10 tabular-nums transition-opacity duration-500 ${isRunning ? 'opacity-100 drop-shadow-sm' : 'opacity-80'}`}>
                {formatNumber(displayHours)}:{formatNumber(displayMinutes)}:{formatNumber(displaySeconds)}
            </h1>
            <div className="flex gap-3 mb-10 w-full justify-center items-center">
                <div className="flex flex-col items-center group">
                    <input
                        value={hours === 0 ? "" : hours}
                        onChange={handleHoursChange}
                        disabled={isRunning || timeLeft > 0}
                        type="text"
                        placeholder="00"
                        className="bg-brand-bg border border-brand-border/60 text-brand-text px-2 py-3 rounded-2xl w-20 text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent disabled:opacity-50 transition-all duration-300 placeholder-brand-muted shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:shadow-lg focus:-translate-y-1"
                    />
                    <span className="text-[10px] uppercase tracking-widest text-brand-muted mt-3 font-semibold group-hover:text-brand-text transition-colors duration-300">Hours</span>
                </div>
                <div className="text-2xl font-light text-brand-muted/50 pb-6">:</div>
                <div className="flex flex-col items-center group">
                    <input
                        value={minutes === 0 ? "" : minutes}
                        onChange={handleMinutesChange}
                        disabled={isRunning || timeLeft > 0}
                        type="text"
                        placeholder="00"
                        className="bg-brand-bg border border-brand-border/60 text-brand-text px-2 py-3 rounded-2xl w-20 text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent disabled:opacity-50 transition-all duration-300 placeholder-brand-muted shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:shadow-lg focus:-translate-y-1"
                    />
                    <span className="text-[10px] uppercase tracking-widest text-brand-muted mt-3 font-semibold group-hover:text-brand-text transition-colors duration-300">Min</span>
                </div>
                <div className="text-2xl font-light text-brand-muted/50 pb-6">:</div>
                <div className="flex flex-col items-center group">
                    <input
                        value={seconds === 0 ? "" : seconds}
                        onChange={handleSecondsChange}
                        disabled={isRunning || timeLeft > 0}
                        type="text"
                        placeholder="00"
                        className="bg-brand-bg border border-brand-border/60 text-brand-text px-2 py-3 rounded-2xl w-20 text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent disabled:opacity-50 transition-all duration-300 placeholder-brand-muted shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:shadow-lg focus:-translate-y-1"
                    />
                    <span className="text-[10px] uppercase tracking-widest text-brand-muted mt-3 font-semibold group-hover:text-brand-text transition-colors duration-300">Sec</span>
                </div>
            </div>
            <div className="flex gap-4 justify-center w-full">
                <button
                    onClick={handleStartButton}
                    disabled={isRunning || (hours === 0 && minutes === 0 && seconds === 0 && timeLeft === 0)}
                    className="flex-1 bg-brand-accent text-brand-accent-text px-6 py-3.5 rounded-2xl font-medium hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none disabled:transform-none transition-all duration-300 shadow-sm outline-none focus:ring-4 focus:ring-brand-accent/20"
                >
                    Start
                </button>
                <button
                    onClick={handlePauseButton}
                    disabled={!isRunning}
                    className="flex-1 bg-brand-surface border border-brand-border/60 text-brand-text px-6 py-3.5 rounded-2xl font-medium hover:bg-brand-bg hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none disabled:transform-none transition-all duration-300 shadow-sm outline-none focus:ring-4 focus:ring-brand-border/50"
                >
                    Pause
                </button>
                <button
                    onClick={handleResetButton}
                    className="flex-1 bg-brand-surface border border-brand-border/60 text-brand-text px-6 py-3.5 rounded-2xl font-medium hover:bg-brand-bg hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] transition-all duration-300 shadow-sm outline-none focus:ring-4 focus:ring-brand-border/50"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Timer;