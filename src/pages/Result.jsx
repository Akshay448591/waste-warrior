import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import Wally from "../components/Wally";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [showConfetti, setShowConfetti] = useState(true);
  const [wallyMood, setWallyMood] = useState("celebrate");
  const [wallyMsg, setWallyMsg] = useState("");
  const [pointsDisplayed, setPointsDisplayed] = useState(0);
  const [showPointsBurst, setShowPointsBurst] = useState(false);
  const [starsRevealed, setStarsRevealed] = useState(0);

  if (!data) return (
    <div style={{ minHeight: "100vh", background: "#081208", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, fontFamily: "'Nunito', sans-serif" }}>
      <span style={{ fontSize: 56 }}>🤖</span>
      <p style={{ color: "#4ade80", fontWeight: 800, fontSize: 18 }}>No result found!</p>
      <button onClick={() => navigate("/home")} style={{ background: "#4ade80", color: "#0a1a0e", border: "none", borderRadius: 14, padding: "12px 28px", fontWeight: 900, fontSize: 15, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
        Go Home 🏠
      </button>
    </div>
  );

  const { label, confidence, points, image, streak } = data;

  const infoMap = {
    plastic:   { bin: "Blue Bin",   binColor: "#3b82f6", binEmoji: "🔵", impact: "Recycling plastic saves CO2 emissions! You're a hero! 💪", tip: "Try to avoid single-use plastics next time 🌊", stars: confidence > 80 ? 3 : confidence > 60 ? 2 : 1 },
    paper:     { bin: "Blue Bin",   binColor: "#3b82f6", binEmoji: "🔵", impact: "Paper recycling saves trees! 🌳 Keep it up!", tip: "You can reuse paper before recycling it!", stars: confidence > 80 ? 3 : confidence > 60 ? 2 : 1 },
    metal:     { bin: "Blue Bin",   binColor: "#3b82f6", binEmoji: "🔵", impact: "Recycling metal saves loads of energy! ⚡", tip: "Give it a quick rinse before tossing it in!", stars: confidence > 80 ? 3 : confidence > 60 ? 2 : 1 },
    glass:     { bin: "Green Bin",  binColor: "#22c55e", binEmoji: "🟢", impact: "Glass can be recycled forever! ♾️ Amazing!", tip: "Keep glass separate from other recyclables.", stars: confidence > 80 ? 3 : confidence > 60 ? 2 : 1 },
    cardboard: { bin: "Blue Bin",   binColor: "#3b82f6", binEmoji: "🔵", impact: "Recycled cardboard reduces landfill waste! 🌱", tip: "Flatten boxes so they take less space 📦", stars: confidence > 80 ? 3 : confidence > 60 ? 2 : 1 },
    food:      { bin: "Brown Bin",  binColor: "#a16207", binEmoji: "🟤", impact: "Food waste becomes compost for plants! 🌱", tip: "Composting food waste helps grow new food!", stars: confidence > 80 ? 3 : confidence > 60 ? 2 : 1 },
    hazardous: { bin: "Red Bin",    binColor: "#ef4444", binEmoji: "🔴", impact: "Hazardous waste needs special handling! ⚠️", tip: "Never put this in normal bins — ask an adult!", stars: confidence > 80 ? 3 : confidence > 60 ? 2 : 1 },
  };

  const cleanLabel = label?.toLowerCase().split(" ")[0] || "unknown";
  const info = infoMap[cleanLabel] || {
    bin: "Check the Label",
    binColor: "#6b7280", binEmoji: "🗑️",
    impact: "Every piece of sorted waste helps the planet! 🌍",
    tip: "When in doubt, look for the recycling symbol!",
    stars: 2,
  };

  let badge = "🌱 Eco Starter";
  let badgeColor = "#6ee7b7";
  if (points > 200)  { badge = "♻️ Recycler";       badgeColor = "#4ade80"; }
  if (points > 500)  { badge = "🌍 Eco Warrior";    badgeColor = "#22d3ee"; }
  if (points > 1000) { badge = "🏆 Planet Champion"; badgeColor = "#fbbf24"; }

  const wallyMessages = {
    celebrate: [
      "WOW!! You're AMAZING! Wally is so proud! 🎉🤖",
      "Incredible!! Another Eco Hero saves the day! ⭐",
      "YESSS!! You just helped save the planet! 💚",
    ],
    great: [
      "Great job! You really know your waste! 😄",
      "Awesome sorting skills! You're getting better every day! 🌟",
    ],
    good: [
      "Good try! Practice makes perfect! 💪 Wally believes in you!",
      "Not bad! Keep going — you'll be an expert soon! 🤖",
    ],
  };

  const earnedPoints = Number(data?.earnedPoints) || 10;

  useEffect(() => {
    const mood = confidence > 85 ? "celebrate" : confidence > 65 ? "great" : "good";
    setWallyMood(mood);
    const msgs = wallyMessages[mood];
    setWallyMsg(msgs[Math.floor(Math.random() * msgs.length)]);

    // Count up points
    const target = earnedPoints;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 20));
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setPointsDisplayed(current);
      if (current >= target) {
        clearInterval(interval);
        setShowPointsBurst(true);
      }
    }, 40);

    // Reveal stars one by one
    let s = 0;
    const starTimer = setInterval(() => {
      s++;
      setStarsRevealed(s);
      if (s >= info.stars) clearInterval(starTimer);
    }, 350);

    const confettiTimer = setTimeout(() => setShowConfetti(false), 4500);
    return () => { clearTimeout(confettiTimer); clearInterval(interval); clearInterval(starTimer); };
  }, []);

  const confidenceLabel =
    confidence > 80 ? { text: "Very sure! ✅", color: "#4ade80" } :
    confidence > 60 ? { text: "Pretty sure 👍", color: "#fbbf24" } :
                      { text: "Not so sure 🤔", color: "#f87171" };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a1f0e 0%, #081208 50%, #0a1520 100%)",
      color: "#e8f5e9",
      fontFamily: "'Nunito', sans-serif",
      position: "relative",
      overflowX: "hidden",
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

        .result-card {
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(74,222,128,0.18);
          border-radius: 22px;
          padding: 18px;
          margin-bottom: 14px;
        }

        .points-burst {
          font-family: 'Fredoka One', cursive;
          font-size: 52px;
          background: linear-gradient(135deg, #4ade80, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
          display: inline-block;
        }

        .badge-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 16px; border-radius: 100px;
          font-size: 14px; font-weight: 800; border: 2px solid;
        }

        .label-big {
          font-family: 'Fredoka One', cursive;
          font-size: 28px;
          background: linear-gradient(90deg, #4ade80, #6ee7b7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: capitalize;
          letter-spacing: 0.02em;
          display: inline-block;
        }

        .bin-badge {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 22px; border-radius: 100px;
          font-weight: 900; font-size: 15px; border: 2.5px solid;
          font-family: 'Fredoka One', cursive;
          letter-spacing: 0.02em;
        }

        .info-row {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(74,222,128,0.08);
        }

        .info-row:last-child { border-bottom: none; }

        .info-icon {
          width: 40px; height: 40px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }

        .action-btn {
          width: 100%; padding: 17px; border-radius: 18px;
          border: none; font-size: 16px; font-weight: 900;
          font-family: 'Fredoka One', cursive;
          cursor: pointer; transition: all 0.15s ease;
          letter-spacing: 0.02em;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #4ade80, #22c55e);
          color: #0a1a0e;
          box-shadow: 0 6px 24px rgba(74,222,128,0.35), 0 2px 0 #16a34a;
        }

        .action-btn.primary:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(74,222,128,0.45), 0 2px 0 #16a34a; }

        .action-btn.secondary {
          background: rgba(255,255,255,0.05);
          color: #a7f3d0; border: 2px solid rgba(74,222,128,0.25);
          margin-top: 10px;
        }

        .action-btn.secondary:hover { background: rgba(74,222,128,0.1); }

        @keyframes popIn {
          0% { transform: scale(0.3) rotate(-20deg); opacity: 0; }
          70% { transform: scale(1.25) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        .star-pop { animation: popIn 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>

      <div className="dots-bg" />
      <div style={{ position: "fixed", width: 500, height: 500, background: "rgba(74,222,128,0.06)", borderRadius: "50%", filter: "blur(100px)", top: -120, right: -120, zIndex: 0, pointerEvents: "none" }} />

      {showConfetti && (
        <Confetti recycle={false} numberOfPieces={250}
          colors={["#4ade80", "#6ee7b7", "#fbbf24", "#f472b6", "#60a5fa", "#a78bfa"]} />
      )}

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 18px 100px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}
        >
          <div>
            <p style={{ fontSize: 11, color: "rgba(134,239,172,0.45)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", marginBottom: 2 }}>
              SCAN RESULT
            </p>
            <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 26, color: "#f0fdf4" }}>
              Well done! 🎉
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(249,115,22,0.12)", border: "1.5px solid rgba(249,115,22,0.3)", borderRadius: 100, padding: "7px 14px" }}>
            <span style={{ fontSize: 17 }}>🔥</span>
            <span style={{ fontSize: 14, fontWeight: 900, color: "#f97316" }}>
              {streak || 1} day streak!
            </span>
          </div>
        </motion.div>

        {/* Wally */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: 20 }}>
          <Wally mood={wallyMood} message={wallyMsg} size="md" showName={true} />
        </motion.div>

        {/* Stars */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 16 }}
        >
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className={s <= starsRevealed ? "star-pop" : ""}
              style={{
                fontSize: 38,
                opacity: s <= info.stars ? 1 : 0.15,
                filter: s <= starsRevealed ? "drop-shadow(0 0 10px #fbbf24)" : "none",
                display: "inline-block",
              }}
            >
              ⭐
            </span>
          ))}
        </motion.div>

        {/* Points earned */}
        <motion.div
          className="result-card"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          style={{ textAlign: "center" }}
        >
          <p style={{ fontSize: 11, color: "rgba(134,239,172,0.5)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", marginBottom: 8 }}>
            COINS EARNED 🪙
          </p>
          <motion.div animate={showPointsBurst ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.4 }} style={{ marginBottom: 10 }}>
            <span className="points-burst">+{pointsDisplayed}</span>
            <span style={{ fontSize: 36, marginLeft: 8 }}>🪙</span>
          </motion.div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="badge-pill" style={{ color: badgeColor, borderColor: badgeColor + "55", background: badgeColor + "15" }}>
              {badge}
            </span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(134,239,172,0.4)", marginTop: 8 }}>
            Total coins: {points?.toLocaleString() || 0} 🪙
          </p>
        </motion.div>

        {/* Scanned image + label */}
        {image && (
          <motion.div
            className="result-card"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ display: "flex", gap: 14, alignItems: "center" }}
          >
            <img src={image} alt="scan" style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 16, border: "2.5px solid rgba(74,222,128,0.3)", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, color: "rgba(134,239,172,0.45)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", marginBottom: 4 }}>
                I FOUND...
              </p>
              <p className="label-big">{label}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                <div style={{ height: 8, borderRadius: 100, background: "rgba(255,255,255,0.1)", flex: 1, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence}%` }}
                    transition={{ delay: 0.7, duration: 0.9, ease: "easeOut" }}
                    style={{ height: "100%", borderRadius: 100, background: confidence > 80 ? "#4ade80" : confidence > 60 ? "#fbbf24" : "#f87171" }}
                  />
                </div>
                <span style={{ fontSize: 12, fontWeight: 800, color: confidenceLabel.color, flexShrink: 0 }}>
                  {confidenceLabel.text}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bin + tip */}
        <motion.div
          className="result-card"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        >
          <p style={{ fontSize: 11, color: "rgba(134,239,172,0.45)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", marginBottom: 14 }}>
            WHAT TO DO WITH IT 👇
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <span className="bin-badge" style={{ background: info.binColor + "22", borderColor: info.binColor + "60", color: info.binColor }}>
              {info.binEmoji} Put it in the {info.bin}!
            </span>
          </div>

          <div className="info-row">
            <div className="info-icon" style={{ background: "rgba(74,222,128,0.1)", border: "1.5px solid rgba(74,222,128,0.25)" }}>🌍</div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(134,239,172,0.45)", marginBottom: 3 }}>Why it matters</p>
              <p style={{ fontSize: 14, fontWeight: 800, color: "#d1fae5", lineHeight: 1.5 }}>{info.impact}</p>
            </div>
          </div>

          <div className="info-row">
            <div className="info-icon" style={{ background: "rgba(251,191,36,0.1)", border: "1.5px solid rgba(251,191,36,0.25)" }}>💡</div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(134,239,172,0.45)", marginBottom: 3 }}>Wally's tip</p>
              <p style={{ fontSize: 14, fontWeight: 800, color: "#d1fae5", lineHeight: 1.5 }}>{info.tip}</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <button className="action-btn primary" onClick={() => navigate("/home")}>
            📷 Scan Another Waste!
          </button>
          <button className="action-btn secondary" onClick={() => navigate("/learn")}>
            📚 Learn More with Wally
          </button>
        </motion.div>

      </div>
    </div>
  );
}

export default Result;