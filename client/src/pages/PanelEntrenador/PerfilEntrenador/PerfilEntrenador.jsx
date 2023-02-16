//import Navbar from "../navBar/navBar.jsx";
//import NavBarVertical from "../navBarVertical/navBarVertical";
//import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Button, CardText } from 'reactstrap';
import "./PerfilEntrenador.css";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
//import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from "@mui/material/Link";


export default function PerfilEntrenador() {

    const [dense, setDense] = React.useState(true);
    const [secondary, setSecondary] = React.useState(false);
    // console.log(hola)
    function generate(element) {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));
    return (
        <div className="Cointainer">
            <Box sx={{ height: "100%" }} >
                <FormGroup row>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={secondary}
                                onChange={(event) => setSecondary(event.target.checked)}
                            />
                        }
                        label="Modificar Datos"
                    />
                </FormGroup>
                <Grid container spacing={2}  >
                    <Typography sx={{ mt: 4, mb: 2, border: 0.5, width: '95%', marginLeft: "3%" }} variant="h6" component="div" style={{ textAlign: "center", padding: 5 }}>
                        Datos Personales
                    </Typography>
                    <Grid item xs={12} md={6}  >

                        <Demo className="ListBorder">
                            <List dense={dense} >
                                <ListItem>
                                    <label>Nombre y apellido : Joaquín Gonzalez</label>

                                    {secondary ? <div>
                                        <input
                                            placeholder="De La Nasa"
                                        ></input>
                                    </div> : null}
                                </ListItem>
                                <ListItem>
                                    <label>Usuario : jgonzalez</label>

                                    {secondary ? <input
                                        placeholder="De La Nasa"
                                    ></input> : null}
                                </ListItem>
                                <ListItem>
                                    <label>Contraseña : *********</label>

                                    {secondary ? <input
                                        placeholder="De La Nasa"
                                    ></input> : null}
                                </ListItem>
                                <ListItem>
                                    <label>ROL : Entrenador</label>

                                    {secondary ? <input
                                        placeholder="De La Nasa"
                                    ></input> : null}
                                </ListItem>
                                <ListItem>
                                    <label>Equipo : Juvenil A y Juvenil B</label>

                                    {secondary ? <input
                                        placeholder="De La Nasa"
                                    ></input> : null}
                                </ListItem>
                                <ListItem>
                                    <label>Fecha De Nacimiento : 27/08/2000</label>

                                    {secondary ? <input
                                        placeholder="De La Nasa"
                                    ></input> : null}
                                </ListItem>


                            </List>
                        </Demo>
                    </Grid>
                    <Grid item xs={12} md={6}>


                        <Demo className="ListBorder">
                            <List dense={dense} >
                                <ListItem>
                                    <label>Nacionalidad : Argentina</label>

                                    {secondary ? <input
                                        placeholder="De La Nasa"
                                    ></input> : null}
                                </ListItem>
                                <ListItem>
                                    <label>Pais : Argentina</label>

                                    {secondary ? <input
                                        placeholder="De La Nasa"
                                    ></input> : null}
                                </ListItem>
                                <ListItem>
                                    <label>Provincia : Buenos Aires</label>

                                    {secondary ? <input
                                        placeholder="De La Nasa"
                                    ></input> : null}
                                </ListItem>
                                <ListItem>
                                    <label>Codigo Postal : 1641</label>

                                    {secondary ? <input
                                        placeholder="De La Nasa"
                                    ></input> : null}
                                </ListItem>
                                <ListItem>
                                    <label>Localidad : Caba</label>

                                    {secondary ? <input
                                        placeholder="De La Nasa"
                                    ></input> : null}
                                </ListItem>
                                <ListItem>
                                    <label>Domicilio : Sarmiento 1661 </label>

                                    {secondary ? <input
                                        placeholder="De La Nasa"
                                    ></input> : null}
                                </ListItem>
                            </List>
                        </Demo>
                    </Grid>
                </Grid>
            </Box>
            <Link href="/home-entrenadores">
                <button className="botonVolverLogin">Volver</button>
            </Link>
        </div>
    )




}