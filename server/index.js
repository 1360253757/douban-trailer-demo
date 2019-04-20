/**
 *
 * @author: 李梁
 * @date: 2019/4/20  22:45
 */
const koa = require('koa');
const app = new koa();
const {normal} = require('./tpl');

app.use(async (ctx, next) => {
    ctx.type = 'text/html';
    ctx.body  = normal;
});

app.listen(3000);