"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { createRecord, ApiError } from "@/lib/glp1/client";
import { estimateFromText } from "@/lib/glp1/foodParser";
import type { Glp1EntityName } from "@/lib/glp1/schemas";

export interface MedicationOption {
  id: string;
  compound: string | null;
  customName?: string | null;
  brandName: string | null;
}

/** Display label for a medication option (brand → custom name → compound). */
export function medLabel(m: MedicationOption): string {
  return m.brandName ?? m.customName ?? m.compound ?? "Medication";
}

type Status = { kind: "idle" | "saving" } | { kind: "saved" } | { kind: "error"; message: string };

const LB_PER_KG = 2.2046226218;

/**
 * The daily logging hub. Each tab is a single fast form that POSTs through the
 * durable API and shows "Saved" only after the server confirms the persisted row.
 */
export function QuickLog({
  medications,
  onSaved,
}: {
  medications: MedicationOption[];
  onSaved?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
      <h2 className="text-lg font-bold text-gray-900">Log something</h2>
      <p className="mt-0.5 text-sm text-gray-500">Quick entries — saved the moment you hit save.</p>

      <Tabs defaultValue="weight" className="mt-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dose">Dose</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="food">Food</TabsTrigger>
          <TabsTrigger value="symptom">Symptom</TabsTrigger>
          <TabsTrigger value="checkin">Check-in</TabsTrigger>
        </TabsList>

        <TabsContent value="dose"><DoseForm medications={medications} onSaved={onSaved} /></TabsContent>
        <TabsContent value="weight"><WeightForm onSaved={onSaved} /></TabsContent>
        <TabsContent value="food"><FoodForm onSaved={onSaved} /></TabsContent>
        <TabsContent value="symptom"><SymptomForm onSaved={onSaved} /></TabsContent>
        <TabsContent value="checkin"><CheckInForm onSaved={onSaved} /></TabsContent>
      </Tabs>
    </div>
  );
}

/** Shared submit plumbing: durable save → status → reset + notify parent. */
function useSubmit(entity: Glp1EntityName, onSaved?: () => void) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  async function submit(payload: unknown, resetForm?: () => void) {
    setStatus({ kind: "saving" });
    try {
      await createRecord(entity, payload);
      setStatus({ kind: "saved" });
      resetForm?.();
      onSaved?.();
      setTimeout(() => setStatus({ kind: "idle" }), 2500);
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : "Could not save. Check your connection and try again.";
      setStatus({ kind: "error", message: msg });
    }
  }
  return { status, submit };
}

