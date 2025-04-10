import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const meta: MetaFunction = () => {
  return [
    { title: "칵테일 메뉴판" },
    { name: "description", content: "칵테일 메뉴판입니다." }
  ];
};

// 임시 칵테일 데이터
const cocktails = {
  "1": {
    name: "모히토",
    image: "/모히또.png",
    ingredients: [
      "화이트 럼 60ml",
      "라임 주스 30ml",
      "설탕 2티스푼",
      "민트 잎 6-8장",
      "소다수 적당량"
    ],
    instructions: [
      "하이볼 글라스에 민트 잎과 설탕을 넣고 민트의 향이 날 때까지 으깹니다.",
      "라임 주스와 럼을 넣고 잘 섞어줍니다.",
      "얼음을 채우고 소다수로 가득 채웁니다.",
      "민트 잎으로 장식하여 완성합니다."
    ],
    description:
      "상큼한 라임과 향긋한 민트가 어우러진 쿠바의 대표적인 칵테일입니다. 여름철 더위를 날려주는 상쾌한 맛이 특징입니다."
  },
  "2": {
    name: "마르가리타",
    image: "/마르가리따.png",
    ingredients: [
      "테킬라 50ml",
      "트리플 섹 20ml",
      "라임 주스 30ml",
      "소금 적당량"
    ],
    instructions: [
      "글라스의 테두리를 라임으로 적신 후 소금을 묻힙니다.",
      "셰이커에 얼음과 모든 재료를 넣고 잘 흔들어줍니다.",
      "소금이 묻은 글라스에 스트레이너를 사용해 부어줍니다.",
      "라임 슬라이스로 장식하여 완성합니다."
    ],
    description:
      "테킬라를 베이스로 한 클래식 칵테일로, 상큼한 라임과 소금의 조화가 특징입니다. 1948년에 태어난 이 칵테일은 전 세계적으로 사랑받고 있습니다."
  },
  "3": {
    name: "블루 하와이안",
    image: "/블루하와이안.png",
    ingredients: [
      "화이트 럼 30ml",
      "블루라소 30ml",
      "파인애플 주스 60ml",
      "코코넛 크림 30ml"
    ],
    instructions: [
      "블렌더에 모든 재료를 넣습니다.",
      "얼음을 넣고 부드럽게 될 때까지 블렌딩합니다.",
      "하이볼 글라스에 부어줍니다.",
      "파인애플 슬라이스와 체리로 장식하여 완성합니다."
    ],
    description:
      "파란색이 인상적인 트로피컬 칵테일로, 달콤하고 부드러운 맛이 특징입니다. 파인애플과 코코넛의 풍미가 하와이의 정취를 느끼게 합니다."
  }
};

export default function Index() {
  return (
    <div className="bg-[#EADBBE]">
      <div className="container mx-auto p-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2
              }
            }}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="w-full max-w-[300px] mx-auto border rounded-lg p-4 flex items-center justify-center bg-[#E6D5B8] overflow-hidden">
                <img
                  src="/술집슬라이드로고.png"
                  alt="Sool.Zip 로고"
                  className="w-full h-auto object-contain"
                />
              </div>
            </SwiperSlide>
            {Object.entries(cocktails).map(([id, cocktail]) => (
              <SwiperSlide key={id}>
                <Link
                  to={`/cocktails/${id}`}
                  className="flex flex-col items-center hover:scale-105 transition-transform duration-200"
                >
                  <div className="w-full max-w-[300px] border rounded-lg p-4 flex items-center justify-center bg-[#E6D5B8] overflow-hidden">
                    {cocktail.image ? (
                      <img
                        src={cocktail.image}
                        alt={cocktail.name}
                        className="w-full h-auto object-contain"
                      />
                    ) : (
                      <p className="text-gray-500">칵테일 이미지 {id}</p>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-amber-100 font-medium text-lg tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] px-4 py-2 rounded-lg border-2 border-amber-900 shadow-[4px_4px_0px_0px_rgba(139,69,19,0.3)] wood-pattern">
                      {cocktail.name}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
