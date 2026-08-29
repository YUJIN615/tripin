import Link from "next/link";
import { SectionLabel } from "@/components/common/SectionLabel";
import { BoardingPass } from "@/components/common/BoardingPass";
import { ORIGIN_REGION_CODE, getRegionCode } from "@/utils/regionCode";
import { formatDateRange, getDDayLabel, getPlanNo } from "@/utils/tripFormat";
import { getTransportTypeNames } from "@/utils/tripUtils";

// TODO: 다가오는 여행 API 연동 시 교체
const upcomingTrip = {
  id: "413",
  region: "강릉",
  startDate: "2026-10-03",
  endDate: "2026-10-05",
  personCount: 4,
  transports: ["car"],
  image: "https://picsum.photos/390/132?random=24",
};

export const Upcoming = () => {
  const { id, region, startDate, endDate, personCount, transports, image } = upcomingTrip;

  return (
    <section className="px-5 pt-5">
      <SectionLabel size="md" className="mb-2.5">
        UPCOMING · 다가오는 여행
      </SectionLabel>
      <Link href={`/trip/${id}`}>
        <BoardingPass
          from={ORIGIN_REGION_CODE}
          to={getRegionCode(region)}
          badge={getDDayLabel(startDate, endDate)}
          image={{ src: image, alt: region }}
          meta={[
            { label: "DATE", value: formatDateRange(startDate, endDate) },
            { label: "PAX", value: `${personCount}명` },
            { label: "MODE", value: getTransportTypeNames(transports) },
          ]}
          planNo={getPlanNo(id, region)}
          action="일정 보기 →"
        />
      </Link>
    </section>
  );
};
