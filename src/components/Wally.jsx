import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * Wally — Waste Warrior Mascot
 *
 * Props:
 *   mood: "happy" | "celebrate" | "thinking" | "surprised" | "encourage" | "explain" | "wave"
 *   message: string — what Wally says
 *   size: "sm" | "md" | "lg"  (default: "md")
 *   showName: boolean (default: true)
 *   onDismiss: function (optional — shows a dismiss button)
 *   style: object (extra styles for wrapper)
 */

const MOOD_FACES = {
  happy:     { emoji: "🤖", color: "#4ade80", glow: "rgba(74,222,128,0.35)",  anim: "bounce" },
  celebrate: { emoji: "🤖", color: "#fbbf24", glow: "rgba(251,191,36,0.35)",  anim: "spin"   },
  thinking:  { emoji: "🤖", color: "#60a5fa", glow: "rgba(96,165,250,0.35)",  anim: "tilt"   },
  surprised: { emoji: "🤖", color: "#f472b6", glow: "rgba(244,114,182,0.35)", anim: "pop"    },
  encourage: { emoji: "🤖", color: "#a78bfa", glow: "rgba(167,139,250,0.35)", anim: "bounce" },
  explain:   { emoji: "🤖", color: "#34d399", glow: "rgba(52,211,153,0.35)",  anim: "float"  },
  wave:      { emoji: "🤖", color: "#4ade80", glow: "rgba(74,222,128,0.35)",  anim: "wave"   },
};

const SIZES = {
  sm: { face: 48, fontSize: 22, nameSize: 9 },
  md: { face: 68, fontSize: 32, nameSize: 10 },
  lg: { face: 90, fontSize: 44, nameSize: 12 },
};

const ANIM_VARIANTS = {
  bounce: {
    y: [0, -10, 0],
    transition: { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
  },
  spin: {
    rotate: [-8, 8, -8],
    transition: { repeat: Infinity, duration: 0.7, ease: "easeInOut" }
  },
  tilt: {
    rotate: [0, -5, 0, 5, 0],
    transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
  },
  pop: {
    scale: [1, 1.1, 1],
    transition: { repeat: Infinity, duration: 1, ease: "easeInOut" }
  },
  float: {
    y: [0, -6, 0],
    transition: { repeat: Infinity, duration: 2.8, ease: "easeInOut" }
  },
  wave: {
    rotate: [0, 15, 0, 15, 0],
    transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
  },
};

export default function Wally({
  mood = "happy",
  message = "Hi! I'm Wally! Let's sort some waste! 🌱",
  size = "md",
  showName = true,
  onDismiss,
  style = {},
}) {
  const { emoji, color, glow, anim } = MOOD_FACES[mood] || MOOD_FACES.happy;
  const { face, fontSize, nameSize } = SIZES[size] || SIZES.md;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, ...style }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Syne:wght@800&display=swap');

        .wally-speech {
          position: relative;
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(74,222,128,0.2);
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          padding: 12px 16px;
          min-width: 180px;
          max-width: 320px;
        }

        .wally-speech::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 18px;
          width: 0; height: 0;
          border-left: 12px solid transparent;
          border-right: 0px solid transparent;
          border-top: 12px solid rgba(74,222,128,0.2);
        }

        .wally-dismiss {
          position: absolute;
          top: 8px; right: 10px;
          background: none;
          border: none;
          color: rgba(134,239,172,0.4);
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
          padding: 0;
        }

        .wally-dismiss:hover { color: #4ade80; }
      `}</style>

      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          className="wally-speech"
          initial={{ opacity: 0, scale: 0.9, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          style={{ borderColor: color + "44" }}
        >
          {onDismiss && (
            <button className="wally-dismiss" onClick={onDismiss}>✕</button>
          )}
          <p style={{
            fontSize: size === "sm" ? 12 : 14,
            fontWeight: 700,
            fontFamily: "'Nunito', sans-serif",
            color: "#d1fae5",
            lineHeight: 1.5,
            paddingRight: onDismiss ? 20 : 0,
          }}>
            {message}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Wally face */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.div
            animate={ANIM_VARIANTS[anim]}
            style={{
              width: face,
              height: face,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1a2e22, #0d1f14)",
              border: `3px solid ${color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: fontSize,
              boxShadow: `0 0 20px ${glow}`,
              cursor: "default",
              userSelect: "none",
            }}
          >
            {emoji}
          </motion.div>
          {showName && (
            <p style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: nameSize,
              fontWeight: 800,
              color: color,
              letterSpacing: "0.1em",
              marginTop: 4,
              textTransform: "uppercase",
            }}>
              WALLY
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * WallyOnboarding — full-screen intro for first-time users
 * Shows a 3-step walkthrough of how to scan waste
 */
