import Link from "next/link";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ListGroup, ListRow } from "@/components/common/ListGroup";
import { getRegionCode } from "@/utils/regionCode";

// TODO: 최근 본 여행지 API 연동 시 교체
const recentlyViewItems = [
  { id: 1, region: "속초", viewedAt: "2일 전" },
  { id: 2, region: "여수", viewedAt: "5일 전" },
  { id: 3, region: "경주", viewedAt: "1주 전" },
];

export const RecentlyView = () => {
  return (
    <section className="px-5 pt-6">
      <SectionLabel size="md" className="mb-2.5">
        RECENT · 최근 본 여행지
      </SectionLabel>
      <ListGroup className="bg-[#e6f1fa] rounded-xl">
        {recentlyViewItems.map((item) => (
          <ListRow key={item.id} className="flex justify-between items-center">
            <Link href="/search" className="text-sm font-bold">
              {item.region}
            </Link>
            <div className="font-mono text-[11px] text-muted">
              {getRegionCode(item.region)} · {item.viewedAt}
            </div>
          </ListRow>
        ))}
      </ListGroup>
    </section>
  );
};

export default RecentlyView;
