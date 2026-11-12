export default function Loading() {
  return (
    <div className="grid min-h-[100svh] place-items-center bg-navy-deep" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-6">
        <svg viewBox="0 0 120 40" className="h-10 w-32 text-white" aria-hidden="true">
          <path
            d="M2 38 L38 6 L56 24 L70 12 L118 38"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="[stroke-dasharray:200] [animation:draw_1.6s_cubic-bezier(.22,1,.36,1)_infinite_alternate]"
          />
          <circle cx="88" cy="10" r="4" fill="#E95C50" />
        </svg>
        <p className="eyebrow text-white/60">Happiness will happen</p>
      </div>
      <style>{`@keyframes draw { from { stroke-dashoffset: 200 } to { stroke-dashoffset: 0 } }`}</style>
    </div>
  );
}