export function WallyOnboarding({ onComplete }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      mood: "wave",
      message: "Hi there! I'm WALLY, your waste-sorting buddy! 🤖 I'll help you keep the Earth clean and earn cool rewards!",
      title: "Meet Wally!",
      subtitle: "Your eco-friendly robot pal",
      emoji: "👋",
    },
    {
      mood: "explain",
      message: "It's super easy! Just take a photo of any piece of rubbish and I'll tell you which bin to put it in! 📸",
      title: "Take a Photo",
      subtitle: "Point your camera at any waste item",
      emoji: "📸",
    },
    {
      mood: "celebrate",
      message: "Every time you sort waste correctly, you earn coins and level up! Let's see how many you can collect! 🏆",
      title: "Earn Rewards!",
      subtitle: "Collect coins and unlock badges",
      emoji: "🏆",
    },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
      padding: 24,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Syne:wght@800&display=swap');

        .onboard-card {
          background: linear-gradient(160deg, #0d1f14, #0a0f0d);
          border: 2px solid rgba(74,222,128,0.2);
          border-radius: 28px;
          padding: 36px 28px;
          max-width: 360px;
          width: 100%;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .step-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .next-btn {
          width: 100%;
          padding: 16px;
          border-radius: 16px;
          border: none;
          background: #4ade80;
          color: #0a0f0d;
          font-size: 16px;
          font-weight: 800;
          font-family: 'Nunito', sans-serif;
          cursor: pointer;
          transition: all 0.15s ease;
          margin-top: 24px;
        }

        .next-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(74,222,128,0.35);
        }

        .skip-btn {
          background: none;
          border: none;
          color: rgba(134,239,172,0.35);
          font-family: 'Nunito', sans-serif;
          font-size: 13px;
          cursor: pointer;
          margin-top: 14px;
          display: block;
          width: 100%;
        }

        .skip-btn:hover { color: rgba(134,239,172,0.7); }
      `}</style>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="onboard-card"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(circle at 50% 0%, rgba(74,222,128,0.08) 0%, transparent 65%)"
          }} />

          {/* Step indicator */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 28 }}>
            {steps.map((_, i) => (
              <div key={i} className="step-dot" style={{
                background: i === step ? "#4ade80" : "rgba(74,222,128,0.2)",
                width: i === step ? 24 : 8,
                borderRadius: i === step ? 4 : "50%",
              }} />
            ))}
          </div>

          {/* Big emoji */}
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, delay: 0.1 }}
            style={{ fontSize: 64, marginBottom: 20 }}
          >
            {current.emoji}
          </motion.div>

          {/* Wally */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <Wally
              mood={current.mood}
              message={current.message}
              size="sm"
              showName={false}
            />
          </div>

          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 22,
            fontWeight: 800,
            color: "#f0fdf4",
            marginBottom: 6,
          }}>
            {current.title}
          </h2>
          <p style={{
            fontSize: 14,
            color: "rgba(134,239,172,0.55)",
            fontFamily: "'Nunito', sans-serif",
          }}>
            {current.subtitle}
          </p>

          <button
            className="next-btn"
            onClick={() => isLast ? onComplete() : setStep(s => s + 1)}
          >
            {isLast ? "🚀 Let's Go!" : "Next →"}
          </button>

          {!isLast && (
            <button className="skip-btn" onClick={onComplete}>
              Skip intro
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}