import Prismic from './Prismic'

export default {
  index(req, res){
    res.render('index')
  },

  notFound(req, res){
    res.render('notFound')
  }
}
