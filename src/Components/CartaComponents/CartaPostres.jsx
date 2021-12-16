import React, { useRef, useState } from "react";
import './CartaPostres.css'

//Este componente es cada tarjeta usada en la Carta, aqui se manda la cantidad de 
//productos que quieran al carrito

const CartaPostres = ({ Postres, setalmacen }) => {

  const refListo = useRef();
  const [Add_Food, setAdd_Food] = useState(0);

  let DatosPostres = []
  let Producto = {
    carta: "postre",
    nombre: Postres.nombre,
    id: Postres.id,
    img: Postres.img,
    precio: Postres.precio,
    cantidad: Add_Food
  }


  const validarDatos = () => {
    if (Add_Food > 0) {
      DatosPostres.push(Producto)
      setalmacen(DatosPostres)
    }
    if (Add_Food >= 1) {
      setTimeout(() => {
        refListo.current.className = "btn_Card active"
        setTimeout(() => {
          refListo.current.className = "btn_Card"
          setAdd_Food(0)
        }, 500);
      }, 500);
    } return
  };

  const agregar = () => {
    if (Add_Food < 5) {
      setAdd_Food(Add_Food + 1);
    }
    return
  }

  const disminuir = () => {
    if (Add_Food > 0) {
      setAdd_Food(Add_Food - 1);
    }
    return;
  }

  return (
    <div className="Card">
      <section className="contenido">
        <div className="Marco_Titulo">
          <h1 className="titulo">{Postres ? Postres.nombre : "cargando"}</h1>
        </div>
        <img
          className="img-Card"
          src={Postres ? Postres.img : "cargando"}
          alt={Postres ? Postres.nombre : "cargando"}
        />
      </section>
      <section className="info-Card">
        <p className="precio-Card">${Postres ? Postres.precio : "cargando"}.00</p>
        <div className="seccion-Botones-C">
          <section className="agregar-Disminuir">
            <button className="agregar-C" onClick={agregar} >
              <p className="p-agregar-C">+</p>
            </button>
            <button className="disminuir-C" onClick={disminuir}>
              <p className="p-disminuir-C">-</p>
            </button>
          </section>
          <button className="btn_Card" onClick={validarDatos} ref={refListo}>
            <p style={{ margin: "0" }}>Agregar:</p>
            <p style={{ margin: "0" }}>{Add_Food}</p>
          </button>
        </div>
      </section>
    </div>
  );
};

export default CartaPostres;
