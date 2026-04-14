import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import { auth } from "../firebase";
import Wally, { WallyOnboarding } from "../components/Wally";

function Home() {
  const [points, setPoints] = useState(1300);
  const [streak, setStreak] = useState(1);
  const [file, setFile] = useState(null);
  const [wallyMood, setWallyMood] = useState("wave");
  const [wallyMsg, setWallyMsg] = useState("Hey there, Eco Hero! 🌱 Ready to sort some waste today?");
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const navigate = useNavigate();
  const user = auth.currentUser;

  const level = Math.floor(points / 500) + 1;
  const xpInLevel = points % 500;
  const xpPct = (xpInLevel / 500) * 100;

  useEffect(() => {
  if (!user) return;

  const seen = localStorage.getItem(`wallyIntroSeen_${user.uid}`);
  if (!seen) setShowOnboarding(true);

  const lastLogin = localStorage.getItem(`lastLogin_${user.uid}`);
  const today = new Date().toDateString();
  if (lastLogin !== today) {
    setStreak(s => s + 1);
    localStorage.setItem(`lastLogin_${user.uid}`, today);
  }
}, [user]);

  const handleOnboardingComplete = () => {
  if (user) {
    localStorage.setItem(`wallyIntroSeen_${user.uid}`, "true");
  }
  setShowOnboarding(false);
};

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setWallyMood("happy");
      setWallyMsg("Ooh, I see something! Let me scan it for you! 🔍");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("image/")) {
      setFile(dropped);
      setWallyMood("happy");
      setWallyMsg("Ooh, I see something! Let me scan it for you! 🔍");
    }
  };

  const handleScan = async () => {
    if (!file) {
      toast.error("Upload a photo first! 📷");
      setWallyMood("surprised");
      setWallyMsg("Oops! I need a photo to scan! Take a picture of some rubbish! 📸");
      return;
    }

    setIsScanning(true);
    setWallyMood("thinking");
    setWallyMsg("Hmm... let me think... I'm scanning your waste! 🤔🔍");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://waste-warrior-backend-sd72.onrender.com/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const earnedPoints = Number(data?.points) || 0;
      const newPoints = points + earnedPoints;
      setPoints(newPoints);
      setWallyMood("celebrate");
      setWallyMsg(`Amazing!! You earned ${earnedPoints} coins! You're SO good at this! 🎉`);

      navigate("/result", {
        state: { ...data, image: URL.createObjectURL(file), points: newPoints, streak },
      });
    } catch {
      toast.error("Wally can't connect right now 😢");
      setWallyMood("surprised");
      setWallyMsg("Uh oh! Something went wrong. Check your connection and try again!");
    } finally {
      setIsScanning(false);
    }
  };

  const navItems = [
    { label: "Profile",     icon: "👤", path: "/profile",     color: "#4ade80" },
    { label: "Leaderboard", icon: "🏆", path: "/leaderboard", color: "#fbbf24" },
    { label: "Challenges",  icon: "🎯", path: "/challenges",  color: "#f472b6" },
    { label: "Community",   icon: "👥", path: "/community",   color: "#60a5fa" },
    { label: "Learn",       icon: "📚", path: "/learn",       color: "#a78bfa" },
  ];

  const rankTier =
    points >= 6000 ? { name: "Earth Keeper 🌍", color: "#f97316" } :
    points >= 3000 ? { name: "Eco Guard 🛡️",   color: "#fbbf24" } :
    points >= 1500 ? { name: "Sapling 🌳",       color: "#22c55e" } :
    points >= 500  ? { name: "Sprout 🌱",         color: "#4ade80" } :
                     { name: "Seedling 🌿",        color: "#6ee7b7" };

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

        .home-glow {
          position: fixed; border-radius: 50%;
          filter: blur(90px); pointer-events: none; z-index: 0;
        }

        .hero-strip {
          background: rgba(255,255,255,0.04);
          border: 2px solid rgba(74,222,128,0.18);
          border-radius: 22px;
          padding: 16px 18px;
          margin-bottom: 14px;
        }

        .avatar-circle {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, #4ade80, #22c55e);
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 18px; color: #0a1a0e;
          border: 2px solid rgba(74,222,128,0.5);
          flex-shrink: 0;
        }

        .stat-bubble {
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(74,222,128,0.2);
          border-radius: 100px;
          padding: 7px 16px;
          display: flex; align-items: center; gap: 7px;
        }

        .xp-bar-track {
          height: 10px;
          background: rgba(74,222,128,0.1);
          border-radius: 100px;
          overflow: hidden;
          border: 1px solid rgba(74,222,128,0.15);
        }

        .xp-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #4ade80, #6ee7b7);
          border-radius: 100px;
          transition: width 0.8s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          overflow: hidden;
        }

        .xp-bar-fill::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          animation: xpShine 2s linear infinite;
        }

        @keyframes xpShine {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }

        .drop-zone {
          border: 2.5px dashed rgba(74,222,128,0.3);
          border-radius: 22px;
          padding: 32px 20px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
          position: relative; overflow: hidden;
        }

        .drop-zone:hover, .drop-zone.dragging {
          border-color: rgba(74,222,128,0.7);
          background: rgba(74,222,128,0.05);
          transform: scale(1.01);
        }

        .drop-zone input[type="file"] {
          position: absolute; inset: 0; opacity: 0;
          cursor: pointer; width: 100%; height: 100%;
        }

        .scan-btn {
          background: linear-gradient(135deg, #4ade80, #22c55e);
          color: #0a1a0e;
          border: none; width: 100%;
          padding: 18px; border-radius: 18px;
          font-size: 17px; font-weight: 900;
          font-family: 'Fredoka One', cursive;
          cursor: pointer; letter-spacing: 0.04em;
          box-shadow: 0 6px 24px rgba(74,222,128,0.35), 0 2px 0 #16a34a;
          position: relative; overflow: hidden;
          transition: all 0.15s ease;
        }

        .scan-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(74,222,128,0.45), 0 2px 0 #16a34a;
        }

        .scan-btn:active { transform: scale(0.97) translateY(1px); }
        .scan-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .scan-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          animation: shimmer 1.4s infinite;
        }

        @keyframes shimmer {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }

        .nav-btn {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(74,222,128,0.15);
          border-radius: 18px;
          padding: 14px 8px; cursor: pointer;
          transition: all 0.18s ease; flex: 1; min-width: 0;
        }

        .nav-btn:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        .nav-btn:active { transform: scale(0.96); }

        .level-badge {
          background: linear-gradient(135deg, rgba(74,222,128,0.15), rgba(34,197,94,0.08));
          border: 2px solid rgba(74,222,128,0.3);
          border-radius: 100px;
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 900;
          color: #4ade80;
          font-family: 'Space Mono', monospace;
        }
      `}</style>

      <div className="dots-bg" />
      <div className="home-glow" style={{ width: 400, height: 400, background: "rgba(74,222,128,0.07)", top: -100, left: -120 }} />
      <div className="home-glow" style={{ width: 300, height: 300, background: "rgba(96,165,250,0.05)", bottom: 100, right: -80 }} />

      {showOnboarding && user && <WallyOnboarding onComplete={handleOnboardingComplete} />}

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1a2e22", color: "#e8f5e9",
            border: "1px solid rgba(74,222,128,0.3)",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700, fontSize: "14px",
            borderRadius: "14px",
          }
        }}
      />

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 18px 110px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0 14px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="avatar-circle">
              {(user?.email?.[0] || "U").toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 10, color: "rgba(134,239,172,0.5)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Eco Hero
              </div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "#f0fdf4", lineHeight: 1.2 }}>
                {user?.email?.split("@")[0] || "Explorer"}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div className="stat-bubble">
              <span style={{ fontSize: 15 }}>🪙</span>
              <span style={{ fontSize: 15, fontWeight: 900, color: "#fbbf24", fontFamily: "'Space Mono', monospace" }}>
                {points.toLocaleString()}
              </span>
            </div>
            <div className="stat-bubble">
              <span style={{ fontSize: 15 }}>🔥</span>
              <span style={{ fontSize: 15, fontWeight: 900, color: "#f97316", fontFamily: "'Space Mono', monospace" }}>
                {streak}d
              </span>
            </div>
          </div>
        </motion.div>

        {/* Level + XP bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="hero-strip"
          style={{ marginBottom: 14 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div className="level-badge">LVL {level}</div>
              <span style={{ fontSize: 13, fontWeight: 800, color: rankTier.color }}>{rankTier.name}</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#4ade80", fontFamily: "'Space Mono', monospace" }}>
              {xpInLevel}/500 XP
            </span>
          </div>
          <div className="xp-bar-track">
            <motion.div
              className="xp-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${xpPct}%` }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16,1,0.3,1] }}
            />
          </div>
          <div style={{ marginTop: 5, fontSize: 11, color: "rgba(134,239,172,0.4)", textAlign: "right" }}>
            {500 - xpInLevel} XP to next level ⭐
          </div>
        </motion.div>

        {/* Wally */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          style={{ marginBottom: 18 }}
        >
          <Wally mood={wallyMood} message={wallyMsg} size="md" showName={true} />
        </motion.div>

        {/* Drop zone */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
          style={{ marginBottom: 12 }}
        >
          <div
            className={`drop-zone ${isDragging ? "dragging" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <AnimatePresence mode="wait">
              {file ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
                >
                  <div style={{ position: "relative" }}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      style={{ width: 130, height: 130, objectFit: "cover", borderRadius: 16, border: "3px solid rgba(74,222,128,0.4)" }}
                    />
                    <div style={{
                      position: "absolute", top: -8, right: -8,
                      background: "#4ade80", borderRadius: "50%",
                      width: 26, height: 26, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: 900, color: "#0a1a0e",
                    }}>✓</div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#6ee7b7" }}>{file.name}</span>
                  <span style={{ fontSize: 11, color: "rgba(134,239,172,0.5)" }}>Tap to change photo</span>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5 }}
                    style={{ fontSize: 54, marginBottom: 10 }}
                  >
                    📸
                  </motion.div>
                  <p style={{ fontSize: 15, fontWeight: 900, color: "#4ade80", marginBottom: 4 }}>
                    Drop a photo here!
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(134,239,172,0.45)" }}>
                    Or tap to pick one from your phone 📱
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Scan button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ marginBottom: 26 }}
        >
          <button className="scan-btn" onClick={handleScan} disabled={isScanning}>
            {isScanning && <div className="scan-shimmer" />}
            <span style={{ position: "relative", zIndex: 1 }}>
              {isScanning ? "🤖 Wally is thinking..." : "📷 Scan My Waste!"}
            </span>
          </button>
        </motion.div>

        {/* Nav grid */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
          style={{ display: "flex", gap: 8 }}
        >
          {navItems.map((item, i) => (
            <motion.button
              key={item.path}
              className="nav-btn"
              onClick={() => navigate(item.path)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              style={{ borderColor: item.color + "30" }}
            >
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <span style={{
                fontSize: 9, fontWeight: 800,
                color: item.color,
                textTransform: "uppercase", letterSpacing: "0.03em",
                whiteSpace: "nowrap", overflow: "hidden",
                textOverflow: "ellipsis", width: "100%", textAlign: "center",
              }}>
                {item.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

export default Home;