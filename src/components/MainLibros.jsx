import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import '../css/Main.css'

const MainLibros = () => {
  const [titulo, setTitulo] = useState("");
  const [id_autor, setID_autor] = useState(0);
  const [id_editorial, setIdEditorial] = useState(0);
  const [anio_publicacion, setAño] = useState("");
  const [id_libro, setId] = useState(0);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    mostrarLibro();
  }, []);

  useEffect(() => {
    console.log(datos);
  }, [datos]);

  const mostrarLibro = () => {
    axios
      .get("http://localhost:3000/libros")
      .then((response) => {
        setDatos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postLibro = async () => {
    try {
      const response = await axios.post("http://localhost:3000/libros", {
        id_libro,
        titulo,
        id_autor,
        id_editorial,
        anio_publicacion,
      });
      if (response.status === 200) {
        alert("Se agregó el libro correctamente");
        mostrarLibro();
        cancelar();
      } else {
        alert("hubo un error");
      }
    } catch (error) {
      console.error("error al realizar la consulta con el servidor", error);
    }
  };
  const putLibro = async () => {
    try {
      const response = await axios.put("http://localhost:3000/libros", {
        id_libro,
        titulo,
        id_autor,
        id_editorial,
        anio_publicacion,
      })
      if (response.status === 200) {
        alert("se modificó correctamente el libro")
        mostrarLibro()
        cancelar()
      } else {
        alert("hubo un error")
      }
    } catch (error) {
      console.error("error al realizar la consulta con el servidor", error)
    }
  }
  const bajaLibro = async (dato) => {
    try {
      const response = await axios.delete(`http://localhost:3000/libros/${dato.id_libro}`);

      if (response.status === 200) {
        alert("El libro se eliminó correctamente");
        mostrarLibro();
      } else {
        alert("Ocurrió un error al eliminar al libro");
      }
    } catch (error) {
      console.error("Error al eliminar el libro", error);
    }
  };
  const cancelar = () => {
    setId(0);
   setTitulo("");
    setID_autor(0);
    setIdEditorial(0);
    setAño(0);
  };
  const editarLibro = (dato) => {
    setId(dato.id_libro)
    setTitulo(dato.titulo);
    setID_autor(dato.id_autor);
    setIdEditorial(dato.id_editorial);
    setAño(dato.anio_publicacion);
  }

  return (
    <>
    <div className="contenedorBody">
    <div className="contenedor-agregar">
        <label htmlFor="">ID Libro</label>
        <input
          value={id_libro}
          type="number"
          onChange={(e) => setId(e.target.value)}
        />

        <label htmlFor="">Nombre:</label>
        <input
          value={titulo}
          type="text"
          onChange={(e) => setTitulo(e.target.value)}
        />

        <br />

        <label htmlFor="">id autor:</label>
        <input
          type="text"
          value={id_autor}
          onChange={(e) => setID_autor(e.target.value)}
        />
        <br />
        <label htmlFor="">Id editorial:<input
          type="text"
          value={id_editorial}
          onChange={(e) => setIdEditorial(e.target.value)}
        /></label>
        <label htmlFor="">Año:</label>
        <input
          type="text"
          value={anio_publicacion}
          onChange={(e) => setAño(e.target.value)}
        />
        <br />

        <button onClick={postLibro} className="agregar-libro-btn">
          Agregar libro
        </button>
        <button onClick={putLibro}>Editar</button>
        <button onClick={() => cancelar()} className="agregar-libro-btn">
          Cancelar
        </button>
      </div>

      <div className="lista">
        <h1>Lista de Libros</h1>
        <div className="card-container">
          {datos.length > 0 ? (
            datos.map((dato) => (
              <Card key={dato.id_libro} style={{ width: "18rem" }} className="cards">
                <Card.Body>
                  <Card.Title className="card-title">{dato.titulo}</Card.Title>
                  <Card.Text className="card-text">{dato.id_autor}</Card.Text>
                  <Card.Text className="card-text">
                    {dato.id_editorial}
                  </Card.Text>
                  <Card.Text className="card-text">
                    {dato.anio_publicacion}
                  </Card.Text>
                  <Button
                    className="btn-libro"
                    onClick={() => editarLibro(dato)}
                    variant="primary"
                  >
                    Editar
                  </Button>
                  <Button
                    className="btn-libro"
                    onClick={() => bajaLibro(dato)}
                  >
                    Dar de baja libro
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

export default MainLibros;
