export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).json({
      status:"ok",
      message:"TikTok API running"
    });
  }


  return res.status(200).json({
    success:true
  });

}
