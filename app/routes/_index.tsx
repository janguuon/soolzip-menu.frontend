import type { MetaFunction } from "@remix-run/node";
import { Link, useFetcher } from "@remix-run/react";
import cocktails from "../../menu.json"; //"/vercel/path0/menu.json";

export const meta: MetaFunction = () => {
  return [
    { title: "칵테일 메뉴판" },
    { name: "description", content: "칵테일 메뉴판입니다." }
  ];
};

export default function Index() {
  const fetcher = useFetcher();

  const addToCart = (id: string, name: string, price: number) => {
    fetcher.submit(
      { action: "add", id, name, price: price.toString() },
      { method: "post", action: "/cart" }
    );
    alert("추가 완료");
  };

  return (
    <div className="min-h-screen bg-[#EADBBE]">
      {/* 장바구니 버튼 */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          to="/cart"
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          장바구니
        </Link>
      </div>

      <div className="container mx-auto p-4 min-h-screen flex justify-center">
        <div className="w-full max-w-2xl flex flex-col items-center">
          {/* 로고 */}
          <div className="mb-8">
            <Link to="/about">
              <div className="relative group">
                <div className="absolute inset-0 bg-amber-900 rounded-lg transform translate-x-2 translate-y-2 max-w-[280px]"></div>
                <div className="relative bg-[#EADBAB] rounded-lg p-4 transform shadow-[4px_4px_0px_0px_rgba(139,69,19,0.3)] max-w-[280px]">
                  <img
                    src="/술집슬라이드로고.png"
                    alt="Sool.Zip 로고"
                    className="w-full h-auto object-contain max-w-[280px]"
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* 메뉴 그리드 */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {Object.entries(cocktails).map(([id, cocktail]) => (
              <div key={id} className="relative group flex justify-center">
                <div className="absolute inset-0 bg-amber-900 rounded-lg transform translate-x-2 translate-y-2 max-w-[280px]"></div>
                <div className="relative bg-[#EADBAB] rounded-lg p-4 transform shadow-[4px_4px_0px_0px_rgba(139,69,19,0.3)] max-w-[280px]">
                  <Link to={`/cocktails/${id}`}>
                    <img
                      src={cocktail.image}
                      alt={cocktail.name}
                      className="w-full h-auto object-contain max-w-[280px]"
                    />
                  </Link>
                  <div className="mt-4 flex flex-col items-center space-y-2">
                    <h2 className="text-fluid font-bold text-amber-800 text-center">
                      {cocktail.name}
                    </h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => addToCart(id, cocktail.name, 15000)}
                        className="px-2 py-1 bg-amber-100 text-[#1a1a1a] rounded-lg hover:bg-amber-200 transition-colors text-btn-fluid whitespace-nowrap"
                      >
                        주문
                      </button>
                      <Link
                        to={`/cocktails/${id}`}
                        className="px-2 py-1 bg-amber-100 text-[#1a1a1a] rounded-lg hover:bg-amber-200 transition-colors text-btn-fluid whitespace-nowrap"
                      >
                        상세정보
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
