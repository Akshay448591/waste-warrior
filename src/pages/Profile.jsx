import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { listenUser } from "../utils/userService";
import { motion, AnimatePresence } from "framer-motion";

function Profile() {
  const user = auth.currentUser;
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!user) return;
    const unsub = listenUser(user.uid, setData);
    return () => unsub();
  }, [user]);

  const points = data?.points || 0;
  const level = Math.floor(points / 500) + 1;
  const xpInLevel = points % 500;
  const xpPercent = (xpInLevel / 500) * 100;

  const rankTiers = [
    { name: "Seedling", min: 0, color: "#6ee7b7" },
    { name: "Sprout", min: 500, color: "#4ade80" },
    { name: "Sapling", min: 1500, color: "#22c55e" },
    { name: "Eco Guard", min: 3000, color: "#fbbf24" },
    { name: "Earth Keeper", min: 6000, color: "#f97316" },
  ];

  const currentRank = [...rankTiers].reverse().find(r => points >= r.min) || rankTiers[0];

  const tabs = ["overview", "clubs", "stats"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f0d",
      color: "#e8f5e9",
      fontFamily: "'Syne', sans-serif",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        .profile-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(74,222,128,0.14);
          border-radius: 18px;
          padding: 20px;
          margin-bottom: 14px;
        }

        .tab-btn {
          flex: 1;
          background: none;
          border: 1px solid rgba(74,222,128,0.12);
          border-radius: 10px;
          padding: 9px 0;
          color: rgba(134,239,172,0.45);
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .tab-btn.active {
          background: rgba(74,222,128,0.1);
          border-color: rgba(74,222,128,0.4);
          color: #4ade80;
        }

        .tab-btn:hover:not(.active) {
          background: rgba(74,222,128,0.05);
          border-color: rgba(74,222,128,0.22);
          color: rgba(134,239,172,0.7);
        }

        .xp-bar-bg {
          height: 6px;
          background: rgba(74,222,128,0.1);
          border-radius: 100px;
          overflow: hidden;
        }

        .xp-bar-fill {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg, #4ade80, #6ee7b7);
          transition: width 0.8s cubic-bezier(0.16,1,0.3,1);
        }

        .stat-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(74,222,128,0.1);
          border-radius: 12px;
          padding: 14px;
          text-align: center;
          flex: 1;
        }

        .club-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(74,222,128,0.07);
        }

        .club-row:last-child { border-bottom: none; }

        .club-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #4ade80;
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(74,222,128,0.5);
        }

        .logout-btn {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #f87171;
          width: 100%;
          padding: 15px;
          border-radius: 14px;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .logout-btn:hover {
          background: rgba(239,68,68,0.18);
          border-color: rgba(239,68,68,0.4);
          transform: translateY(-1px);
        }

        .logout-btn:active { transform: scale(0.98); }

        .rank-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 100px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
      `}</style>

      <div className="grid-bg" />

      {/* Glow orbs */}
      <div style={{
        position: "fixed", width: 350, height: 350,
        background: "rgba(74,222,128,0.05)", borderRadius: "50%",
        filter: "blur(90px)", top: -80, right: -80, pointerEvents: "none", zIndex: 0
      }} />

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 20px 100px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ padding: "24px 0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <div>
            <div style={{ fontSize: 11, color: "rgba(134,239,172,0.5)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
              YOUR PROFILE
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#f0fdf4" }}>
              {user?.email?.split("@")[0] || "Eco Warrior"}
            </div>
          </div>

          <div
            className="rank-badge"
            style={{ background: `${currentRank.color}18`, border: `1px solid ${currentRank.color}40`, color: currentRank.color }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: currentRank.color, display: "inline-block" }} />
            {currentRank.name}
          </div>
        </motion.div>

        {/* Avatar + XP card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="profile-card"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg, #4ade80, #22c55e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, fontWeight: 800, color: "#0a0f0d",
              border: "2px solid rgba(74,222,128,0.4)",
              boxShadow: "0 0 24px rgba(74,222,128,0.2)",
              flexShrink: 0,
            }}>
              {(user?.email?.[0] || "U").toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#f0fdf4", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.email}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, fontFamily: "'Space Mono', monospace", color: "#fbbf24" }}>
                  🪙 {points.toLocaleString()} pts
                </span>
                <span style={{ fontSize: 11, color: "rgba(134,239,172,0.4)" }}>·</span>
                <span style={{ fontSize: 12, fontFamily: "'Space Mono', monospace", color: "rgba(134,239,172,0.6)" }}>
                  LVL {level}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 10, color: "rgba(134,239,172,0.45)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.06em" }}>
              LEVEL PROGRESS
            </span>
            <span style={{ fontSize: 10, color: "#4ade80", fontFamily: "'Space Mono', monospace" }}>
              {xpInLevel} / 500 XP
            </span>
          </div>
          <div className="xp-bar-bg">
            <motion.div
              className="xp-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ display: "flex", gap: 8, marginBottom: 14 }}
        >
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                <div className="stat-box">
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fbbf24", fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>
                    {points.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(134,239,172,0.45)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Total XP
                  </div>
                </div>
                <div className="stat-box">
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#4ade80", fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>
                    {level}
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(134,239,172,0.45)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Level
                  </div>
                </div>
                <div className="stat-box">
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#6ee7b7", fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>
                    {data?.clubs?.length || 0}
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(134,239,172,0.45)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Clubs
                  </div>
                </div>
              </div>

              {/* Rank progression */}
              <div className="profile-card">
                <div style={{ fontSize: 11, color: "rgba(134,239,172,0.45)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 14 }}>
                  RANK TIERS
                </div>
                {rankTiers.map((tier, i) => (
                  <div key={tier.name} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 0",
                    borderBottom: i < rankTiers.length - 1 ? "1px solid rgba(74,222,128,0.06)" : "none",
                    opacity: points < tier.min ? 0.4 : 1,
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: points >= tier.min ? tier.color : "rgba(255,255,255,0.1)",
                      boxShadow: points >= tier.min ? `0 0 8px ${tier.color}60` : "none",
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: points >= tier.min ? "#f0fdf4" : "rgba(134,239,172,0.3)", flex: 1 }}>
                      {tier.name}
                    </span>
                    <span style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: "rgba(134,239,172,0.35)" }}>
                      {tier.min.toLocaleString()} XP
                    </span>
                    {points >= tier.min && (
                      <span style={{ fontSize: 10, color: tier.color, fontFamily: "'Space Mono', monospace" }}>✓</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "clubs" && (
            <motion.div
              key="clubs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="profile-card"
            >
              <div style={{ fontSize: 11, color: "rgba(134,239,172,0.45)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 14 }}>
                JOINED CLUBS
              </div>
              {!data?.clubs?.length ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>🌿</div>
                  <p style={{ fontSize: 13, color: "rgba(134,239,172,0.4)", fontFamily: "'Space Mono', monospace" }}>
                    No clubs joined yet
                  </p>
                </div>
              ) : (
                data.clubs.map((c, i) => (
                  <motion.div
                    key={i}
                    className="club-row"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <div className="club-dot" />
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#e8f5e9" }}>{c.name}</span>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="profile-card"
            >
              <div style={{ fontSize: 11, color: "rgba(134,239,172,0.45)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 14 }}>
                ECO STATS
              </div>
              {[
                { label: "Items Scanned", value: data?.scans || 0, unit: "", color: "#4ade80" },
                { label: "Challenges Done", value: data?.challenges || 0, unit: "", color: "#fbbf24" },
                { label: "Waste Classified", value: data?.classified || "0 kg", unit: "", color: "#6ee7b7" },
              ].map((stat, i) => (
                <div key={stat.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 0",
                  borderBottom: i < 2 ? "1px solid rgba(74,222,128,0.07)" : "none",
                }}>
                  <span style={{ fontSize: 13, color: "rgba(134,239,172,0.6)", fontFamily: "'Space Mono', monospace" }}>
                    {stat.label}
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: stat.color, fontFamily: "'Space Mono', monospace" }}>
                    {stat.value}{stat.unit}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: 8 }}
        >
          <button className="logout-btn" onClick={() => signOut(auth)}>
            SIGN OUT
          </button>
        </motion.div>

      </div>
    </div>
  );
}

export default Profile;