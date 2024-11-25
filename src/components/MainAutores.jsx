import React from 'react'
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import '../css/Main.css'

const MainAutores = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [id_autor, setIdAutor] = useState(0);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    mostrarAutores();
  }, []);

  useEffect(() => {
    console.log(datos);
  }, [datos]);

  const mostrarAutores = () => {
    axios
      .get("http://localhost:3000/autores")
      .then((response) => {
        setDatos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postAutor = async () => {
    try {
      const response = await axios.post("http://localhost:3000/autores", {
        id_autor,
        nombre,
        apellido,
        nacionalidad,
      });
      if (response.status === 200) {
        alert("Se agregó el autor correctamente");
        mostrarAutores();
        cancelar();
      } else {
        alert("Hubo un error");
      }
    } catch (error) {
      console.error("Error al realizar la consulta con el servidor", error);
    }
  };

  const putAutor = async () => {
    try {
      const response = await axios.put("http://localhost:3000/autores", {
        id_autor,
        nombre,
        apellido,
        nacionalidad,
      });
      if (response.status === 200) {
        alert("Se modificó correctamente el autor");
        mostrarAutores();
        cancelar();
      } else {
        alert("Hubo un error");
      }
    } catch (error) {
      console.error("Error al realizar la consulta con el servidor", error);
    }
  };

  const bajaAutor = async (dato) => {
    try {
      const response = await axios.delete(`http://localhost:3000/autores/${dato.id_autor}`);

      if (response.status === 200) {
        alert("El autor se dio de baja correctamente");
        mostrarAutores();
      } else {
        alert("Ocurrió un error al dar de baja al autor");
      }
    } catch (error) {
      console.error("Error al eliminar al autor", error);
    }
  };

  const cancelar = () => {
    setIdAutor(0);
    setNombre("");
    setApellido("");
    setNacionalidad("");
  };

  const editarAutor = (dato) => {
    setIdAutor(dato.id_autor);
    setNombre(dato.nombre);
    setApellido(dato.apellido);
    setNacionalidad(dato.nacionalidad);
  };

  return (
    <>
      <div className="contenedorBody">
        <div className="contenedor-agregar">
          <label htmlFor="">ID Autor</label>
          <input
            value={id_autor}
            type="number"
            onChange={(e) => setIdAutor(e.target.value)}
          />

          <label htmlFor="">Nombre:</label>
          <input
            value={nombre}
            type="text"
            onChange={(e) => setNombre(e.target.value)}
          />

          <br />

          <label htmlFor="">Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <br />
          <label htmlFor="">Nacionalidad:</label>
          <input
            type="text"
            value={nacionalidad}
            onChange={(e) => setNacionalidad(e.target.value)}
          />
          <br />

          <button onClick={postAutor} className="agregar-libro-btn">
            Agregar Autor
          </button>
          <button onClick={putAutor}>Editar</button>
          <button onClick={() => cancelar()} className="agregar-libro-btn">
            Cancelar
          </button>
        </div>

        <div className="lista">
          <h1>Lista de Autores</h1>
          <div className="card-container">
            {datos.length > 0 ? (
              datos.map((dato) => (
                <Card key={dato.id_autor} style={{ width: "18rem" }} className="cards">
                  <Card.Body>
                    <Card.Title className="card-title">{dato.nombre} {dato.apellido}</Card.Title>
                    <Card.Text className="card-text">{dato.nacionalidad}</Card.Text>
                    <Button
                      className="btn-libro"
                      onClick={() => editarAutor(dato)}
                      variant="primary"
                    >
                      Editar
                    </Button>
                    <Button
                      className="btn-libro"
                      onClick={() => bajaAutor(dato)}
                    >
                      Dar de baja autor
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No se encontraron datos</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainAutores;

