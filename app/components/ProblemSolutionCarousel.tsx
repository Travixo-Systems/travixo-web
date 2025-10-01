"use client";

import { useState } from "react";

export default function ProblemSolutionCarousel() {
  const [activeTab, setActiveTab] = useState<"problem" | "solution">("problem");

  return (
    <section className="py-16 bg-white">
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
            The Problem
          </button>
          <button
            onClick={() => setActiveTab("solution")}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "solution"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            The Solution
          </button>
        </div>

        {/* Problem Content */}
        {activeTab === "problem" && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
              Equipment Companies Lose €1M+ Annually
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Poor asset tracking creates massive hidden costs
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  2-5% Asset Loss Every Year
                </h3>
                <p className="text-gray-600">
                  For €20M in equipment, that's €400k-1M written off annually.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  €50k+ Per Quarterly Audit
                </h3>
                <p className="text-gray-600">
                  Manual counts, 2 weeks of work, inevitable discrepancies.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  3x Longer Support Tickets
                </h3>
                <p className="text-gray-600">
                  15 minutes hunting spreadsheets per customer inquiry.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Finance Reconciliation Nightmare
                </h3>
                <p className="text-gray-600">
                  Manual cross-referencing of 5+ Excel files monthly.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Solution Content */}
        {activeTab === "solution" && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
              TraviXO: Your Equipment Intelligence Platform
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Simple QR codes. Powerful tracking. Complete visibility.
            </p>

            {/* Always 2 per row on mobile, 4 per row on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  QR Everything
                </h3>
                <p className="text-gray-600">
                  Weatherproof QR stickers. Stick once, track forever.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Scan Anywhere
                </h3>
                <p className="text-gray-600">
                  Phone scanning, no app needed. 10-second logging.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Track Automatically
                </h3>
                <p className="text-gray-600">
                  Real-time dashboard. Know exactly where every asset is.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Integrate Everything
                </h3>
                <p className="text-gray-600">
                  ServiceNow, QuickBooks, Jira. No manual data entry.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
