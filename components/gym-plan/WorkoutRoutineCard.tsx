// components/gym-plan/WorkoutRoutineCard.tsx
"use client";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  tip: string;
  muscleGroup: string;
}

interface WorkoutRoutine {
  id: string;
  name: string;
  goal: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number;
  frequency: string;
  focusScore: number;
  brandColor: string;
  icon: string;
  exercises: Exercise[];
  proTip: string;
}

interface GenderColor {
  accent: string;
  accentHover: string;
  ring: string;
  badge: string;
  border: string;
  light: string;
  text: string;
  gradient: string;
}

interface Props {
  routine: WorkoutRoutine;
  isActive: boolean;
  genderColor: GenderColor;
  onClick: () => void;
}

const difficultyConfig = {
  Beginner: { color: "bg-green-100 text-green-800", dot: "bg-green-600" },
  Intermediate: { color: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
  Advanced: { color: "bg-red-100 text-red-800", dot: "bg-red-500" },
};

export default function WorkoutRoutineCard({
  routine,
  isActive,
  genderColor,
  onClick,
}: Props) {
  const diff = difficultyConfig[routine.difficulty];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md">
      {/* Card Header */}
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left border-t-4 border-green-600"
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-black">{routine.name}</p>
              <p className="mt-0.5 text-sm text-gray-500">{routine.goal}</p>
            </div>
            {/* Fit Score */}
            <div className="flex flex-col items-center shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                {routine.focusScore}
              </div>
              <p className="mt-1 text-xs text-gray-400">fit score</p>
            </div>
          </div>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${diff.color}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
              {routine.difficulty}
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
              {routine.duration} min
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
              {routine.frequency}
            </span>
          </div>

          {/* Expand indicator */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-gray-400">{routine.exercises.length} exercises</p>
            <span className={`text-sm font-semibold text-green-700 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}>
              {isActive ? "Hide" : "View"} Exercises
            </span>
          </div>
        </div>
      </button>

      {/* Expanded Exercise List */}
      {isActive && (
        <div className="border-t border-gray-200 bg-gray-50">
          {/* Pro Tip */}
          <div className="mx-4 mt-4 rounded-xl border-l-4 border-green-600 bg-green-50 p-4 text-sm">
            <p className="font-bold text-black">Pro Tip</p>
            <p className="mt-1 text-gray-700">{routine.proTip}</p>
          </div>

          {/* Exercise Table */}
          <div className="m-4 overflow-hidden rounded-xl border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[380px]">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-3 text-left font-semibold">Exercise</th>
                    <th className="p-3 text-center font-semibold">Sets</th>
                    <th className="p-3 text-center font-semibold">Reps</th>
                    <th className="p-3 text-center font-semibold">Rest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {routine.exercises.map((ex) => (
                    <tr key={ex.name} className="hover:bg-gray-50">
                      <td className="p-3">
                        <p className="font-semibold text-black">{ex.name}</p>
                        <p className="text-xs text-gray-400">{ex.muscleGroup}</p>
                      </td>
                      <td className="p-3 text-center font-bold text-black">{ex.sets}</td>
                      <td className="p-3 text-center font-bold text-green-700">{ex.reps}</td>
                      <td className="p-3 text-center text-gray-600">{ex.rest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Form Tips */}
          <div className="mx-4 mb-4 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Form Tips</p>
            {routine.exercises.map((ex) => (
              <div key={ex.name} className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 rounded-full bg-green-700 px-1.5 py-0.5 text-xs font-bold text-white">
                  OK
                </span>
                <p className="text-xs text-gray-600">
                  <strong>{ex.name}:</strong> {ex.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
