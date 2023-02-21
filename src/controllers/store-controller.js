const Store = require('../models/Store');
const StoreDAO = require('../DAO/StoreDAO');

class storeController {
  static rotas(app) {
    app.get('/store', storeController.listar);
    app.post('/store', storeController.inserir);
    app.put('/store/id/:id', storeController.atualizarStore);
    app.delete('/store/id/:id', storeController.deletarStore);
  }

  static async listar(req, res) {
    const stores = await StoreDAO.listar();
    res.status(200).send(stores);
  }

  static async buscarPorId(req, res){
    const store = await StoreDAO.buscarPorId(req.params.id)

    if(!store){
        res.status(404).send('Não encontrado')
    }

    res.status(200).send(store)
  }

  static async inserir(req, res) {
    const Store = {
      unidade: req.body.unidade,
      endereco: req.body.endereco,
      telefone: req.body.telefone,
      email: req.body.email,
      horario_abertura: req.body.horario_abertura,
      horario_fechamento: req.body.horario_fechamento
    }

    const result = await StoreDAO.inserir(Store);

    res.status(201).send({
      mensagem: 'Loja adicionada com sucesso!',
      novaLoja: result,
    });
  }

  static async atualizarStore(req,res) { 
    const store = new Store(req.body.unidade, req.body.endereco, req.body.telefone,  req.body.email, req.body.horario_abertura, req.body.horario_fechamento)

    if (!store) {
        res.status(404).send('Loja não encontrada')
    }

      const result = await StoreDAO.atualizar(req.params.id, store)
    
     if(result.erro){
        res.status(500).send('erro ao atualizar a loja')
      }

    res.status(201).send({"Mensagem": "Loja atualizado com Sucesso", "Nova atualização: ": store})
}


  static async deletarStore(req, res) {

    const store = await StoreDAO.buscarPorId(req.params.id)
        if(!store){
            res.status(404).send('Loja não encontrada')
            return
        }

        const result = await StoreDAO.deletar(req.params.id)

        if(result.erro){
            res.status(400).send({'Mensagem':'Loja não deletada'})
            return
        }

        // Status code 204 NÃO Devolve o funcionario deletado || O 200 é solicitação bem sucedida. Pode ser usada aqui, se for usada, a resposta abaixo pode ser mostrada
        res.status(204).send({"Mensagem: ": `A Loja ${Store.unidade}, com o ID ${Store.id} foi deletada`} )
  }


}

module.exports = storeController;
