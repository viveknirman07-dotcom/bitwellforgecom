const FilmGrain = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9990]" style={{ opacity: 0.032 }}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="4"
            stitchTiles="stitch"
          >
            <animate
              attributeName="baseFrequency"
              values="0.65;0.75;0.65"
              dur="8s"
              repeatCount="indefinite"
            />
          </feTurbulence>
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain)" />
      </svg>
    </div>
  );
};

export default FilmGrain;
