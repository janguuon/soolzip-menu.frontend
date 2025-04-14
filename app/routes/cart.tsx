import { Link } from "@remix-run/react";
import { useState } from "react";

// 임시 주문 데이터
const initialOrders = [
  { id: 1, name: "마르가리타", quantity: 2, price: 15000 },
  { id: 2, name: "모히토", quantity: 1, price: 12000 }
];

export default function Cart() {
  const [orders, setOrders] = useState(initialOrders);

  // 총 금액 계산
  const totalPrice = orders.reduce(
    (sum, order) => sum + order.price * order.quantity,
    0
  );

  // 수량 변경 함수
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, quantity: newQuantity } : order
      )
    );
  };

  // 주문 삭제 함수
  const removeOrder = (id: number) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

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
          {orders.map((order) => (
            <div key={order.id} className="bg-[#2a2a2a] p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{order.name}</h3>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(order.id, order.quantity - 1)
                      }
                      className="px-2 py-1 bg-amber-100 text-[#1a1a1a] rounded hover:bg-amber-200"
                    >
                      -
                    </button>
                    <span className="mx-4 text-amber-200">
                      수량: {order.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(order.id, order.quantity + 1)
                      }
                      className="px-2 py-1 bg-amber-100 text-[#1a1a1a] rounded hover:bg-amber-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    {order.price * order.quantity}원
                  </p>
                  <button
                    onClick={() => removeOrder(order.id)}
                    className="mt-2 text-red-400 hover:text-red-300"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 총 금액 */}
        <div className="bg-[#2a2a2a] p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center">
            <span className="text-xl">총 금액</span>
            <span className="text-2xl font-bold">{totalPrice}원</span>
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
