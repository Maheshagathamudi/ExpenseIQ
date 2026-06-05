import React from "react";

const AnimatedLogo = ({ size = 44, showText = true, textSize = "1.5rem", animated = true }) => {
  const isAnimated = animated;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* Animated Logo Icon */}
      <div
        style={{
          width: size,
          height: size,
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Outer rotating ring */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 44 44"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            animation: isAnimated ? "logoRotate 8s linear infinite" : "none",
          }}
        >
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#00C2B3" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <circle
            cx="22"
            cy="22"
            r="20"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Inner rotating ring (opposite direction) */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 44 44"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            animation: isAnimated ? "logoRotateReverse 12s linear infinite" : "none",
          }}
        >
          <defs>
            <linearGradient id="ringGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00C2B3" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <circle
            cx="22"
            cy="22"
            r="16"
            fill="none"
            stroke="url(#ringGrad2)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        </svg>

        {/* Main gradient background */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            height: "70%",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #0066FF, #00C2B3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0, 102, 255, 0.3)",
            animation: isAnimated ? "logoPulse 3s ease-in-out infinite" : "none",
          }}
        >
          {/* Lightning Bolt SVG with draw animation */}
          <svg
            width="55%"
            height="55%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              animation: isAnimated ? "logoDraw 1.5s ease-out forwards" : "none",
              strokeDasharray: 60,
              strokeDashoffset: isAnimated ? 0 : 60,
            }}
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>

        {/* Floating particles */}
        {isAnimated && (
          <>
            <div
              style={{
                position: "absolute",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#0066FF",
                top: "10%",
                left: "20%",
                animation: "logoFloat 4s ease-in-out infinite",
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "#00C2B3",
                top: "70%",
                right: "15%",
                animation: "logoFloat 3s ease-in-out 1s infinite",
                opacity: 0.5,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "2px",
                height: "2px",
                borderRadius: "50%",
                background: "white",
                bottom: "20%",
                left: "30%",
                animation: "logoFloat 5s ease-in-out 0.5s infinite",
                opacity: 0.4,
              }}
            />
          </>
        )}
      </div>

      {/* Text Logo */}
      {showText && (
        <div>
          <h2
            style={{
              fontSize: textSize,
              margin: 0,
              letterSpacing: "-0.3px",
              background: "linear-gradient(135deg, #fff, #94A3B8)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            ExpenseIQ
          </h2>
          <p
            style={{
              fontSize: "0.7rem",
              color: "#94A3B8",
              marginTop: "2px",
              letterSpacing: "0.5px",
              fontWeight: 500,
            }}
          >
            Smart Fintech
          </p>
        </div>
      )}

      {/* Keyframe animations */}
      <style>{`
        @keyframes logoRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes logoRotateReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes logoPulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 4px 15px rgba(0, 102, 255, 0.3);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.05);
            box-shadow: 0 6px 25px rgba(0, 102, 255, 0.5);
          }
        }
        @keyframes logoDraw {
          from { stroke-dashoffset: 60; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-8px) translateX(4px); }
          50% { transform: translateY(-4px) translateX(-4px); }
          75% { transform: translateY(-12px) translateX(2px); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;