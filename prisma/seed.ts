import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const REGIONS = [
  // 특별시/광역시/특별자치시
  { id: 1, name: "서울" },
  { id: 2, name: "부산" },
  { id: 3, name: "대구" },
  { id: 4, name: "인천" },
  { id: 5, name: "광주" },
  { id: 6, name: "대전" },
  { id: 7, name: "울산" },
  { id: 8, name: "세종" },

  // 도
  { id: 9, name: "경기도" },
  { id: 10, name: "강원도" },
  { id: 11, name: "충청북도" },
  { id: 12, name: "충청남도" },
  { id: 13, name: "전라북도" },
  { id: 14, name: "전라남도" },
  { id: 15, name: "경상북도" },
  { id: 16, name: "경상남도" },
  { id: 17, name: "제주도" },

  // 경기도 주요 도시
  { id: 20, name: "수원" },
  { id: 21, name: "성남" },
  { id: 22, name: "고양" },
  { id: 23, name: "용인" },
  { id: 24, name: "부천" },
  { id: 25, name: "안산" },
  { id: 26, name: "안양" },
  { id: 27, name: "남양주" },
  { id: 28, name: "화성" },
  { id: 29, name: "평택" },
  { id: 30, name: "의정부" },
  { id: 31, name: "시흥" },
  { id: 32, name: "파주" },
  { id: 33, name: "김포" },
  { id: 34, name: "광명" },
  { id: 35, name: "광주시" },
  { id: 36, name: "군포" },
  { id: 37, name: "이천" },
  { id: 38, name: "오산" },
  { id: 39, name: "하남" },
  { id: 40, name: "양주" },

  // 강원도 주요 도시
  { id: 41, name: "춘천" },
  { id: 42, name: "원주" },
  { id: 43, name: "강릉" },
  { id: 44, name: "속초" },
  { id: 45, name: "동해" },
  { id: 46, name: "삼척" },

  // 충청북도 주요 도시
  { id: 47, name: "청주" },
  { id: 48, name: "충주" },
  { id: 49, name: "제천" },

  // 충청남도 주요 도시
  { id: 50, name: "천안" },
  { id: 51, name: "아산" },
  { id: 52, name: "서산" },
  { id: 53, name: "당진" },
  { id: 54, name: "논산" },
  { id: 55, name: "공주" },
  { id: 56, name: "보령" },

  // 전라북도 주요 도시
  { id: 57, name: "전주" },
  { id: 58, name: "익산" },
  { id: 59, name: "군산" },
  { id: 60, name: "정읍" },
  { id: 61, name: "남원" },
  { id: 62, name: "김제" },

  // 전라남도 주요 도시
  { id: 63, name: "목포" },
  { id: 64, name: "여수" },
  { id: 65, name: "순천" },
  { id: 66, name: "나주" },
  { id: 67, name: "광양" },

  // 경상북도 주요 도시
  { id: 68, name: "포항" },
  { id: 69, name: "경주" },
  { id: 70, name: "구미" },
  { id: 71, name: "김천" },
  { id: 72, name: "안동" },
  { id: 73, name: "영주" },
  { id: 74, name: "상주" },
  { id: 75, name: "문경" },

  // 경상남도 주요 도시
  { id: 76, name: "창원" },
  { id: 77, name: "김해" },
  { id: 78, name: "양산" },
  { id: 79, name: "진주" },
  { id: 80, name: "거제" },
  { id: 81, name: "통영" },
  { id: 82, name: "사천" },
  { id: 83, name: "밀양" },

  // 제주도 주요 도시
  { id: 84, name: "제주시" },
  { id: 85, name: "서귀포" },
];

async function main() {
  console.log("🌱 Seeding database...");

  for (const region of REGIONS) {
    await prisma.region.upsert({
      where: { id: region.id },
      update: { name: region.name },
      create: {
        id: region.id,
        name: region.name,
      },
    });
    console.log(`  ✅ Region: ${region.name}`);
  }

  console.log("🌱 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
