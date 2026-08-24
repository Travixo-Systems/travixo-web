"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ProblemSolutionCarousel() {
  const [activeTab, setActiveTab] = useState<"problem" | "solution">("problem");
  const t = useTranslations("homepage.carousel");

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Tab Buttons.
            These were two bare buttons: assistive tech announced them as
            unrelated controls, with nothing to say one was selected or that
            activating it swapped the panel below. role/aria-selected/
            aria-controls supply that, and the panels carry the matching
            role="tabpanel" with aria-labelledby pointing back. */}
        <div
          role="tablist"
          aria-label={t("tabs.label")}
          className="flex justify-center gap-4 mb-12"
        >
          {(["problem", "solution"] as const).map((tab) => (
            <button
              key={tab}
              id={`tab-${tab}`}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`panel-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t(`tabs.${tab}`)}
            </button>
          ))}
        </div>

        {activeTab === "problem" && (
          <div
            id="panel-problem"
            role="tabpanel"
            aria-labelledby="tab-problem"
            className="animate-fade-in"
          >
            <h2 className="text-4xl font-bold text-center text-ink mb-4">
              {t("problem.title")}
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              {t("problem.subtitle")}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border-l-4 border-brand pl-6">
                  <h3 className="text-xl font-bold text-ink mb-2">
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
          <div
            id="panel-solution"
            role="tabpanel"
            aria-labelledby="tab-solution"
            className="animate-fade-in"
          >
            <h2 className="text-4xl font-bold text-center text-ink mb-4">
              {t("solution.title")}
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              {t("solution.subtitle")}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                    {i}
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-1">
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
