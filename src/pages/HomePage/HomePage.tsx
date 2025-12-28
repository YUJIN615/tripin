import { HomeHeader } from "@/components/home/HomeHeader";
import { SearchArea } from "@/components/home/SearchArea";
import { Recommend } from "@/components/home/Recommend";
import { RecentlyView } from "@/components/home/RecentlyView";
import { Upcoming } from "@/components/home/Upcoming";
import { BottomNav } from "@/components/common/BottomNav";

export const HomePage = () => {
  return (
    <div className="flex flex-col pb-24">
      <div className="bg-[#EFF6FF] pb-6">
        <HomeHeader />
        <SearchArea />
      </div>
      <div className="-mt-4 pt-6 rounded-t-3xl bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <Upcoming />
        <Recommend />
        <RecentlyView />
        <BottomNav />
      </div>
    </div>
  );
};

export default HomePage;
