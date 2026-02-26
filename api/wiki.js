export default async function handler(req, res) {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Missing q parameter" });

  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${encodeURIComponent(q)}`;
  const r = await fetch(url);
  const data = await r.json();

  res.json({ query: q, results: data.query.search });
}
