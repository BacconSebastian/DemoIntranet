const { Router } = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const createUserWithEmailAndPassword = require("firebase/auth");

const {
  Entrenadores,
  Equipos,
  Jugadores,
  Equiposentrenadores,
  Jugadoresequipos,
} = require("../db");

const router = Router();

router.get("/api/equipos", async (req, res) => {
  try {
    const allEquipos = await Equipos.findAll();
    res.status(200).send(allEquipos);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/api/crear-equipo", async (req, res) => {
  try {
    if (!req.body.length) {
      const { nombre, ciudad } = req.body;
      const equipo = await Equipos.create({ nombre, ciudad });
      res.status(200).send(equipo);
    } else {
      const equipos = req.body;
      const equiposCreados = await Equipos.bulkCreate(equipos);
      res.status(200).send(equiposCreados);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/api/editar-equipo", async (req, res) => {
  try {
    if (req.body.editar) {
      const updateData = {};
      if (req.body.nombre) updateData.nombre = req.body.nombre;
      if (req.body.ciudad) updateData.ciudad = req.body.ciudad;

      const [affectedRows, updated] = await Equipos.update(updateData, {
        where: { nombre: req.body.editar },
        returning: true,
        plain: true,
      });

      res.status(200).send(updated);
    } else {
      res.status(404).send({
        message: "Se necesita el campo 'editar' para encontrar un equipo",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/api/eliminar-equipo", async (req, res) => {
  try {
    const { nombre, ciudad } = req.body;
    const equipoEliminado = await Equipos.destroy({
      where: {
        nombre,
        ciudad,
      },
    });
    res.status(200).send({ equipoEliminado });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/api/entrenadores", async (req, res) => {
  try {
    const allEntrenadores = await Entrenadores.findAll();
    res.status(200).send(allEntrenadores);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/api/crear-entrenador", async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const entrenador = await Entrenadores.create({
      nombre,
      email,
    });
    res.status(200).send(entrenador);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/api/editar-entrenador", async (req, res) => {
  try {
    if (req.body.editar) {
      const updateData = {};
      if (req.body.nombre) updateData.nombre = req.body.nombre;
      if (req.body.email) updateData.email = req.body.email;
      if (req.body.uid) updateData.uid = req.body.uid;

      const [affectedRows, updated] = await Entrenadores.update(updateData, {
        where: { email: req.body.editar },
        returning: true,
        plain: true,
      });

      res.status(200).send(updated);
    } else {
      res.status(404).send({
        message: "Se necesita el campo 'editar' para encontrar un entrenador",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/api/eliminar-entrenador", async (req, res) => {
  try {
    const { email } = req.body;
    const entrenadorEliminado = await Entrenadores.destroy({
      where: {
        email,
      },
    });
    res.status(200).send({ entrenadorEliminado });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/api/jugadores", async (req, res) => {
  try {
    const allJugadores = await Jugadores.findAll();
    res.status(200).send(allJugadores);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/api/crear-jugador", async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const jugador = await Jugadores.create({
      nombre,
      email,
    });
    res.status(200).send(jugador);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/api/editar-jugador", async (req, res) => {
  try {
    if (req.body.editar) {
      const updateData = {};
      if (req.body.nombre) updateData.nombre = req.body.nombre;
      if (req.body.email) updateData.email = req.body.email;
      if (req.body.uid) updateData.uid = req.body.uid;

      const [affectedRows, updated] = await Jugadores.update(updateData, {
        where: { email: req.body.editar },
        returning: true,
        plain: true,
      });

      res.status(200).send(updated);
    } else {
      res.status(404).send({
        message: "Se necesita el campo 'editar' para encontrar un jugador",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/api/eliminar-jugador", async (req, res) => {
  try {
    const { email } = req.body;
    const jugadorEliminado = await Jugadores.destroy({
      where: {
        email,
      },
    });
    res.status(200).send({ jugadorEliminado });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/api/relacionar-entrenador-equipo", async (req, res) => {
  try {
    const { email, nombre } = req.body;
    const entrenador = await Entrenadores.findOne({ where: { email } });
    const equipo = await Equipos.findOne({ where: { nombre } });
    await entrenador.addEquipo(equipo, {
      through: { entrenadorid: entrenador.id, equipoid: equipo.id },
    });
    res.send({ mensaje: "Entrenador relacionado con equipo exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/api/entrenadores-equipos", async (req, res) => {
  try {
    const equiposEntrenadores = await Equiposentrenadores.findAll();
    res.send(equiposEntrenadores);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/api/relacionar-jugador-equipo", async (req, res) => {
  try {
    const { email, nombre } = req.body;
    const equipo = await Equipos.findOne({ where: { nombre } });
    const jugador = await Jugadores.findOne({ where: { email } });
    await jugador.addEquipo(equipo, {
      through: { equipoid: equipo.id, jugadorid: jugador.id },
    });
    res.send({ mensaje: "Jugador relacionado con equipo exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/api/jugadores-equipos", async (req, res) => {
  try {
    const jugadoresEquipos = await Jugadoresequipos.findAll();
    res.send(jugadoresEquipos);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/api/noticias-deportivas", (req, res) => {
  axios
    .get("https://www.afe-futbol.com/deportivo/")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const titles = [];
      $(".grid-items .title").each((i, element) => {
        titles.push($(element).text());
      });

      res.send(
        titles.map((title) => {
          return title.replace(/\n|\t|\s{2,}/g, "");
        })
      );
    })
    .catch((error) => {
      console.log("ERROR GET NOTICIAS: ", error);
      res.send(error); // envía el error al cliente
    });
});

module.exports = router;
