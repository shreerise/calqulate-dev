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
    if (!request) return;

    try {
      await fetch("/api/calculator-request", {
        method: "POST",
        body: JSON.stringify({
          request,
          page: window.location.href,
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={closePopup}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {!submitted ? (
          <>
            <h2 className="text-xl font-semibold mb-2 text-green-700">
              Find the right calculator faster
            </h2>

            <p className="text-gray-600 mb-4">
              Looking for a calculator we don't have yet? Tell us and we will build it.
            </p>

            <input
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              type="text"
              placeholder="Enter calculator name..."
              className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>

              <button
                className="border px-4 py-2 rounded-lg"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-green-700">
              Thank you!
            </h2>
            <p className="text-gray-600 mt-2">
              We received your request and may add this calculator soon.
            </p>
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
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