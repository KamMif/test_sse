let http = require('http');
let url = require('url');
let querystring = require('querystring');

function onDigits(req, res) {
    res.writeHead(200, {

        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
    });

    let i = 0;

    let timer = setInterval(write, 1000);
    write();

    function write() {
        i++;

        if (i == 10) {
            res.write('event: bye\ndata: пока-пока\n\n');
            clearInterval(timer);
            res.end();
            return;
        }

        res.write('data: ' + i + '\n\n' + 'id: ' + i + '\n\n');

    }
}

function accept(req, res) {

    if (req.url == '/digits') {
        console.log('-----------------')
        console.log(req.headers)
        onDigits(req, res);
        return;
    }

    fileServer.serve(req, res);

}


if (!module.parent) {
    console.log('start')
    http.createServer(accept).listen(8080);
} else {
    exports.accept = accept;
}
