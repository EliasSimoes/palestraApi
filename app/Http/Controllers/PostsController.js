'use strict'

const Livro = use('App/Model/Livro')
const Validator = use('Validator') 

class PostController {

  * index (request, response) {
    const livros = yield Livro.query().orderBy('id', 'desc').fetch()
    //yield response.sendView('home', { livros: livros.toJSON() })
    yield response.json(livros) 
  }

    * create (request, response) {
    yield response.sendView('posts.create')
  }

  * store (request, response) {
    const postData = request.only('title', 'author', 'content') 

    const rules = {
      title: 'required',
      author: 'required',
      content: 'required'
    }

    const validation = yield Validator.validate(postData, rules) 

    if (validation.fails()) {
      yield request
        .withOnly('title', 'author', 'content')
        .andWith({ errors: validation.messages() })
        .flash() 

      response.redirect('back')
      return
    }

    yield Livro.create(postData) 
    response.redirect('/')
  }

  * show (request, response) {
    const post = yield Livro.find(request.param('id'))
    yield response.sendView('posts.show', { post: post.toJSON() })
  }


}


module.exports = PostController