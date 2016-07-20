export default {
  index: '/',
  page(uid) {
    return `/page/${uid}`
  },
  notFound: '/not-found',
  //prismic preview
  preview: '/preview',

  //specific cases
  all: '*'
}
