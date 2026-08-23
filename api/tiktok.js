export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).json({
      status: "ok",
      message: "TikTok API online"
    });
  }


  const PIXEL_ID = "DA5JII3C77UES973U2TG";

  const ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN;


  try {

    const payload = {

      pixel_code: PIXEL_ID,

      event: "Lead",

      event_time: Math.floor(Date.now() / 1000),

      event_id: "lead_" + Date.now(),

      event_source: "website",

      action_source: "website",


      user: {

        user_agent: req.headers["user-agent"] || ""

      },


      properties: {

        content_name: "LINE咨询",

        content_type: "product",

        content_id: "line_contact"

      },


      // 测试阶段保留
      test_event_code: "TEST09733"

    };


    const response = await fetch(
      "https://business-api.tiktok.com/open_api/v1.3/event/track/",
      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          "Access-Token": ACCESS_TOKEN

        },

        body: JSON.stringify(payload)

      }
    );


    const result = await response.json();


    return res.status(200).json({

      tiktok_result: result,

      sent_payload: payload

    });


  } catch(error) {


    return res.status(500).json({

      error: error.message

    });


  }

}
