import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase";
import { joinClub } from "../utils/userService";
import { motion, AnimatePresence } from "framer-motion";
import Wally from "../components/Wally";

function Community() {
  const user = auth.currentUser;

  const [clubs, setClubs] = useState([
    { id: 1, name: "Eco Warriors 🌱", members: 12, color: "#4ade80", emoji: "🌱" },
    { id: 2, name: "Green Team ♻️",   members: 8,  color: "#22d3ee", emoji: "♻️" },
    { id: 3, name: "Planet Heroes 🌍", members: 21, color: "#a78bfa", emoji: "🌍" },
    { id: 4, name: "Ocean Guardians 🌊", members: 5, color: "#60a5fa", emoji: "🌊" },
  ]);

  const [joined, setJoined] = useState([]);
  const [newClub, setNewClub] = useState("");
  const [wallyMood, setWallyMood] = useState("happy");
  const [wallyMsg, setWallyMsg] = useState("Join a club and make eco-friends! 🤝 The more, the merrier!");

  const handleJoin = async (club) => {
    if (joined.includes(club.id)) return;
    setJoined(prev => [...prev, club.id]);
    setWallyMood("celebrate");
    setWallyMsg(`Woohoo! You joined ${club.name}! Welcome to the team! 🎉`);
    await joinClub(user.uid, club);
    toast.success(`Joined ${club.name}! 🎉`, {
      style: { background: "#1a2e22", color: "#e8f5e9", border: "1px solid rgba(74,222,128,0.3)", fontFamily: "'Nunito', sans-serif", fontWeight: 700, borderRadius: "14px" }
    });
  };

  const handleCreate = () => {
    if (!newClub.trim()) return;
    const colors = ["#4ade80", "#fbbf24", "#f472b6", "#60a5fa", "#a78bfa", "#f97316"];
    const emojis = ["🌱", "⭐", "💚", "🌟", "🎯", "🏆"];
    const idx = clubs.length % colors.length;
    const club = { id: Date.now(), name: newClub.trim(), members: 1, color: colors[idx], emoji: emojis[idx] };
    setClubs(prev => [...prev, club]);
    setNewClub("");
    setWallyMood("celebrate");
    setWallyMsg(`Amazing! You created "${club.name}"! Invite your friends! 🎉`);
    toast.success("Club created! 🎉", {
      style: { background: "#1a2e22", color: "#e8f5e9", border: "1px solid rgba(74,222,128,0.3)", fontFamily: "'Nunito', sans-serif", fontWeight: 700, borderRadius: "14px" }
    });
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

        .club-input {
          flex: 1;
          background: rgba(255,255,255,0.06);
          border: 2px solid rgba(74,222,128,0.22);
          border-radius: 16px;
          padding: 12px 16px;
          color: #e8f5e9;
          font-family: 'Nunito', sans-serif;
          font-size: 14px; font-weight: 700;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .club-input::placeholder { color: rgba(134,239,172,0.3); }
        .club-input:focus { border-color: rgba(74,222,128,0.55); background: rgba(74,222,128,0.05); }

        .create-btn {
          background: linear-gradient(135deg, #4ade80, #22c55e);
          color: #0a1a0e;
          border: none; padding: 12px 22px;
          border-radius: 14px;
          font-family: 'Fredoka One', cursive;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap; flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(74,222,128,0.3), 0 2px 0 #16a34a;
        }

        .create-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(74,222,128,0.4), 0 2px 0 #16a34a; }
        .create-btn:active { transform: scale(0.97); }
        .create-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }

        .club-card {
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(74,222,128,0.14);
          border-radius: 22px;
          padding: 16px 18px;
          margin-bottom: 12px;
          display: flex; align-items: center;
          justify-content: space-between;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
        }

        .club-card:hover { transform: translateY(-2px); }

        .club-card.member {
          background: rgba(74,222,128,0.06);
          border-color: rgba(74,222,128,0.3);
        }

        .join-btn {
          background: rgba(74,222,128,0.12);
          border: 2px solid rgba(74,222,128,0.35);
          color: #4ade80;
          padding: 10px 20px;
          border-radius: 14px;
          font-family: 'Fredoka One', cursive;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap; flex-shrink: 0;
        }

        .join-btn:hover { background: rgba(74,222,128,0.22); transform: scale(1.04); }
        .join-btn:active { transform: scale(0.97); }

        .member-badge {
          font-family: 'Fredoka One', cursive;
          font-size: 13px; color: #4ade80;
          background: rgba(74,222,128,0.12);
          border: 2px solid rgba(74,222,128,0.3);
          padding: 8px 14px; border-radius: 12px;
        }

        .stat-mini {
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(74,222,128,0.15);
          border-radius: 18px; padding: 14px;
          text-align: center; flex: 1;
        }
      `}</style>

      <div className="dots-bg" />
      <div style={{ position: "fixed", width: 280, height: 280, background: "rgba(74,222,128,0.06)", borderRadius: "50%", filter: "blur(80px)", bottom: 0, left: -80, pointerEvents: "none", zIndex: 0 }} />

      <Toaster position="top-center" />

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 18px 110px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ padding: "22px 0 18px" }}>
          <div style={{ fontSize: 10, color: "rgba(134,239,172,0.5)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
            MAKE ECO-FRIENDS
          </div>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 26, color: "#f0fdf4" }}>Community 👥</div>
        </motion.div>

        {/* Wally */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} style={{ marginBottom: 18 }}>
          <Wally mood={wallyMood} message={wallyMsg} size="sm" showName={true} />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ display: "flex", gap: 10, marginBottom: 20 }}
        >
          {[
            { label: "Clubs", value: clubs.length, icon: "🏠", color: "#4ade80" },
            { label: "Joined", value: joined.length, icon: "✅", color: "#22d3ee" },
            { label: "Members", value: clubs.reduce((s, c) => s + c.members, 0), icon: "👥", color: "#a78bfa" },
          ].map((s) => (
            <div key={s.label} className="stat-mini">
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, color: s.color, marginBottom: 2 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(134,239,172,0.45)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Create club */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
          style={{ background: "rgba(255,255,255,0.05)", border: "2px solid rgba(74,222,128,0.18)", borderRadius: 22, padding: "18px", marginBottom: 22 }}
        >
          <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(134,239,172,0.45)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 12 }}>
            CREATE YOUR OWN CLUB 🏗️
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={newClub}
              onChange={(e) => setNewClub(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="Give your club a cool name..."
              className="club-input"
            />
            <button onClick={handleCreate} disabled={!newClub.trim()} className="create-btn">
              Create! 🎉
            </button>
          </div>
        </motion.div>

        {/* Section label */}
        <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(134,239,172,0.45)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 12 }}>
          ALL CLUBS 🌍
        </div>

        {/* Club list */}
        <div>
          <AnimatePresence>
            {clubs.map((club, i) => {
              const isMember = joined.includes(club.id);
              return (
                <motion.div
                  key={club.id}
                  className={`club-card ${isMember ? "member" : ""}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <motion.div
                      animate={isMember ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.4 }}
                      style={{
                        width: 50, height: 50, borderRadius: 15, flexShrink: 0,
                        background: club.color + "20",
                        border: `2px solid ${club.color}40`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 24,
                      }}
                    >
                      {club.emoji}
                    </motion.div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 900, color: "#f0fdf4", marginBottom: 4 }}>
                        {club.name}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(134,239,172,0.45)" }}>
                        👥 {club.members + (isMember ? 1 : 0)} members
                      </div>
                    </div>
                  </div>

                  {isMember ? (
                    <div className="member-badge">✓ Member!</div>
                  ) : (
                    <button className="join-btn" onClick={() => handleJoin(club)}>
                      Join! 🙌
                    </button>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

export default Community;