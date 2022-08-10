const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const casual = require('casual');
const queryString = require('query-string')

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.id = casual.uuid
    req.body.createdAt = Date.now()
    req.body.updatedAt = Date.now()
  } else if (req.method === 'PATCH' || req.method === 'PUT') {
    req.body.updatedAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

router.render = (req, res) => {

  if(req.method === 'GET') {
    const headers = res.getHeaders();
    const totalCountHeader = headers['x-total-count'];
    
    if(totalCountHeader) {
      const allResouces = ["categories","products","profile"];

      const queryParams = queryString.parse(req._parsedUrl.query);
      const resourceName = req._parsedUrl.pathname.substring(1);

      const result = {
        data: res.locals.data,
        pagination: {
          _page: Number.parseInt(queryParams._page),
          _limit: Number.parseInt(queryParams._limit),
          _totalRows: totalCountHeader.__wrapped__[resourceName].length 
        }
      }
      return res.jsonp(result);
    }
  }

  // const headers = res.getHeaders();
  // const totalCountHeader = headers['x-total-count'];
  // console.log("headers", headers);

  res.jsonp(res.locals.data);
}

// Use default router
server.use("/api", router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})