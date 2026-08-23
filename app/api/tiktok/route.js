export async function GET(request) {
    return Response.json({ error: "Method Not Allowed" }, {status:405})
}

export async function POST(request) {
    // ==========改成你自己的参数==========
    const ACCESS_TOKEN = "95be428f79176bf4477a39db133ace90ba9cc31c";
    const PIXEL_ID = "DA5JII3C77UES973U2TG";
    // ====================================

    try {
        const body = await request.json();
        const { eventName, content_name, value, currency } = body;
        const userAgent = request.headers.get("user-agent");
        const ip = request.headers.get("x‑forwarded‑for") || "";

        const payload = {
            pixel_id: PIXEL_ID,
            event_name: eventName,
            timestamp: Math.floor(Date.now() / 1000),
            context: {
                user_agent: userAgent,
                ip: ip
            },
            properties:{
                content_name: content_name ?? "",
                value: value ?? 0,
                currency: currency ?? "USD"
            }
        };

        const res = await fetch("https://api.tiktok.com/v2/events", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
                "Content‑Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const result = await res.json();
        return Response.json(result);
    } catch(err){
        return Response.json({error:String(err)}, {status:500})
    }
}
