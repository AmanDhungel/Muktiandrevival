"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Calendar, Disc, Phone } from "lucide-react";
import Image from "next/image";

interface TourCity {
  id: string;
  state_code: string;
  city_name: string;
  description: string;
  date_status: string;
  date_label: string;
}

const TOUR_CITIES_DATA: TourCity[] = [
  {
    id: "darwin",
    state_code: "NT",
    city_name: "Darwin",
    description: "Opening night lands in the harbour city with curated vibes.",
    date_status: "Coming Soon",
    date_label: "night premiere",
  },
  {
    id: "sydney",
    state_code: "NSW",
    city_name: "Sydney",
    description: "Opening night lands in the harbour city with curated vibes.",
    date_status: "Coming Soon",
    date_label: "Opening night premiere",
  },
  {
    id: "hobart",
    state_code: "TAS",
    city_name: "Hobart",
    description:
      "Hobart brings a spectacular experience with a welcoming community.",
    date_status: "Coming Soon",
    date_label: "Subtropical night experience",
  },
  {
    id: "melbourne",
    state_code: "VIC",
    city_name: "Melbourne",
    description:
      "Melbourne gets an arena night with exceptional audio staging.",
    date_status: "Coming Soon",
    date_label: "Premium venue experience",
  },
  {
    id: "canberra",
    state_code: "ACT",
    city_name: "Canberra",
    description:
      "Bringing the legendary rock rhythms deep into the heart of the capital.",
    date_status: "Coming Soon",
    date_label: "Capital arena stage",
  },
  {
    id: "brisbane",
    state_code: "QLD",
    city_name: "Brisbane",
    description: "Intimate club night with a heavy focus on storytelling.",
    date_status: "TBA",
    date_label: "Intimate storytelling night",
  },
  {
    id: "adelaide",
    state_code: "SA",
    city_name: "Adelaide",
    description: "Intimate club night with a heavy focus on storytelling.",
    date_status: "TBA",
    date_label: "Intimate venue experience",
  },
];

const BAND_MEMBERS = [
  {
    name: "Mukti Shakya",
    role: "Vocalist & Lead Guitar",
    image: "/images/band/mukti.jpg",
  },
  { name: "Sunit Kansakar", role: "Guitars", image: "/images/band/sunit.jpg" },
  { name: "Roshan Kansakar", role: "Bass", image: "/images/band/roshan.jpg" },
  {
    name: "Nikhil Tuladhar",
    role: "Drums & Percussions",
    image: "/images/band/nikhil.jpg",
  },
];

