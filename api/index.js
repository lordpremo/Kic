export default function handler(req, res) {
  res.status(200).json({
    api: "BROKEN LORD API",
    owner: "Lord",
    brand: "BROKEN LORD",
    status: "running",
    version: "1.0.0",
    endpoints: {
      wiki: "/api/wiki?q=",
      duckduckgo: "/api/ddg?q=",
      books: "/api/books?q=",
      github: "/api/github?q=",
      stackoverflow: "/api/stack?q="
    }
  });
}
