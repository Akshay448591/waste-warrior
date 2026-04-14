import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { motion } from "framer-motion";
import Wally from "../components/Wally";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [wallyMsg] = useState("Look how many Eco Heroes there are! Can you reach the top? 🏆");
  const currentUser = auth.currentUser;

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsub();
  }, []);

  const sorted = [...users].sort((a, b) => b.points - a.points);
  const yourRank = sorted.findIndex(u => u.email === currentUser?.email) + 1;
  const yourData = sorted.find(u => u.email === currentUser?.email);

  const rankTier = (pts) => {
    if (pts >= 6000) return { name: "Earth Keeper 🌍", color: "#f97316", bg: "rgba(249,115,22,0.12)" };
    if (pts >= 3000) return { name: "Eco Guard 🛡️",   color: "#fbbf24", bg: "rgba(251,191,36,0.12)" };
    if (pts >= 1500) return { name: "Sapling 🌳",       color: "#22c55e", bg: "rgba(34,197,94,0.12)" };
    if (pts >= 500)  return { name: "Sprout 🌱",         color: "#4ade80", bg: "rgba(74,222,128,0.12)" };
    return               { name: "Seedling 🌿",          color: "#6ee7b7", bg: "rgba(110,231,183,0.08)" };
  };

  const medals = ["🥇", "🥈", "🥉"];
  const medalColors = ["#fbbf24", "#94a3b8", "#f97316"];
  const podiumOrder = [1, 0, 2]; // silver, gold, bronze visual order

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

        .leader-row {
          display: flex; align-items: center;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(74,222,128,0.07);
          gap: 12px; transition: background 0.15s;
        }

        .leader-row:last-child { border-bottom: none; }
        .leader-row:hover { background: rgba(74,222,128,0.04); }

        .leader-row.you {
          background: rgba(74,222,128,0.07);
          border-color: rgba(74,222,128,0.15) !important;
        }

        .avatar-sm {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #4ade80, #22c55e);
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 15px; color: #0a1a0e;
          flex-shrink: 0;
        }

        .podium-card {
          border-radius: 20px; padding: 16px 10px;
          text-align: center;
          display: flex; flex-direction: column;
          justify-content: flex-end; align-items: center;
          transition: transform 0.2s;
        }

        .podium-card:hover { transform: translateY(-4px); }

        .you-card {
          background: rgba(74,222,128,0.08);
          border: 2px solid rgba(74,222,128,0.3);
          border-radius: 22px; padding: 16px 18px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 12px;
          margin-bottom: 20px;
        }
      `}</style>

      <div className="dots-bg" />
      <div style={{ position: "fixed", width: 300, height: 300, background: "rgba(251,191,36,0.06)", borderRadius: "50%", filter: "blur(80px)", top: 0, left: "50%", transform: "translateX(-50%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 18px 110px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ padding: "22px 0 18px" }}>
          <div style={{ fontSize: 10, color: "rgba(134,239,172,0.5)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
            GLOBAL RANKINGS
          </div>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 26, color: "#f0fdf4" }}>Leaderboard 🏆</div>
        </motion.div>

        {/* Wally */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} style={{ marginBottom: 18 }}>
          <Wally mood="encourage" message={wallyMsg} size="sm" showName={true} />
        </motion.div>

        {/* Your rank card */}
        {yourRank > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
            className="you-card"
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "linear-gradient(135deg, #4ade80, #22c55e)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 900, color: "#0a1a0e",
                border: "2.5px solid rgba(74,222,128,0.5)", flexShrink: 0,
              }}>
                {(currentUser?.email?.[0] || "U").toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 900, color: "#f0fdf4", marginBottom: 2 }}>
                  {currentUser?.email?.split("@")[0] || "You"} 👋
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: rankTier(yourData?.points || 0).color }}>
                  {rankTier(yourData?.points || 0).name}
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 26, color: "#fbbf24", lineHeight: 1 }}>
                #{yourRank}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(134,239,172,0.45)", marginTop: 2 }}>
                {(yourData?.points || 0).toLocaleString()} pts
              </div>
            </div>
          </motion.div>
        )}

        {/* Top 3 podium */}
        {sorted.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            style={{ display: "flex", gap: 8, marginBottom: 20, alignItems: "flex-end" }}
          >
            {podiumOrder.map((idx) => {
              const u = sorted[idx];
              if (!u) return null;
              const isGold = idx === 0;
              const heights = { 0: 115, 1: 90, 2: 78 };
              const h = heights[idx];
              return (
                <motion.div
                  key={idx}
                  className="podium-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + [1, 0, 2].indexOf(idx) * 0.08 }}
                  style={{
                    flex: isGold ? 1.2 : 1,
                    minHeight: h,
                    background: isGold
                      ? "rgba(251,191,36,0.1)"
                      : "rgba(255,255,255,0.04)",
                    border: `2px solid ${isGold ? "rgba(251,191,36,0.35)" : "rgba(74,222,128,0.12)"}`,
                  }}
                >
                  <motion.div
                    animate={isGold ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ fontSize: 28, marginBottom: 6 }}
                  >
                    {medals[idx]}
                  </motion.div>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${medalColors[idx]}, ${medalColors[idx]}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 900, color: "#0a1a0e", marginBottom: 6, border: `2px solid ${medalColors[idx]}66` }}>
                    {(u.email?.[0] || "?").toUpperCase()}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 900, color: "#f0fdf4", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%", padding: "0 6px" }}>
                    {u.email?.split("@")[0]}
                  </div>
                  <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 13, color: medalColors[idx] }}>
                    {(u.points || 0).toLocaleString()}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Full list */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ background: "rgba(255,255,255,0.04)", border: "2px solid rgba(74,222,128,0.14)", borderRadius: 22, overflow: "hidden" }}
        >
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(74,222,128,0.08)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>🌍</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(134,239,172,0.45)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.07em", textTransform: "uppercase" }}>
              All heroes — {sorted.length} players
            </span>
          </div>

          {sorted.map((u, index) => {
            const isYou = u.email === currentUser?.email;
            const tier = rankTier(u.points || 0);
            return (
              <motion.div
                key={index}
                className={`leader-row ${isYou ? "you" : ""}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.32 + index * 0.04 }}
              >
                <div style={{
                  width: 28, textAlign: "center", flexShrink: 0,
                  fontSize: index < 3 ? 20 : 12,
                  fontFamily: "'Space Mono', monospace",
                  color: index < 3 ? medalColors[index] : "rgba(134,239,172,0.3)",
                  fontWeight: 700,
                }}>
                  {index < 3 ? medals[index] : `#${index + 1}`}
                </div>

                <div className="avatar-sm">
                  {(u.email?.[0] || "?").toUpperCase()}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 14, fontWeight: isYou ? 900 : 700,
                    color: isYou ? "#4ade80" : "#e8f5e9",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2,
                  }}>
                    {u.email?.split("@")[0]}{isYou ? " (you 👋)" : ""}
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 800, color: tier.color,
                    background: tier.bg, borderRadius: 100, padding: "1px 8px",
                    display: "inline-block",
                  }}>
                    {tier.name}
                  </div>
                </div>

                <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 15, color: index === 0 ? "#fbbf24" : "rgba(134,239,172,0.8)", flexShrink: 0 }}>
                  {(u.points || 0).toLocaleString()}
                  <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(134,239,172,0.35)", marginLeft: 3 }}>pts</span>
                </div>
              </motion.div>
            );
          })}

          {sorted.length === 0 && (
            <div style={{ padding: "48px 20px", textAlign: "center" }}>
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ fontSize: 44, marginBottom: 12 }}>🌱</motion.div>
              <p style={{ fontSize: 14, fontWeight: 800, color: "rgba(134,239,172,0.4)" }}>
                No players yet — be the first hero! 🦸
              </p>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}

export default Leaderboard;