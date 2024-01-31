import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [nombre, setNombre] = useState('');
	const [apellidos, setApellidos] = useState('');
	const [edad, setEdad] = useState();
	const [curso, setCurso] = useState('');
	const [id, setId] = useState();

	const [editar, setEditar] = useState('false');

	const [alumnosList, setAlumnos] = useState([]);

	const add = () => {
		Axios.post('http://localhost:3001/create', {
			nombre: nombre,
			apellidos: apellidos,
			edad: edad,
			curso: curso,
		}).then(() => {
			getAlumnos();
			limpiarCampos();
		});
	};

	const update = () => {
		Axios.put('http://localhost:3001/update', {
			id: id,
			nombre: nombre,
			apellidos: apellidos,
			edad: edad,
			curso: curso,
		}).then(() => {
			getAlumnos();
			limpiarCampos();
		});
	};

	const deleteAlumno = (id) => {
		Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
			getAlumnos();
			limpiarCampos();
		});
	};

	const limpiarCampos = () => {
		setNombre('');
		setApellidos('');
		setEdad('');
		setCurso('');
		setEditar(false);
	};

	const editarAlumno = (val) => {
		setEditar(true);
		setNombre(val.nombre);
		setApellidos(val.apellidos);
		setEdad(val.edad);
		setCurso(val.curso);
		setId(val.id);
	};

	const getAlumnos = () => {
		Axios.get('http://localhost:3001/alumnos').then((response) => {
			setAlumnos(response.data);
		});
	};

	// getAlumnos();

	return (
		<div className='container'>
			{/*<div className='App'>
        <div className='lista'>
           <button onClick={getAlumnos}>Mostrar alumnos</button>{' '}
          {/*si consigo que vaya el getAlumnos(); se puede quitar el boton 
          {alumnosList.map((val, key) => {
            return <div className=''> {val.nombre} </div>;
          })} 
        </div>
      </div>*/}

			<div className='card text-center'>
				<div className='card-header'>Gestion de Alumnos</div>
				<div className='card-body'>
					<div className='input-group mb-3'>
						<span className='input-group-text' id='basic-addon1'>
							Nombre:
						</span>
						<input
							type='text'
							onChange={(event) => {
								setNombre(event.target.value);
							}}
							className='form-control'
							value={nombre}
							placeholder='Nombre del alumno'
							aria-label='Username'
							aria-describedby='basic-addon1'
						/>
					</div>

					<div className='input-group mb-3'>
						<span className='input-group-text' id='basic-addon1'>
							Apellidos:
						</span>
						<input
							type='text'
							onChange={(event) => {
								setApellidos(event.target.value);
							}}
							className='form-control'
							value={apellidos}
							placeholder='Apellidos del alumno'
							aria-label='Username'
							aria-describedby='basic-addon1'
						/>
					</div>

					<div className='input-group mb-3'>
						<span className='input-group-text' id='basic-addon1'>
							Edad:
						</span>
						<input
							type='number'
							onChange={(event) => {
								setEdad(event.target.value);
							}}
							className='form-control'
							value={edad}
							placeholder='Edad del alumno'
							aria-label='Username'
							aria-describedby='basic-addon1'
						/>
					</div>

					<div className='input-group mb-3'>
						<span className='input-group-text' id='basic-addon1'>
							Curso:
						</span>
						<input
							type='text'
							onChange={(event) => {
								setCurso(event.target.value);
							}}
							className='form-control'
							value={curso}
							placeholder='Curso del alumno'
							aria-label='Username'
							aria-describedby='basic-addon1'
						/>
					</div>
				</div>
				<div className='card-footer text-body-secondary'>
					{editar ? (
						<div>
							<button className='btn btn-warning m-2' onClick={update}>
								Actualizar
							</button>
							<button className='btn btn-info' onClick={limpiarCampos}>
								Cancelar
							</button>
						</div>
					) : (
						<button className='btn btn-success' onClick={add}>
							Registrar
						</button>
					)}
				</div>
			</div>

			<table className='table table-striped'>
				<thead>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Nombre</th>
						<th scope='col'>Apellidos</th>
						<th scope='col'>Edad</th>
						<th scope='col'>Curso</th>
						<th scope='col'>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{alumnosList.map((val, key) => {
						return (
							<tr key={val.id}>
								<th>{val.id} </th>
								<td>{val.nombre} </td>
								<td>{val.apellidos} </td>
								<td>{val.edad} </td>
								<td>{val.curso} </td>
								<td>
									<button
										type='button'
										onClick={() => {
											editarAlumno(val);
										}}
										className='btn btn-warning m-2'>
										Editar
									</button>
									<button
										type='button'
										onClick={() => {
											deleteAlumno(val.id);
										}}
										className='btn btn-danger'>
										Eliminar
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default App;
