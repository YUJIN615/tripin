"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Region {
  id: number;
  name: string;
}

export const RegionSearchExample = () => {
  const [keyword, setKeyword] = useState("");
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(false);

  const searchRegions = async (searchKeyword: string) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/regions", {
        params: { keyword: searchKeyword },
      });
      setRegions(response.data);
    } catch (error) {
      console.error("지역 검색 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchRegions(keyword);
  }, [keyword]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">MSW 테스트 - 지역 검색</h2>

      <input
        type="text"
        placeholder="지역 검색 (예: 서울)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />

      {loading && <p>검색 중...</p>}

      <ul className="space-y-2">
        {regions.map((region) => (
          <li key={region.id} className="p-2 bg-gray-100 rounded">
            {region.name}
          </li>
        ))}
      </ul>

      {!loading && regions.length === 0 && (
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

