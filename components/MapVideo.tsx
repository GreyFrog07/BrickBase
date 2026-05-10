'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

export function MapVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          el.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          el.pause();
          setPlaying(false);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !muted;
    el.muted = next;
    setMuted(next);
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="bg-sand py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label">Every floor on the map</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            Faridabad,{' '}
            <span className="text-accent-deep">pin by pin.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink/65">
            Every builder floor project in existence in one place.
          </p>
        </div>

        <div className="mx-auto mt-10 w-full max-w-sm sm:max-w-md">
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink shadow-2xl shadow-ink/10">
            <video
              ref={videoRef}
              className="block h-auto w-full"
              src="/map-loop.mp4"
              poster="/map-loop-poster.jpg"
              muted={muted}
              playsInline
              loop
              preload="metadata"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/60 to-transparent" />

            <div className="absolute bottom-3 right-3 flex gap-2">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? 'Pause video' : 'Play video'}
                className="grid h-9 w-9 place-items-center rounded-full bg-sand/90 text-ink backdrop-blur transition hover:bg-sand"
              >
                {playing ? (
                  <Pause className="h-4 w-4" strokeWidth={2} />
                ) : (
                  <Play className="h-4 w-4" strokeWidth={2} />
                )}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                className="grid h-9 w-9 place-items-center rounded-full bg-sand/90 text-ink backdrop-blur transition hover:bg-sand"
              >
                {muted ? (
                  <VolumeX className="h-4 w-4" strokeWidth={2} />
                ) : (
                  <Volume2 className="h-4 w-4" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
