import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const [wallyFrame, setWallyFrame] = useState(0);
  const wallyFrames = ["🤖", "🤖", "🤖"];

  useEffect(() => {
    const t = setInterval(() => setWallyFrame(f => (f + 1) % wallyFrames.length), 800);
    return () => clearInterval(t);
  }, []);

  const floaters = [
    { emoji: "♻️", x: "8%",  y: "18%", dur: 5.5, delay: 0 },
    { emoji: "🌿", x: "88%", y: "14%", dur: 6.5, delay: 1 },
    { emoji: "🍃", x: "5%",  y: "60%", dur: 7,   delay: 2 },
    { emoji: "🥤", x: "90%", y: "55%", dur: 5,   delay: 0.5 },
    { emoji: "📦", x: "80%", y: "78%", dur: 6,   delay: 1.5 },
    { emoji: "🌍", x: "12%", y: "80%", dur: 7.5, delay: 0.8 },
    { emoji: "⭐", x: "50%", y: "8%",  dur: 4.5, delay: 1.2 },
    { emoji: "🌟", x: "70%", y: "30%", dur: 5.8, delay: 2.2 },
  ];

  const features = [
    { icon: "📸", label: "Scan Waste", color: "#4ade80" },
    { icon: "🏆", label: "Win Prizes", color: "#fbbf24" },
    { icon: "🎯", label: "Daily Fun", color: "#f472b6" },
    { icon: "📚", label: "Learn Cool Stuff", color: "#60a5fa" },
    { icon: "👥", label: "Make Friends", color: "#a78bfa" },
    { icon: "🔥", label: "Hot Streaks", color: "#f97316" },
  ];

  const stats = [
    { value: "50K+", label: "Eco Heroes", icon: "🦸" },
    { value: "98%",  label: "Super Accurate", icon: "🎯" },
    { value: "2.1M", label: "Items Sorted", icon: "♻️" },
    { value: "4.9★", label: "Kids Love It", icon: "⭐" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a1f0e 0%, #081208 40%, #0a1520 100%)",
      color: "#e8f5e9",
      fontFamily: "'Nunito', sans-serif",
      overflow: "hidden",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Fredoka+One&family=Space+Mono:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .bubble-bg {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle at 20% 30%, rgba(74,222,128,0.07) 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, rgba(96,165,250,0.06) 0%, transparent 50%),
                            radial-gradient(circle at 50% 90%, rgba(251,191,36,0.05) 0%, transparent 40%);
          pointer-events: none;
        }

        .dots-bg {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(74,222,128,0.12) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        .floater {
          position: absolute;
          font-size: 30px;
          opacity: 0.22;
          pointer-events: none;
          animation: floatBob var(--dur) ease-in-out infinite;
          animation-delay: var(--delay);
        }

        @keyframes floatBob {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          33%       { transform: translateY(-18px) rotate(6deg) scale(1.05); }
          66%       { transform: translateY(-8px) rotate(-4deg) scale(0.97); }
        }

        .wally-ring {
          width: 150px; height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #1a3a22, #0a1a0e);
          border: 4px solid #4ade80;
          display: flex; align-items: center; justify-content: center;
          font-size: 72px;
          box-shadow: 0 0 40px rgba(74,222,128,0.35), inset 0 0 30px rgba(74,222,128,0.07);
          position: relative;
          animation: wallyFloat 3s ease-in-out infinite;
        }

        @keyframes wallyFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }

        .wally-ring::before {
          content: '';
          position: absolute; inset: -14px;
          border-radius: 50%;
          border: 2px dashed rgba(74,222,128,0.25);
          animation: spinSlow 18s linear infinite;
        }

        .wally-ring::after {
          content: '';
          position: absolute; inset: -26px;
          border-radius: 50%;
          border: 1px dashed rgba(74,222,128,0.1);
          animation: spinSlow 28s linear infinite reverse;
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .scan-sweep {
          position: absolute; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, #4ade80, transparent);
          border-radius: 50%;
          animation: sweep 2.5s ease-in-out infinite;
        }

        @keyframes sweep {
          0%   { top: 20%; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { top: 80%; opacity: 0; }
        }

        .cta-btn {
          background: linear-gradient(135deg, #4ade80, #22c55e);
          color: #0a1a0e;
          border: none;
          padding: 20px 56px;
          border-radius: 100px;
          font-size: 19px;
          font-weight: 900;
          font-family: 'Nunito', sans-serif;
          cursor: pointer;
          letter-spacing: 0.01em;
          box-shadow: 0 8px 32px rgba(74,222,128,0.4), 0 2px 0 #16a34a;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          position: relative;
          overflow: hidden;
        }

        .cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }

        .cta-btn:hover::after { transform: translateX(100%); }
        .cta-btn:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 14px 40px rgba(74,222,128,0.5), 0 2px 0 #16a34a; }
        .cta-btn:active { transform: scale(0.97) translateY(1px); }

        .stat-card {
          background: rgba(255,255,255,0.06);
          border: 2px solid rgba(74,222,128,0.18);
          border-radius: 20px;
          padding: 16px 20px;
          text-align: center;
          min-width: 110px;
          transition: transform 0.2s, border-color 0.2s;
        }

        .stat-card:hover { transform: translateY(-4px); border-color: rgba(74,222,128,0.4); }

        .feature-chip {
          background: rgba(255,255,255,0.05);
          border: 2px solid;
          border-radius: 100px;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 800;
          font-family: 'Nunito', sans-serif;
          transition: transform 0.15s, background 0.15s;
        }

        .feature-chip:hover { transform: scale(1.06); background: rgba(255,255,255,0.1); }

        .speech-bubble {
          background: rgba(74,222,128,0.12);
          border: 2px solid rgba(74,222,128,0.3);
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          padding: 12px 18px;
          position: relative;
          max-width: 280px;
        }

        .speech-bubble::after {
          content: '';
          position: absolute;
          bottom: -13px; left: 20px;
          border-left: 13px solid transparent;
          border-right: 0 solid transparent;
          border-top: 13px solid rgba(74,222,128,0.3);
        }

        .badge-top {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(74,222,128,0.1);
          border: 1.5px solid rgba(74,222,128,0.3);
          border-radius: 100px;
          padding: 7px 18px;
          font-size: 12px; font-weight: 800;
          font-family: 'Space Mono', monospace;
          color: #4ade80; letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .pulse-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #4ade80;
          animation: dotPulse 2s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          50%       { opacity: 0.6; transform: scale(0.85); box-shadow: 0 0 0 6px rgba(74,222,128,0); }
        }

        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 32px;
          border-bottom: 1px solid rgba(74,222,128,0.1);
          position: relative; z-index: 10;
          backdrop-filter: blur(6px);
        }

        @media (max-width: 640px) {
          .stat-row { flex-direction: column; align-items: stretch !important; }
          .stat-card { min-width: 0; }
          .hero-wally { width: 120px !important; height: 120px !important; font-size: 58px !important; }
        }
      `}</style>

      <div className="bubble-bg" />
      <div className="dots-bg" />

      {floaters.map((f, i) => (
        <div key={i} className="floater" style={{
          left: f.x, top: f.y,
          "--dur": `${f.dur}s`,
          "--delay": `${f.delay}s`,
        }}>
          {f.emoji}
        </div>
      ))}

      {/* Nav */}
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>🌱</span>
          <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, color: "#e8f5e9", letterSpacing: "0.02em" }}>
            Waste<span style={{ color: "#4ade80" }}>Warrior</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="pulse-dot" />
          <span style={{ fontSize: 12, fontFamily: "'Space Mono', monospace", color: "#6ee7b7", letterSpacing: "0.04em" }}>
            AI READY ✨
          </span>
        </div>
      </motion.nav>

      {/* Hero */}
      <main style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", padding: "44px 24px 60px",
        position: "relative", zIndex: 10, maxWidth: 700, margin: "0 auto",
      }}>

        {/* Wally + bubble */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 180 }}
          style={{ marginBottom: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
        >
          <div className="speech-bubble">
            <p style={{ fontSize: 14, fontWeight: 800, color: "#d1fae5", lineHeight: 1.5 }}>
              Hi! I'm <strong style={{ color: "#4ade80" }}>WALLY</strong>! 👋 I'll help you sort waste and save the planet! 🌍
            </p>
          </div>
          <div className="wally-ring hero-wally">
            <div className="scan-sweep" />
            <span>{wallyFrames[wallyFrame]}</span>
          </div>
          <p style={{ fontFamily: "'Fredoka One', cursive", fontSize: 13, color: "#4ade80", letterSpacing: "0.12em" }}>WALLY THE WASTE WARRIOR</p>
        </motion.div>

        {/* Badge */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ marginBottom: 18 }}>
          <div className="badge-top">
            <div className="pulse-dot" />
            AI-Powered Waste Recognition
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={{
            fontSize: "clamp(34px, 8vw, 66px)",
            fontFamily: "'Fredoka One', cursive",
            lineHeight: 1.12,
            letterSpacing: "0.01em",
            marginBottom: 18,
            color: "#f0fdf4",
          }}
        >
          Sort Smarter.<br />
          <span style={{ color: "#4ade80" }}>Earn Rewards.</span><br />
          <span style={{ color: "#fbbf24" }}>Save Earth! 🌍</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: 16, fontWeight: 700,
            color: "#86efac", lineHeight: 1.7,
            maxWidth: 440, marginBottom: 36,
          }}
        >
          Take a photo of any rubbish 📸 — Wally tells you which bin it goes in!
          Earn coins, level up, and become an Eco Hero! 🏆
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginBottom: 44 }}>
          <button className="cta-btn" onClick={() => navigate("/auth")}>
            🚀 Play for Free!
          </button>
          <p style={{ marginTop: 10, fontSize: 12, color: "rgba(134,239,172,0.4)", fontFamily: "'Space Mono', monospace" }}>
            No credit card needed ✨
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}
          className="stat-row"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i} className="stat-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.07 }}
            >
              <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontFamily: "'Fredoka One', cursive", color: "#4ade80" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#6ee7b7", fontWeight: 700, marginTop: 2 }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature chips */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}
        >
          {features.map((f, i) => (
            <motion.div
              key={i} className="feature-chip"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.05 + i * 0.06 }}
              style={{ borderColor: f.color + "55", color: f.color }}
            >
              {f.icon} {f.label}
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "18px",
        borderTop: "1px solid rgba(74,222,128,0.1)",
        fontFamily: "'Space Mono', monospace", fontSize: 11,
        color: "rgba(134,239,172,0.35)", letterSpacing: "0.07em",
        position: "relative", zIndex: 10,
      }}>
        BUILT WITH 💚 FOR A CLEANER FUTURE ♻️
      </div>
    </div>
  );
}

export default Landing;