/**
 *
 * @author: 李梁
 * @date: 2019/4/22  16:53
 */
const koa = require('koa');
const app = new koa();
const path = require('path');
const static = require('koa-static');
const cors = require('koa2-cors');

app.use(cors());

app.use(static('./'));



app.listen(3000);