import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Enter email & password");
      return;
    }
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in ✅");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created 🎉");
      }
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google login success 🚀");
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f0d",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Syne', sans-serif",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .auth-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(74,222,128,0.18);
          border-radius: 12px;
          padding: 14px 18px;
          font-size: 15px;
          color: #e8f5e9;
          font-family: 'Space Mono', monospace;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          letter-spacing: 0.02em;
        }

        .auth-input::placeholder {
          color: rgba(134,239,172,0.35);
          font-size: 13px;
        }

        .auth-input:focus {
          border-color: rgba(74,222,128,0.6);
          box-shadow: 0 0 0 3px rgba(74,222,128,0.08);
        }

        .auth-input:hover {
          border-color: rgba(74,222,128,0.35);
        }

        .primary-btn {
          width: 100%;
          background: #4ade80;
          color: #0a0f0d;
          border: none;
          padding: 15px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.15s ease;
        }

        .primary-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(74,222,128,0.3);
          background: #6ee7b7;
        }

        .primary-btn:active {
          transform: translateY(0px) scale(0.98);
        }

        .google-btn {
          width: 100%;
          background: transparent;
          color: #e8f5e9;
          border: 1px solid rgba(255,255,255,0.15);
          padding: 14px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Syne', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: border-color 0.15s, background 0.15s, transform 0.12s;
        }

        .google-btn:hover {
          border-color: rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.05);
          transform: translateY(-1px);
        }

        .google-btn:active { transform: scale(0.98); }

        .divider-line {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(134,239,172,0.3);
          font-size: 11px;
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.08em;
        }

        .divider-line::before, .divider-line::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(74,222,128,0.12);
        }

        .tab-btn {
          flex: 1;
          padding: 10px;
          border: none;
          background: transparent;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          letter-spacing: 0.04em;
          transition: all 0.2s ease;
        }

        .switch-link {
          background: none;
          border: none;
          color: #4ade80;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          cursor: pointer;
          letter-spacing: 0.04em;
          text-decoration: underline;
          text-underline-offset: 3px;
          padding: 0;
        }
      `}</style>

      <div className="grid-bg" />

      {/* Glow orbs */}
      <div style={{
        position: "absolute", width: 450, height: 450,
        background: "rgba(74,222,128,0.07)", borderRadius: "50%",
        filter: "blur(90px)", top: -100, left: -150, pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", width: 350, height: 350,
        background: "rgba(56,189,248,0.05)", borderRadius: "50%",
        filter: "blur(90px)", bottom: -80, right: -100, pointerEvents: "none"
      }} />

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1a2e22",
            color: "#e8f5e9",
            border: "1px solid rgba(74,222,128,0.25)",
            fontFamily: "'Space Mono', monospace",
            fontSize: "13px",
          }
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: 400,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            style={{ fontSize: 44, marginBottom: 12 }}
          >
            🌱
          </motion.div>
          <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: "0.04em", color: "#f0fdf4" }}>
            WASTE<span style={{ color: "#4ade80" }}>WARRIOR</span>
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(74,222,128,0.14)",
          borderRadius: 20,
          padding: "32px 28px",
          backdropFilter: "blur(12px)",
        }}>

          {/* Tab switcher */}
          <div style={{
            display: "flex",
            background: "rgba(255,255,255,0.04)",
            borderRadius: 10,
            padding: 4,
            marginBottom: 28,
          }}>
            <button
              className="tab-btn"
              onClick={() => setIsLogin(true)}
              style={{
                background: isLogin ? "rgba(74,222,128,0.15)" : "transparent",
                color: isLogin ? "#4ade80" : "rgba(134,239,172,0.45)",
                boxShadow: isLogin ? "inset 0 0 0 1px rgba(74,222,128,0.25)" : "none",
              }}
            >
              Login
            </button>
            <button
              className="tab-btn"
              onClick={() => setIsLogin(false)}
              style={{
                background: !isLogin ? "rgba(74,222,128,0.15)" : "transparent",
                color: !isLogin ? "#4ade80" : "rgba(134,239,172,0.45)",
                boxShadow: !isLogin ? "inset 0 0 0 1px rgba(74,222,128,0.25)" : "none",
              }}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 10 : -10 }}
              transition={{ duration: 0.22 }}
            >
              <div style={{ marginBottom: 14 }}>
                <label style={{
                  display: "block",
                  fontSize: 11,
                  fontFamily: "'Space Mono', monospace",
                  color: "rgba(134,239,172,0.6)",
                  letterSpacing: "0.08em",
                  marginBottom: 7,
                  textTransform: "uppercase",
                }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
              </div>

              <div style={{ marginBottom: 22 }}>
                <label style={{
                  display: "block",
                  fontSize: 11,
                  fontFamily: "'Space Mono', monospace",
                  color: "rgba(134,239,172,0.6)",
                  letterSpacing: "0.08em",
                  marginBottom: 7,
                  textTransform: "uppercase",
                }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                className="primary-btn"
                style={{ marginBottom: 16 }}
              >
                {isLogin ? "🔐 Login to your account" : "🚀 Create account"}
              </motion.button>
            </motion.div>
          </AnimatePresence>

          <div className="divider-line" style={{ marginBottom: 16 }}>OR</div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogle}
            className="google-btn"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </motion.button>

        </div>

        {/* Switch link */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <span style={{ fontSize: 12, color: "rgba(134,239,172,0.4)", fontFamily: "'Space Mono', monospace" }}>
            {isLogin ? "New here? " : "Have an account? "}
          </span>
          <button className="switch-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create account" : "Log in instead"}
          </button>
        </div>

      </motion.div>
    </div>
  );
}

export default Auth;