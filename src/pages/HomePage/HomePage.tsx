import { HomeHeader } from "@/components/home/HomeHeader";
import { SearchArea } from "@/components/home/SearchArea";
import { Recommend } from "@/components/home/Recommend";
import { BottomNav } from "@/components/common/BottomNav";

export const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <SearchArea />
      <Recommend />
      <BottomNav />
    </>
  );
};

export default HomePage;
