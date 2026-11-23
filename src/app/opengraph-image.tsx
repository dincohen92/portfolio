import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Din Cohen | Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const headshot = await readFile(
    path.join(process.cwd(), "public/images/hero/din-headshot.png")
  );
  const font = await readFile(
    path.join(process.cwd(), "src/app/fonts/BricolageGrotesque-Medium.woff")
  );
  const svg = async (n: string) =>
    `data:image/svg+xml;base64,${(await readFile(path.join(process.cwd(), `public/images/hero/${n}.svg`))).toString("base64")}`;
  const cyan = await svg("shape-cyan-circle");
  const yellow = await svg("shape-yellow-triangle");
  // Positions are from the Figma "OG wide 1200x630" frame (px).
  const abs = (x: number, y: number, w: number, h: number) =>
    ({ position: "absolute", left: x, top: y, width: w, height: h, display: "flex" }) as const;
  const src = `data:image/png;base64,${headshot.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#000",
          color: "#fff",
        }}
      >
        {/* Stage: shapes + photo */}
        <div style={abs(517.79, 0, 531.418, 630)}>
          <div style={{ ...abs(0, 254.16, 211.027, 204.866), background: "#ff00ea" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cyan} alt="" width={217.958} height={217.958} style={{ position: "absolute", left: 279.57, top: 46.21 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" width={503.692} height={630} style={{ position: "absolute", left: 27.73, top: 0, objectFit: "cover" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={yellow} alt="" width={247.6} height={186} style={{ position: "absolute", left: 230.4, top: 382 }} />
        </div>
        {/* Text */}
        <div style={{ position: "absolute", left: 313, top: 155, display: "flex", flexDirection: "column", fontFamily: "Bricolage", fontWeight: 500 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 128, lineHeight: "111px", letterSpacing: -3 }}>
            <div style={{ display: "flex" }}>Din</div>
            <div style={{ display: "flex" }}>Cohen</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 20, fontSize: 59, lineHeight: "62px", color: "rgba(255,255,255,0.65)" }}>
            <div style={{ display: "flex" }}>Design</div>
            <div style={{ display: "flex" }}>Engineer</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: font, weight: 500, style: "normal" },
      ],
    }
  );
}
