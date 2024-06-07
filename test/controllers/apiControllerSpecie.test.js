jest.mock('../../models/specieModel.js');
const SpecieModel = require('../../models/specieModel.js');
const controllerSpecie = require('../../controllers/apiControllerSpecie.js');
const httpMocks = require('node-mocks-http'); // biblioteca para mock de objetos req e res

describe('Teste nas rotas de espécie', () => {
  
  it('Busca com sucesso por espécie através do ID', async () => {
    
    const especie = {
      _id: 1,
      type: 'cachorro'
    }

    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/specie/1'
    });

    SpecieModel.find.mockResolvedValue(especie);
    
    const res = httpMocks.createResponse();
  
    await controllerSpecie.getSpecie(req, res);
  
    expect(res.statusCode).toBe(200);
    expect(res._getData()).toEqual(especie);
  });

  it('Busca com sucesso pela lista de todas as espécies', async () => {
    
    const especies = [
      {
        _id: 1,
        type: 'cachorro'
      },
      {
        _id: 2,
        type: 'gato'
      }
    ]

    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/specie'
    });

    SpecieModel.find.mockResolvedValue(especies);
    
    const res = httpMocks.createResponse();
  
    await controllerSpecie.getAllSpecies(req, res);
  
    expect(res.statusCode).toBe(200);
    expect(res._getData()).toEqual(especies);
  });

  it('Criação com sucesso de uma nova espécie', async () => {
    
    const novaEspecie = {
      _id: 3,
      type: 'peixe'
    }

    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/specie',
      body: novaEspecie
    });

    SpecieModel.create.mockResolvedValue(novaEspecie);
    
    const res = httpMocks.createResponse();
  
    await controllerSpecie.createSpecie(req, res);
  
    expect(res.statusCode).toBe(200);
    expect(res._getData()).toEqual(novaEspecie);
  });

  it('Atualização com sucesso de uma espécie existente', async () => {
    
    const especieExistenteAtualizada = {
      _id: 3,
      type: 'anfibio'
    }

    const req = httpMocks.createRequest({
      method: 'PUT',
      url: '/specie/3',
      body: especieExistenteAtualizada
    });

    SpecieModel.findByIdAndUpdate.mockResolvedValue(especieExistenteAtualizada);
    SpecieModel.findOne.mockResolvedValue(especieExistenteAtualizada);

    const res = httpMocks.createResponse();
  
    await controllerSpecie.updateSpecie(req, res);
  
    expect(res.statusCode).toBe(200);
    // expect(res._getData()).toEqual(especieExistenteAtualizada);
  });

  it('Remoção com sucesso de uma espécie existente', async () => {
    
    const especieExistente = {
      _id: 3,
      type: 'anfibio'
    }

    const req = httpMocks.createRequest({
      method: 'DELETE',
      url: '/specie/3'
    });

    SpecieModel.findByIdAndDelete.mockResolvedValue(especieExistente);

    const res = httpMocks.createResponse();
  
    await controllerSpecie.deleteSpecie(req, res);
  
    expect(res.statusCode).toBe(200);
    expect(res._getData()).toEqual(especieExistente);
  });

  it('Remoção sem sucesso de uma espécie', async () => {
    
    const especieExistente = {
      _id: 3,
      type: 'anfibio'
    }

    const req = httpMocks.createRequest({
      method: 'DELETE',
      url: '/specie/4'
    });

    SpecieModel.findByIdAndDelete.mockResolvedValue();

    const res = httpMocks.createResponse();
  
    await controllerSpecie.deleteSpecie(req, res);
  
    expect(res.statusCode).toBe(404);
    expect(res._getData()).toEqual("{\"error\":\"Specie not found\"}");
  });
});