import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const FaqPage = () => {
  return (
    <>
      <div>
        <Header activeHeading={5} />
        <Faq />
        <Footer />
      </div>
    </>
  );
};

const Faq = function () {
  const [activeTab, setActiveTab] = useState(0);
  console.log(activeTab)

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto my-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
        <div className="mx-auto space-y-4 ">
          <div className="border-b border-gray-200 pb-4">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleTab(1)}
            >
              <span className="text-lg font-medium text-gray-900">
                How do I track my order?
              </span>
              {activeTab === 1 ? (
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              )}
            </button>
            {activeTab === 1 && (
              <div className="mt-4">
                <p className="text-base text-gray-500">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Odit, reiciendis ab. Cum quae saepe, inventore repellat
                  blanditiis dolor illo ut fugiat magni perferendis aspernatur
                  tempore quibusdam ex laudantium. Non, amet.
                </p>
              </div>
            )}
          </div>
          <div className="border-b border-gray-200 pb-4">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleTab(2)}
            >
              <span className="text-lg font-medium text-gray-900">
                What Part?
              </span>

              {activeTab === 2 ? (
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              )}
            </button>
            {activeTab === 2 && (
              <div className="mt-4">
                <p className="text-base text-gray-500">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Odit, reiciendis ab. Cum quae saepe, inventore repellat
                  blanditiis dolor illo ut fugiat magni perferendis aspernatur
                  tempore quibusdam ex laudantium. Non, amet.
                </p>
              </div>
            )}
          </div>
          <div className="border-b border-gray-200 pb-4">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleTab(3)}
            >
              <span className="text-lg font-medium text-gray-900">
                How to do it?
              </span>
              {activeTab === 3 ? (
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              )}
            </button>
            {activeTab === 3 && (
              <div className="mt-4">
                <p className="text-base text-gray-500">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ipsam nisi dolores, repudiandae aut incidunt consequuntur ab
                  velit modi magnam laudantium. Omnis libero corporis sed
                  nostrum rem similique deserunt dolore. Quaerat?
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqPage;
