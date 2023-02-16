import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import Logout from "../../components/Logout/Logout";

export const mainListItems = (
  <div>
    <ListItem button>
      <Link href="/perfil-entrenador" target="_self">
        <ListItemText primary="Perfil" />
      </Link>
    </ListItem>
    <ListItem button>
      <Link href="/crear-novedad-entrenador" target="_self">
        <ListItemText primary="Novedades" />
      </Link>
    </ListItem>
    <ListItem button>
      <Link href="/crear-jugador" target="_self">
        <ListItemText primary="Crear jugador" />
      </Link>
    </ListItem>
    <ListItem button>
      <Logout />
    </ListItem>
  </div>
);

export const secondaryListItems = <div></div>;
