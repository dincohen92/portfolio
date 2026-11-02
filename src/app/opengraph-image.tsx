import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Din Cohen — Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const headshot = await readFile(
    path.join(process.cwd(), "public/images/hero/din-headshot.png")
  );
  const font = await readFile(
    path.join(process.cwd(), "src/app/fonts/BricolageGrotesque-Medium.woff")
  );
  const inter = await readFile(path.join(process.cwd(), "src/app/fonts/Inter-Regular.woff"));
  const src = `data:image/png;base64,${headshot.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          background: "#000",
          fontFamily: "Inter",
          color: "#fff",
          padding: "0 0 0 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignSelf: "center" }}>
          <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", opacity: 0.5 }}>
            Product Designer
          </div>
          <div style={{ fontFamily: "Bricolage", fontSize: 96, fontWeight: 500, letterSpacing: -3, marginTop: 16 }}>
            Din Cohen
          </div>
          <div style={{ fontSize: 32, opacity: 0.7, marginTop: 24, maxWidth: 560, lineHeight: 1.35 }}>
            Designs and builds AI-powered products end to end.
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={504} height={630} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: inter, weight: 400, style: "normal" },
        { name: "Bricolage", data: font, weight: 500, style: "normal" },
      ],
    }
  );
}
