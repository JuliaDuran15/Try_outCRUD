const request = require('supertest');
const app = require('../app'); // Supondo que o seu arquivo principal seja 'app.js'



describe('Testando as rotas do aplicativo', () => {
  // Teste para a rota raiz
  it('Deve retornar status 200 para a rota raiz', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  // Teste para a rota de obtenção de todos os cursos
  it('Deve retornar status 200 e um array de cursos para a rota /cursos', async () => {
    const response = await request(app).get('/cursos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Teste para a rota de criação de um novo curso
  it('Deve retornar status 201 e o curso criado para a rota /cursos', async () => {
    const response = await request(app)
      .post('/cursos')
      .send({ nome: 'Novo Curso' });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('Nome', 'Novo Curso');
  });

  // Teste para a rota de atualização de um curso existente
  it('Deve retornar status 200 e o curso atualizado para a rota /cursos/:id', async () => {
    // Supondo que exista pelo menos um curso no banco de dados
    const cursos = await request(app).get('/cursos');
    const cursoId = cursos.body[0].CursoID;
    
    const response = await request(app)
      .put(`/cursos/${cursoId}`)
      .send({ nome: 'Curso Atualizado' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('Nome', 'Curso Atualizado');
  });

  // Teste para a rota de exclusão de um curso
  it('Deve retornar status 200 para a rota de exclusão de um curso', async () => {
    // Supondo que exista pelo menos um curso no banco de dados
    const cursos = await request(app).get('/cursos');
    const cursoId = cursos.body[0].CursoID;
    
    const response = await request(app).delete(`/cursos/${cursoId}`);
    expect(response.statusCode).toBe(200);
  });

  // Testes semelhantes podem ser escritos para as outras rotas
});