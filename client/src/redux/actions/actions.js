import axios from "axios";

import "../../firebase/firebase-config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { UID_PRESIDENTE } from "../../config";
import { JUGADORES, ENTRENADORES, PRESIDENTE } from "../../config";

const url = "http://13.42.129.29";
const auth = getAuth();

export function hasError(error) {
  return async function (dispatch) {
    return dispatch({
      type: "HAS_ERROR",
      payload: error,
    });
  };
}

export function resetError() {
  return async function (dispatch) {
    return dispatch({
      type: "RESET_ERROR",
    });
  };
}

export function getEntrenadores() {
  return async function (dispatch) {
    try {
      let response = await axios.get(url + "/api/entrenadores");
      return dispatch({
        type: "GET_ENTRENADORES",
        payload: response || [],
      });
    } catch (error) {
      console.log("ERROR EN GET ENTRENADORES");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function createEntrenador(input) {
  return async function (dispatch) {
    try {
      let dataCreacion = {
        nombre: input.nombre,
        email: input.email,
      };

      const response = await axios.post(
        url + "/api/crear-entrenador",
        dataCreacion
      );

      if (input.equiposAgregados.length) {
        input.equiposAgregados.map(async (equipo) => {
          let dataRelacion = {
            nombre: equipo,
            email: input.email,
          };

          console.log("DATA RELACION MAPEADA: ", dataRelacion);

          const relacion = await axios.post(
            url + "/api/relacionar-entrenador-equipo",
            dataRelacion
          );
        });
      }

      return dispatch({
        type: "CREATE_ENTRENADOR",
        payload: response,
      });
    } catch (error) {
      console.log("ERROR EN CREATE ENTRENADOR");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function editarEntrenador(data) {
  return async function (dispatch) {
    try {
      let response = await axios.put(url + "/api/editar-entrenador", data);
      return dispatch({
        type: "EDITAR_ENTRENADOR",
        payload: response.data || {},
      });
    } catch (error) {
      console.log("ERROR EN EDITAR ENTRENADOR");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function registerEntrenador(input) {
  return async function (dispatch) {
    try {
      let user = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );

      console.log("USER DESDE REGISTER: ", user);

      let entrenadorEditado = await axios.put(url + "/api/editar-entrenador", {
        uid: user.user.uid,
        editar: input.email,
      });

      if (!entrenadorEditado) {
        return dispatch({
          type: "HAS_ERROR",
          payload: "No se editó ningun jugador",
        });
      }
    } catch (error) {
      console.log("ERROR EN REGISTER ENTRENADOR");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function relacionarEntrenadorEquipo(data) {
  return async function (dispatch) {
    try {
      let relacion = await axios.post(
        url + "/api/relacionar-entrenador-equipo",
        data
      );
      let response = await axios.get(url + "/api/entrenadores-equipos");
      return dispatch({
        type: "GET_ENTRENADORES_EQUIPOS",
        payload: response,
      });
    } catch (error) {
      console.log("ERROR EN RELACIONAR ENTRENADOR EQUIPO");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function getEquipos() {
  return async function (dispatch) {
    try {
      let response = await axios.get(url + "/api/equipos");
      return dispatch({
        type: "GET_EQUIPOS",
        payload: response || [],
      });
    } catch (error) {
      console.log("ERROR EN GET EQUIPOS");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function createEquipo(input) {
  return async function (dispatch) {
    try {
      const response = await axios.post(url + "/api/crear-equipo", input);

      if (input.entrenadoresAgregados.length) {
        input.entrenadoresAgregados.map(async (entrenador) => {
          let dataRelacion = {
            nombre: input.nombre,
            email: entrenador,
          };

          console.log("DATA RELACION ENTRENADORES: ", dataRelacion);

          const relacion = await axios.post(
            url + "/api/relacionar-entrenador-equipo",
            dataRelacion
          );
        });
      }

      if (input.jugadoresAgregados.length) {
        input.jugadoresAgregados.map(async (jugador) => {
          let dataRelacion = {
            nombre: input.nombre,
            email: jugador,
          };

          console.log("DATA RELACION JUGADORES: ", dataRelacion);

          const relacion = await axios.post(
            url + "/api/relacionar-jugador-equipo",
            dataRelacion
          );
        });
      }

      return dispatch({
        type: "CREATE_EQUIPO",
        payload: response,
      });
    } catch (error) {
      console.log("ERROR EN CREATE EQUIPO");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function editarEquipo(data) {
  return async function (dispatch) {
    try {
      let response = await axios.put(url + "/api/editar-equipo", data);
      return dispatch({
        type: "EDITAR_EQUIPO",
        payload: response.data || {},
      });
    } catch (error) {
      console.log("ERROR EN EDITAR EQUIPO");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function getJugadores() {
  return async function (dispatch) {
    try {
      let response = await axios.get(url + "/api/jugadores");
      return dispatch({
        type: "GET_JUGADORES",
        payload: response || [],
      });
    } catch (error) {
      console.log("ERROR EN GET JUGADORES");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function createJugador(input) {
  return async function (dispatch) {
    try {
      let dataCreacion = {
        nombre: input.nombre,
        email: input.email,
      };

      const response = await axios.post(url + "/api/crear-jugador", dataCreacion);

      if (input.equiposAgregados.length) {
        input.equiposAgregados.map(async (equipo) => {
          let dataRelacion = {
            nombre: equipo,
            email: input.email,
          };

          const relacion = await axios.post(
            url + "/api/relacionar-jugador-equipo",
            dataRelacion
          );
        });
      }

      return dispatch({
        type: "CREATE_JUGADOR",
        payload: response,
      });
    } catch (error) {
      console.log("ERROR EN CREATE JUGADOR");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function editarJugador(data) {
  return async function (dispatch) {
    try {
      let response = await axios.put(url + "/api/editar-jugador", data);
      return dispatch({
        type: "EDITAR_JUGADOR",
        payload: response.data || {},
      });
    } catch (error) {
      console.log("ERROR EN EDITAR JUGADOR");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function registerJugador(input) {
  return async function (dispatch) {
    try {
      let user = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );

      console.log("USER DESDE REGISTER: ", user);

      let jugadorEditado = await axios.put(url + "/editar-jugador", {
        uid: user.user.uid,
        editar: input.email,
      });

      if (!jugadorEditado) {
        return dispatch({
          type: "HAS_ERROR",
          payload: "No se editó ningun jugador",
        });
      }
    } catch (error) {
      console.log("ERROR EN REGISTER JUGADOR");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function relacionarJugadorEquipo(data) {
  return async function (dispatch) {
    try {
      let relacion = await axios.post(url + "/relacionar-jugador-equipo", data);
      let response = await axios.get(url + "/jugadores-equipos");
      return dispatch({
        type: "GET_JUGADORES_EQUIPOS",
        payload: response,
      });
    } catch (error) {
      console.log("ERROR EN RELACIONAR JUGADOR EQUIPO");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function getEntrenadoresEquipos() {
  return async function (dispatch) {
    try {
      let response = await axios.get(url + "/entrenadores-equipos");
      return dispatch({
        type: "GET_ENTRENADORES_EQUIPOS",
        payload: response,
      });
    } catch (error) {
      console.log("ERROR EN GET ENTRENADORES EQUIPOS");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function getJugadoresEquipos() {
  return async function (dispatch) {
    try {
      let response = await axios.get(url + "/jugadores-equipos");
      return dispatch({
        type: "GET_JUGADORES_EQUIPOS",
        payload: response,
      });
    } catch (error) {
      console.log("ERROR EN GET JUGADORES EQUIPOS");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function getNoticias() {
  return async function (dispatch) {
    try {
      let response = await axios.get(url + "/noticias-deportivas");
      return dispatch({
        type: "GET_NOTICIAS",
        payload: response,
      });
    } catch (error) {
      console.log("ERROR EN GET NOTICIAS");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function setLoading(payload) {
  return async function (dispatch) {
    return dispatch({
      type: "SET_LOADING",
      payload: payload,
    });
  };
}

export function login(input) {
  return async function (dispatch) {
    try {
      let response = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      return dispatch({
        type: "LOGIN",
        payload: response.user.uid,
      });
    } catch (error) {
      console.log("ERROR EN LOGIN");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function setUid(set) {
  return async function (dispatch) {
    if (!set) {
      return dispatch({
        type: "SET_UID",
        payload: null,
      });
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          return dispatch({
            type: "SET_UID",
            payload: user.uid,
          });
        } else {
          console.log("NO HAY USUARIO LOGUEADO");
        }
      });
    }
  };
}

export function setUserType(uid, entrenadores, jugadores) {
  return async function (dispatch) {
    let userType = null;

    if (uid === String(UID_PRESIDENTE)) {
      userType = PRESIDENTE;
    }

    entrenadores &&
      entrenadores.map((entrenador) => {
        if (entrenador.uid === uid) {
          userType = ENTRENADORES;
        }
      });

    jugadores &&
      jugadores.map((jugador) => {
        if (jugador.uid === uid) {
          userType = JUGADORES;
        }
      });

    return dispatch({
      type: "SET_USERTYPE",
      payload: userType,
    });
  };
}
