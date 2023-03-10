    // classe importada de models, para usar a classe que contém um construtor
    const Employees = require('../models/Employees.js')

	// Classe importada exclusivamente para fazer o acesso ao Banco de Dados. Para qualquer operação, ela será utilizada
    const EmployeesDAO = require('../DAO/EmployeesDAO.js')


class employeesController {
    static rotas(app){
        // Rota para os recursos Employees. O parâmetro das rotas aparece na primeira parte entre aspas simples e logo depois são chamados os métodos da classe
        app.get('/employees', employeesController.listar)
        app.post('/employees', employeesController.inserir)
        app.put('/employees/id/:id', employeesController.atualizaEmployees)
        app.delete('/employees/id/:id', employeesController.deletarEmployees)
    }



    // Abaixo todos os métodos dessa classe são estáticos, isso quer dizer que podemos usá-los, SEM a necessidade de instanciá-los usando a palavrinha NEW
    
    static async listar(req, res){
        // Chama a classe EmployeesDAO com o método listar, q agora é resposável pelo acesso ao Banco de Dados. Todas as vezes, a partir dessa REFATORAÇÃO, que nosso sistema tiver que acessar o banco, quem vai fazer isso, será a classe EmployeesDAO. 
        const Employees = await EmployeesDAO.listar()

        // Devolve a lista de funcionarios e o status code 200. Quer dizer que a requisição ocorreu com sucesso.
        res.status(200).send(Employees)
    }

    static async buscarPorId(req, res){
        // Classe EmployeesDAO é chamada com o método de Busca ao email na lista de usuarios e recebe o usuário completo como retorno
        const employees = await EmployeesDAO.buscarPorId(req.params.id)

        // Se o usuario não for encontrado, devolve um erro 404. Significa "Não encontrado"
        if(!employees){
            // O status code que informa se o conteúdo não foi encontrado
            res.status(404).send('Não encontrado')
        }

        // Se o usuario for encontrado, devolve o usuario na tela e envia o status code 200, que quer dizer Operação Bem Suceddida
        res.status(200).send(employees)
    }


    static async inserir(req, res){
        // Cria um novo funcionario recebendo as informações que vem do corpo da requisição através do req.body     
        const Employees = {
            nome: req.body.nome,
            matricula: req.body.matricula,
            cargo: req.body.cargo,
            email: req.body.email,
            telefone: req.body.telefone,
            data_de_nascimento: req.body.data_de_nascimento,
            cpf: req.body.cpf,
            senha: req.body.senha,
            id_stores: req.body.id_stores
    
        }

        // Classe EmployeesDAO é chamada com o método inserir Adiciona o funcionario na lista de funcionarios        
        const result = await EmployeesDAO.inserir(Employees)

        // Padrão POST, o status code de recurso criado é o 201, ou seja, houve a criação de um recurso. Abaixo personalizamos a resposta que será mostrada, caso o cadastro se realize. Será mostrada as mensagens abaixo e também o objeto cadastrado
        res.status(201).send({"Mensagem": "Funcionário adicionado com sucesso!", "Novo funcionário: ": Employees})
    }


      //Classe EmployeesDAO é chamada com o método atualizaEmployees
    static async atualizaEmployees(req,res) {
        // instanciamos a nossa classe Employees que foi importada de models como um modelo
        const employees = new Employees(req.body.nome, req.body.matricula, req.body.cargo, req.body.email, req.body.telefone, req.body.data_de_nascimento, req.body.cpf, req.body.senha, req.body.id_stores)

        // Se o nome do livro não for encontrado, entra no if e dá um 404 (status code 404), que quer dizer que o conteúdo não foi encontrado
        if (!employees) {
            res.status(404).send('Funcionário não encontrado')
        }

        //Classe EmployeesDAO é chamada com o método atualizar, que será reponsável por acessar o banco e cadastrar o objeto funcionário já preenchido com as informações que vieram do corpo via req.body na requisição. Observe que estamos enviando o funcionario criado e preenchido com o req.body logo acima. Também passamos o cpf que veio da URL do nosso endpoint, pois na clase EmployeesDAO será verificado o funcionario certo que será feita a atualização. Lembre-se que quem faz o acesso ao banco agora é a classe DAO, por isso estamos passando para ela
          const result = await EmployeesDAO.atualizar(req.params.id, employees)
        
          //caso ocorra algum erro na requisição, cai no if, que exibirá a mensagem de erro
          if(result.erro){
            res.status(500).send('erro ao atualizar o funcionário')
          }


        // Tudo correndo certo, uma mensagem será informada com o status de bem sucedido (200). Também personalizamos um pouco o response (resposta) para mostrar como ficaram as informações do usuário.
        res.status(201).send({"Mensagem": "Funcionário atualizado com Sucesso", "Nova atualização: ": employees})
    }



    static async deletarEmployees(req, res){
        const employees = await EmployeesDAO.buscarPorId(req.params.id)
        // Se o usuario não for encontrado, devolve um erro staus code 404
        if(!employees){
            res.status(404).send('Funcionário não encontrado')
            return
        }

        const result = await EmployeesDAO.deletar(req.params.id)

        if(result.erro){
            res.status(400).send({'Mensagem':'Usuário não deletado'})
            return
        }

        // Status code 204 NÃO Devolve o funcionario deletado || O 200 é solicitação bem sucedida. Pode ser usada aqui, se for usada, a resposta abaixo pode ser mostrada
        res.status(204).send({"Mensagem: ": `O funcionário ${Employees.nome}, com o ID ${Employees.id} foi deletado`} )
    }
}

//  Exporta o employees-controller para poder ser acessado a partir de outros arquivos
module.exports = employeesController
