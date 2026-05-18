"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Volume2,
  VolumeX,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TourCity {
  id: string;
  state_code: string;
  city_name: string;
  waitlist_count: number;
  weekly_count: number;
  description: string;
  date_status: string;
  date_label: string;
  bg_image: string;
  hex_color: string;
}

const TOUR_CITIES_DATA: TourCity[] = [
  {
    id: "sydney",
    state_code: "NSW",
    city_name: "Sydney",
    waitlist_count: 0,
    weekly_count: 0,
    description:
      "Opening night lands in the harbour city with skyline lasers, curated dinner club vibes and the biggest Nepalese community in Australia ready to sing every hook.",
    date_status: "TBD",
    date_label: "Opening night premiere",
    bg_image: "/images/cities/sydney.jpg",
    hex_color: "#FF4D4D",
  },
  {
    id: "melbourne",
    state_code: "VIC",
    city_name: "Melbourne",
    waitlist_count: 0,
    weekly_count: 0,
    description:
      "Melbourne gets a fashion-forward arena night with design partners from RMIT dressing the stage in brutalist textures and moody lighting.",
    date_status: "TBD",
    date_label: "Fashion-forward experience",
    bg_image: "/images/cities/melbourne.jpg",
    hex_color: "#E066FF",
  },
  {
    id: "brisbane",
    state_code: "QLD",
    city_name: "Brisbane",
    waitlist_count: 0,
    weekly_count: 0,
    description:
      "Brisbane brings a subtropical outdoor experience with river views, tropical staging, and a laid-back yet vibrant community atmosphere.",
    date_status: "TBD",
    date_label: "Subtropical night experience",
    bg_image: "/images/cities/brisbane.jpg",
    hex_color: "#9B51E0",
  },
  {
    id: "adelaide",
    state_code: "SA",
    city_name: "Adelaide",
    waitlist_count: 0,
    weekly_count: 0,
    description:
      "Intimate club night with a focus on storytelling, unplugged moments and collaborations with Fringe Festival creatives.",
    date_status: "TBD",
    date_label: "Intimate storytelling night",
    bg_image: "/images/cities/adelaide.jpg",
    hex_color: "#FFCC00",
  },
  {
    id: "perth",
    state_code: "WA",
    city_name: "Perth",
    waitlist_count: 0,
    weekly_count: 0,
    description:
      "Perth closes out the historic tour cycle with a massive open-air sunset performance tracking along the stunning western coastline.",
    date_status: "TBD",
    date_label: "Sunset finale performance",
    bg_image: "/images/cities/perth.jpg",
    hex_color: "#2F80ED",
  },
];

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const item = TOUR_CITIES_DATA[payload.index];
  if (!item) return null;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={15}
        textAnchor="middle"
        fill="#ffffff"
        className="text-sm font-black">
        {item.waitlist_count}
      </text>
      <text
        x={0}
        y={32}
        textAnchor="middle"
        fill="#ffffff"
        className="text-xs font-black uppercase tracking-wider">
        {item.city_name}
      </text>
      <text
        x={0}
        y={46}
        textAnchor="middle"
        fill="#a1a1aa"
        className="text-[10px] font-medium">
        {item.waitlist_count} on waitlist
      </text>
      <text
        x={0}
        y={58}
        textAnchor="middle"
        fill="#10b981"
        className="text-[10px] font-bold">
        {item.weekly_count} this week
      </text>
    </g>
  );
};

const CustomChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data: TourCity = payload[0].payload;
    return (
      <div className="rounded-xl border border-zinc-800 bg-black p-3 shadow-2xl text-center min-w-[130px] backdrop-blur-md">
        <p className="text-xs font-black uppercase tracking-wider text-white">
          {data.city_name}
        </p>
        <p className="text-[10px] text-zinc-400 mt-0.5">
          {data.waitlist_count} on waitlist
        </p>
        <p className="text-[10px] font-bold text-emerald-400 mt-0.5">
          {data.weekly_count} this week
        </p>
      </div>
    );
  }
  return null;
};

