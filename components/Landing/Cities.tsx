"use client";

import React from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import Image from "next/image";

interface CityDetail {
  id: string;
  city_name: string;
  state_code: string;
  description: string;
  date_status: string;
  date_label: string;
  waitlist_count: number;
  weekly_count: number;
  bg_image: string;
}

const CITY_DETAILS: CityDetail[] = [
  {
    id: "sydney",
    city_name: "Sydney",
    state_code: "NSW",
    description:
      "Opening night lands in the harbour city with skyline lasers, curated dinner club vibes and the biggest Nepalese community in Australia ready to sing every hook.",
    date_status: "TBD",
    date_label: "Opening night premiere",
    waitlist_count: 0,
    weekly_count: 0,
    bg_image: "/images/cities/sydney.jpg", // Replace with your image paths
  },
  {
    id: "melbourne",
    city_name: "Melbourne",
    state_code: "VIC",
    description:
      "Melbourne gets a fashion-forward arena night with design partners from RMIT dressing the stage in brutalist textures and moody lighting.",
    date_status: "TBD",
    date_label: "Fashion-forward experience",
    waitlist_count: 0,
    weekly_count: 0,
    bg_image: "/images/cities/melbourne.jpg",
  },
  {
    id: "brisbane",
    city_name: "Brisbane",
    state_code: "QLD",
    description:
      "Brisbane brings a subtropical outdoor experience with river views, tropical staging, and a laid-back yet vibrant community atmosphere.",
    date_status: "TBD",
    date_label: "Subtropical night experience",
    waitlist_count: 0,
    weekly_count: 0,
    bg_image: "/images/cities/brisbane.jpg",
  },
  {
    id: "adelaide",
    city_name: "Adelaide",
    state_code: "SA",
    description:
      "Intimate club night with a focus on storytelling, unplugged moments and collaborations with Fringe Festival creatives.",
    date_status: "TBD",
    date_label: "Intimate storytelling night",
    waitlist_count: 0,
    weekly_count: 0,
    bg_image: "/images/cities/adelaide.jpg",
  },
];

export default function CityGridSection() {
  return (
    <section className="w-full bg-black text-white px-4 py-16 sm:px-6 lg:px-8  mx-auto space-y-16">
      <div className="max-w-7xl mx-auto">
        {/* Brands / Presenters Section */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <span className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">
            Presented By
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all duration-500 hover:opacity-90 hover:grayscale-0">
            {/* Mocking the logos from your image banner */}
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

        {/* Grid Multi-Column Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-8">
          {CITY_DETAILS.map((city) => (
            <div
              key={city.id}
              className="group relative rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950 min-h-[380px] flex flex-col justify-between p-6 sm:p-8 transition-all duration-500 hover:border-zinc-700/50 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]">
              {/* Background Image Layer with Cinematic Masking */}
              <div className="absolute inset-0 z-0">
                <Image
                  width={1000}
                  height={1000}
                  src={city.bg_image}
                  alt={`${city.city_name} Tour Visual`}
                  className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
                />
                {/* Gradient overlays to ensure high text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/40" />
                <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-[2px] transition-all duration-500 group-hover:backdrop-blur-0" />
              </div>

              {/* Top Row Content Meta */}
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

              {/* Bottom Section Layout Panel */}
              <div className="relative z-10 pt-6 space-y-6">
                {/* Inner Stats Card Grid */}
                <div className="grid grid-cols-2 gap-4 rounded-2xl border border-zinc-800/40 bg-zinc-900/20 p-4 backdrop-blur-md">
                  {/* Date Cluster */}
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

                  {/* Queue Count Cluster */}
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

                {/* Action Trigger Row */}
                <div className="flex items-center justify-between border-t border-zinc-800/40 pt-4 cursor-pointer">
                  <span className="text-xs font-black tracking-[0.2em] text-zinc-400 uppercase transition-colors duration-300 group-hover:text-white">
                    Join Waitlist
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 transition-all duration-300 group-hover:border-white group-hover:text-white group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