function StatusRow({ status, label }: { status: Status; label: string }) {
  return (
    <div className="mt-3 flex items-center gap-3">
      <Button type="submit" disabled={status.kind === "saving"} className="bg-emerald-600 hover:bg-emerald-700">
        {status.kind === "saving" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {label}
      </Button>
      {status.kind === "saved" && (
        <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
          <Check className="h-4 w-4" /> Saved
        </span>
      )}
      {status.kind === "error" && (
        <span className="inline-flex items-center gap-1 text-sm font-medium text-red-600">
          <AlertCircle className="h-4 w-4" /> {status.message}
        </span>
      )}
    </div>
  );
}

function nowLocalInput(): string {
  // value for <input type="datetime-local"> in the user's local time
  const d = new Date();
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
}
function localInputToIso(v: string): string {
  return v ? new Date(v).toISOString() : new Date().toISOString();
}

// ─── Dose ─────────────────────────────────────────────────────────────────────
function DoseForm({ medications, onSaved }: { medications: MedicationOption[]; onSaved?: () => void }) {
  const { status, submit } = useSubmit("doseLog", onSaved);
  const [medicationId, setMedicationId] = useState(medications[0]?.id ?? "");
  const [amountMg, setAmountMg] = useState("");
  const [takenAt, setTakenAt] = useState(nowLocalInput());
  const [site, setSite] = useState("");

  if (medications.length === 0) {
    return (
      <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Add your medication first (above) to start logging doses.
      </p>
    );
  }

  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        submit(
          {
            medicationId,
            amountMg: Number(amountMg),
            takenAt: localInputToIso(takenAt),
            injectionSite: site || null,
          },
          () => { setAmountMg(""); setTakenAt(nowLocalInput()); },
        );
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="dose-med">Medication</Label>
          <select
            id="dose-med"
            value={medicationId}
            onChange={(e) => setMedicationId(e.target.value)}
            className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {medications.map((m) => (
              <option key={m.id} value={m.id}>{medLabel(m)}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="dose-amt">Dose (mg)</Label>
          <Input id="dose-amt" type="number" step="0.01" min="0" required value={amountMg}
            onChange={(e) => setAmountMg(e.target.value)} placeholder="e.g. 0.5" />
        </div>
        <div>
          <Label htmlFor="dose-when">When</Label>
          <Input id="dose-when" type="datetime-local" value={takenAt} onChange={(e) => setTakenAt(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="dose-site">Injection site</Label>
          <select id="dose-site" value={site} onChange={(e) => setSite(e.target.value)}
            className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option value="">—</option>
            <option value="abdomen-left">Abdomen (left)</option>
            <option value="abdomen-right">Abdomen (right)</option>
            <option value="thigh-left">Thigh (left)</option>
            <option value="thigh-right">Thigh (right)</option>
            <option value="upper-arm-left">Upper arm (left)</option>
            <option value="upper-arm-right">Upper arm (right)</option>
          </select>
        </div>
      </div>
      <StatusRow status={status} label="Log dose" />
    </form>
  );
}

// ─── Weight ───────────────────────────────────────────────────────────────────
function WeightForm({ onSaved }: { onSaved?: () => void }) {
  const { status, submit } = useSubmit("weightLog", onSaved);
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"kg" | "lb">("lb");
  const [takenAt, setTakenAt] = useState(nowLocalInput());

  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        const val = Number(weight);
        const weightKg = unit === "lb" ? val / LB_PER_KG : val;
        submit(
          { weightKg: Math.round(weightKg * 1000) / 1000, takenAt: localInputToIso(takenAt) },
          () => setWeight(""),
        );
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="w-val">Weight</Label>
          <div className="mt-1 flex">
            <Input id="w-val" type="number" step="0.1" min="0" required value={weight}
              onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 184.6" className="rounded-r-none" />
            <button type="button" onClick={() => setUnit((u) => (u === "lb" ? "kg" : "lb"))}
              className="rounded-r-md border border-l-0 border-input bg-gray-50 px-3 text-sm font-medium text-gray-700">
              {unit}
            </button>
          </div>
        </div>
        <div>
          <Label htmlFor="w-when">When</Label>
          <Input id="w-when" type="datetime-local" value={takenAt} onChange={(e) => setTakenAt(e.target.value)} />
        </div>
      </div>
      <StatusRow status={status} label="Log weight" />
    </form>
  );
}

// ─── Food (protein & fiber first) ─────────────────────────────────────────────
function FoodForm({ onSaved }: { onSaved?: () => void }) {
  const { status, submit } = useSubmit("foodLog", onSaved);
  const [label, setLabel] = useState("");
  const [protein, setProtein] = useState("");
  const [fiber, setFiber] = useState("");
  const [calories, setCalories] = useState("");
  const [estimateNote, setEstimateNote] = useState<string | null>(null);

  // Code-only "AI" estimate: parse the typed meal against the local food database.
  function estimate() {
    const meal = label.trim();
    if (!meal) return;
    const r = estimateFromText(meal);
    if (r.items.length === 0) {
      setEstimateNote("Couldn't recognise any foods — enter the macros manually.");
      return;
    }
    setProtein(String(r.totals.protein));
    setFiber(String(r.totals.fiber));
    setCalories(String(r.totals.calories));
    const matched = r.items.map((i) => i.food.key.replace(/-/g, " ")).join(", ");
    setEstimateNote(`Estimated from: ${matched}${r.unmatched.length ? ` · not recognised: ${r.unmatched.join(", ")}` : ""}. Tweak if needed.`);
  }

  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        submit(
          {
            label,
            proteinG: Number(protein) || 0,
            fiberG: Number(fiber) || 0,
            calories: calories ? Number(calories) : null,
            loggedAt: new Date().toISOString(),
          },
          () => { setLabel(""); setProtein(""); setFiber(""); setCalories(""); setEstimateNote(null); },
        );
      }}
    >
      <div>
        <Label htmlFor="f-label">What did you eat?</Label>
        <div className="mt-1 flex gap-2">
          <Input id="f-label" required value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. 3 eggs, 2 slices toast, greek yogurt" />
          <Button type="button" variant="outline" onClick={estimate} title="Estimate macros from your description">
            Estimate
          </Button>
        </div>
        {estimateNote && <p className="mt-1 text-xs text-emerald-700">{estimateNote}</p>}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label htmlFor="f-protein">Protein (g)</Label>
          <Input id="f-protein" type="number" step="0.1" min="0" value={protein} onChange={(e) => setProtein(e.target.value)} placeholder="25" />
        </div>
        <div>
          <Label htmlFor="f-fiber">Fiber (g)</Label>
          <Input id="f-fiber" type="number" step="0.1" min="0" value={fiber} onChange={(e) => setFiber(e.target.value)} placeholder="6" />
        </div>
        <div>
          <Label htmlFor="f-cal" className="text-gray-400">Calories</Label>
          <Input id="f-cal" type="number" step="1" min="0" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="opt." />
        </div>
      </div>
      <p className="text-xs text-gray-400">Protein &amp; fiber come first — calories are optional.</p>
      <StatusRow status={status} label="Log food" />
    </form>
  );
}

// ─── Side effect (with "no symptoms today") ──────────────────────────────────
function SymptomForm({ onSaved }: { onSaved?: () => void }) {
  const { status, submit } = useSubmit("sideEffect", onSaved);
  const [type, setType] = useState("nausea");
  const [severity, setSeverity] = useState(2);

  return (
    <form className="mt-4 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="s-type">Symptom</Label>
          <select id="s-type" value={type} onChange={(e) => setType(e.target.value)}
            className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            {["nausea", "vomiting", "diarrhea", "constipation", "fatigue", "headache", "injection-site-reaction", "heartburn", "other"].map((t) => (
              <option key={t} value={t}>{t.replace(/-/g, " ")}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="s-sev">Severity: {severity}/5</Label>
          <input id="s-sev" type="range" min={0} max={5} value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))} className="mt-3 w-full accent-emerald-600" />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          disabled={status.kind === "saving"}
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => submit({ loggedAt: new Date().toISOString(), noSymptoms: false, type, severity })}
        >
          Log symptom
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={status.kind === "saving"}
          onClick={() => submit({ loggedAt: new Date().toISOString(), noSymptoms: true })}
        >
          No symptoms today
        </Button>
        {status.kind === "saved" && (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600"><Check className="h-4 w-4" /> Saved</span>
        )}
        {status.kind === "error" && (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-red-600"><AlertCircle className="h-4 w-4" /> {status.message}</span>
        )}
      </div>
    </form>
  );
}

