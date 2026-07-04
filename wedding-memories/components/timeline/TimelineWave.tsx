"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TimelineCard from "./TimelineCard";

interface Event {
  date: string;
  title: string;
  description: string;
}

interface TimelineWaveProps {
  events: Event[];
}

function buildWavePath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M${points[0].x},${points[0].y} `;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += `C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y} `;
  }
  return d;
}

// Two size profiles: desktop keeps the original generous spacing,
// mobile tightens everything so cards/steps fit comfortably on
// 360-430px wide screens (covers iPhone SE up through S20 Ultra)
// without needing to scroll absurd distances between events.
const SIZES = {
  mobile: {
    STEP_X: 190,
    MARGIN_X: 120,
    TOP_Y: 55,
    BOTTOM_Y: 145,
    SVG_H: 200,
    CARD_GAP: 22,
    CARD_ZONE: 175,
    CARD_W: 230,
  },
  desktop: {
    STEP_X: 260,
    MARGIN_X: 160,
    TOP_Y: 70,
    BOTTOM_Y: 190,
    SVG_H: 240,
    CARD_GAP: 34,
    CARD_ZONE: 230,
    CARD_W: 300,
  },
};

export default function TimelineWave({ events }: TimelineWaveProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { STEP_X, MARGIN_X, TOP_Y, BOTTOM_Y, SVG_H, CARD_GAP, CARD_ZONE, CARD_W } =
    isMobile ? SIZES.mobile : SIZES.desktop;

  const n = events.length;
  const svgW = MARGIN_X * 2 + STEP_X * (n - 1);

  const points = events.map((_, i) => ({
    x: MARGIN_X + i * STEP_X,
    y: i % 2 === 0 ? TOP_Y : BOTTOM_Y,
  }));

  const pathD = buildWavePath(points);
  const containerH = CARD_ZONE + SVG_H + CARD_ZONE;

  return (
    <div
      className="relative mx-auto snap-center"
      style={{ width: svgW, height: containerH, minWidth: svgW }}
    >
      <svg
        viewBox={`0 0 ${svgW} ${SVG_H}`}
        width={svgW}
        height={SVG_H}
        className="absolute left-0"
        style={{ top: CARD_ZONE }}
        fill="none"
      >
        <defs>
          <linearGradient id="waveGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E7C89A" />
            <stop offset="50%" stopColor="#B68C58" />
            <stop offset="100%" stopColor="#E7C89A" />
          </linearGradient>
          <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path d={pathD} stroke="#F0DCC4" strokeWidth={2} />

        <motion.path
          d={pathD}
          stroke="url(#waveGold)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />

        {points.map((p, i) => (
          <g key={i}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={isMobile ? 7 : 9}
              fill="#B23A48"
              filter="url(#dotGlow)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.18 }}
            />
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={isMobile ? 7 : 9}
              fill="none"
              stroke="#B23A48"
              strokeWidth={1.5}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeOut",
              }}
            />
            <circle cx={p.x} cy={p.y} r={isMobile ? 2.5 : 3} fill="#FFF8F0" />
          </g>
        ))}
      </svg>

      {points.map((p, i) => {
        const isTop = p.y === TOP_Y;
        const markerScreenY = CARD_ZONE + p.y;

        return (
          <div key={i}>
            <div
              className="absolute w-px bg-gradient-to-b from-[#E7C89A] to-transparent"
              style={{
                left: p.x - 0.5,
                top: isTop ? markerScreenY - CARD_GAP : markerScreenY,
                height: CARD_GAP,
                backgroundImage: isTop
                  ? "linear-gradient(to top, #E7C89A, transparent)"
                  : "linear-gradient(to bottom, #E7C89A, transparent)",
              }}
            />

            <div
              className="absolute"
              style={{
                left: p.x,
                top: isTop
                  ? markerScreenY - CARD_GAP
                  : markerScreenY + CARD_GAP,
                transform: isTop
                  ? "translate(-50%, -100%)"
                  : "translate(-50%, 0%)",
                width: CARD_W,
              }}
            >
              <TimelineCard
                title={events[i].title}
                date={events[i].date}
                description={events[i].description}
                position={isTop ? "top" : "bottom"}
                delay={i * 0.18}
                compact={isMobile}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}