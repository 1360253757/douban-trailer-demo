/**
 *
 * @author: 李梁
 * @date: 2019/4/20  22:45
 */
const koa = require('koa');
const app = new koa();
// const ejs = require('ejs');
// const {htmlTpl, ejsTpl} = require('./tpl');
const path = require('path');
const views = require('koa-views');

app.use(views(path.join(__dirname, 'views'), {
    extension: 'pug'
}));

app.use(async (ctx, next) => {
    await ctx.render('index', {
        name: 'Lance'
    })
});

app.listen(3000);