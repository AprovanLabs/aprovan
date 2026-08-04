/**
 * LIIFT4 Tracker — example published app widget.
 *
 * A patchwork widget (default-export React component) whose only backend is
 * the app surface: `keyvalue` calls ride the gateway and land in the calling
 * user's own (app, user) partition, so every user gets private, cross-device
 * state and the owner workspace's data stays untouched.
 *
 * Adapted from the original standalone SPA: window.storage → the injected
 * `keyvalue` namespace; everything else (program data, round-splitting,
 * rotating recovery schedule, core timer, styles) is unchanged.
 */
import React, { useState, useEffect, useRef, useCallback } from "react";

// --- Program data ----------------------------------------------------------

const BUILD_DAYS = [
  {
    id: "chest-tri",
    label: "Chest / Triceps",
    format: "LIIFT 50/50",
    groups: [
      { name: "Chest", ex: ["Chest Press", "Chest Fly", "Rotating Chest Press", "Decline Press"] },
      { name: "Triceps", ex: ["Tricep Kickback", "Skullcrusher", "Single-Side Crusher", "Tricep Pushup"] },
    ],
    abs: ["Dumbbell Toe Reach", "Side Reach"],
  },
  {
    id: "back-bi",
    label: "Back / Biceps",
    format: "Circuit",
    groups: [
      { name: "Back", ex: ["Regular Row", "Reverse Fly", "Wide Row", "Renegade Row"] },
      { name: "Biceps", ex: ["Hammer Curl", "Full Curl", "Wide Curl", "Cross-Body Curl"] },
    ],
    abs: ["Side Reach", "High Plank Shoulder Taps"],
  },
  {
    id: "shoulders",
    label: "Shoulders",
    format: "LIIFT Intervals",
    groups: [
      { name: "Shoulders", ex: ["Overhead Press", "Lateral Raise", "Front Raise", "Arnold Press", "Upright Row"] },
    ],
    abs: ["Windshield Wipers", "Reaching Situps"],
  },
  {
    id: "legs",
    label: "Legs",
    format: "LIIFT 50/50",
    groups: [
      { name: "Legs", ex: ["Squat", "Deadlift", "Lunge", "Calf Raise", "Sumo Squat"] },
    ],
    abs: ["Bicycle Twist", "Toe Reach"],
  },
];

const SHRED_DAYS = [
  {
    id: "chest-back",
    label: "Chest / Back",
    format: "Circuit",
    groups: [
      { name: "Chest", ex: ["Chest Press", "Chest Fly", "Incline Press", "Pushup"] },
      { name: "Back", ex: ["Regular Row", "Reverse Fly", "Wide Row", "Pullover"] },
    ],
    abs: ["Toe Reach", "Bicycle Twist"],
  },
  {
    id: "legs-shred",
    label: "Legs",
    format: "HIIT",
    groups: [
      { name: "Legs", ex: ["Squat", "Deadlift", "Lunge", "Calf Raise", "Sumo Squat"] },
    ],
    abs: ["Windshield Wipers", "Side Reach"],
  },
  {
    id: "shoulders-arms",
    label: "Shoulders / Arms",
    format: "LIIFT Intervals",
    groups: [
      { name: "Shoulders", ex: ["Overhead Press", "Lateral Raise", "Front Raise", "Arnold Press"] },
      { name: "Arms", ex: ["Hammer Curl", "Tricep Kickback", "Full Curl", "Skullcrusher"] },
    ],
    abs: ["High Plank Shoulder Taps", "Reaching Situps"],
  },
  {
    id: "full-body",
    label: "Full Body",
    format: "Circuit",
    groups: [
      { name: "Full Body", ex: ["Squat to Press", "Renegade Row", "Deadlift Curl", "Lunge Twist", "Burpee"] },
    ],
    abs: ["Bicycle Twist", "Windshield Wipers"],
  },
];

function daysForWeek(weekNumber) {
  return weekNumber >= 7 ? SHRED_DAYS : BUILD_DAYS;
}

// --- Round-splitting logic -------------------------------------------------

function computeRounds(day) {
  const round1 = [];
  const round2 = [];
  day.groups.forEach((g, gi) => {
    g.ex.forEach((name, i) => {
      const entry = { group: g.name, groupIndex: gi, name, exIndex: i };
      if (i % 2 === 0) round1.push(entry);
      else round2.push(entry);
    });
  });
  return [round1, round2];
}

