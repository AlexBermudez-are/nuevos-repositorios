/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useContext, useEffect } from 'react'
import axios from "axios";
import './InicioDeSesion.css'
import SesionContext from '../../Context/SesionContext';
import { useHistory } from 'react-router-dom';

let initialState = {
    email: "",
    password: "",
}

const InicioDeSesionHome = () => {

    const SesionIniciadaLocalStorage = localStorage.getItem('Usuario')
    const {
        SesionI,
        cerrarMenuLoginF,
        crearCuentaF,
        contraseñaOlvidadaF,
        usuarioLogueado,
    } = useContext(SesionContext)
    const [checked, setchecked] = useState(false)
    const [valueForm, setvalueForm] = useState(initialState)
    const history = useHistory()

    const logFail = useRef(),
        failLogueo = useRef()

    let url = 'http://localhost:3080/user/login';


    // useEffect(() => {

    //     if (SesionI) history.push(`/user/${SesionI}`)

    // }, [SesionIniciadaLocalStorage, SesionI])


    const validarusuario = async (e) => {
        e.preventDefault();

        try {
            await axios.post(url, valueForm).then(el => {
                usuarioLogueado(el.data.jwt)
            })
            setTimeout(() => {
                cerrarMenuLoginF()
            }, 1000);
        } catch (error) {
            return error
        }

    }

    const actualizarDatos = (e) => {
        e.target.name === "autorizar"
            ? setchecked(!checked)
            : setvalueForm({
                ...valueForm,
                [e.target.name]: e.target.value
            })
    }

    return (
        <div className="input-Usuario-Padre" onClick={cerrarMenuLoginF}>
            <form className="input-Usuario-Contenedor"
                ref={failLogueo}
                onClick={e => { e.stopPropagation() }}
                onSubmit={validarusuario}>
                <div className="titulo-Sesion">
                    <h1 className='inicia-Sesion-Home'>Inicia Sesión</h1>
                    <button
                        className="btn-Usuario-X"
                        onClick={cerrarMenuLoginF}
                    >
                        <p className='btn-x-Close'>x</p>
                    </button>
                </div>
                <div className="inputs-Sesion">
                    <label htmlFor="email">
                        <p>Email:</p>
                        <input
                            autoComplete='off'
                            placeholder="Ejemplo@gmail.com..."
                            type="email"
                            name="email"
                            className="input-Email"
                            onChange={actualizarDatos}
                            value={valueForm.email}
                            pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
                            required
                        />
                    </label>
                    <label htmlFor="password">
                        <p>Contraseña:</p>
                        <input
                            placeholder="contraseña..."
                            type="password"
                            name="password"
                            className="input-Contraseña"
                            onChange={actualizarDatos}
                            value={valueForm.password}
                            required
                        />
                    </label>
                    <span className="sesion-Fallida-E" ref={logFail}>El correo o la contraseña son incorrectos</span>
                </div>
                <label htmlFor="autorizar" className="inputs-Sesion-A">
                    <input
                        type="checkbox"
                        onChange={actualizarDatos}
                        name="autorizar"
                        required
                        style={{ marginTop: "5%" }}
                    />
                    <p style={{ margin: "14px 5px" }}>Recordarme en este dispositivo</p>
                </label>
                <button type="submit" className="ingresar-Login-Usuario">Ingresar</button>
                <div className="extra-Login">
                    <button className="btn-Extra" type="button" onClick={crearCuentaF}>Crear Cuenta</button>
                    <button className="btn-Extra" type="button" onClick={contraseñaOlvidadaF}>¿Olvidaste tu contraseña? </button>
                </div>
            </form>
        </div>
    )
}

export default InicioDeSesionHome