export default function RedesignedTourPage() {
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

  return (
    <div className="relative min-h-screen w-full bg-[#041e3a] text-white font-sans antialiased overflow-y-auto selection:bg-[#3a80f5] selection:text-white">
      <audio ref={audio_ref} src="/audio/tour-preview.mp3" loop />

      <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden pointer-events-none">
        <video
          ref={video_ref}
          className="h-full w-full object-cover scale-105"
          src="/videos/concert-bg.mp4"
          loop
          playsInline
          muted
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041e3a]/60 via-[#041e3a]/85 to-[#041e3a]" />
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#041e3a]/60 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 flex justify-center">
          <button
            onClick={toggleAudioSystem}
            className="group flex items-center gap-3 rounded-full border border-white/10 bg-[#041e3a]/80 px-6 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-300 transition-all duration-300 hover:border-[#3a80f5] hover:text-white hover:bg-[#041e3a]">
            {!is_audio_playing ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-[#3a80f5] animate-bounce" />
                <span>Enable Sound for Better Experience</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                <span>Sound Enabled • Now Playing</span>
              </>
            )}
          </button>
        </div>
      </header>

      <div className="relative z-10 w-full">
        <section className="min-h-[calc(100vh-62px)] w-full flex flex-col justify-center">
          <main className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12">
            <div className="lg:col-span-5 space-y-3 w-full order-2 lg:order-1">
              <span className="text-xs font-bold tracking-[0.2em] text-[#3a80f5] uppercase block mb-2">
                Tour Venues & Schedule
              </span>
              <div className="space-y-3">
                {TOUR_CITIES_DATA.map((city) => (
                  <div
                    key={city.id}
                    className="group relative flex items-center justify-between rounded-xl border border-white/5 bg-[#041e3a]/40 p-4 backdrop-blur-md transition-all duration-300">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                        {city.state_code} • {city.date_label}
                      </span>
                      <h3 className="text-lg font-bold tracking-tight text-white">
                        {city.city_name}
                      </h3>
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-1 lg:order-2">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white/5 border border-white/10 p-2 flex items-center justify-center group backdrop-blur-sm">
                <Image
                  src="/images/band-logo.jpg"
                  alt="Mukti & Revival Band Logo"
                  width={1000}
                  height={1000}
                  className="object-cover rounded-full h-25 w-25 transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-black tracking-[0.25em] text-[#3a80f5] uppercase block">
                  Live In Concert · Australia Tour 2026
                </span>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter text-white uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  Mukti & Revival
                </h1>
              </div>
              <p className="max-w-xl text-sm sm:text-base leading-relaxed text-zinc-300 font-medium">
                They are returning with fan favourites, Kathmandu stories, and
                surprise moments just for this community. From Sydney to Perth,
                every city brings a historic energy.
              </p>
              <div className="pt-2">
                <button className="flex items-center gap-2 rounded-full bg-[#3a80f5] px-8 py-4 text-sm font-black uppercase tracking-widest text-white cursor-not-allowed opacity-80">
                  <Calendar className="h-4 w-4" />
                  <span>Tickets Coming Soon</span>
                </button>
              </div>
            </div>
          </main>
        </section>

        <section className="w-full bg-[#041e3a] pb-16 pt-4">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md shadow-xl text-center space-y-6 overflow-hidden group hover:border-[#3a80f5]/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 h-48 w-48 bg-[#3a80f5]/10 rounded-full blur-3xl group-hover:bg-[#3a80f5]/20 transition-all duration-500 pointer-events-none" />

              <div className="space-y-2">
                <span className="text-xs font-bold tracking-[0.25em] text-[#3a80f5] uppercase block">
                  Get In Touch
                </span>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                  For sponsorship and interstate
                </h2>
                <p className="text-xs sm:text-sm font-medium text-zinc-400">
                  Please contact us at:
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-2">
                <a
                  href="tel:0451199518"
                  className="flex items-center gap-3 rounded-full border border-white/5 bg-[#041e3a]/60 px-6 py-3 text-sm font-bold tracking-wider text-white hover:text-[#3a80f5] hover:border-[#3a80f5]/30 hover:bg-[#041e3a] transition-all duration-300 w-full sm:w-auto justify-center">
                  <Phone className="h-4 w-4 text-[#3a80f5]" />
                  <span>0451 199 518</span>
                </a>

                <a
                  href="tel:0469361869"
                  className="flex items-center gap-3 rounded-full border border-white/5 bg-[#041e3a]/60 px-6 py-3 text-sm font-bold tracking-wider text-white hover:text-[#3a80f5] hover:border-[#3a80f5]/30 hover:bg-[#041e3a] transition-all duration-300 w-full sm:w-auto justify-center">
                  <Phone className="h-4 w-4 text-[#3a80f5]" />
                  <span>0469 361 869</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* BIO SECTION */}
        <section className="w-full bg-[#041e3a] py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Left Column: Cover/Poster Representation */}
              <div className="w-full lg:w-1/2 max-w-md lg:max-w-none">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-zinc-900">
                  <Image
                    width={1000}
                    height={1000}
                    src="/images/tour-poster.webp"
                    alt="Mukti and Revival Australia Tour Poster"
                    className="w-full h-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041e3a] via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Right Column: Bio Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold tracking-[0.3em] text-[#3a80f5] uppercase block">
                    The Legend Legacy
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
                    Mukti & Revival
                  </h2>
                </div>
                <p className="text-zinc-300 text-base leading-relaxed font-normal">
                  A rock band based in Kathmandu, Nepal. The band has been
                  rocking the nation since last three decades. Mukti and Revival
                  blends Nepali folk tunes with American Blues giving the taste
                  of local flavor to their music.
                </p>
                <p className="text-zinc-300 text-base leading-relaxed font-normal">
                  Since the 90s, the band has been working to revive traditional
                  charm in modern Nepali music, questioning, satirizing, and
                  raising awareness about pertinent issues in society.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BAND MEMBERS GRID SECTION */}
        <section className="w-full bg-[#041e3a] py-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold tracking-[0.3em] text-[#3a80f5] uppercase block">
                On Stage Lineup
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
                Band Members
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {BAND_MEMBERS.map((member, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-xl overflow-hidden bg-[#041e3a] border border-white/5 flex flex-col transition-all duration-300 hover:border-[#3a80f5]/50">
                  <div className="aspect-[4/5] w-full overflow-hidden bg-zinc-900 relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-w-7xl) 25vw, 50vw"
                      className="object-cover filter grayscale contrast-[1.15] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 bg-gradient-to-t from-[#041e3a] to-[#041e3a]/90 border-t border-white/5 z-10">
                    <h4 className="text-lg font-bold text-white tracking-wide">
                      {member.name}
                    </h4>
                    <p className="text-xs font-semibold text-zinc-400 mt-0.5 uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SPOTIFY STREAMING PLAYER AREA */}
        <section className="w-full bg-[#041e3a] py-20 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-[0.3em] text-[#3a80f5] uppercase block">
                Get In The Mood
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Listen to the artists
              </h2>
            </div>

            <div className="w-full rounded-xl overflow-hidden shadow-lg mt-6">
              <iframe
                data-testid="embed-iframe"
                src="https://open.spotify.com/embed/artist/62yM3pzTzQHys1Ih7e9dJT?utm_source=generator"
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"></iframe>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#041e3a] py-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-wrap gap-4 w-full items-center justify-around">
              <div className="flex flex-col gap-6 items-center justify-items-center ">
                <h3>Tours By</h3>
                <div className="flex">
                  {[1, 2].map((sponsorNum) => (
                    <div key={sponsorNum} className="">
                      <Image
                        src={`/images/sponsors/logo-${sponsorNum}.png`}
                        alt={`Sponsor Logo ${sponsorNum}`}
                        width={1000}
                        height={1000}
                        className="object-cover p-2 w-40 h-30 rounded-2xl"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-6 items-center justify-items-center ">
                <h3>In Associated With:</h3>
                {[3].map((sponsorNum) => (
                  <div key={sponsorNum} className="">
                    <Image
                      src={`/images/sponsors/logo-${sponsorNum}.png`}
                      alt={`Sponsor Logo ${sponsorNum}`}
                      width={1000}
                      height={1000}
                      className="object-cover p-2 w-40 h-30 rounded-2xl"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-6 items-center justify-items-center ">
                <h3>Marketing and creative by:</h3>
                {[4].map((sponsorNum) => (
                  <div key={sponsorNum} className="">
                    <Image
                      src={`/images/sponsors/logo-${sponsorNum}.png`}
                      alt={`Sponsor Logo ${sponsorNum}`}
                      width={1000}
                      height={1000}
                      className="object-cover p-2 w-40 h-30 rounded-2xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="w-full bg-[#041e3a] px-4 py-12 border-t border-white/5 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <span className="text-sm font-black tracking-tighter text-white">
                WhatsHappeningAustralia
              </span>
            </div>
            <p className="text-[10px] font-medium tracking-widest text-zinc-500 uppercase">
              © 2026 WhatsHappeningAustralia. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
