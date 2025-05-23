import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "About Sool.Zip" },
    { name: "description", content: "Sool.Zip에 대한 소개입니다." }
  ];
};

export default function About() {
  return (
    <div className="bg-[#F5F5DC] min-h-screen">
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <img
              src="/술집.png"
              alt="Sool.Zip 로고"
              className="w-auto mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-amber-900 mb-4">
              Sool.Zip
            </h1>
          </div>

          {/*<div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-amber-800 mb-4">
                우리의 이야기
              </h2>
              <p className="text-gray-700 mb-6">
                Since 2022 어느날
              </p>

              <h2 className="text-2xl font-semibold text-amber-800 mb-4">
                우리의 가치
              </h2>
              <p className="text-gray-700 mb-6">
                여기에 Sool.Zip의 가치와 철학을 작성해주세요.
              </p>

              <h2 className="text-2xl font-semibold text-amber-800 mb-4">
                우리의 목표
              </h2>
              <p className="text-gray-700 mb-6">
                여기에 Sool.Zip의 목표와 비전을 작성해주세요.
              </p>
            </div>
          </div>*/}

          <div className="text-center mt-8">
            <Link
              to="/"
              className="inline-block bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-900 transition-colors duration-200"
            >
              메인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
