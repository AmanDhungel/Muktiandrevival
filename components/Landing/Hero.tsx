"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight, ChevronRight, Volume2, VolumeX } from "lucide-react";

interface CityWaitlist {
  id: string;
  state_code: string;
  city_name: string;
  waitlist_count: number;
  weekly_count: number;
}

const AUSTRALIA_CITIES: CityWaitlist[] = [
  {
    id: "sydney",
    state_code: "NSW",
    city_name: "Sydney",
    waitlist_count: 0,
    weekly_count: 0,
  },
  {
    id: "melbourne",
    state_code: "VIC",
    city_name: "Melbourne",
    waitlist_count: 0,
    weekly_count: 0,
  },
  {
    id: "brisbane",
    state_code: "QLD",
    city_name: "Brisbane",
    waitlist_count: 0,
    weekly_count: 0,
  },
  {
    id: "adelaide",
    state_code: "SA",
    city_name: "Adelaide",
    waitlist_count: 0,
    weekly_count: 0,
  },
  {
    id: "perth",
    state_code: "WA",
    city_name: "Perth",
    waitlist_count: 0,
    weekly_count: 0,
  },
];

export default function WaitlistPage() {
  const [is_muted, setIsMuted] = useState(true);
  const [is_audio_playing, setIsAudioPlaying] = useState(false);
  const video_ref = useRef<HTMLVideoElement>(null);

  const audio_ref = useRef<HTMLAudioElement>(null);

  const toggleAudioSystem = () => {
    if (audio_ref.current && video_ref.current) {
      if (is_audio_playing) {
        // Mute video track & pause independent audio source
        audio_ref.current.pause();
        video_ref.current.muted = true;
        setIsAudioPlaying(false);
      } else {
        // Play dynamic audio track & allow video timeline sync running quietly
        audio_ref.current
          .play()
          .catch((err) => console.log("Audio play blocked: ", err));
        video_ref.current.muted = true; // Video keeps playing cleanly without fighting audio source frequency
        setIsAudioPlaying(true);
      }
    }
  };

  const toggleSound = () => {
    if (video_ref.current) {
      video_ref.current.muted = !video_ref.current.muted;
      setIsMuted(video_ref.current.muted);
    }
  };

  // Auto-play safety check for modern browsers
  useEffect(() => {
    if (video_ref.current) {
      video_ref.current.muted = true;
      video_ref.current.play().catch((err) => {
        console.log("Autoplay blocked or video missing:", err);
      });
    }
  }, []);

  // Calculate total aggregate waitlist
  const total_waitlist = AUSTRALIA_CITIES.reduce(
    (acc, curr) => acc + curr.waitlist_count,
    0,
  );

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white font-sans antialiased selection:bg-red-600 selection:text-white">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={video_ref}
          className="h-full w-full object-cover scale-105"
          src="/videos/concert-bg.mp4" // Place your background video track here
          loop
          playsInline
          muted
        />

        <audio
          ref={audio_ref}
          src="/audio/tour-preview.mp3" // Put your isolated audio preview asset here
          loop
        />
        {/* Dark Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.15)_0%,transparent_100%)] animate-pulse duration-[8000ms]" />
      </div>

      <div className="relative z-10 mx-auto top-0 max-w-7xl  py-6   flex flex-col min-h-screen justify-between">
        <header className="sticky top-5 z-10 w-full mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 flex justify-center">
          <button
            onClick={toggleAudioSystem}
            className="group flex items-center gap-3 rounded-full border border-zinc-700/50 bg-black/40 px-6 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-300 backdrop-blur-md transition-all duration-300 hover:border-red-600 hover:text-white hover:bg-black/60">
            {!is_audio_playing ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-red-500 animate-bounce" />
                <span>Enable Sound for Better Experience</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
                <span>Sound Enabled • Now Playing</span>
              </>
            )}
          </button>
        </header>

        {/* Dynamic Multi-Column Body Structure */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-12">
          {/* Left Layout Container: Interactive City Panels */}
          <div className="lg:col-span-5 space-y-4 w-full order-2 lg:order-1">
            {/* Promo Broadcast Block */}
            <div className="rounded-2xl border border-red-900/30 bg-red-950/20 p-5 backdrop-blur-xl flex gap-4 shadow-2xl">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600/20 border border-red-500/30 text-red-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.07 6.07 0 00-1-3.5M3.73 0h.03c.18 0 .36.04.53.12l.02.01c.18.1.34.24.45.41.11.17.17.37.17.57v1c0 .2-.06.4-.17.57-.11.17-.27.31-.45.41l-.02.01c-.17.08-.35.12-.53.12H3.73c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-red-400">
                  Don&#8216;t Miss The Moment
                </h4>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Already {total_waitlist} people are on the list.
                </p>
                <p className="mt-2 text-xs font-medium leading-relaxed text-zinc-300 uppercase tracking-wide">
                  Early access guaranteed before public sale—lock yours by
                  picking a city below.
                </p>
              </div>
            </div>

            {/* Iterative City Queue Interface */}
            <div className="space-y-3">
              {AUSTRALIA_CITIES.map((city) => (
                <div
                  key={city.id}
                  className="group relative flex items-center justify-between rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 backdrop-blur-md transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/50">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                      {city.state_code}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-red-500">
                      {city.city_name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                        Waitlist
                      </p>
                      <p className="text-lg font-black tracking-tight text-white">
                        {city.waitlist_count}
                      </p>
                      <p className="text-[9px] text-zinc-400 font-medium">
                        {city.weekly_count} this week
                      </p>
                    </div>

                    <button className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/40 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black hover:border-white">
                      <span>Join Now</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Layout Container: Tour Narrative & Headline Typography */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-1 lg:order-2">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-black tracking-[0.25em] text-red-600 uppercase block">
                Live In Concert · Australia Tour 2026
              </span>

              {/* Dynamic Styled Artistic Header Accent */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter text-white uppercase select-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                Mukti & Revivals
              </h1>
            </div>

            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-zinc-300 font-medium">
              It&#8216;s been long time since Australia heard Mukti & Revivals
              live. They are here with fan favourites, Kathmandu stories, and
              surprise moments just for this community. From Sydney to Perth,
              every city brings a different energy. Pick your city—and feel the
              lyrics live again.
            </p>

            {/* Direct Global Opt-in Component Call */}
            <div className="pt-2 flex flex-col sm:flex-row lg:flex-col items-center lg:items-start gap-8 w-full justify-center sm:justify-start">
              <button className="group flex items-center gap-3 rounded-full bg-red-700 hover:bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all duration-300 shadow-[0_0_30px_rgba(185,28,28,0.3)] hover:shadow-[0_0_40px_rgba(185,28,28,0.5)] transform hover:-translate-y-0.5">
                <span>Join Now</span>
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Master Counter Component Matrix */}
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-[110px] font-black leading-none tracking-tighter text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                  {total_waitlist}
                </span>
                <span className="text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase mt-1">
                  On Waitlist Global
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* Global Footer Layout Elements */}
        <footer className="w-full text-center py-4 border-t border-zinc-900/40 text-[10px] font-medium tracking-widest text-zinc-600 uppercase">
          © 2026 Mukti & Revivals KC Live Tour. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}
