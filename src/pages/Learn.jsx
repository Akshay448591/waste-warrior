import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Wally from "../components/Wally";

function Learn() {
  const [expanded, setExpanded] = useState(null);
  const [wallyMsg, setWallyMsg] = useState("Tap any lesson to learn cool facts! 📚 Knowledge is power! ⚡");
  const [wallyMood, setWallyMood] = useState("explain");

  const lessons = [
    {
      title: "Plastic",
      icon: "🥤",
      bin: "Blue Bin",
      binColor: "#3b82f6",
      binEmoji: "🔵",
      desc: "Plastic takes hundreds of years to break down in the ground. That's longer than your great-great-great-grandchildren will be alive! 😮",
      tip: "Try using a reusable bottle instead of buying plastic ones!",
      funFact: "A plastic bottle can last 450 years in a landfill! ♻️",
      tag: "HIGH IMPACT",
      tagColor: "#f97316",
      wallyMsg: "Wow! Did you know plastic is super bad for oceans? 🌊 Let's recycle it instead!",
    },
    {
      title: "Paper",
      icon: "📄",
      bin: "Blue Bin",
      binColor: "#3b82f6",
      binEmoji: "🔵",
      desc: "Recycling paper saves trees! 🌳 It takes about 24 trees to make 1 tonne of paper. Think how many trees we can save!",
      tip: "Use both sides of paper before throwing it away!",
      funFact: "Recycled paper uses 70% less energy to make! ⚡",
      tag: "SAVE TREES",
      tagColor: "#4ade80",
      wallyMsg: "Paper from trees! 🌳 Recycling helps forests grow strong and big!",
    },
    {
      title: "Glass",
      icon: "🍾",
      bin: "Green Bin",
      binColor: "#22c55e",
      binEmoji: "🟢",
      desc: "Glass is amazing — it can be recycled forever without losing quality! A glass bottle can become a new bottle over and over again! ♾️",
      tip: "Sort glass by colour (clear, green, brown) for best recycling!",
      funFact: "Glass recycling saves up to 40% energy vs making new glass! ⚡",
      tag: "FOREVER RECYCLE",
      tagColor: "#6ee7b7",
      wallyMsg: "Glass is forever recyclable! That's like a superpower! 🦸",
    },
    {
      title: "Metal",
      icon: "🥫",
      bin: "Blue Bin",
      binColor: "#3b82f6",
      binEmoji: "🔵",
      desc: "Recycling just one aluminium can saves enough energy to run a TV for 3 hours! Metal is one of the most recyclable materials on Earth.",
      tip: "Rinse your tins and cans before putting them in the bin!",
      funFact: "Aluminium can be recycled in just 60 days and used again! 🔄",
      tag: "ENERGY SAVER",
      tagColor: "#fbbf24",
      wallyMsg: "Metal saves SO much energy when recycled! You're helping power the world! ⚡",
    },
    {
      title: "Food Waste",
      icon: "🍎",
      bin: "Brown Bin",
      binColor: "#a16207",
      binEmoji: "🟤",
      desc: "Food scraps don't have to go to landfill! They can become rich compost that helps plants and gardens grow better. Food waste = plant food! 🌱",
      tip: "Ask your family to start a compost bin at home!",
      funFact: "Composting food waste creates nutrients for soil! 🌻",
      tag: "COMPOSTABLE",
      tagColor: "#86efac",
      wallyMsg: "Food waste makes amazing plant food! Your apple core can grow new flowers! 🌸",
    },
    {
      title: "Hazardous Waste",
      icon: "⚠️",
      bin: "Red Bin",
      binColor: "#ef4444",
      binEmoji: "🔴",
      desc: "Some waste is dangerous — like batteries, paint, and chemicals. These need special handling so they don't hurt people or animals!",
      tip: "Always ask an adult to help with hazardous waste — never handle it alone!",
      funFact: "One car battery can pollute 600,000 litres of water if dumped! 😱",
      tag: "ASK ADULT",
      tagColor: "#f87171",
      wallyMsg: "Careful! ⚠️ Hazardous waste is dangerous — always ask a grown-up for help!",
    },
  ];

  const [read, setRead] = useState([]);

  const handleExpand = (index, lesson) => {
    if (expanded === index) {
      setExpanded(null);
      setWallyMood("explain");
      setWallyMsg("Tap any lesson to learn cool facts! 📚 Knowledge is power! ⚡");
    } else {
      setExpanded(index);
      setWallyMood("explain");
      setWallyMsg(lesson.wallyMsg);
      if (!read.includes(index)) setRead(prev => [...prev, index]);
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

        .lesson-card {
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(74,222,128,0.15);
          border-radius: 22px;
          margin-bottom: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.15s;
        }

        .lesson-card:hover { border-color: rgba(74,222,128,0.3); transform: translateY(-2px); }
        .lesson-card.open { border-color: rgba(74,222,128,0.4); }
        .lesson-card.read { border-left: 4px solid rgba(74,222,128,0.4); }

        .lesson-header {
          padding: 16px 18px;
          display: flex; align-items: center; gap: 14px;
        }

        .fun-fact-box {
          background: rgba(251,191,36,0.08);
          border: 1.5px solid rgba(251,191,36,0.25);
          border-radius: 14px; padding: 12px 16px;
          margin-top: 12px;
          display: flex; align-items: flex-start; gap: 10;
        }

        .tip-box {
          background: rgba(74,222,128,0.07);
          border: 1.5px solid rgba(74,222,128,0.2);
          border-radius: 14px; padding: 12px 16px;
          margin-top: 10px;
          display: flex; align-items: flex-start; gap: 10;
        }

        .progress-mini {
          display: flex; gap: 6px; align-items: center;
        }

        .progress-dot {
          width: 10px; height: 10px; border-radius: 50%;
          transition: all 0.3s ease;
        }
      `}</style>

      <div className="dots-bg" />
      <div style={{ position: "fixed", width: 260, height: 260, background: "rgba(74,222,128,0.05)", borderRadius: "50%", filter: "blur(70px)", bottom: 100, right: -60, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 18px 110px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ padding: "22px 0 18px" }}>
          <div style={{ fontSize: 10, color: "rgba(134,239,172,0.5)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
            WASTE SCHOOL
          </div>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 26, color: "#f0fdf4" }}>Learn with Wally! 📚</div>
        </motion.div>

        {/* Wally */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} style={{ marginBottom: 18 }}>
          <Wally mood={wallyMood} message={wallyMsg} size="sm" showName={true} />
        </motion.div>

        {/* Progress overview */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
          style={{ background: "rgba(255,255,255,0.05)", border: "2px solid rgba(74,222,128,0.18)", borderRadius: 20, padding: "14px 18px", marginBottom: 20 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: "#e8f5e9" }}>
              📚 {lessons.length} lessons
            </span>
            <span style={{ fontSize: 13, fontWeight: 900, color: "#4ade80" }}>
              {read.length}/{lessons.length} read! {read.length === lessons.length ? "🏆" : "⭐"}
            </span>
          </div>
          <div className="progress-mini">
            {lessons.map((_, i) => (
              <motion.div
                key={i}
                className="progress-dot"
                animate={{ scale: read.includes(i) ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: read.includes(i)
                    ? "linear-gradient(135deg, #4ade80, #6ee7b7)"
                    : "rgba(74,222,128,0.15)",
                  border: `1.5px solid ${read.includes(i) ? "rgba(74,222,128,0.5)" : "rgba(74,222,128,0.2)"}`,
                  boxShadow: read.includes(i) ? "0 0 8px rgba(74,222,128,0.4)" : "none",
                }}
              />
            ))}
            <span style={{ fontSize: 12, fontWeight: 800, color: "rgba(134,239,172,0.45)", marginLeft: 4 }}>
              Tap to expand!
            </span>
          </div>
        </motion.div>

        {/* Lessons */}
        {lessons.map((lesson, index) => {
          const isOpen = expanded === index;
          const isRead = read.includes(index);
          return (
            <motion.div
              key={index}
              className={`lesson-card ${isOpen ? "open" : ""} ${isRead ? "read" : ""}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 + index * 0.07 }}
              onClick={() => handleExpand(index, lesson)}
            >
              <div className="lesson-header">
                <motion.div
                  animate={isOpen ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                    background: lesson.binColor + "20",
                    border: `2px solid ${lesson.binColor}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26,
                  }}
                >
                  {isRead ? "✅" : lesson.icon}
                </motion.div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, marginBottom: 5 }}>
                    <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: 17, color: "#f0fdf4" }}>
                      {lesson.title}
                    </span>
                    <span style={{
                      fontSize: 9, fontWeight: 800, color: lesson.tagColor,
                      background: lesson.tagColor + "18", border: `1px solid ${lesson.tagColor}35`,
                      padding: "2px 8px", borderRadius: 100,
                    }}>
                      {lesson.tag}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 14 }}>{lesson.binEmoji}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: lesson.binColor }}>
                      {lesson.bin}
                    </span>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ color: "rgba(134,239,172,0.35)", fontSize: 14, flexShrink: 0 }}
                >
                  ▼
                </motion.div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ padding: "0 18px 18px", borderTop: "1px solid rgba(74,222,128,0.1)" }}
                  >
                    <p style={{ fontSize: 14, fontWeight: 700, color: "rgba(134,239,172,0.8)", lineHeight: 1.6, marginTop: 14, marginBottom: 0 }}>
                      {lesson.desc}
                    </p>

                    <div className="fun-fact-box">
                      <span style={{ fontSize: 18, flexShrink: 0, marginRight: 8 }}>🤩</span>
                      <div>
                        <p style={{ fontSize: 10, fontWeight: 800, color: "rgba(251,191,36,0.6)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          Fun Fact
                        </p>
                        <p style={{ fontSize: 13, fontWeight: 800, color: "#fde68a", lineHeight: 1.5 }}>
                          {lesson.funFact}
                        </p>
                      </div>
                    </div>

                    <div className="tip-box">
                      <span style={{ fontSize: 18, flexShrink: 0, marginRight: 8 }}>💡</span>
                      <div>
                        <p style={{ fontSize: 10, fontWeight: 800, color: "rgba(74,222,128,0.5)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          Wally's Tip
                        </p>
                        <p style={{ fontSize: 13, fontWeight: 800, color: "#a7f3d0", lineHeight: 1.5 }}>
                          {lesson.tip}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* All read celebration */}
        <AnimatePresence>
          {read.length === lessons.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              style={{
                background: "rgba(74,222,128,0.08)", border: "2px solid rgba(74,222,128,0.3)",
                borderRadius: 22, padding: "24px", textAlign: "center", marginTop: 8,
              }}
            >
              <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} style={{ fontSize: 48, marginBottom: 10 }}>
                🎓
              </motion.div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: "#4ade80", marginBottom: 6 }}>
                You read ALL the lessons! 🌟
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(134,239,172,0.5)" }}>
                You're officially a Waste Warrior Expert! 🤖💚
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default Learn;