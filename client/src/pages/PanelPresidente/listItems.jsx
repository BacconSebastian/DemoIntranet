import * as React from "react";

import Logout from "../../components/Logout/Logout";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>{/* <ShoppingCartIcon /> */}</ListItemIcon>
      <Link href="/crear-equipo" target="_self">
        <ListItemText primary="Crear equipo" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>{/* <DashboardIcon /> */}</ListItemIcon>
      <Link href="/crear-entrenador" target="_self">
        <ListItemText primary="Crear entrenador" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>{/* <ShoppingCartIcon /> */}</ListItemIcon>
      <Link href="/crear-jugador" target="_self">
        <ListItemText primary="Crear jugador" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>{/* <ShoppingCartIcon /> */}</ListItemIcon>
      <Logout />
    </ListItem>
    {/* <ListItem button>
    asd
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem> */}
  </div>
);

export const secondaryListItems = (
  <div>
    {/* <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>  */}
  </div>
);
