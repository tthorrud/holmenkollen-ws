import React from "react";
import styles from "./index.module.css";
import Link from "next/link";
import "./styles.css";
export default async function Home() {
  const movieQuery = await fetch(
    "https://swapi-graphql.netlify.app/.netlify/functions/index",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `
          {
            allFilms {
              films {
                title
                director
                releaseDate
                id
                episodeID
                speciesConnection {
                  species {
                    name
                    classification
                    homeworld {
                      name
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    }
  );

  const { data } = await movieQuery.json();

  return (
    <div className={styles.movies}>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
      <main>
        {data.allFilms.films.map((film) => {
          return (
            <li key={film.id}>
              <Link href={`/episode/${film.id}`}>{film.title}</Link>
            </li>
          );
        })}
      </main>
    </div>
  );
}
