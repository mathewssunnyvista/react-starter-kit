const jsonServer = require("json-server");

const server = jsonServer.create();
// var router = jsonServer.router(require("./db.js")());

const router = jsonServer.router("mocks/mocks.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  if (req.method === "GET" && req.url.includes("/entries")) {
    const itemsPerPage = 3;

    const parsedQuery = new URLSearchParams(req._parsedUrl.query);

    const filter = {};
    if (parsedQuery.has("category_id")) {
      filter.category_id = parsedQuery.get("category_id");
    }
    if (parsedQuery.has("name_like")) {
      filter.name = parsedQuery.get("name_like");
    }

    const entries = router.db.get("entries").value();

    const applyFilter = (data, filter) =>
      data.filter((obj) =>
        Object.entries(filter).every(([prop, find]) => find.includes(obj[prop]))
      );

    const filteredEntries = applyFilter(entries, filter);

    const page = parseInt(req.query._page, 10) || 1;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const data = filteredEntries.slice(start, end);
    const totalCount = filteredEntries.length;

    // Add custom headers for pagination
    const meta = {
      total_entries: totalCount,
      total_pages: Math.ceil(totalCount / itemsPerPage),
      current_page: page,
      per_page: itemsPerPage,
    };

    res.jsonp({ data, meta });
    // res.jsonp(data);
  } else {
    next();
  }
});

server.use(router);
server.listen(3000, function () {
  console.log("JSON Server is running");
});
