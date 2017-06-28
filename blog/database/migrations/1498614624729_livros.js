'use strict'

const Schema = use('Schema')

class LivrosTableSchema extends Schema {

  up () {
    this.create('livros', (table) => {
      table.increments()
      table.string('title')
      table.string('author')
      table.text('content')
      table.timestamps()
    })
  }

  down () {
    this.drop('livros')
  }

}

module.exports = LivrosTableSchema
