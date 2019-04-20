/**
 *
 * @author: 李梁
 * @date: 2019/4/20  22:45
 */
 const koa = require('koa');
 const app = new koa();

 app.use(async (ctx, next) => {
     ctx.body = "电影首页"
 });

 app.listen(3000);