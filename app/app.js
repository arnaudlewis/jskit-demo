
/**
 * Module dependencies.
 */
import lala from './utils/test'
var prismic = require('prismic.io');
var app = require('./conf/config');
var configuration = require('./conf/prismic-configuration');
var PORT = app.get('port');

// Returns a Promise
function api(req, res) {
  // So we can use this information in the views
  res.locals.ctx = {
    endpoint: configuration.apiEndpoint,
    linkResolver: configuration.linkResolver
  };
  return prismic.api(configuration.apiEndpoint, {
    accessToken: configuration.accessToken,
    req: req
  });
}

function handleError(err, req, res) {
  if (err.status == 404) {
    res.status(404).send("404 not found");
  } else {
    res.status(500).send("Error 500: " + err.message);
  }
}

app.listen(PORT, function() {
  console.log('Express server listening on port ' + PORT);
});

app.route('/').get(function(req, res){
  res.render('index');
});

app.route('/preview').get(function(req, res) {
  api(req, res).then(function(api) {
    return Prismic.preview(api, configuration.linkResolver, req, res);
  }).catch(function(err) {
    handleError(err, req, res);
  });
});

