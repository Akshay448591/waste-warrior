import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase";
import { addPoints, completeChallenge } from "../utils/userService";
import { motion, AnimatePresence } from "framer-motion";
import Wally from "../components/Wally";

function Challenges() {
  const [completed, setCompleted] = useState([]);
  const [wallyMood, setWallyMood] = useState("encourage");
  const [wallyMsg, setWallyMsg] = useState("Pick a challenge and let's go! You can do it! 💪");
  const user = auth.currentUser;

  const challenges = [
    {
      id: 1, title: "Scan Your First Item!", reward: 10,
      icon: "📸", desc: "Take a photo of any piece of rubbish and scan it!",
      difficulty: "Easy", diffColor: "#4ade80", emoji: "🌱",
    },
    {
      id: 2, title: "Scan 3 Different Items", reward: 20,
      icon: "🔍", desc: "Find 3 different types of waste around you!",
      difficulty: "Medium", diffColor: "#fbbf24", emoji: "🌟",
    },
    {
      id: 3, title: "Recycle Some Plastic", reward: 15,
      icon: "♻️", desc: "Find a plastic item and put it in the right bin!",
      difficulty: "Easy", diffColor: "#4ade80", emoji: "💚",
    },
    {
      id: 4, title: "7-Day Streak Hero", reward: 50,
      icon: "🔥", desc: "Come back and scan every day for a whole week!",
      difficulty: "Hard", diffColor: "#f97316", emoji: "🏆",
    },
    {
      id: 5, title: "Learn All 5 Lessons", reward: 30,
      icon: "📚", desc: "Read all the lessons in the Learn section!",
      difficulty: "Medium", diffColor: "#fbbf24", emoji: "🎓",
    },
  ];

  const totalEarned = challenges.filter(c => completed.includes(c.id)).reduce((s, c) => s + c.reward, 0);
  const allDone = completed.length === challenges.length;

  const handleComplete = async (challenge) => {
    if (completed.includes(challenge.id)) return;
    setCompleted(prev => [...prev, challenge.id]);
    setWallyMood("celebrate");
    setWallyMsg(`+${challenge.reward} coins! You're on fire! 🔥 Keep going!`);
    await addPoints(user.uid, challenge.reward);
    await completeChallenge(user.uid, challenge.id);
    toast.success(`🎉 +${challenge.reward} XP earned!`, {
      style: { background: "#1a2e22", color: "#e8f5e9", border: "1px solid rgba(74,222,128,0.3)", fontFamily: "'Nunito', sans-serif", fontWeight: 700, borderRadius: "14px" }
    });
    if (completed.length + 1 === challenges.length) {
      setTimeout(() => {
        setWallyMood("celebrate");
        setWallyMsg("WOW!! You finished ALL the challenges! You're a true Eco Legend! 🏆🌍");
      }, 800);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a1f0e 0%, #081208 50%, #0a1520 100%)",
      color: "#e8f5e9",
      fontFamily: "'Nunito', sans-serif",
      position: "relative", overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Fredoka+One&family=Space+Mono:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .dots-bg {
          position: fixed; inset: 0;
          background-image: radial-gradient(circle, rgba(74,222,128,0.09) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none; z-index: 0;
        }

        .challenge-card {
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(74,222,128,0.15);
          border-radius: 22px;
          padding: 18px;
          margin-bottom: 12px;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
          position: relative; overflow: hidden;
        }

        .challenge-card:hover { transform: translateY(-2px); border-color: rgba(74,222,128,0.3); }

        .challenge-card.done {
          background: rgba(74,222,128,0.06);
          border-color: rgba(74,222,128,0.35);
        }

        .claim-btn {
          background: linear-gradient(135deg, #4ade80, #22c55e);
          color: #0a1a0e;
          border: none; padding: 11px 22px;
          border-radius: 14px;
          font-family: 'Fredoka One', cursive;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap; flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(74,222,128,0.3), 0 2px 0 #16a34a;
        }

        .claim-btn:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 8px 24px rgba(74,222,128,0.4), 0 2px 0 #16a34a; }
        .claim-btn:active { transform: scale(0.96); }

        .done-badge {
          background: rgba(74,222,128,0.12);
          border: 2px solid rgba(74,222,128,0.3);
          color: #4ade80; padding: 11px 18px;
          border-radius: 14px;
          font-weight: 900; font-size: 13px;
          white-space: nowrap; flex-shrink: 0;
        }

        .progress-track {
          height: 12px;
          background: rgba(74,222,128,0.1);
          border-radius: 100px;
          overflow: hidden;
          border: 1px solid rgba(74,222,128,0.15);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4ade80, #6ee7b7);
          border-radius: 100px;
          transition: width 0.7s cubic-bezier(0.16,1,0.3,1);
          position: relative; overflow: hidden;
        }

        .progress-fill::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: progShine 2s linear infinite;
        }

        @keyframes progShine {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }

        .xp-tag {
          background: rgba(251,191,36,0.15);
          border: 1.5px solid rgba(251,191,36,0.3);
          color: #fbbf24;
          border-radius: 100px; padding: 3px 10px;
          font-size: 12px; font-weight: 900;
          font-family: 'Space Mono', monospace;
        }

        .top-stripe {
          height: 3px;
          background: linear-gradient(90deg, #4ade80, #6ee7b7);
          position: absolute; top: 0; left: 0; right: 0;
        }
      `}</style>

      <div className="dots-bg" />
      <div style={{ position: "fixed", width: 300, height: 300, background: "rgba(251,191,36,0.05)", borderRadius: "50%", filter: "blur(80px)", top: 80, right: -80, pointerEvents: "none", zIndex: 0 }} />

      <Toaster position="top-center" />

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 18px 110px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ padding: "22px 0 18px" }}>
          <div style={{ fontSize: 10, color: "rgba(134,239,172,0.5)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
            DAILY MISSIONS
          </div>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 26, color: "#f0fdf4" }}>Challenges 🎯</div>
        </motion.div>

        {/* Wally */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} style={{ marginBottom: 18 }}>
          <Wally mood={wallyMood} message={wallyMsg} size="sm" showName={true} />
        </motion.div>

        {/* Progress card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
          style={{ background: "rgba(255,255,255,0.05)", border: "2px solid rgba(74,222,128,0.18)", borderRadius: 20, padding: "16px 18px", marginBottom: 20 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: "#e8f5e9" }}>
              Today's progress 📊
            </span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, color: "#fbbf24", fontWeight: 700 }}>
              +{totalEarned} XP 🪙
            </span>
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            {challenges.map(c => (
              <motion.div
                key={c.id}
                animate={{ scale: completed.includes(c.id) ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  flex: 1, height: 10, borderRadius: 100,
                  background: completed.includes(c.id)
                    ? "linear-gradient(90deg, #4ade80, #6ee7b7)"
                    : "rgba(74,222,128,0.12)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  transition: "background 0.4s",
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "rgba(134,239,172,0.5)" }}>
            {completed.length} / {challenges.length} complete {completed.length === challenges.length ? "🎉" : ""}
          </div>
        </motion.div>

        {/* Challenges */}
        <div>
          {challenges.map((c, i) => {
            const isDone = completed.includes(c.id);
            return (
              <motion.div
                key={c.id}
                className={`challenge-card ${isDone ? "done" : ""}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.08 }}
              >
                {isDone && <div className="top-stripe" />}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center", flex: 1, minWidth: 0 }}>
                    <motion.div
                      animate={isDone ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                      style={{
                        width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                        background: isDone ? "rgba(74,222,128,0.18)" : "rgba(255,255,255,0.06)",
                        border: `2px solid ${isDone ? "rgba(74,222,128,0.4)" : "rgba(74,222,128,0.12)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 26,
                      }}
                    >
                      {isDone ? "✅" : c.icon}
                    </motion.div>

                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
                        <span style={{ fontSize: 15, fontWeight: 900, color: isDone ? "#6ee7b7" : "#f0fdf4" }}>
                          {c.title}
                        </span>
                        <span style={{
                          fontSize: 10, fontWeight: 800, color: c.diffColor,
                          background: c.diffColor + "18", border: `1px solid ${c.diffColor}35`,
                          padding: "2px 8px", borderRadius: 100,
                        }}>
                          {c.difficulty}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(134,239,172,0.55)", marginBottom: 5, lineHeight: 1.4 }}>{c.desc}</div>
                      <div className="xp-tag">+{c.reward} XP</div>
                    </div>
                  </div>

                  {isDone ? (
                    <div className="done-badge">✓ Done! {c.emoji}</div>
                  ) : (
                    <button className="claim-btn" onClick={() => handleComplete(c)}>
                      Claim! 🎁
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* All done celebration */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: "rgba(74,222,128,0.08)",
                border: "2px solid rgba(74,222,128,0.3)",
                borderRadius: 22, padding: "24px",
                textAlign: "center", marginTop: 8,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ fontSize: 48, marginBottom: 10 }}
              >
                🏆
              </motion.div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: "#4ade80", marginBottom: 6 }}>
                All missions complete! You're a legend! 🌍
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(134,239,172,0.5)" }}>
                Come back tomorrow for new challenges! 🌟
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default Challenges;