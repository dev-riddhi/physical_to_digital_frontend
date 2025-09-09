export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center text-white">
        <div>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <g fill="none" stroke="currentColor" strok-width="2">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.15" />
              <path d="M22 12a10 10 0 0 0-10-10" strokeLinecap="round">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 12 12"
                  to="360 12 12"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </svg>
        </div>

        <p className="mt-6 text-lg font-semibold tracking-wide">
          Loading 🚀 ...
        </p>
      </div>
    </div>
  );
}
