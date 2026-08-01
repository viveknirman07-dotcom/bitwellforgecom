import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

interface Props {
  src?: string;
  poster?: string;
  /** Aspect ratio of the plate */
  ratio?: "16/9" | "9/16" | "1/1";
  label?: string;
  className?: string;
}

const ratioClass: Record<string, string> = {
  "16/9": "aspect-video",
  "9/16": "aspect-[9/16]",
  "1/1": "aspect-square",
};

/**
 * Minimal cinematic media plate. Poster-first, lazy, custom hairline controls
 * that fade out after 2s of inactivity. No third-party chrome.
 */
const CinematicPlayer = ({
  src,
  poster,
  ratio = "16/9",
  label = "Brand film",
  className = "",
}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);

  const bumpControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setControlsVisible(false), 2000);
  }, []);

  useEffect(() => {
    bumpControls();
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, [bumpControls]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
    bumpControls();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    bumpControls();
  };

  const goFullscreen = () => {
    const v = videoRef.current;
    if (v?.requestFullscreen) void v.requestFullscreen();
    bumpControls();
  };

  const onTime = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const scrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
    bumpControls();
  };

  return (
    <div
      className={`group relative w-full overflow-hidden border border-foreground/10 bg-background/40 ${ratioClass[ratio]} ${className}`}
      onMouseMove={bumpControls}
      onFocus={bumpControls}
    >
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="none"
          playsInline
          muted={muted}
          onTimeUpdate={onTime}
          onEnded={() => setPlaying(false)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0">
          {poster ? (
            <img
              src={poster}
              alt={label}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, hsl(var(--foreground) / 0.09) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.09) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_45%,hsl(var(--foreground)/0.07),transparent_72%)]" />
            </>

          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </div>
      )}

      {/* Centre play glyph */}
      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Play ${label}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="glow-cta flex h-16 w-16 items-center justify-center rounded-full border border-foreground/25 bg-background/50 backdrop-blur-md transition-transform duration-300 hover:scale-105">
            <Play size={18} className="ml-0.5 text-foreground" />
          </span>
        </button>
      )}

      {/* Hairline control bar */}
      <div
        className={`absolute inset-x-0 bottom-0 transition-opacity duration-500 ${
          controlsVisible || !playing ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          role="presentation"
          onClick={scrub}
          className="h-px w-full cursor-pointer bg-foreground/15"
        >
          <div
            className="h-px bg-foreground/70"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play"}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/45">
              {label}
            </span>
          </div>
          <button
            type="button"
            onClick={goFullscreen}
            aria-label="Fullscreen"
            className="text-foreground/70 transition-colors hover:text-foreground"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CinematicPlayer;
