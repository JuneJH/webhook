const http = require('http');
const path = require("path");
const createHandler = require('github-webhook-handler');
const handler = createHandler({ path: '/blog', secret: '6L7_SuF6rDSSbi@' });
const PORT = 3000;
function run_cmd(cmd, args, callback) {
    const spawn = require('child_process').spawn;
    const child = spawn(cmd, args);
    let resp = "";
    child.stdout.on('data', function (buffer) {
	    const str = buffer.toString();
	    resp += str;
	    console.log("当前执行信息",str);
    });
    child.stdout.on('end', function () { callback(resp) });
}
http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location123123231123123')
    })
}).listen(PORT, () => {
    console.log('WebHooks Listern at ', PORT);
})

handler.on('error', function (err) {
    console.error('Error:', err.message)
})

// 对push操作监听
handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);
    run_cmd('sh', [path.resolve(__dirname,"../deploy-dev.sh")], function (text) { console.log(text) });

})
