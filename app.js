const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static files from the 'public' directory

// Configuração do pool de conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'School',
  password: 'WorkWork@2543',
  port: 5432,
});

// Middleware para o parsing do corpo da requisição
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Rota raiz
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Envie o arquivo HTML para a rota raiz
  });
  

// Rota para obter todos os cursos
app.get('/cursos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Curso');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error getting courses');
  }
});

// Rota para criar um novo curso
app.post('/cursos', async (req, res) => {
  const { nome } = req.body;
  try {
    const result = await pool.query('INSERT INTO Curso (Nome) VALUES ($1) RETURNING *', [nome]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error creating course');
  }
});


// Rota para atualizar um curso existente
app.put('/cursos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const result = await pool.query('UPDATE Curso SET Nome = $1 WHERE CursoID = $2 RETURNING *', [nome, id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Course not found');
    }
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error updating course');
  }
});

// Rota para excluir um curso
app.delete('/cursos/:id', async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).send('Invalid course ID');
  }
  try {
    await pool.query('DELETE FROM Curso WHERE CursoID = $1', [id]);
    res.send('Course deleted successfully');
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error deleting course');
  }
});

// Rota para obter todos os alunos
app.get('/alunos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Aluno');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error getting students');
  }
});

// Rota para criar um novo aluno
app.post('/alunos', async (req, res) => {
  const { nome, ra, cursoId } = req.body;
  try {
    const result = await pool.query('INSERT INTO Aluno (Nome, Ra, CursoID) VALUES ($1, $2, $3) RETURNING *', [nome, ra, cursoId]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error creating student');
  }
});

// Rota para atualizar um aluno existente
app.put('/alunos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, ra, cursoId } = req.body;
  try {
    const result = await pool.query('UPDATE Aluno SET Nome = $1, Ra = $2, CursoID = $3 WHERE AlunoID = $4 RETURNING *', [nome, ra, cursoId, id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error updating student');
  }
});

// Rota para excluir um aluno
app.delete('/alunos/:id', async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).send('Invalid student ID');
  }
  try {
    await pool.query('DELETE FROM Aluno WHERE AlunoID = $1', [id]);
    res.send('Student deleted successfully');
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error deleting student');
  }
});




// Rota para obter todos os professores
app.get('/professores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Professor');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error getting professors');
  }
});

// Rota para criar um novo professor
app.post('/professores', async (req, res) => {
  const { nome, rp } = req.body;
  try {
    const result = await pool.query('INSERT INTO Professor (Nome, Rp) VALUES ($1, $2) RETURNING *', [nome, rp]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error creating professor');
  }
});

// Rota para atualizar um professor existente
app.put('/professores/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, rp } = req.body;
  try {
    const result = await pool.query('UPDATE Professor SET Nome = $1, Rp = $2 WHERE ProfessorID = $3 RETURNING *', [nome, rp, id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Professor not found');
    }
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error updating professor');
  }
});

// Rota para excluir um professor
app.delete('/professores/:id', async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).send('Invalid professor ID');
  }
  try {
    await pool.query('DELETE FROM Professor WHERE ProfessorID = $1', [id]);
    res.send('Professor deleted successfully');
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error deleting professor');
  }
});

// Rota para obter todas as matérias

app.get('/materias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Materia');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao executar consulta', err);
    res.status(500).send('Erro ao obter matérias');
  }
});
// Rota para criar uma nova matéria
app.post('/materias', async (req, res) => {
  const { nome, cursoId, professorId } = req.body;
  try {
    const result = await pool.query('INSERT INTO Materia (Nome, CursoID, ProfessorID) VALUES ($1, $2, $3) RETURNING *', [nome, cursoId, professorId]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error creating subject');
  }
});

// Rota para atualizar uma matéria existente
app.put('/materias/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, cursoId, professorId } = req.body;
  try {
    const result = await pool.query('UPDATE Materia SET Nome = $1, CursoID = $2, ProfessorID = $3 WHERE MateriaID = $4 RETURNING *', [nome, cursoId, professorId, id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Subject not found');
    }
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error updating subject');
  }
});

// Rota para excluir uma matéria
app.delete('/materias/:id', async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).send('Invalid subject ID');
  }
  try {
    await pool.query('DELETE FROM Materia WHERE MateriaID = $1', [id]);
    res.send('Subject deleted successfully');
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error deleting subject');
  }
});


// Inicia o servidor
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
module.exports = { app, server }; // Exporting app and server for testing