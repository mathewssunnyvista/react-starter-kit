var jsonServer = require("json-server");
var server = jsonServer.create();
//var router = jsonServer.router(require("./db.js")());
const router = jsonServer.router('mocks.json');
var middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  if (req.method === "GET" && req.url.includes("/entries")) {
    const itemsPerPage = 1;
    const page = parseInt(req.query._page, 10) || 1;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const data = router.db.get("entries").value().slice(start, end);
    const totalCount = router.db.get("entries").value().length;

    // Add custom headers for pagination
    res.header("X-Total-Count", totalCount);
    res.header("X-Total-Pages", Math.ceil(totalCount / itemsPerPage));
    res.header("X-Page", page);
    res.header("X-Per-Page", itemsPerPage);

    res.jsonp(data);
  } else {
    next();
  }
});

server.use(router);
server.listen(3000, function () {
  console.log("JSON Server is running");
});
