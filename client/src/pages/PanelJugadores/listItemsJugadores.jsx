import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Link from "@mui/material/Link";
import Logout from "../../components/Logout/Logout";

export const mainListItems = (
  <div>
    <ListItem button>
      <Link href="/novedades-jugador" target="_self">
        <ListItemText primary="Novedades" />
      </Link>
    </ListItem>
    <ListItem button>
      <Link href="/chat-equipo" target="_self">
        <ListItemText primary="Chat" />
      </Link>
    </ListItem>
    <ListItem button>
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
