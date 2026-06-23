"use client";
import { useEffect, useState } from "react";

export default function CalculatorPopup() {
  const [show, setShow] = useState(false);
  const [request, setRequest] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("calcPopupShown");

    if (!shown) {
      const timer = setTimeout(() => {
        setShow(true);
        sessionStorage.setItem("calcPopupShown", "true");
        document.body.style.overflow = "hidden";
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShow(false);
    document.body.style.overflow = "auto";
  };

  const handleSubmit = async () => {
    if (!request.trim()) return;

    try {
      const response = await fetch("/api/calculator-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request: request.trim(),
          page: window.location.href,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4"
      onClick={closePopup}
    >
      <div
        className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl animate-fadeIn mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {!submitted ? (
          <>
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-green-700">
            Can&apos;t find the calculator you need?
             </h2>

            <p className="text-sm sm:text-base text-gray-600 mb-4">
             Tell us what you&apos;re looking for &mdash; we may build it next and help thousands of others searching for the same thing.
            </p>

            <input
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              type="text"
              placeholder="Enter calculator name..."
              className="w-full border rounded-lg px-3 py-2.5 sm:py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm sm:text-base"
            />

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 sm:py-2 rounded-lg text-sm font-semibold min-h-[44px]"
              >
                Send Request
              </button>

              <button
                className="w-full sm:w-auto border px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium min-h-[44px]"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg sm:text-xl font-semibold text-green-700">
              Thank you!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              We received your request and may add this calculator soon.
            </p>
            <button
              className="mt-4 w-full sm:w-auto bg-green-600 text-white px-4 py-2.5 sm:py-2 rounded-lg text-sm font-semibold min-h-[44px]"
              onClick={closePopup}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}