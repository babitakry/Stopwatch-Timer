import { useState } from 'react'
import Stopwatch from './components/Stopwatch.tsx'
import Timer from './components/Timer.tsx'

function App() {
  const [tab, setTab] = useState<"stopwatch" | "timer">("stopwatch");

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center pt-24 px-4">
      <div className="flex bg-brand-border/50 p-1 rounded-full mb-12 shadow-sm backdrop-blur-sm">
        <button
          onClick={() => setTab("stopwatch")}
          className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${tab === "stopwatch" ? "bg-brand-surface text-brand-text shadow-sm" : "text-brand-muted hover:text-brand-text"}`}
        >
          Stopwatch
        </button>
        <button
          onClick={() => setTab("timer")}
          className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${tab === "timer" ? "bg-brand-surface text-brand-text shadow-sm" : "text-brand-muted hover:text-brand-text"}`}
        >
          Timer
        </button>
      </div>

      <div className="w-full max-w-md bg-brand-surface rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 border border-brand-border/30">
        {tab === "stopwatch" && <Stopwatch />}
        {tab === "timer" && <Timer />}
      </div>
    </div>
  )
}

export default App