// --- Rotating recovery schedule --------------------------------------------

const WEEK_SLOTS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOT_MAP = [0, 1, null, 2, 3, null, null];

// --- Storage: the app's per-user keyvalue partition ------------------------
// `keyvalue` is injected by the app surface; each user only ever touches
// their own partition, so this state follows the user across devices.

const STORE_KEY = "liift4-state";

async function loadState() {
  try {
    const res = await tools.keyvalue.get({ key: STORE_KEY });
    if (res && res.value) return res.value;
  } catch (e) {
    // first run — nothing saved yet
  }
  return null;
}

async function saveState(state) {
  try {
    await tools.keyvalue.set({ key: STORE_KEY, value: state });
  } catch (e) {
    console.error("Could not save your progress:", e);
  }
}

// --- Weight slider ---------------------------------------------------------
const MIN_W = 0;
const MAX_W = 100;
const STEP_W = 2.5;

function WeightSlider({ value, onChange }) {
  const v = typeof value === "number" ? value : 0;
  return (
    <div className="wslider">
      <input
        type="range"
        min={MIN_W}
        max={MAX_W}
        step={STEP_W}
        value={v}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label="Weight in pounds"
      />
      <div className="wval">
        {v > 0 ? (
          <>
            <span className="wnum">{v}</span>
            <span className="wunit">lb</span>
          </>
        ) : (
          <span className="wempty">—</span>
        )}
      </div>
    </div>
  );
}

// --- Core timer ------------------------------------------------------------
function CoreTimer({ seconds, onSetSeconds }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) setRemaining(seconds);
  }, [seconds, running]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  const adjust = (delta) => {
    if (running) return;
    const next = Math.max(10, seconds + delta);
    onSetSeconds(next);
  };

  return (
    <div className="timer">
      <div className="timer-head">
        <span className="timer-label">Core / Abs Timer</span>
        <div className="timer-adjust">
          <button onClick={() => adjust(-10)} disabled={running} aria-label="Minus 10 seconds">−10s</button>
          <button onClick={() => adjust(10)} disabled={running} aria-label="Plus 10 seconds">+10s</button>
        </div>
      </div>
      <div className={`timer-face ${remaining === 0 ? "done" : ""}`}>
        {mm}:{ss}
      </div>
      <div className="timer-ctrls">
        {!running ? (
          <button className="tbtn go" onClick={() => { if (remaining === 0) setRemaining(seconds); setRunning(true); }}>
            Start
          </button>
        ) : (
          <button className="tbtn stop" onClick={() => setRunning(false)}>Pause</button>
        )}
        <button className="tbtn reset" onClick={() => { setRunning(false); setRemaining(seconds); }}>Reset</button>
      </div>
    </div>
  );
}

// --- Day card --------------------------------------------------------------
function DayCard({ weekNumber, day, weights, onWeight }) {
  const rounds = computeRounds(day);
  const paired = day.groups.length > 1;

  const keyFor = (groupIndex, exIndex) =>
    `w${weekNumber}:${day.id}:${groupIndex}:${exIndex}`;

  return (
    <div className="day-card">
      <div className="day-head">
        <h3>{day.label}</h3>
        <span className="fmt">{day.format}</span>
      </div>

      {paired && (
        <p className="round-note">
          Work every other across both groups — Round 1 hits the 1st &amp; 3rd moves,
          Round 2 the 2nd &amp; 4th.
        </p>
      )}

      {rounds.map((round, ri) => (
        <div key={ri} className={`round round-${ri + 1}`}>
          <div className="round-tag">
            <span className="round-dot" />
            Round {ri + 1}
          </div>
          {round.map((e) => {
            const k = keyFor(e.groupIndex, e.exIndex);
            return (
              <div key={k} className="ex-row">
                <div className="ex-info">
                  {paired && <span className="ex-grp">{e.group}</span>}
                  <span className="ex-name">{e.name}</span>
                </div>
                <WeightSlider value={weights[k]} onChange={(v) => onWeight(k, v)} />
              </div>
            );
          })}
        </div>
      ))}

      <div className="abs-strip">
        <span className="abs-label">Finisher · Abs</span>
        <span className="abs-list">{day.abs.join(" · ")}</span>
      </div>
    </div>
  );
}

