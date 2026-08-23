export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const TIKTOK_PIXEL_ID = "DA5JII3C77UES973U2TG";
  const TIKTOK_ACCESS_TOKEN = "95be428f79176bf4477a39db133ace90ba9cc31c";
  const TEST_EVENT_CODE = "TEST09733";

  try {
    const { user_agent, ip, event_id } = req.body;

    const payload = {
      pixel_id: TIKTOK_PIXEL_ID,
      test_event_code: TEST_EVENT_CODE,
      events: [
        {
          event: "Lead",
          event_id: event_id || Math.random().toString(36).slice(2),
          timestamp: Math.floor(Date.now() / 1000),
          context: {
            user_agent: user_agent || "",
            ip: ip || ""
          }
        }
      ]
    };

    const resp = await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": TIKTOK_ACCESS_TOKEN
      },
      body: JSON.stringify(payload)
    });

    const result = await resp.json();
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
