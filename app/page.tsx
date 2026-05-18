import LiveRankingsChart from "@/components/Landing/Chart";
import CityGridSection from "@/components/Landing/Cities";
import WaitlistPage from "@/components/Landing/Hero";

export default function Home() {
  return (
    <div className="">
      <WaitlistPage />
      <CityGridSection />
      <LiveRankingsChart />
    </div>
  );
}
