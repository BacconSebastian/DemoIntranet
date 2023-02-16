const initialState = {
  uid: "",
  equipos: [],
  entrenadores: [],
  jugadores: [],
  entrenadoresEquipos: [],
  jugadoresEquipos: [],
  scraping: [],
  isLoading: false,
  error: "",
  user: null,
  userType: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HAS_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "RESET_ERROR":
      return {
        ...state,
        error: "",
      };
    case "GET_ENTRENADORES":
      return {
        ...state,
        entrenadores: action.payload,
        error: "",
      };
    case "CREATE_ENTRENADOR":
      return {
        ...state,
        entrenadores: Array.isArray(state.entrenadores)
          ? [...state.entrenadores, action.payload]
          : [action.payload],
        error: "",
      };
    case "EDITAR_ENTRENADOR":
      return {
        ...state,
        error: "",
      };
    case "GET_EQUIPOS":
      return {
        ...state,
        equipos: action.payload,
        error: "",
      };
    case "CREATE_EQUIPO":
      return {
        ...state,
        equipos: Array.isArray(state.equipos)
          ? [...state.equipos, action.payload]
          : [action.payload],
        error: "",
      };
    case "EDITAR_EQUIPO":
      return {
        ...state,
        error: "",
      };
    case "GET_JUGADORES":
      return {
        ...state,
        jugadores: action.payload,
        error: "",
      };
    case "CREATE_JUGADOR":
      return {
        ...state,
        jugadores: Array.isArray(state.jugadores)
          ? [...state.jugadores, action.payload]
          : [action.payload],
        uid: action.payload.uid,
        error: "",
      };
    case "EDITAR_JUGADOR":
      return {
        ...state,
        error: "",
      };
    case "GET_ENTRENADORES_EQUIPOS":
      return {
        ...state,
        entrenadoresEquipos: action.payload,
      };
    case "GET_JUGADORES_EQUIPOS":
      return {
        ...state,
        jugadoresEquipos: action.payload,
      };
    case "GET_NOTICIAS":
      return {
        ...state,
        scraping: Array.isArray(state.scraping)
          ? [...state.scraping, action.payload]
          : [action.payload],
        error: "",
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        error: "",
      };
    case "SET_UID":
      return {
        ...state,
        uid: action.payload,
      };
    case "SET_USERTYPE":
      return {
        ...state,
        userType: action.payload,
        error: "",
      };
    default:
      return state;
  }
};

export default rootReducer;
