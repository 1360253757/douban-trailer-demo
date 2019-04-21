/**
 *
 * @author: 李梁
 * @date: 2019/4/20  22:45
 */
const koa = require('koa');
const app = new koa();
const ejs = require('ejs');
const {htmlTpl, ejsTpl} = require('./tpl');

app.use(async (ctx, next) => {
    ctx.type = 'text/html';
    ctx.body  = ejs.render(ejsTpl, {
        name: 'Lance'
    });
});

app.listen(3000);