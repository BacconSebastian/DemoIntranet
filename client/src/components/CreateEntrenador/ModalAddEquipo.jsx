import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
    getEquipos,
} from "../../redux/actions/actions";

import "./CreateEntrenador.css"


export default function ModalAddEquipo({ equiposAgregados, setEquiposAgregados }) {
    const dispatch = useDispatch();
    const initialInput = {
        nombre: ""
    };

    const [show, setShow] = useState(false);
    const [input, setInput] = useState(initialInput);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const equipos = useSelector((state) => state.equipos);

    useEffect(() => {
        dispatch(getEquipos());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();


        if (input.nombre !== "") {
            setEquiposAgregados([...equiposAgregados, input.nombre]);
            setInput(initialInput);
        }
    };

    const handleSelectChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleValidateAgregar = () => {
        return input.nombre === ""
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Añadir
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Añadir equipo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <select className="form-select" aria-label="Default select example" name="nombre"
                            value={input.nombre}
                            onChange={(e) => {
                                handleSelectChange(e);
                            }}>
                            <option value={""} selected>Seleccione un equipo</option>
                            {equipos.data?.map((equipo) => {
                                return (
                                    <>
                                        <option key={equipo.nombre} value={equipo.nombre}>
                                            {equipo.nombre}
                                        </option>
                                    </>
                                );
                            })}
                        </select>
                        {!equipos.data?.length && (
                            <div className="error-sin-equipos">
                                <p>
                                    Debe crear al menos un equipo para poder dar de alta
                                    entrenadores
                                </p>
                                <a href="/crear-equipo">CREAR EQUIPO</a>
                            </div>
                        )}

                        <Modal.Footer>
                            <Button variant="primary"
                                className="btn btn-primary me-md-2"
                                type="submit"
                                disabled={handleValidateAgregar()}>
                                Agregar
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}