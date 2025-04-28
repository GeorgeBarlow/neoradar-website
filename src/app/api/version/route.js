// Create a Next.js API route: /pages/api/version.js or /app/api/version/route.js (App Router)

// For Pages Router:
export default async function handler(req, res) {
  try {
    const response = await fetch("https://cdn.neoradar.app/alpha.yml");
    const yamlContent = await response.text();

    // Extract version
    const versionMatch = yamlContent.match(/version:\s*([^\n]+)/);
    const version = versionMatch && versionMatch[1] ? versionMatch[1].trim() : null;

    res.status(200).json({ version });
  } catch (error) {
    console.error("Error fetching version:", error);
    res.status(500).json({ error: "Failed to fetch version" });
  }
}

// For App Router:
export async function GET() {
  try {
    const response = await fetch("https://cdn.neoradar.app/alpha.yml");
    const yamlContent = await response.text();

    // Extract version
    const versionMatch = yamlContent.match(/version:\s*([^\n]+)/);
    const version = versionMatch && versionMatch[1] ? versionMatch[1].trim() : null;

    return new Response(JSON.stringify({ version }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching version:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch version" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
