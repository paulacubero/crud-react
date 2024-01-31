const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'curso1234',
	database: 'alumnos_crud',
});

app.post('/create', (req, res) => {
	const nombre = req.body.nombre;
	const apellidos = req.body.apellidos;
	const edad = req.body.edad;
	const curso = req.body.curso;

	db.query(
		'INSERT INTO alumno (nombre, apellidos, edad, curso) VALUES (?,?,?,?)',
		[nombre, apellidos, edad, curso],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.get('/alumnos', (req, res) => {
	db.query('SELECT * FROM alumno', (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.put('/update', (req, res) => {
	const id = req.body.id;
	const nombre = req.body.nombre;
	const apellidos = req.body.apellidos;
	const edad = req.body.edad;
	const curso = req.body.curso;

	db.query(
		'UPDATE alumno SET nombre=?, apellidos=?, edad=?, curso=? WHERE id=?',
		[nombre, apellidos, edad, curso, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.delete('/delete/:id', (req, res) => {
	const id = req.params['id'];

	db.query('DELETE FROM alumno WHERE id=?', id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.listen(3001, () => {
	console.log('server running on port 3001');
});
