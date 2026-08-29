import { HomeHeader } from "@/components/home/HomeHeader";
import { SearchArea } from "@/components/home/SearchArea";
import { Recommend } from "@/components/home/Recommend";
import { RecentlyView } from "@/components/home/RecentlyView";
import { Upcoming } from "@/components/home/Upcoming";
import { BottomNav } from "@/components/layout/BottomNav";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-canvas pb-32">
      <HomeHeader />
      <SearchArea />
      <Upcoming />
      <Recommend />
      <RecentlyView />
      <BottomNav />
    </div>
  );
};

export default HomePage;
