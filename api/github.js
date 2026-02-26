export default async function handler(req, res) {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Missing q parameter" });

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}`;
  const r = await fetch(url);
  const data = await r.json();

  res.json({ query: q, results: data.items });
}