export default function WaitlistMasterPage() {
  const [is_audio_playing, setIsAudioPlaying] = useState(false);
  const video_ref = useRef<HTMLVideoElement>(null);
  const audio_ref = useRef<HTMLAudioElement>(null);

  const toggleAudioSystem = () => {
    if (audio_ref.current && video_ref.current) {
      if (is_audio_playing) {
        audio_ref.current.pause();
        video_ref.current.muted = true;
        setIsAudioPlaying(false);
      } else {
        audio_ref.current
          .play()
          .catch((err) => console.log("Audio play blocked: ", err));
        video_ref.current.muted = true;
        setIsAudioPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (video_ref.current) {
      video_ref.current.muted = true;
      video_ref.current.play().catch((err) => {
        console.log("Autoplay safety exception handled: ", err);
      });
    }
  }, []);

  const total_waitlist = TOUR_CITIES_DATA.reduce(
    (acc, curr) => acc + curr.waitlist_count,
    0,
  );

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans antialiased overflow-y-auto selection:bg-red-600 selection:text-white">
      <audio ref={audio_ref} src="/audio/tour-preview.mp3" loop />

      {/* FIXED BASE LEVEL BACKGROUND MEDIA LAYER */}
      <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden pointer-events-none">
        <video
          ref={video_ref}
          className="h-full w-full object-cover scale-105"
          src="/videos/concert-bg.mp4"
          loop
          playsInline
          muted
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.1)_0%,transparent_100%)] animate-pulse duration-[8000ms]" />
      </div>

      {/* ISOLATED GLOBAL STICKY BAR BARRIER */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-900/40 bg-black/40 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 flex justify-center">
          <button
            onClick={toggleAudioSystem}
            className="group flex items-center gap-3 rounded-full border border-zinc-800 bg-black/60 px-6 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-300 transition-all duration-300 hover:border-red-600 hover:text-white hover:bg-black/90 shadow-lg shadow-black/80">
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
        </div>
      </header>

      {/* CONTENT LAYER CONTAINER */}
      <div className="relative z-10 w-full">
        {/* SECTION 1: HERO VIEWPORT CONTENT */}
        <section className="min-h-[calc(100vh-62px)] w-full flex flex-col justify-center">
          <main className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12">
            {/* Left Column: Fast-Track Cities Sidebar */}
            <div className="lg:col-span-5 space-y-4 w-full order-2 lg:order-1">
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.07 6.07 0 00-1-3.5"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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

              <div className="space-y-3">
                {TOUR_CITIES_DATA.map((city) => (
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

            {/* Right Column: Tour Branding Typography */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-1 lg:order-2">
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-black tracking-[0.25em] text-red-600 uppercase block">
                  Live In Concert · Australia Tour 2026
                </span>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter text-white uppercase select-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                  Mukti & Revivals
                </h1>
              </div>
              <p className="max-w-xl text-sm sm:text-base leading-relaxed text-zinc-300 font-medium">
                It&#8216;s been years since Australia heard Mukti & Revivals
                live. He&#8216;s returning with fan favourites, Kathmandu
                stories, and surprise moments just for this community. From
                Sydney to Perth, every city brings a different energy. Pick your
                city—and feel the lyrics live again.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row lg:flex-col items-center lg:items-start gap-8 w-full justify-center sm:justify-start">
                <button className="group flex items-center gap-3 rounded-full bg-red-700 hover:bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all duration-300 shadow-[0_0_30px_rgba(185,28,28,0.3)] hover:shadow-[0_0_40px_rgba(185,28,28,0.5)] transform hover:-translate-y-0.5">
                  <span>Join Now</span>
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
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
        </section>

        {/* SECTION 2: BRAND PARTNERS & DETAILED CITY GRID */}
        <section className="w-full bg-black px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col items-center justify-center space-y-4">
            <span className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">
              Presented By
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all duration-500 hover:opacity-90 hover:grayscale-0">
              <span className="text-xl font-black tracking-tighter text-white">
                MN
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                <span className="text-red-500">g</span>arage
              </span>
              <span className="text-xs font-black tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
                TRN AUS
              </span>
              <span className="text-xs font-black tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
                TRN नेपाल
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {TOUR_CITIES_DATA.filter((city) => city.id !== "perth").map(
              (city) => (
                <div
                  key={city.id}
                  className="group relative rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950 min-h-[390px] flex flex-col justify-between p-6 sm:p-8 transition-all duration-500 hover:border-zinc-700/50">
                  <div className="absolute inset-0 z-0">
                    <img
                      src={city.bg_image}
                      alt={`${city.city_name} Arena Layout`}
                      className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/40" />
                    <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-[2px] transition-all duration-500 group-hover:backdrop-blur-0" />
                  </div>

                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.25em] text-zinc-400 uppercase bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm border border-zinc-800/30">
                        Waitlist
                      </span>
                      <span className="text-xs font-black tracking-widest text-zinc-500 uppercase">
                        {city.state_code}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-red-500">
                      {city.city_name}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed max-w-xl opacity-90">
                      {city.description}
                    </p>
                  </div>

                  <div className="relative z-10 pt-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4 rounded-2xl border border-zinc-800/40 bg-zinc-900/20 p-4 backdrop-blur-md">
                      <div className="space-y-0.5 border-r border-zinc-800/50 pr-2">
                        <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
                          Date
                        </span>
                        <p className="text-base font-black tracking-wide text-white">
                          {city.date_status}
                        </p>
                        <p className="text-[10px] text-zinc-400 font-medium truncate">
                          {city.date_label}
                        </p>
                      </div>
                      <div className="pl-2 space-y-0.5">
                        <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
                          Waitlist
                        </span>
                        <p className="text-base font-black tracking-wide text-white">
                          {city.waitlist_count}
                        </p>
                        <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-semibold">
                          <TrendingUp className="h-3 w-3" />
                          <span>{city.weekly_count} this week</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-800/40 pt-4 cursor-pointer">
                      <span className="text-xs font-black tracking-[0.2em] text-zinc-400 uppercase transition-colors duration-300 group-hover:text-white">
                        Join Waitlist
                      </span>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        {/* SECTION 3: LIVE ANALYTICS CHART & PLATFORM FOOTER */}
        <section className="w-full bg-black px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-900/40 pb-4">
            <h2 className="text-xs font-black tracking-[0.25em] text-zinc-400 uppercase">
              Live Rankings
            </h2>
            <p className="text-[11px] font-medium tracking-wide text-zinc-500">
              Updated hourly • Bars scale based on total submissions
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            {TOUR_CITIES_DATA.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full ring-2 ring-black/50"
                  style={{ backgroundColor: item.hex_color }}
                />
                <span className="text-[11px] font-black tracking-[0.2em] text-zinc-300 uppercase">
                  {item.city_name}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-zinc-900/60 bg-gradient-to-b from-zinc-950/20 to-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl min-h-[460px] flex flex-col justify-center">
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={TOUR_CITIES_DATA}
                  margin={{ top: 20, right: 10, left: -25, bottom: 40 }}
                  barSize={55}>
                  <CartesianGrid vertical={false} stroke="#18181b" />
                  <XAxis
                    dataKey="city_name"
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    tick={<CustomXAxisTick />}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 4]}
                    ticks={[0, 1, 2, 3, 4]}
                    stroke="#52525b"
                    className="text-xs font-semibold"
                  />
                  <Tooltip
                    content={<CustomChartTooltip />}
                    cursor={{ fill: "rgba(255, 255, 255, 0.03)", radius: 12 }}
                    animationDuration={200}
                  />
                  <Bar dataKey="waitlist_count" radius={[6, 6, 0, 0]}>
                    {TOUR_CITIES_DATA.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.hex_color}
                        className="transition-all duration-300 opacity-85 hover:opacity-100"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-12 pb-4 flex flex-col items-center justify-center space-y-3 border-t border-zinc-900/40">
            <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <div className="h-4 w-4 bg-amber-500 rounded-full flex items-center justify-center text-[9px] font-black text-black">
                t
              </div>
              <span className="text-sm font-black tracking-tighter text-white">
                ticketleo
              </span>
            </div>
            <p className="text-[10px] font-medium tracking-widest text-zinc-600 uppercase">
              © 2026 Ticketleo. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
