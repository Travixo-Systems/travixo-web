"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ProblemSolutionCarousel() {
  const [activeTab, setActiveTab] = useState<"problem" | "solution">("problem");
  const t = useTranslations("homepage.carousel");

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("problem")}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "problem"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t("tabs.problem")}
          </button>
          <button
            onClick={() => setActiveTab("solution")}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "solution"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t("tabs.solution")}
          </button>
        </div>

        {activeTab === "problem" && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
              {t("problem.title")}
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              {t("problem.subtitle")}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t(`problem.items.${i}.title`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`problem.items.${i}.text`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "solution" && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
              {t("solution.title")}
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              {t("solution.subtitle")}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                    {i}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {t(`solution.items.${i}.title`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`solution.items.${i}.text`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
