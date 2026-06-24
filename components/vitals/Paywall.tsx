"use client";
import { SinglePlan } from "./SinglePlan";

export function Paywall({ feature }: { feature: string }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-6 text-center sm:p-8">
      <h3 className="text-xl font-bold">Unlock {feature}</h3>
      <p className="mx-auto mt-2 max-w-md text-gray-600">
        Saving history and tracking your trend over time is part of Calqulate Vitals.
        Watch your risk fall month over month.
      </p>
      <div className="mt-8">
        <SinglePlan />
      </div>
    </div>
  );
}
