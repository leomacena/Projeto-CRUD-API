    // classe importada de models, para usar a classe que contém um construtor
const Book = require('../models/Book')

	// Classe importada exclusivamente para fazer o acesso ao Banco de Dados. Para qualquer operação, ela será utilizada
const BookDAO = require('../DAO/BookDAO.js')


class bookController {
    static rotas(app){
        // Rota para os recursos book. O parâmetro das rotas aparece na primeira parte entre aspas simples e logo depois são chamados os métodos da classe
        app.get('/book', bookController.listar)
        app.post('/book', bookController.inserir)
        app.put('/book/nome/:nome', bookController.atualizaBook)
        app.delete('/book/nome/:nome', bookController.deletarBook)
    }



    // Abaixo todos os métodos dessa classe são estáticos, isso quer dizer que podemos usá-los, SEM a necessidade de instanciá-los usando a palavrinha NEW
    
    static async listar(req, res){
        // Chama a classe BookDAO com o método listar, q agora é resposável pelo acesso ao Banco de Dados. Todas as vezes, a partir dessa REFATORAÇÃO, que nosso sistema tiver que acessar o banco, quem vai fazer isso, será a classe BookDAO. 
        const books = await BookDAO.listar()

        // Devolve a lista de livros e o status code 200. Quer dizer que a requisição ocorreu com sucesso.
        res.status(200).send(books)
    }



    static async inserir(req, res){
        // Cria um novo livro recebendo as informações que vem do corpo da requisição através do req.body     
        const book = {
            nome: req.body.nome,
            autor: req.body.autor,
            editora: req.body.editora,
            idioma: req.body.idioma,
            paginas: req.body.paginas,
            ano: req.body.ano
    
        }

        // Classe BookDAO é chamada com o método inserir Adiciona o livro na lista de livros        
        const result = await BookDAO.inserir(book)

        // Padrão POST, o status code de recurso criado é o 201, ou seja, houve a criação de um recurso. Abaixo personalizamos a resposta que será mostrada, caso o cadastro se realize. Será mostrada as mensagens abaixo e também o objeto cadastrado
        res.status(201).send({"Menssagem": "Livro adicionado com sucesso!", "Novo Livro: ": result})
       
    }

      //Classe BookDAO é chamada com o método atualizaBook
    static async atualizaBook(req,res) {
        // instanciamos a nossa classe book que foi importada de models como um modelo
        const book = new Book(req.body.nome, req.body.autor, req.body.editora, req.body.idioma, req.body.paginas, req.body.ano)

        // Se o nome do livro não for encontrado, entra no if e dá um 404 (status code 404), que quer dizer que o conteúdo não foi encontrado
        if (!book) {
            res.status(404).send('Livro não encontrado')
        }

        //Classe BookDAO é chamada com o método atualizar, que será reponsável por acessar o banco e cadastrar o objeto livro já preenchido com as informações que vieram do corpo via req.body na requisição. Observe que estamos enviando o livro criado e preenchido como o req.body logo acima. Também passamos o nome que veio da URL do nosso endpoint, pois na clase BookDAO será verificado o livro certo que será feita a atualização. Lembre-se que quem faz o acesso ao banco agora é a classe DAO, por isso estamos passando para ela
          const result = await BookDAO.atualizar(req.params.nome, book)
        
          //caso ocorra algum erro na requisição, cai no if, que exibirá a mensagem de erro
          if(result.erro){
            res.status(500).send('erro ao atualizar o livro')
          }


        // Tudo correndo certo, uma mensagem será informada com o status de bem sucedido (200). Também personalizamos um pouco o response (resposta) para mostrar como ficaram as informações do usuário.
        res.status(200).send({"Mensagem": "Livro atualizado com Sucesso", "Nova atualização: ": book})
    }



    static async deletarBook(req, res){
        // Busca o nome na lista de livros através da classe BookDAO com o método deletar, passando por parâmetro o nome que virá da URL em nossa rota, ou seja, em nosso endpoint através do req.params.nome
        const book = await BookDAO.deletar(req.params.nome)
        // Se o usuario não for encontrado, devolve um erro staus code 404
        if(!book){
            res.status(404).send('Livro não encontrado')
        }

        // Status code 204 NÃO Devolve o livro deletado || O 200 é solicitação bem sucedida. Pode ser usada aqui, se for usada, a resposta abaixo pode ser mostrada
        res.status(204).send({"Mensagem: ": `O livro ${book.nome} foi deletado`} )
    }
}

//  Exporta o usuarioController para poder ser acessado a partir de outros arquivos
module.exports = bookController
