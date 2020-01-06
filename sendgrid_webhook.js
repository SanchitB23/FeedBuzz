var localtunnel = require('localtunnel');
localtunnel(5000, {
  subdomain: 'feed-buzz-project-major2020',
  host: 'http://localtunnel.me',
  local_https: false
}, function (err, tunnel) {
  console.log('LT Running', tunnel.url)
});
