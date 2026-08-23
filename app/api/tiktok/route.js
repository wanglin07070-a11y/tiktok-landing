export async function POST(request) {

  const ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN;
  const PIXEL_ID = "DA5JII3C77UES973U2TG";

  try {

    const body = await request.json();

    const payload = {

      pixel_code: PIXEL_ID,

      event: body.eventName || "Lead",

      event_time: Math.floor(Date.now()/1000),

      event_id: "lead_" + Date.now(),

      event_source: "website",

      action_source: "website",

      user: {
        user_agent: request.headers.get("user-agent")
      },

      properties: {

        content_id:"free_consultation",

        content_name:
        body.content_name || "無料相談申込",

        content_type:"product"

      },

      test_event_code:"TEST09733"

    };


    const response = await fetch(
      "https://business-api.tiktok.com/open_api/v1.3/event/track/",
      {

        method:"POST",

        headers:{
          "Content-Type":"application/json",
          "Access-Token":ACCESS_TOKEN
        },

        body:JSON.stringify(payload)

      }
    );


    const result = await response.json();

    return Response.json(result);


  } catch(error){

    return Response.json(
      {error:String(error)},
      {status:500}
    );

  }

}


export async function GET(){

 return Response.json({
   status:"TikTok API running"
 });

}
