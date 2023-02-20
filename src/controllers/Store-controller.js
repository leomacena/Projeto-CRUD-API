const Store = require('../models/Store');
const StoreDAO = require('../DAO/StoreDAO');

class storeController {
  static rotas(app) {
    app.get('/store', storeController.listar);
    app.post('/store', storeController.inserir);
    app.put('/store/:id', storeController.atualizar);
    app.delete('/store/:id', storeController.deletar);
  }

  static async listar(req, res) {
    const stores = await StoreDAO.listar();
    res.status(200).send(stores);
  }

  static async inserir(req, res) {
    const store = new Store(
      req.body.id,
      req.body.unidade,
      req.body.endereco,
      req.body.telefone,
      req.body.email,
      req.body.horario_abertura,
      req.body.horario_fechamento
    );

    const result = await StoreDAO.inserir(store);
    res.status(201).send({
      mensagem: 'Loja adicionada com sucesso!',
      novaLoja: result,
    });
  }

  static async atualizar(req, res) {
    const store = new Store(
      req.body.id,
      req.body.unidade,
      req.body.endereco,
      req.body.telefone,
      req.body.email,
      req.body.horario_abertura,
      req.body.horario_fechamento
    );

    const result = await StoreDAO.atualizar(req.params.id, store);

    if (result.erro) {
      res.status(500).send('Erro ao atualizar a loja');
    }

    res.status(200).send({
      mensagem: 'Loja atualizada com sucesso',
      novaAtualizacao: store,
    });
  }

  static async deletar(req, res) {
    const store = await StoreDAO.deletar(req.params.id);

    if (!store) {
      res.status(404).send('Loja não encontrada');
    }

    res.status(204).send();
  }
}

module.exports = storeController;
