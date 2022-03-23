const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const router = new Router();
const PORT = 3000;
app.use(bodyParser);

router.post("/webhook",(ctx,next)=>{
    const body = ctx.request.body;

    console.log("body",body)

})
app.use(router.routes())



app.listen(PORT,()=>{
    console.log("server start at",PORT);
})