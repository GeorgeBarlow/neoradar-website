// src/app/api/version/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://cdn.neoradar.app/alpha.yml", {
      // Ensuring the request is fresh
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch YAML: ${response.status}` }, { status: 500 });
    }

    const yamlContent = await response.text();

    // Extract version
    const versionMatch = yamlContent.match(/version:\s*([^\n]+)/);
    const version = versionMatch && versionMatch[1] ? versionMatch[1].trim() : null;

    return NextResponse.json({ version });
  } catch (error) {
    console.error("Error fetching version:", error);
    return NextResponse.json({ error: "Failed to fetch version" }, { status: 500 });
  }
}
