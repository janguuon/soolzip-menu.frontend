import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "칵테일 메뉴판" },
    { name: "description", content: "칵테일 메뉴판입니다." }
  ];
};

// 임시 칵테일 데이터
const cocktails = {
  "1": { name: "모히토", image: "/모히또.jpg" },
  "2": { name: "마르가리타", image: "/마르가리따.webp" },
  "3": { name: "블루 하와이안", image: "/블루하와이안.webp" }
};

export default function Index() {
  return (
    <div className="bg-[#F5F5DC]">
      <div className="container mx-auto p-4 min-h-screen">
        <div className="text-center mb-1">
          <div className="w-auto h-auto flex items-center justify-center logo-container">
            <img
              src="/술집.png"
              alt="Sool.Zip 로고"
              className="max-h-[150px] w-auto object-contain"
            />
          </div>
        </div>
        <div className="max-w-xl mx-auto grid grid-cols-2 gap-8">
          {Object.entries(cocktails).map(([id, cocktail]) => (
            <Link
              key={id}
              to={`/cocktails/${id}`}
              className="flex flex-col items-center hover:scale-105 transition-transform duration-200"
            >
              <div className="aspect-square w-full border rounded-lg p-4 flex items-center justify-center bg-[#E6D5B8] overflow-hidden">
                {cocktail.image ? (
                  <img
                    src={cocktail.image}
                    alt={cocktail.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-gray-500">칵테일 이미지 {id}</p>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className="text-amber-700 font-medium text-lg tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] px-4 py-2 rounded-lg border-2 border-amber-900 shadow-[4px_4px_0px_0px_rgba(139,69,19,0.3)] wood-pattern">
                  {cocktail.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
