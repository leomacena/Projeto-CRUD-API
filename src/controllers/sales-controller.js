    // classe importada de models, para usar a classe que contém um construtor
    const Sales = require('../models/Sales.js')

	// Classe importada exclusivamente para fazer o acesso ao Banco de Dados. Para qualquer operação, ela será utilizada
    const SalesDAO = require('../DAO/SalesDAO.js')


class salesController {
    static rotas(app){
        // Rota para os recursos Sales. O parâmetro das rotas aparece na primeira parte entre aspas simples e logo depois são chamados os métodos da classe
        app.get('/sales', salesController.listar)
        app.post('/sales', salesController.inserir)
        app.put('/sales/id/:id', salesController.atualizaSales)
        app.delete('/sales/id/:id', salesController.deletarSales)
    }



    // Abaixo todos os métodos dessa classe são estáticos, isso quer dizer que podemos usá-los, SEM a necessidade de instanciá-los usando a palavrinha NEW
    
    static async listar(req, res){
        // Chama a classe SalesDAO com o método listar, q agora é resposável pelo acesso ao Banco de Dados. Todas as vezes, a partir dessa REFATORAÇÃO, que nosso sistema tiver que acessar o banco, quem vai fazer isso, será a classe SalesDAO. 
        const Sales = await SalesDAO.listar()

        // Devolve a lista de vendas e o status code 200. Quer dizer que a requisição ocorreu com sucesso.
        res.status(200).send(Sales)
    }



    static async inserir(req, res){
        // Cria uma nova venda recebendo as informações que vem do corpo da requisição através do req.body     
        const Sales = {
            id_customers: req.body.id_customers,
            id_books: req.body.id_books,
            quantidade_adquirida: req.body.quantidade_adquirida,
            id_stores: req.body.id_stores,
            data_compra: req.body.data_compra,
            horario_compra: req.body.horario_compra
        }

        // Classe SalesDAO é chamada com o método inserir Adiciona a venda na lista        
        const result = await SalesDAO.inserir(Sales)

        // Padrão POST, o status code de recurso criado é o 201, ou seja, houve a criação de um recurso. Abaixo personalizamos a resposta que será mostrada, caso o cadastro se realize. Será mostrada as mensagens abaixo e também o objeto cadastrado
        res.status(201).send({"Mensagem": "Venda adicionada com sucesso!", "Nova venda: ": result})
    }


      //Classe SalesDAO é chamada com o método atualizaSales
    static async atualizaSales(req,res) {
        // instanciamos a nossa classe Sales que foi importada de models como um modelo
        const sales = new Sales(req.body.id_customers, req.body.id_books, req.body.quantidade_adquirida, req.body.id_stores, req.body.data_compra, req.body.horario_compra)

        // Se o nome da venda não for encontrado, entra no if e dá um 404 (status code 404), que quer dizer que o conteúdo não foi encontrado
        if (!sales) {
            res.status(404).send('Venda não localizada')
        }

        //Classe SalesDAO é chamada com o método atualizar, que será reponsável por acessar o banco e cadastrar o objeto venda já preenchido com as informações que vieram do corpo via req.body na requisição. Observe que estamos enviando a venda criada e preenchida com o req.body logo acima. Também passamos o cpf que veio da URL do nosso endpoint, pois na clase SalesDAO será verificado a venda certo que será feita a atualização. Lembre-se que quem faz o acesso ao banco agora é a classe DAO, por isso estamos passando para ela
          const result = await SalesDAO.atualizar(req.params.id, sales)
        
          //caso ocorra algum erro na requisição, cai no if, que exibirá a mensagem de erro
          if(result.erro){salesController
            res.status(500).send('erro ao atualizar a venda')
          }


        // Tudo correndo certo, uma mensagem será informada com o status de bem sucedido (200). Também personalizamos um pouco o response (resposta) para mostrar como ficaram as informações do usuário.
        res.status(200).send({"Mensagem": "Venda atualizado com Sucesso", "Nova atualização: ": sales})
    }



    static async deletarSales(req, res){
        // Busca o id na lista de vendas através da classe SalesDAO com o método deletar, passando por parâmetro cpf que virá da URL em nossa rota, ou seja, em nosso endpoint através do req.params.cpf
        const sales = await SalesDAO.deletar(req.params.id)
        // Se o usuario não for encontrado, devolve um erro staus code 404
        if(!sales){
            res.status(404).send('Venda não localizada')
        }

        // Status code 204 NÃO Devolve a venda deletada || O 200 é solicitação bem sucedida. Pode ser usada aqui, se for usada, a resposta abaixo pode ser mostrada
        res.status(204).send({"Mensagem: ": `A venda ${sales.id}, foi deletada`} )
    }
}

//  Exporta o sales-controller para poder ser acessado a partir de outros arquivos
module.exports = salesController