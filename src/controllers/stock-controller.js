    // classe importada de models, para usar a classe que contém um construtor
    const Stock = require('../models/Stock')

	// Classe importada exclusivamente para fazer o acesso ao Banco de Dados. Para qualquer operação, ela será utilizada
const StockDAO = require('../DAO/StockDAO')


class stockController {
    static rotas(app){
        // Rota para os recursos book. O parâmetro das rotas aparece na primeira parte entre aspas simples e logo depois são chamados os métodos da classe
        app.get('/stock', stockController.listar)
        app.post('/stock', stockController.inserir)
        app.put('/stock/id/:id', stockController.atualizaStock)
        app.delete('/stock/id/:id', stockController.deletarStock)
    }



    // Abaixo todos os métodos dessa classe são estáticos, isso quer dizer que podemos usá-los, SEM a necessidade de instanciá-los usando a palavrinha NEW
    
    static async listar(req, res){
        // Chama a classe stockDAO com o método listar, q agora é resposável pelo acesso ao Banco de Dados. Todas as vezes, a partir dessa REFATORAÇÃO, que nosso sistema tiver que acessar o banco, quem vai fazer isso, será a classe StockDAO. 
        const stocks = await StockDAO.listar()

        // Devolve a lista de livros em estoque e o status code 200. Quer dizer que a requisição ocorreu com sucesso.
        res.status(200).send(stocks)
    }



    static async inserir(req, res){
        // Cria um novo item no estoque recebendo as informações que vem do corpo da requisição através do req.body     
        const stock = {
            id_books: req.body.id_books,
            id_stores: req.body.id_stores,
            quantidade: req.body.quantidade
        
        }

        // Classe StockDAO é chamada com o método inserir Adiciona um item na lista de estoque        
        const result = await StockDAO.inserir(stock)

        // Padrão POST, o status code de recurso criado é o 201, ou seja, houve a criação de um recurso. Abaixo personalizamos a resposta que será mostrada, caso o cadastro se realize. Será mostrada as mensagens abaixo e também o objeto cadastrado
        res.status(201).send({"Mensagem": "Item adicionado ao estoque com sucesso!", "Novo item: ": result})
       
    }

      //Classe BookDAO é chamada com o método atualizaBook
    static async atualizaStock(req,res) {
        // instanciamos a nossa classe book que foi importada de models como um modelo
        const stock = new Stock(req.body.id_books, req.body.id_stores, req.body.quantidade)

        // Se o id do item não for encontrado, entra no if e dá um 404 (status code 404), que quer dizer que o conteúdo não foi encontrado
        if (!stock) {
            res.status(404).send('item não encontrado')
        }

        //Classe StockDAO é chamada com o método atualizar, que será reponsável por acessar o banco e cadastrar o objeto item já preenchido com as informações que vieram do corpo via req.body na requisição. Observe que estamos enviando o livro criado e preenchido como o req.body logo acima. Também passamos o nome que veio da URL do nosso endpoint, pois na clase StockDAO será verificado o item certo que será feita a atualização. Lembre-se que quem faz o acesso ao banco agora é a classe DAO, por isso estamos passando para ela
          const result = await StockDAO.atualizar(req.params.id, stock)
        
          //caso ocorra algum erro na requisição, cai no if, que exibirá a mensagem de erro
          if(result.erro){
            res.status(500).send('erro ao atualizar o item')
          }


        // Tudo correndo certo, uma mensagem será informada com o status de bem sucedido (200). Também personalizamos um pouco o response (resposta) para mostrar como ficaram as informações do usuário.
        res.status(201).send({"Mensagem": "Item atualizado com Sucesso", "Nova atualização: ": stock})
    }



    static async deletarStock(req, res){
        // Busca o id na lista de itens através da classe StockDAO com o método deletar, passando por parâmetro o nome que virá da URL em nossa rota, ou seja, em nosso endpoint através do req.params.id
        const stock = await StockDAO.deletar(req.params.id)
        // Se o item não for encontrado, devolve um erro staus code 404
        if(!stock){
            res.status(404).send('Item não encontrado')
        }

        // Status code 204 NÃO Devolve o item deletado || O 200 é solicitação bem sucedida. Pode ser usada aqui, se for usada, a resposta abaixo pode ser mostrada
        res.status(204).send({"Mensagem: ": `O item ${stock.id} foi deletado`} )
    }
}

//  Exporta o stockController para poder ser acessado a partir de outros arquivos
module.exports = stockController
