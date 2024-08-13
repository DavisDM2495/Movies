const express = require("express");
const { models } = require("../models/init");

const { Director, Actor, Movie } = models;

const router = express.Router();

async function createDirectors(directors) {
  for (let director of directors) {
    await Director.findOrCreate({
      where: { name: director.name },
      defaults: { dateOfBirth: director.dateOfBirth },
    });
  }
}

async function createActors(actors) {
  for (let actor of actors) {
    await Actor.findOrCreate({
      where: { name: actor.name },
      defaults: { dateOfBirth: actor.dateOfBirth },
    });
  }
}

async function createMovies(movies) {
  for (let movie of movies) {
    const director = await Director.findOne({
      where: { name: movie.directorName },
    });
    if (director) {
      const [createdMovie] = await Movie.findOrCreate({
        where: { title: movie.title },
        defaults: {
          genre: movie.genre,
          releaseDate: movie.releaseDate,
          directorId: director.id,
        },
      });

      await addActorsToMovie(createdMovie, movie.actorNames);
    }
  }
}

async function addActorsToMovie(movie, actorNames) {
  for (let actorName of actorNames) {
    const actor = await Actor.findOne({ where: { name: actorName } });
    if (actor) {
      await movie.addActor(actor);
    }
  }
}

async function seedDatabase() {
  const directors = [
    { name: "Christopher Nolan", dateOfBirth: "1970-07-30" },
    { name: "Lana Wachowski", dateOfBirth: "1965-06-21" },
    { name: "Lilly Wachowski", dateOfBirth: "1967-12-29" },
    { name: "Steven Spielberg", dateOfBirth: "1946-12-18" },
    { name: "Quentin Tarantino", dateOfBirth: "1963-03-27" },
  ];

  const actors = [
    { name: "Leonardo DiCaprio", dateOfBirth: "1974-11-11" },
    { name: "Keanu Reeves", dateOfBirth: "1964-09-02" },
    { name: "Laurence Fishburne", dateOfBirth: "1961-07-30" },
    { name: "Tom Hanks", dateOfBirth: "1956-07-09" },
    { name: "Samuel L. Jackson", dateOfBirth: "1948-12-21" },
    { name: "Matthew McConaughey", dateOfBirth: "1969-11-04" },
    { name: "Anne Hathaway", dateOfBirth: "1982-11-12" },
  ];

  const movies = [
    {
      title: "Inception",
      genre: "Sci-Fi",
      releaseDate: "2010-07-16",
      directorName: "Christopher Nolan",
      actorNames: ["Leonardo DiCaprio"],
    },
    {
      title: "The Matrix",
      genre: "Sci-Fi",
      releaseDate: "1999-03-31",
      directorName: "Lana Wachowski",
      actorNames: ["Keanu Reeves", "Laurence Fishburne"],
    },
    {
      title: "Jurassic Park",
      genre: "Adventure",
      releaseDate: "1993-06-11",
      directorName: "Steven Spielberg",
      actorNames: ["Samuel L. Jackson"],
    },
    {
      title: "Pulp Fiction",
      genre: "Crime",
      releaseDate: "1994-10-14",
      directorName: "Quentin Tarantino",
      actorNames: ["Samuel L. Jackson"],
    },
    {
      title: "Interstellar",
      genre: "Sci-Fi",
      releaseDate: "2014-11-07",
      directorName: "Christopher Nolan",
      actorNames: ["Matthew McConaughey", "Anne Hathaway"],
    },
  ];

  await createDirectors(directors);
  await createActors(actors);
  await createMovies(movies);
}

router.get("/", async (req, res) => {
  try {
    const directorCount = await Director.count();
    const actorCount = await Actor.count();
    const movieCount = await Movie.count();
    if (directorCount === 0 && actorCount === 0 && movieCount === 0) {
      await seedDatabase();
      res.status(200).send("Database seeded successfully");
    } else {
      res.status(200).send("Database already seeded");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).send("Error seeding database");
  }
});

module.exports = router;
