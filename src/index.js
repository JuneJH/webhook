var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/blog', secret: '6L7_SuF6rDSSbi@' })
// 上面的 secret 保持和 GitHub 后台设置的一致
const PORT = 8080;
function run_cmd(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString(); });
    child.stdout.on('end', function () { callback(resp) });
}
// debug用
// run_cmd('sh', ['./deploy-dev.sh'], function(text){ console.log(text) });

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(PORT,() =>{
    console.log('WebHooks Listern at ',PORT);
})

handler.on('error', function (err) {
    console.error('Error:', err.message)
})


handler.on('*', function (event) {
    console.log('Received *', event.payload.action);
    //   run_cmd('sh', ['./deploy-dev.sh'], function(text){ console.log(text) });
})
// 对push操作监听
handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);
        // 分支判断
      //  if(event.payload.ref === 'refs/heads/master'){
        //    console.log('deploy master..')
            run_cmd('sh', ['./deploy-dev.sh'], function(text){ console.log(text) });

       // }
})
