import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#102437",
          borderRadius: 35,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 48.19 48.19" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id="v"
              x1="8.31"
              y1="8.33"
              x2="22.31"
              y2="42.33"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#5bc5f0" />
              <stop offset="0.55" stopColor="#447dbf" />
              <stop offset="1" stopColor="#3254a2" />
            </linearGradient>
          </defs>
          <path
            fill="#fff"
            d="M24.49,43.26l14-22.47,3.6,2.75,1.4-17.73-14.5,7.71,3.6,2.75-14.1,22.58,6,4.41Z"
          />
          <path
            fill="none"
            stroke="url(#v)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            d="M9.49,10.26l12,31"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