// --- Week panel ------------------------------------------------------------
function WeekPanel({ week, weights, onWeight, coreSeconds, onCore }) {
  const days = daysForWeek(week.number);
  const isShred = week.number >= 7;

  return (
    <div className="week-panel">
      <div className="week-meta">
        <div className="phase-tag">{isShred ? "Shred phase" : "Build phase"}</div>
        <CoreTimer seconds={coreSeconds} onSetSeconds={onCore} />
      </div>

      <div className="schedule">
        {WEEK_SLOTS.map((slot, i) => {
          const dayIdx = SLOT_MAP[i];
          const isRecovery = dayIdx === null;
          const d = isRecovery ? null : days[dayIdx];
          return (
            <div key={slot} className={`slot ${isRecovery ? "recovery" : "active"}`}>
              <span className="slot-day">{slot}</span>
              <span className="slot-name">{isRecovery ? "Recovery" : d.label}</span>
            </div>
          );
        })}
      </div>

      <div className="days-grid">
        {days.map((day) => (
          <DayCard
            key={day.id}
            weekNumber={week.number}
            day={day}
            weights={weights}
            onWeight={onWeight}
          />
        ))}
      </div>
    </div>
  );
}

// --- Root ------------------------------------------------------------------
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [weeks, setWeeks] = useState([]);
  const [active, setActive] = useState(0);
  const [weights, setWeights] = useState({});
  const [coreByWeek, setCoreByWeek] = useState({});
  const [confirmReset, setConfirmReset] = useState(false);
  const saveTimer = useRef(null);

  useEffect(() => {
    (async () => {
      const s = await loadState();
      if (s) {
        setWeeks(s.weeks && s.weeks.length ? s.weeks : [{ number: 1 }]);
        setWeights(s.weights || {});
        setCoreByWeek(s.coreByWeek || {});
      } else {
        setWeeks([{ number: 1 }]);
      }
      setLoaded(true);
    })();
  }, []);

  const persist = useCallback((next) => {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveState(next), 400);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    persist({ weeks, weights, coreByWeek });
  }, [weeks, weights, coreByWeek, loaded, persist]);

  const addWeek = () => {
    const nextNum = weeks.length ? weeks[weeks.length - 1].number + 1 : 1;
    const next = [...weeks, { number: nextNum }];
    setWeeks(next);
    setActive(next.length - 1);
  };

  const onWeight = (key, value) => {
    setWeights((w) => ({ ...w, [key]: value }));
  };

  const setCore = (weekNumber, seconds) => {
    setCoreByWeek((c) => ({ ...c, [weekNumber]: seconds }));
  };

  const resetAll = async () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    const fresh = { weeks: [{ number: 1 }], weights: {}, coreByWeek: {} };
    setWeeks(fresh.weeks);
    setWeights(fresh.weights);
    setCoreByWeek(fresh.coreByWeek);
    setActive(0);
    setConfirmReset(false);
    await saveState(fresh);
  };

  if (!loaded) {
    return (
      <div className="loading">
        <div className="pulse" />
        <span>Loading your log…</span>
        <style>{styles}</style>
      </div>
    );
  }

  const activeWeek = weeks[active] || weeks[0];
  const coreSeconds = coreByWeek[activeWeek.number] ?? 30;

  return (
    <div className="app">
      <style>{styles}</style>

      <header className="masthead">
        <div className="brand">
          <span className="brand-mark">LIIFT<span className="four">4</span></span>
          <span className="brand-sub">Lift · HIIT · Rest · Repeat</span>
        </div>
        <button className="reset-all" onClick={resetAll}>
          {confirmReset ? "Really clear everything?" : "Reset log"}
        </button>
      </header>

      <nav className="week-tabs" aria-label="Weeks">
        {weeks.map((w, i) => (
          <button
            key={w.number}
            className={`wtab ${i === active ? "on" : ""} ${w.number >= 7 ? "shred" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="wtab-num">{String(w.number).padStart(2, "0")}</span>
            <span className="wtab-lbl">Week</span>
          </button>
        ))}
        <button className="wtab add" onClick={addWeek} aria-label="Add a new week">
          <span className="plus">+</span>
          <span className="wtab-lbl">Add</span>
        </button>
      </nav>

      <WeekPanel
        week={activeWeek}
        weights={weights}
        onWeight={onWeight}
        coreSeconds={coreSeconds}
        onCore={(s) => setCore(activeWeek.number, s)}
      />

      <footer className="foot">
        Weights save to your account automatically — pick up on any device.
      </footer>
    </div>
  );
}

// --- Styles ----------------------------------------------------------------
const styles = `
  * { box-sizing: border-box; }
  .app {
    --ink: #14140f;
    --paper: #ece7db;
    --card: #f6f2e9;
    --line: #cdc6b4;
    --steel: #2f4858;
    --volt: #d64500;
    --volt-2: #e88a00;
    --dim: #8a8272;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
    padding: 0 0 60px;
    letter-spacing: -0.01em;
  }
  .loading {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 14px; min-height: 60vh; color: #8a8272; font-family: Arial, sans-serif;
  }
  .pulse { width: 40px; height: 40px; border-radius: 50%; background: #d64500;
    animation: p 1s ease-in-out infinite; }
  @keyframes p { 0%,100%{transform:scale(.7);opacity:.4} 50%{transform:scale(1);opacity:1} }

  .masthead {
    display: flex; align-items: flex-end; justify-content: space-between;
    padding: 26px 22px 18px; border-bottom: 3px solid var(--ink);
  }
  .brand { display: flex; flex-direction: column; line-height: 0.92; }
  .brand-mark {
    font-size: 40px; font-weight: 800; font-style: italic;
    letter-spacing: -0.04em; text-transform: uppercase;
  }
  .brand-mark .four { color: var(--volt); margin-left: 2px; }
  .brand-sub {
    font-size: 10px; font-weight: 700; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--dim); margin-top: 6px;
  }
  .reset-all {
    background: none; border: 1.5px solid var(--line); color: var(--dim);
    font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
    padding: 8px 12px; border-radius: 2px; cursor: pointer;
  }
  .reset-all:hover { border-color: var(--volt); color: var(--volt); }

  .week-tabs {
    display: flex; gap: 6px; padding: 16px 22px; overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .wtab {
    flex: 0 0 auto; display: flex; flex-direction: column; align-items: center;
    width: 60px; padding: 10px 0; background: var(--card);
    border: 1.5px solid var(--line); border-radius: 3px; cursor: pointer;
    transition: transform .1s;
  }
  .wtab:hover { transform: translateY(-2px); }
  .wtab-num { font-size: 22px; font-weight: 800; font-style: italic; }
  .wtab-lbl { font-size: 8px; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--dim); margin-top: 2px; }
  .wtab.on { background: var(--ink); border-color: var(--ink); }
  .wtab.on .wtab-num { color: #fff; }
  .wtab.on .wtab-lbl { color: #b8b0a0; }
  .wtab.on.shred { background: var(--volt); border-color: var(--volt); }
  .wtab.shred .wtab-num { color: var(--volt); }
  .wtab.on.shred .wtab-num { color: #fff; }
  .wtab.add .plus { font-size: 24px; font-weight: 700; color: var(--steel); line-height: 1; }
  .wtab.add { border-style: dashed; }
  .wtab.add:hover .plus { color: var(--volt); }

  .week-panel { padding: 6px 22px 0; }
  .week-meta {
    display: flex; align-items: stretch; justify-content: space-between;
    gap: 16px; flex-wrap: wrap; margin-bottom: 18px;
  }
  .phase-tag {
    align-self: center; font-size: 12px; font-weight: 800; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--steel);
    border-left: 4px solid var(--volt); padding-left: 12px;
  }

  .timer {
    background: var(--ink); color: #fff; border-radius: 4px; padding: 12px 16px;
    min-width: 220px;
  }
  .timer-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .timer-label { font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: #b8b0a0; }
  .timer-adjust button {
    background: #2a2a22; border: none; color: #fff; font-size: 11px; font-weight: 700;
    padding: 4px 8px; border-radius: 2px; cursor: pointer; margin-left: 4px;
  }
  .timer-adjust button:disabled { opacity: 0.35; cursor: default; }
  .timer-face {
    font-size: 40px; font-weight: 800; font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em; margin: 4px 0 8px; font-style: italic;
  }
  .timer-face.done { color: var(--volt-2); }
  .timer-ctrls { display: flex; gap: 6px; }
  .tbtn {
    flex: 1; border: none; border-radius: 2px; padding: 8px 0; font-size: 11px;
    font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer;
  }
  .tbtn.go { background: var(--volt); color: #fff; }
  .tbtn.stop { background: var(--volt-2); color: var(--ink); }
  .tbtn.reset { background: #2a2a22; color: #fff; }

  .schedule {
    display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-bottom: 22px;
  }
  .slot {
    display: flex; flex-direction: column; gap: 4px; padding: 8px 6px;
    border-radius: 3px; min-height: 58px; border: 1px solid var(--line);
  }
  .slot-day { font-size: 9px; font-weight: 800; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--dim); }
  .slot-name { font-size: 11px; font-weight: 700; line-height: 1.15; }
  .slot.active { background: var(--card); }
  .slot.active .slot-name { color: var(--ink); }
  .slot.recovery {
    background: repeating-linear-gradient(45deg, #ddd7c8, #ddd7c8 5px, #d6cfbe 5px, #d6cfbe 10px);
    opacity: 0.75;
  }
  .slot.recovery .slot-name { color: var(--dim); font-style: italic; }

  .days-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px;
  }
  .day-card {
    background: var(--card); border: 1.5px solid var(--line); border-radius: 5px;
    padding: 16px; display: flex; flex-direction: column;
  }
  .day-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
  .day-head h3 { margin: 0; font-size: 19px; font-weight: 800; font-style: italic;
    text-transform: uppercase; letter-spacing: -0.02em; }
  .fmt { font-size: 9px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--steel); background: #e0dccf; padding: 3px 7px; border-radius: 2px;
    white-space: nowrap; }
  .round-note { font-size: 11px; color: var(--dim); line-height: 1.45; margin: 10px 0 4px; }

  .round { margin-top: 12px; border-top: 1px solid var(--line); padding-top: 10px; }
  .round-tag {
    display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 800;
    letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 8px;
  }
  .round-dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
  .round-1 .round-tag { color: var(--volt); }
  .round-1 .round-dot { background: var(--volt); }
  .round-2 .round-tag { color: var(--steel); }
  .round-2 .round-dot { background: var(--steel); }

  .ex-row {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    padding: 7px 0;
  }
  .ex-info { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .ex-grp { font-size: 8px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--dim); }
  .ex-name { font-size: 13px; font-weight: 600; }

  .wslider { display: flex; align-items: center; gap: 10px; flex: 0 0 auto; }
  .wslider input[type="range"] {
    -webkit-appearance: none; appearance: none; width: 96px; height: 4px;
    background: var(--line); border-radius: 4px; outline: none; cursor: pointer;
  }
  .wslider input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none; width: 18px; height: 18px;
    border-radius: 50%; background: var(--ink); cursor: pointer;
    border: 2px solid var(--card); box-shadow: 0 0 0 1px var(--ink);
  }
  .wslider input[type="range"]::-moz-range-thumb {
    width: 18px; height: 18px; border-radius: 50%; background: var(--ink);
    cursor: pointer; border: 2px solid var(--card); box-shadow: 0 0 0 1px var(--ink);
  }
  .wval { min-width: 44px; text-align: right; }
  .wnum { font-size: 17px; font-weight: 800; font-variant-numeric: tabular-nums; }
  .wunit { font-size: 10px; font-weight: 700; color: var(--dim); margin-left: 2px; }
  .wempty { font-size: 17px; color: var(--line); }

  .abs-strip {
    margin-top: 14px; padding-top: 12px; border-top: 2px solid var(--ink);
    display: flex; flex-direction: column; gap: 3px;
  }
  .abs-label { font-size: 9px; font-weight: 800; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--volt); }
  .abs-list { font-size: 12px; font-weight: 600; color: var(--ink); }

  .foot { text-align: center; font-size: 11px; color: var(--dim); margin-top: 28px; padding: 0 22px; }

  @media (max-width: 560px) {
    .brand-mark { font-size: 32px; }
    .schedule { grid-template-columns: repeat(7, 1fr); gap: 2px; }
    .slot { padding: 6px 3px; min-height: 52px; }
    .slot-name { font-size: 9px; }
    .wslider input[type="range"] { width: 72px; }
    .days-grid { grid-template-columns: 1fr; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pulse { animation: none; }
    .wtab:hover { transform: none; }
  }
`;
