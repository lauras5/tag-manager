const koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-body');
const {getTagScopedRouter, setupTagSystem} = require('sql-tag-system-koa-route');

const dbInfo = {
  host: 'localhost',
  password: process.env.MYSQL_PW,
  database: 'sql_tag_system',
  user: 'root'
};

(async () => {
  await setupTagSystem(dbInfo);

  const tagScopedRouter = getTagScopedRouter(dbInfo);
  const api = new Router();
  api.use(tagScopedRouter.routes())
      .use(tagScopedRouter.allowedMethods())

  const app = new koa()
  app.use(bodyParser({multipart: true}));
  const router = new Router()

  router.get('/', (ctx) => {
    ctx.body = {};
  })

  app.use(router.routes())
      .use(router.allowedMethods())

  app.use(api.routes())
      .use(api.allowedMethods())

  app.listen(3000, () => console.log('running on port 3000'))
})()
