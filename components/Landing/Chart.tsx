"use client";

import React from "react";
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

interface CityRankData {
  city_id: string;
  city_name: string;
  waitlist_count: number;
  weekly_count: number;
  hex_color: string;
}

const RANKINGS_DATA: CityRankData[] = [
  {
    city_id: "sydney",
    city_name: "Sydney",
    waitlist_count: 0,
    weekly_count: 0,
    hex_color: "#FF4D4D",
  },
  {
    city_id: "melbourne",
    city_name: "Melbourne",
    waitlist_count: 0,
    weekly_count: 0,
    hex_color: "#E066FF",
  },
  {
    city_id: "brisbane",
    city_name: "Brisbane",
    waitlist_count: 0,
    weekly_count: 0,
    hex_color: "#9B51E0",
  },
  {
    city_id: "adelaide",
    city_name: "Adelaide",
    waitlist_count: 0,
    weekly_count: 0,
    hex_color: "#FFCC00",
  },
  {
    city_id: "perth",
    city_name: "Perth",
    waitlist_count: 0,
    weekly_count: 0,
    hex_color: "#2F80ED",
  },
];

// Custom X-Axis multi-line text renderer to replicate stacked layout design
const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const item = RANKINGS_DATA[payload.index];

  if (!item) return null;

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Top Large Metrics Value */}
      <text
        x={0}
        y={15}
        textAnchor="middle"
        fill="#ffffff"
        className="text-sm font-black">
        {item.waitlist_count}
      </text>
      {/* City Identification Label */}
      <text
        x={0}
        y={32}
        textAnchor="middle"
        fill="#ffffff"
        className="text-xs font-black uppercase tracking-wider">
        {item.city_name}
      </text>
      {/* Aggregate Waitlist Context */}
      <text
        x={0}
        y={46}
        textAnchor="middle"
        fill="#a1a1aa"
        className="text-[10px] font-medium">
        {item.waitlist_count} on waitlist
      </text>
      {/* Dynamic Velocity Delta Indicator */}
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

// Custom interactive Tooltip configuration matching hover screenshot design
const CustomChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data: CityRankData = payload[0].payload;
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

export default function LiveRankingsChart() {
  return (
    <section className="w-full bg-black text-white px-4 py-12 sm:px-6 lg:px-8  mx-auto space-y-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section Layout Header Panels */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-900/40 pb-4">
          <div className="space-y-1">
            <h2 className="text-xs font-black tracking-[0.25em] text-zinc-400 uppercase">
              Live Rankings
            </h2>
          </div>
          <p className="text-[11px] font-medium tracking-wide text-zinc-500">
            Updated hourly • Bars scale based on total submissions
          </p>
        </div>

        {/* Dynamic Visual Dot Color Map Legend Block */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          {RANKINGS_DATA.map((item) => (
            <div key={item.city_id} className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full ring-2 ring-black/50 shrink-0"
                style={{ backgroundColor: item.hex_color }}
              />
              <span className="text-[11px] font-black tracking-[0.2em] text-zinc-300 uppercase">
                {item.city_name}
              </span>
            </div>
          ))}
        </div>

        {/* Chart Canvas Card Panel */}
        <div className="rounded-3xl border border-zinc-900/60 bg-gradient-to-b from-zinc-950/20 to-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl min-h-[460px] flex flex-col justify-center">
          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={RANKINGS_DATA}
                margin={{ top: 20, right: 10, left: -25, bottom: 40 }}
                barSize={55}>
                <CartesianGrid
                  vertical={false}
                  stroke="#18181b"
                  strokeDasharray="0"
                />

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
                  {RANKINGS_DATA.map((entry, index) => (
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

        {/* Branded Footer Attribution Section */}
        <div className="pt-12 pb-4 flex flex-col items-center justify-center space-y-3 border-t border-zinc-900/40">
          <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
            <div className="h-4 w-4 bg-amber-500 rounded-full flex items-center justify-center text-[9px] font-black text-black">
              t
            </div>
            <span className="text-sm font-black tracking-tighter text-white">
              WhatsHappeningAustralia
            </span>
          </div>
          <p className="text-[10px] font-medium tracking-widest text-zinc-600 uppercase">
            © 2026 WhatsHappeningAustralia. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
