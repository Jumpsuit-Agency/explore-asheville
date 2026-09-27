import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return Response.json({ error: "Not configured" }, { status: 500 });
  }

  // Simple password check via query param
  const pass = req.nextUrl.searchParams.get("key");
  if (pass !== "jumpsuit2026") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
    `${url}/rest/v1/advisor_logs?order=created_at.desc&limit=500`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    }
  );

  if (!res.ok) {
    return Response.json({ error: "Failed to fetch logs" }, { status: 500 });
  }

  const logs = await res.json();
  return Response.json(logs);
}
