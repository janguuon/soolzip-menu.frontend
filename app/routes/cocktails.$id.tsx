import { useParams, Link } from "@remix-run/react";
import cocktails from "../../menu.json";

type Cocktail = {
  name: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  description: string;
};

type CocktailMenu = {
  [key: string]: Cocktail;
};

export default function CocktailDetail() {
  const { id } = useParams();
  const cocktailData = id ? (cocktails as CocktailMenu)[id] : null;

  if (!cocktailData) {
    return <div>칵테일을 찾을 수 없습니다.</div>;
  }
  
  return (
    <div className="bg-[#EADBBE]">
      <div className="container mx-auto p-4 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-800 mb-4 tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] px-4 py-2 rounded-lg border-2 border-amber-900 shadow-[4px_4px_0px_0px_rgba(139,69,19,0.3)] wood-pattern">
              {cocktailData.name}
            </h1>
            <div className="relative group">
              <div className="absolute inset-0 bg-amber-900 rounded-lg transform translate-x-2 translate-y-2 max-w-[300px] mx-auto"></div>
              <div className="relative bg-[#EADBAB] rounded-lg p-4 transform shadow-[4px_4px_0px_0px_rgba(139,69,19,0.3)] max-w-[300px] mx-auto">
                {cocktailData.image ? (
                  <img
                    src={cocktailData.image}
                    alt={cocktailData.name}
                    className="w-full h-auto object-contain max-w-[300px] mx-auto"
                  />
                ) : (
                  <p className="text-gray-500">칵테일 이미지</p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <Link
              to="/"
              className="text-gray-800 hover:text-gray-900 transition-all duration-200 flex items-center hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              돌아가기
            </Link>
            <h1 className="text-4xl font-bold text-gray-800">상세 정보</h1>
          </div>

          <div className="bg-white/40 p-6 rounded-lg">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">설명</h2>
              <p className="text-gray-800">{cocktailData.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">재료</h2>
              <ul className="list-disc list-inside text-gray-800">
                {cocktailData.ingredients.map((ingredient: string, index: number) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                만드는 법
              </h2>
              <ol className="list-decimal list-inside text-gray-800">
                {cocktailData.instructions.map((instruction: string, index: number) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
