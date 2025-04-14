import { Link } from "@remix-run/react";

export default function Cart() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-amber-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">장바구니</h1>
          <Link
            to="/"
            className="px-4 py-2 bg-amber-100 text-[#1a1a1a] rounded-lg hover:bg-amber-200 transition-colors"
          >
            메뉴로 돌아가기
          </Link>
        </div>

        {/* 주문 목록 */}
        <div className="space-y-4 mb-8">
          {/* 주문 아이템 예시 */}
          <div className="bg-[#2a2a2a] p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">마르가리타</h3>
              <p className="text-amber-200">수량: 2</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">30,000원</p>
            </div>
          </div>
        </div>

        {/* 총 금액 */}
        <div className="bg-[#2a2a2a] p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center">
            <span className="text-xl">총 금액</span>
            <span className="text-2xl font-bold">30,000원</span>
          </div>
        </div>

        {/* 주문 버튼 */}
        <button className="w-full py-4 bg-amber-100 text-[#1a1a1a] text-xl font-bold rounded-lg hover:bg-amber-200 transition-colors">
          주문하기
        </button>
      </div>
    </div>
  );
}
