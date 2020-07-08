const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');
const manager = require('./manager');
const blog = require('./blog');
const {auth} = require('./auth');

const app = new Koa();
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024,    // 设置上传文件大小最大限制，默认2M
    multipart:true
  }
}));

router.post('/manager/login', async (ctx, next) => {
  const res = await manager.login(ctx.request.body);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.post('/manager/updPassword', async (ctx, next) => {
  const res = await manager.updPassword(ctx.request.body);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.get('/manager/find', async (ctx, next) => {
  const authed = await auth(ctx);
  if(authed){
    const res = await manager.findManager(ctx);
    ctx.response.type = 'application/json';
    ctx.response.body = res;
  }else{
    ctx.response.status = 401;
  }
});

router.post('/manager/add', async (ctx, next) => {
  const res = await manager.addManager(ctx.request.body);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.get('/blog/findByPage', async (ctx, next) => {
  const res = await blog.findByPage(ctx);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.get('/blog/findById', async (ctx, next) => {
  const res = await blog.findById(ctx);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.post('/blog/add', async (ctx, next) => {
  const res = await blog.add(ctx);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

app.use(router.routes());
app.listen(3000);
console.log('app started at port 3000...');