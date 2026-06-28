"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { createRecord, ApiError } from "@/lib/glp1/client";
import type { Glp1EntityName } from "@/lib/glp1/schemas";

const LB_PER_KG = 2.2046226218;

type Status = "idle" | "saving" | "saved" | "error";

const LAB_UNITS: Record<string, string> = {
  a1c: "%",
  "fasting-glucose": "mg/dL",
  "total-cholesterol": "mg/dL",
  ldl: "mg/dL",
  hdl: "mg/dL",
  triglycerides: "mg/dL",
  "systolic-bp": "mmHg",
  "diastolic-bp": "mmHg",
};

/**
 * Lower-frequency tracking: body composition (fat vs lean), labs/biomarkers, and
 * exercise (resistance-training emphasis for muscle preservation). Each writes
 * durably through the same API and refreshes the dashboard on save.
 */
export function TrackMore() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
      <h2 className="text-lg font-bold text-gray-900">Track more</h2>
      <p className="mt-0.5 text-sm text-gray-500">Body composition, labs, and workouts — the muscle-and-metabolic picture.</p>

      <Tabs defaultValue="bodycomp" className="mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bodycomp">Body comp</TabsTrigger>
          <TabsTrigger value="labs">Labs</TabsTrigger>
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
        </TabsList>
        <TabsContent value="bodycomp"><BodyCompForm /></TabsContent>
        <TabsContent value="labs"><LabForm /></TabsContent>
        <TabsContent value="exercise"><ExerciseForm /></TabsContent>
      </Tabs>
    </div>
  );
}

function useSubmit(entity: Glp1EntityName) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  async function submit(payload: unknown, reset?: () => void) {
    setStatus("saving");
    setError("");
    try {
      await createRecord(entity, payload);
      setStatus("saved");
      reset?.();
      router.refresh();
      setTimeout(() => setStatus("idle"), 2500);
    } catch (e) {
      setStatus("error");
      setError(e instanceof ApiError ? e.message : "Could not save. Try again.");
    }
  }
  return { status, error, submit };
}

function SaveRow({ status, error, label }: { status: Status; error: string; label: string }) {
  return (
    <div className="mt-3 flex items-center gap-3">
      <Button type="submit" disabled={status === "saving"} className="bg-emerald-600 hover:bg-emerald-700">
        {status === "saving" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}{label}
      </Button>
      {status === "saved" && <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600"><Check className="h-4 w-4" /> Saved</span>}
      {status === "error" && <span className="inline-flex items-center gap-1 text-sm font-medium text-red-600"><AlertCircle className="h-4 w-4" /> {error}</span>}
    </div>
  );
}

function BodyCompForm() {
  const { status, error, submit } = useSubmit("bodyComposition");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"kg" | "lb">("lb");
  const [bodyFat, setBodyFat] = useState("");
  const [source, setSource] = useState("manual");

  return (
    <form className="mt-4 space-y-3" onSubmit={(e) => {
      e.preventDefault();
      const w = Number(weight);
      const weightKg = unit === "lb" ? w / LB_PER_KG : w;
      submit(
        { takenAt: new Date().toISOString(), weightKg: Math.round(weightKg * 1000) / 1000, bodyFatPct: Number(bodyFat), source },
        () => { setWeight(""); setBodyFat(""); },
      );
    }}>
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="bc-w">Weight</Label>
          <div className="mt-1 flex">
            <Input id="bc-w" type="number" step="0.1" min="0" required value={weight} onChange={(e) => setWeight(e.target.value)} className="rounded-r-none" placeholder="184.6" />
            <button type="button" onClick={() => setUnit((u) => (u === "lb" ? "kg" : "lb"))} className="rounded-r-md border border-l-0 border-input bg-gray-50 px-3 text-sm font-medium text-gray-700">{unit}</button>
          </div>
        </div>
        <div>
          <Label htmlFor="bc-bf">Body fat (%)</Label>
          <Input id="bc-bf" type="number" step="0.1" min="2" max="75" required value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} placeholder="28" />
        </div>
        <div>
          <Label htmlFor="bc-src">Source</Label>
          <select id="bc-src" value={source} onChange={(e) => setSource(e.target.value)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option value="manual">Manual</option>
            <option value="smart-scale">Smart scale</option>
            <option value="dexa">DEXA</option>
            <option value="estimated">Estimated</option>
          </select>
        </div>
      </div>
      <p className="text-xs text-gray-400">Two or more entries unlock your fat-vs-muscle trend and muscle-loss flag.</p>
      <SaveRow status={status} error={error} label="Log body comp" />
    </form>
  );
}

function LabForm() {
  const { status, error, submit } = useSubmit("labResult");
  const [type, setType] = useState("a1c");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState(LAB_UNITS["a1c"]);

  return (
    <form className="mt-4 space-y-3" onSubmit={(e) => {
      e.preventDefault();
      submit(
        { takenAt: new Date().toISOString(), type, value: Number(value), unit },
        () => setValue(""),
      );
    }}>
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="lab-type">Marker</Label>
          <select id="lab-type" value={type} onChange={(e) => { setType(e.target.value); setUnit(LAB_UNITS[e.target.value] ?? ""); }} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option value="a1c">A1c</option>
            <option value="fasting-glucose">Fasting glucose</option>
            <option value="total-cholesterol">Total cholesterol</option>
            <option value="ldl">LDL</option>
            <option value="hdl">HDL</option>
            <option value="triglycerides">Triglycerides</option>
            <option value="systolic-bp">Systolic BP</option>
            <option value="diastolic-bp">Diastolic BP</option>
          </select>
        </div>
        <div>
          <Label htmlFor="lab-val">Value</Label>
          <Input id="lab-val" type="number" step="0.1" min="0" required value={value} onChange={(e) => setValue(e.target.value)} placeholder="5.6" />
        </div>
        <div>
          <Label htmlFor="lab-unit">Unit</Label>
          <Input id="lab-unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
        </div>
      </div>
      <SaveRow status={status} error={error} label="Log lab" />
    </form>
  );
}

function ExerciseForm() {
  const { status, error, submit } = useSubmit("exerciseLog");
  const [type, setType] = useState("resistance");
  const [label, setLabel] = useState("");
  const [duration, setDuration] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  return (
    <form className="mt-4 space-y-3" onSubmit={(e) => {
      e.preventDefault();
      submit(
        {
          loggedAt: new Date().toISOString(), type, label,
          durationMin: duration ? Number(duration) : null,
          sets: sets ? Number(sets) : null,
          reps: reps ? Number(reps) : null,
        },
        () => { setLabel(""); setDuration(""); setSets(""); setReps(""); },
      );
    }}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="ex-type">Type</Label>
          <select id="ex-type" value={type} onChange={(e) => setType(e.target.value)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option value="resistance">Resistance / strength</option>
            <option value="cardio">Cardio</option>
            <option value="flexibility">Flexibility</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <Label htmlFor="ex-label">What</Label>
          <Input id="ex-label" required value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Full-body lift" />
        </div>
        <div>
          <Label htmlFor="ex-dur">Duration (min)</Label>
          <Input id="ex-dur" type="number" min="0" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="45" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="ex-sets">Sets</Label>
            <Input id="ex-sets" type="number" min="0" value={sets} onChange={(e) => setSets(e.target.value)} placeholder="opt." />
          </div>
          <div>
            <Label htmlFor="ex-reps">Reps</Label>
            <Input id="ex-reps" type="number" min="0" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="opt." />
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400">Resistance training is the key lever for keeping muscle during weight loss.</p>
      <SaveRow status={status} error={error} label="Log workout" />
    </form>
  );
}
