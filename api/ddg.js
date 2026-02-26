export default async function handler(req, res) {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Missing q parameter" });

  try {
    // Try DuckDuckGo first
    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_redirect=1&no_html=1`;
    const ddgRes = await fetch(ddgUrl);
    const ddgText = await ddgRes.text();

    let ddgData = null;
    try {
      ddgData = JSON.parse(ddgText);
    } catch (e) {
      ddgData = null;
    }

    // If DDG returned valid JSON with data
    if (ddgData && (ddgData.Abstract || ddgData.RelatedTopics?.length)) {
      return res.json({
        engine: "duckduckgo",
        query: q,
        abstract: ddgData.Abstract || null,
        heading: ddgData.Heading || null,
        related: ddgData.RelatedTopics || []
      });
    }

    // FALLBACK → Brave Search API
    const braveUrl = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(q)}`;
    const braveRes = await fetch(braveUrl);
    const braveData = await braveRes.json();

    return res.json({
      engine: "brave",
      query: q,
      results: braveData.web?.results || []
    });

  } catch (err) {
    return res.status(500).json({
      error: "Search failed",
      details: err.message
    });
  }
    }
