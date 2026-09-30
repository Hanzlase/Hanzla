import React, { useState, useEffect } from 'react';
import { createTimeline } from 'animejs';

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 1. Fade the wrapper in after 10ms (matching v4's isMounted pattern)
    const mountTimeout = setTimeout(() => setIsMounted(true), 10);

    // 2. Start animation after a small delay so the SVG is painted in the DOM
    const animTimeout = setTimeout(() => {
      // Target the hexagon outline by its specific id — NOT '#logo path'
      // (which would match the S-letter path first and break the animation)
      const hexEl = document.getElementById('hex-path');
      const pathLength = hexEl ? hexEl.getTotalLength() : 300;

      // Set stroke-dash so the outline starts completely invisible
      if (hexEl) {
        hexEl.style.strokeDasharray = `${pathLength}`;
        hexEl.style.strokeDashoffset = `${pathLength}`;
      }

      // Safety fallback — call finishLoading even if anime fails
      const safetyTimeout = setTimeout(() => finishLoading(), 4000);

      const tl = createTimeline({
        complete: () => {
          clearTimeout(safetyTimeout);
          finishLoading();
        },
      });

      tl
        // Step 1: Draw the hexagon outline (stroke-dashoffset → 0)
        .add('#hex-path', {
          delay: 300,
          duration: 1500,
          ease: 'inOutQuart',
          strokeDashoffset: [pathLength, 0],
        })
        // Step 2: Fade in the "H" letter
        .add('#H-letter', {
          duration: 700,
          ease: 'inOutQuart',
          opacity: [0, 1],
        })
        // Step 3: Shrink + fade out the whole logo
        .add('#logo', {
          delay: 500,
          duration: 300,
          ease: 'inOutQuart',
          opacity: [1, 0],
          scale: [1, 0.1],
        })
        // Step 4: Fade out the full-screen wrapper
        .add('.loader-wrapper', {
          duration: 200,
          ease: 'inOutQuart',
          opacity: [1, 0],
        });
    }, 80);

    return () => {
      clearTimeout(mountTimeout);
      clearTimeout(animTimeout);
    };
  }, []);

  return (
    <div className={`loader-wrapper${isMounted ? ' mounted' : ''}`}>
      <div className="loader-logo-wrapper">
        {/*
          SVG layout (matching v4 structure):
          - #hex-path  : hexagon outline — gets stroke-dashoffset drawn
          - #H-letter  : "H" text — starts opacity:0, fades in after hex draws
        */}
        <svg
          id="logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          aria-label="Loading"
        >
          {/* H letter — starts hidden, animejs fades it in */}
          <text
            id="H-letter"
            x="50"
            y="67"
            fill="currentColor"
            fontSize="46"
            fontFamily="'Fira Code', monospace"
            fontWeight="600"
            textAnchor="middle"
            style={{ opacity: 0 }}
          >
            H
          </text>

          {/* Hexagon outline — stroke draw animated by animejs */}
          <path
            id="hex-path"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            d="M 50,5 L 11,27 L 11,72 L 50,95 L 89,73 L 89,28 Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
