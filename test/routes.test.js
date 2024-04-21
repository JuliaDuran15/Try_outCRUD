const request = require('supertest');
const { app, server } = require('../app'); // Importa o aplicativo e o servidor

// Teste para a rota de exclusão de matéria
describe('DELETE /materias/:id', () => {
  it('should delete a subject', async () => {
    const response = await request(app).delete('/materias/1'); // Substitua 1 pelo ID válido de uma matéria
    expect(response.status).toBe(200);
    expect(response.text).toBe('Subject deleted successfully');
  });
});

// Teste para a rota de exclusão de professor
describe('DELETE /professores/:id', () => {
  it('should delete a professor', async () => {
    const response = await request(app).delete('/professores/1'); // Substitua 1 pelo ID válido de um professor
    expect(response.status).toBe(200);
    expect(response.text).toBe('Professor deleted successfully');
  });
});

// Teste para a rota de atualização de curso
describe('PUT /cursos/:id', () => {
  it('should update a course', async () => {
    const response = await request(app)
      .put('/cursos/1') // Substitua 1 pelo ID válido de um curso
      .send({ nome: 'Novo Nome do Curso' }); // Novo nome para o curso
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('Novo Nome do Curso');
  });
});

// Teste para a rota de obtenção de estudantes
describe('GET /alunos', () => {
  it('should get all students', async () => {
    const response = await request(app).get('/alunos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // Verifique outras expectativas conforme necessário
  });
});

// Após todos os testes, fecha o servidor
afterAll(async () => {
  await server.close();
});
