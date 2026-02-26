export default async function handler(req, res) {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Missing q parameter" });

  const url = `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${encodeURIComponent(q)}&site=stackoverflow`;
  const r = await fetch(url);
  const data = await r.json();

  res.json({ query: q, results: data.items });
}