// ─── Daily check-in ───────────────────────────────────────────────────────────
function CheckInForm({ onSaved }: { onSaved?: () => void }) {
  const { status, submit } = useSubmit("checkIn", onSaved);
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [craving, setCraving] = useState(3);
  const [sleep, setSleep] = useState("");
  const [notes, setNotes] = useState("");

  const slider = (id: string, label: string, val: number, set: (n: number) => void) => (
    <div>
      <Label htmlFor={id}>{label}: {val}/5</Label>
      <input id={id} type="range" min={1} max={5} value={val} onChange={(e) => set(Number(e.target.value))}
        className="mt-2 w-full accent-emerald-600" />
    </div>
  );

  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        submit(
          {
            loggedAt: new Date().toISOString(),
            mood, energy, craving,
            sleepHours: sleep ? Number(sleep) : null,
            notes: notes || null,
          },
          () => { setNotes(""); setSleep(""); },
        );
      }}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {slider("ci-mood", "Mood", mood, setMood)}
        {slider("ci-energy", "Energy", energy, setEnergy)}
        {slider("ci-craving", "Food noise / cravings", craving, setCraving)}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="ci-sleep">Sleep (hours)</Label>
          <Input id="ci-sleep" type="number" step="0.5" min="0" max="24" value={sleep} onChange={(e) => setSleep(e.target.value)} placeholder="7.5" />
        </div>
      </div>
      <div>
        <Label htmlFor="ci-notes">Notes</Label>
        <Textarea id="ci-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything worth remembering today…" rows={2} />
      </div>
      <StatusRow status={status} label="Save check-in" />
    </form>
  );
}
