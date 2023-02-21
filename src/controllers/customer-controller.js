    // classe importada de models, para usar a classe que contém um construtor
    const Customer = require('../models/Customer')

	// Classe importada exclusivamente para fazer o acesso ao Banco de Dados. Para qualquer operação, ela será utilizada
const CustomerDAO = require('../DAO/CustomerDAO')


class customerController {
    static rotas(app){
        // Rota para os recursos customer. O parâmetro das rotas aparece na primeira parte entre aspas simples e logo depois são chamados os métodos da classe
        app.get('/customer', customerController.listar)
        app.post('/customer', customerController.inserir)
        app.put('/customer/cpf/:cpf', customerController.atualizaCustomer)
        app.delete('/customer/cpf/:cpf', customerController.deletarCustomer)
    }



    // Abaixo todos os métodos dessa classe são estáticos, isso quer dizer que podemos usá-los, SEM a necessidade de instanciá-los usando a palavrinha NEW
    
    static async listar(req, res){
        // Chama a classe CustomerDAO com o método listar, q agora é resposável pelo acesso ao Banco de Dados. Todas as vezes, a partir dessa REFATORAÇÃO, que nosso sistema tiver que acessar o banco, quem vai fazer isso, será a classe CustomerDAO. 
        const customers = await CustomerDAO.listar()

        // Devolve a lista de clientes e o status code 200. Quer dizer que a requisição ocorreu com sucesso.
        res.status(200).send(customers)
    }



    static async inserir(req, res){
        // Cria um novo cliente recebendo as informações que vem do corpo da requisição através do req.body     
        const customer = {
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            data_de_nascimento: req.body.data_de_nascimento,
            cpf: req.body.cpf,
            senha: req.body.senha
    
        }

        // Classe CustomerDAO é chamada com o método inserir Adiciona o livro na lista de livros        
        const result = await CustomerDAO.inserir(customer)

        // Padrão POST, o status code de recurso criado é o 201, ou seja, houve a criação de um recurso. Abaixo personalizamos a resposta que será mostrada, caso o cadastro se realize. Será mostrada as mensagens abaixo e também o objeto cadastrado
        res.status(201).send({"Mensagem": "Cliente adicionado com sucesso!", "Novo Cliente: ": customer})
       
    }

      //Classe CustomerDAO é chamada com o método atualizaCustomer
    static async atualizaCustomer(req,res) {
        // instanciamos a nossa classe customer que foi importada de models como um modelo
        const customer = new Customer(req.body.nome, req.body.email, req.body.telefone, req.body.data_de_nascimento, req.body.cpf, req.body.senha)

        // Se o nome do cliente não for encontrado, entra no if e dá um 404 (status code 404), que quer dizer que o conteúdo não foi encontrado
        if (!customer) {
            res.status(404).send('Cliente não encontrado')
        }

        //Classe CustomerDAO é chamada com o método atualizar, que será reponsável por acessar o banco e cadastrar o objeto cliente já preenchido com as informações que vieram do corpo via req.body na requisição. Observe que estamos enviando o cliente criado e preenchido como o req.body logo acima. Também passamos o nome que veio da URL do nosso endpoint, pois na clase CustomerDAO será verificado o livro certo que será feita a atualização. Lembre-se que quem faz o acesso ao banco agora é a classe DAO, por isso estamos passando para ela
          const result = await CustomerDAO.atualizar(req.params.cpf, customer)
        
          //caso ocorra algum erro na requisição, cai no if, que exibirá a mensagem de erro
          if(result.erro){
            res.status(500).send('erro ao atualizar o cliente')
          }


        // Tudo correndo certo, uma mensagem será informada com o status de bem sucedido (200). Também personalizamos um pouco o response (resposta) para mostrar como ficaram as informações do usuário.
        res.status(200).send({"Mensagem": "Cliente atualizado com Sucesso", "Nova atualização: ": customer})
    }



    static async deletarCustomer(req, res){
        // Busca o nome na lista de clientes através da classe CustomerDAO com o método deletar, passando por parâmetro o cpf que virá da URL em nossa rota, ou seja, em nosso endpoint através do req.params.cpf
        const customer = await CustomerDAO.deletar(req.params.cpf)
        // Se o cliente não for encontrado, devolve um erro staus code 404
        if(!customer){
            res.status(404).send('cliente não encontrado')
        }

        // Status code 204 NÃO Devolve o cliente deletado || O 200 é solicitação bem sucedida. Pode ser usada aqui, se for usada, a resposta abaixo pode ser mostrada
        res.status(204).send({"Mensagem: ": `O cliente ${Customer.nome} foi deletado`} )
    }
}

//  Exporta o usuarioController para poder ser acessado a partir de outros arquivos
module.exports = customerController
