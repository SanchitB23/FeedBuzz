var localtunnel = require('localtunnel');
localtunnel(5000, {
  subdomain: 'feedbuzzprojectmajor2020',
  host: 'http://pagekite.me',
  local_https: false
}, function (err, tunnel) {
  console.log('LT Running', tunnel.url)
});
