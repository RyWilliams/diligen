import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import { readFileSync } from 'fs';
import path from 'path';
import data from './data.json';

const app = new Koa();
const router = new Router();

const template = readFileSync(path.resolve(__dirname, 'templates/index.html'), 'utf8');

app.use(serve('public'));

router.get('/documents/:index', async (ctx, next) => {
  const { index } = ctx.params;
  const { documents } = data;
  const text = documents[index - 1];
  if (text !== undefined) {
    ctx.type = 'html';
    const html = template.replace(/{{}}/g, `<div id="text">${text}</div>`);
    ctx.body = html;
  } else {
    next();
  }
});

app.use(router.routes());

app.use(async (ctx) => {
  ctx.type = 'html';
  ctx.body = readFileSync(path.resolve(__dirname, 'templates/404.html'), 'utf8');
});

app.listen(3000);
