import React, { useState, useEffect } from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import '../css/Main.css';

const MainEditorial = () => {
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [id_editorial, setIdEditorial] = useState(0);
    const [datos, setDatos] = useState([]);
  
    useEffect(() => {
      mostrarEditoriales();
    }, []);
  
    useEffect(() => {
      console.log(datos);
    }, [datos]);
  
    const mostrarEditoriales = () => {
      axios
        .get("http://localhost:3000/editoriales")
        .then((response) => {
          setDatos(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const postEditorial = async () => {
      try {
        const response = await axios.post("http://localhost:3000/editoriales", {
          id_editorial,
          nombre,
          direccion,
          telefono,
        });
        if (response.status === 200) {
          alert("Se agregó la editorial correctamente");
          mostrarEditoriales();
          cancelar();
        } else {
          alert("Hubo un error");
        }
      } catch (error) {
        console.error("Error al realizar la consulta con el servidor", error);
      }
    };
  
    const putEditorial = async () => {
      try {
        const response = await axios.put("http://localhost:3000/editoriales", {
          id_editorial,
          nombre,
          direccion,
          telefono,
        });
        if (response.status === 200) {
          alert("Se modificó correctamente la editorial");
          mostrarEditoriales();
          cancelar();
        } else {
          alert("Hubo un error");
        }
      } catch (error) {
        console.error("Error al realizar la consulta con el servidor", error);
      }
    };
  
    const bajaEditorial = async (dato) => {
      try {
        const response = await axios.delete(`http://localhost:3000/editoriales/${dato.id_editorial}`);
  
        if (response.status === 200) {
          alert("La editorial se dio de baja correctamente");
          mostrarEditoriales();
        } else {
          alert("Ocurrió un error al dar de baja la editorial");
        }
      } catch (error) {
        console.error("Error al eliminar la editorial", error);
      }
    };
  
    const cancelar = () => {
      setIdEditorial(0);
      setNombre("");
      setDireccion("");
      setTelefono("");
    };
  
    const editarEditorial = (dato) => {
      setIdEditorial(dato.id_editorial);
      setNombre(dato.nombre);
      setDireccion(dato.direccion);
      setTelefono(dato.telefono);
    };
  
    return (
      <>
        <div className="contenedorBody">
          <div className="contenedor-agregar">
            <label htmlFor="">ID Editorial</label>
            <input
              value={id_editorial}
              type="number"
              onChange={(e) => setIdEditorial(e.target.value)}
            />
  
            <label htmlFor="">Nombre:</label>
            <input
              value={nombre}
              type="text"
              onChange={(e) => setNombre(e.target.value)}
            />
  
            <br />
  
            <label htmlFor="">Dirección:</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
            <br />
            <label htmlFor="">Teléfono:</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <br />
  
            <button onClick={postEditorial} className="agregar-libro-btn">
              Agregar Editorial
            </button>
            <button onClick={putEditorial}>Editar</button>
            <button onClick={() => cancelar()} className="agregar-libro-btn">
              Cancelar
            </button>
          </div>
  
          <div className="lista">
            <h1>Lista de Editoriales</h1>
            <div className="card-container">
              {datos.length > 0 ? (
                datos.map((dato) => (
                  <Card key={dato.id_editorial} style={{ width: "18rem" }} className="cards">
                    <Card.Body>
                      <Card.Title className="card-title">{dato.nombre}</Card.Title>
                      <Card.Text className="card-text">{dato.direccion}</Card.Text>
                      <Card.Text className="card-text">{dato.telefono}</Card.Text>
                      <Button
                        className="btn-libro"
                        onClick={() => editarEditorial(dato)}
                        variant="primary"
                      >
                        Editar
                      </Button>
                      <Button
                        className="btn-libro"
                        onClick={() => bajaEditorial(dato)}
                      >
                        Dar de baja editorial
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
  )
}

export default MainEditorial
