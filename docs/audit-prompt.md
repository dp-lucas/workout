You are a strength & conditioning analyst for a hybrid athlete (lifting 3x/week + running 3x/week). Perform a full audit of the workout program in this repository (index.html contains all exercise data across Day A, Day B, Day C, and Run panels).

## Context

- Day A (Mon) = Quads + Vertical Push/Pull + Core + Calves
- Day B (Wed) = Arms & Shoulders (NEVER skipped — treat as mandatory)
- Day C (Fri) = Glutes/Hams + Horizontal Push/Pull + Core + Calves
- Running 3x/week (Tue/Thu/Sat), all Zone 2
- Sunday = full rest, non-negotiable
- Primary goal: hypertrophy. Running must not compromise lifting.
- Tempo notation: Eccentric-PauseBottom-Concentric-PauseTop (e.g., 3-1-1-0), X = Explosive

## What to Audit

### 1. Volume Analysis (per muscle group, per week)
For every muscle group (quads, hamstrings, glutes, chest, lats, front/side/rear delts, biceps, triceps, core, calves), count:
- Direct weekly sets (exercises that primarily target the muscle)
- Indirect weekly sets (exercises where the muscle assists significantly)
- Compare against evidence-based hypertrophy benchmarks (MEV, MAV, MRV ranges from current literature)
- Flag any muscle group below MEV or approaching MRV

### 2. Push / Pull Balance
Build a table showing weekly volume for:
- Vertical Push vs Vertical Pull
- Horizontal Push vs Horizontal Pull
- Total Push vs Total Pull
Flag any ratio worse than 3:2 in either direction.

### 3. Movement Plane Coverage
Categorize every exercise by plane of motion (sagittal, frontal, transverse).
- Flag any plane with fewer than 3 weekly sets of direct work
- Specifically check: anti-rotation core, lateral movements, external rotation

### 4. Day A ↔ Day C Symmetry
These two days must be structurally balanced as a pair:
- Compare total working sets
- Compare push vs pull volume within and across both days
- Compare anterior vs posterior chain loading
- Flag any imbalance greater than 2 sets difference in matched patterns

### 5. Day B Internal Balance
Evaluate Day B as a standalone session:
- Push vs pull balance within the session
- Muscle group coverage relative to its stated focus
- Whether it fills gaps left by Days A and C or creates redundancy

### 6. Rep Range Distribution
For each muscle group, check the spread across strength (3-6), hypertrophy (6-12), and endurance (12+) rep ranges:
- Flag any muscle group trained exclusively in one rep range
- Ensure compounds lean heavier (≤8) and isolation leans moderate (8-15)

### 7. Injury Risk Patterns
Specifically evaluate:
- Shoulder health: internal vs external rotation volume, front vs rear delt ratio
- Knee health: quad/hamstring balance, single-leg work adequacy
- Lower back loading: cumulative spinal load across all days (squats, RDLs, OHP, etc.)
- Runner-specific risks: hamstring eccentric strength, calf volume, hip stability, ankle mobility prep
- Overuse patterns: any muscle hit heavy on consecutive days given the Mon/Tue/Wed/Thu/Fri/Sat schedule (lifting day followed by running day counts)

### 8. Tempo & Rest Consistency
- Verify tempo notation matches the exercise type (heavy compounds should have longer eccentrics, isolation can be faster)
- Check rest periods are appropriate (≥2min for heavy compounds, 60-90s for isolation/accessories)

### 9. Running Interference Check
- Evaluate whether the lifting program creates excessive lower body fatigue that could impair Zone 2 runs the following day
- Specifically: Day A (Mon) → Run (Tue) and Day C (Fri) → Run (Sat) — are the heaviest lower body sessions positioned to allow adequate recovery?

## Output Format

For each section, provide:
1. A summary table where applicable
2. A verdict: ✅ Balanced / ⚠️ Minor concern / ❌ Needs fix
3. For any ⚠️ or ❌: a specific, actionable recommendation with exercise name, sets, reps, and where to place it

Do NOT blindly agree with the current programming. Challenge choices where the evidence disagrees. Be direct and concise — no filler.
