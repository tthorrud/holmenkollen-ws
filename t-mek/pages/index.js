import { ApolloProvider, gql } from "@apollo/client";
import client from "../apollo-client";
import { useRouter } from "next/router";
import styles from "./index.module.css";

export default function Home({ movies }) {
  const router = useRouter();
  return (
    <ApolloProvider client={client}>
      <div className={styles.movies}>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <main>
          <ul>
            {movies.allFilms.films.map((film) => {
              return (
                <li
                  key={film.id}
                  onClick={() =>
                    router.push({
                      pathname: "/movieDetails",
                      query: {
                        id: film.id,
                      },
                    })
                  }
                >
                  {film.title}
                </li>
              );
            })}
          </ul>
        </main>
      </div>
    </ApolloProvider>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Query {
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
  });

  return {
    props: {
      movies: data,
    },
  };
}
