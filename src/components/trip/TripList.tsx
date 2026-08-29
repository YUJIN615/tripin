"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TripResponseType } from "@/types/trip";
import { TripCard } from "./TripCard";
import { Button } from "@/components/common/Button";

export const TripList = ({
  trips,
  isLoading,
}: {
  trips: TripResponseType[];
  isLoading: boolean;
}) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="py-16 text-center font-mono text-[13px] text-muted">
        LOADING · 일정을 불러오는 중...
      </div>
    );
  }

  return (
    <div>
      {trips.length === 0 ? (
        <div className="py-16 text-center font-mono text-[13px] text-muted">
          NO TRIPS · 등록된 일정이 없습니다
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {trips.map((item) => (
            <li key={item.id}>
              <Link href={`/trip/${item.id}`}>
                <TripCard item={item} />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Button className="w-full mt-6" onClick={() => router.push("/make")}>
        새 일정 만들기
      </Button>
    </div>
  );
};
