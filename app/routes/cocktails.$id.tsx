import { useParams, Link } from "@remix-run/react";

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
  },
  "4": {
    name: "갓파더",
    image: "/갓파더.png",
    ingredients: ["스카치 위스키 45ml", "아마레또 15ml", "얼음"],
    instructions: [
      "얼음을 채운 록스 글라스에 스카치 위스키를 넣습니다.",
      "아마레또를 추가합니다.",
      "가볍게 저어 섞어줍니다."
    ],
    description:
      "스카치 위스키와 아마레또의 조화가 특징인 클래식 칵테일입니다. 부드럽고 달콤한 맛이 인상적입니다."
  },
  "5": {
    name: "우우",
    image: "/우우.png",
    ingredients: [
      "보드카 30ml",
      "말리부 30ml",
      "크랜베리 주스 60ml",
      "라임 주스 15ml"
    ],
    instructions: [
      "셰이커에 모든 재료를 넣습니다.",
      "얼음을 추가하고 잘 흔들어줍니다.",
      "얼음을 채운 글라스에 스트레이너를 사용해 부어줍니다."
    ],
    description:
      "상큼한 크랜베리와 코코넛의 달콤한 맛이 어우러진 칵테일입니다. 부드럽고 달콤한 맛이 특징입니다."
  },
  "6": {
    name: "하이볼",
    image: "/하이볼.png",
    ingredients: ["위스키 45ml", "소다수 적당량", "레몬 슬라이스", "얼음"],
    instructions: [
      "얼음을 채운 하이볼 글라스에 위스키를 넣습니다.",
      "소다수로 채웁니다.",
      "레몬 슬라이스로 장식합니다."
    ],
    description:
      "위스키와 소다수의 조화가 특징인 클래식 칵테일입니다. 깔끔하고 상쾌한 맛이 인상적입니다."
  },
  "7": {
    name: "오르가즘",
    image: "/오르가즘.png",
    ingredients: [
      "보드카 30ml",
      "아마레또 15ml",
      "트리플 섹 15ml",
      "오렌지 주스 30ml"
    ],
    instructions: [
      "셰이커에 모든 재료를 넣습니다.",
      "얼음을 추가하고 잘 흔들어줍니다.",
      "얼음을 채운 글라스에 스트레이너를 사용해 부어줍니다."
    ],
    description:
      "달콤하고 과일향이 풍부한 칵테일입니다. 부드러운 맛과 향이 특징입니다."
  },
  "8": {
    name: "깔루아 밀크",
    image: "/깔루아밀크.png",
    ingredients: ["깔루아 45ml", "우유 90ml", "얼음"],
    instructions: [
      "얼음을 채운 글라스에 깔루아를 넣습니다.",
      "우유를 추가합니다.",
      "가볍게 저어 섞어줍니다."
    ],
    description:
      "깔루아와 우유의 부드러운 조화가 특징인 칵테일입니다. 달콤하고 크리미한 맛이 인상적입니다."
  },
  "9": {
    name: "블랙 러시안",
    image: "/블랙러시안.png",
    ingredients: ["보드카 45ml", "깔루아 15ml", "얼음"],
    instructions: [
      "얼음을 채운 글라스에 보드카를 넣습니다.",
      "깔루아를 추가합니다.",
      "가볍게 저어 섞어줍니다."
    ],
    description:
      "보드카와 깔루아의 조화가 특징인 클래식 칵테일입니다. 강렬하고 달콤한 맛이 인상적입니다."
  }
};

export default function CocktailDetail() {
  const { id } = useParams();
  const cocktailData = cocktails[id as keyof typeof cocktails] || {
    name: `칵테일 ${id}`,
    ingredients: [
      "보드카 45ml",
      "트리플 섹 15ml",
      "라임 주스 15ml",
      "크랜베리 주스 30ml"
    ],
    instructions: [
      "셰이커에 얼음을 넣습니다.",
      "모든 재료를 셰이커에 넣고 잘 흔들어줍니다.",
      "컵에 얼음을 채우고 스트레이너를 사용해 셰이커의 내용물을 부어줍니다.",
      "라임 슬라이스로 장식합니다."
    ],
    description:
      "상큼하고 달콤한 맛이 특징인 클래식 칵테일입니다. 보드카 베이스에 크랜베리 주스의 달콤함이 더해져 부드러운 맛을 자랑합니다."
  };

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
              메뉴로 돌아가기
            </Link>
            <h1 className="text-4xl font-bold text-gray-800">
              칵테일 상세 정보
            </h1>
          </div>

          <div className="bg-white/40 p-6 rounded-lg">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">설명</h2>
              <p className="text-gray-800">{cocktailData.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">재료</h2>
              <ul className="list-disc list-inside text-gray-800">
                {cocktailData.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                만드는 법
              </h2>
              <ol className="list-decimal list-inside text-gray-800">
                {cocktailData.instructions.map((instruction, index) => (
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
