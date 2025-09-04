// eslint security rules should flag these patterns

const { exec } = require('child_process');
const http = require('http');

http.createServer((req, res) => {
const url = new URL(req.url, '[http://localhost](http://localhost/)');
const user = url.searchParams.get('q') || 'echo hello';

// 1) Command injection
exec(user, (err, stdout) => {
if (err) return res.end('err');
res.write(stdout);
});

// 2) eval with expression (remote code execution)
//    e.g. /?q=console.log("pwned")
eval(user);

// 3) Non-literal RegExp (potential ReDoS if attacker controls pattern)
//    e.g. /?q=(a+)+$
const r = new RegExp(user);
res.end('done');
}).listen(3000);
 