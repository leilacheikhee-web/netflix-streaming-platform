const contentByRegion = {
  US: { title: "Netflix US", quality: "4K", features: ["HDR", "Dolby Atmos"] },
  GB: { title: "Netflix UK", quality: "HD", features: ["Dolby Vision"] },
  JP: { title: "Netflix Japan", quality: "4K", features: ["Anime Focus"] },
  IN: { title: "Netflix India", quality: "HD", features: ["Bollywood"] },
};

export default function handler(req, res) {
  const region = req.headers["x-region"] || "US";
  const content = contentByRegion[region] || contentByRegion["US"];
  
  res.status(200).json({
    region,
    content,
    timestamp: new Date().toISOString(),
  });
}
