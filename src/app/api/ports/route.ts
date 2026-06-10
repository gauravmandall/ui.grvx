import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({});
  }
  try {
    const portsDir = path.join(process.cwd(), "..", ".manage_state", "ports");
    if (!fs.existsSync(portsDir)) {
      return NextResponse.json({});
    }
    const files = fs.readdirSync(portsDir);
    const portMap: Record<string, number> = {};
    for (const file of files) {
      if (file.endsWith(".port")) {
        const projectId = file.replace(".port", "");
        const portStr = fs.readFileSync(path.join(portsDir, file), "utf8").trim();
        const port = parseInt(portStr, 10);
        if (!isNaN(port)) {
          portMap[projectId] = port;
        }
      }
    }
    return NextResponse.json(portMap);
  } catch (error) {
    console.error("Error reading ports:", error);
    return NextResponse.json({});
  }
}
