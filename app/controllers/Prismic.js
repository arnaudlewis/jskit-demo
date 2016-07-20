import Error from '../utils/Error'
import prismic from 'prismic.io'
import configuration from '../../conf/prismic-configuration'

const linkResolver = (doc, ctx) => {
  return '/'
}

export default {
  // -- Links resolution rules
  // This function will be used to generate links to Prismic.io documents
  // As your project grows, you should update this function according to your routes
  linkResolver: linkResolver,

  initCtx(req, res, next) {
    // So we can use this information in the views
    res.locals.ctx = {
      endpoint: configuration.apiEndpoint,
      linkResolver: configuration.linkResolver
    }
    res.locals.linkResolver = linkResolver
    next()
  },

  //return a promise
  api(req, res) {
    return prismic.api(configuration.apiEndpoint, {
      accessToken: configuration.accessToken,
      req: req
    })
  },

  preview(req, res) {
    api(req, res)
      .then(function(api) {
        return Prismic.preview(api, configuration.linkResolver, req, res)
      }).catch(function(err) {
        Error.handle(err, req, res)
      })
  }
}
