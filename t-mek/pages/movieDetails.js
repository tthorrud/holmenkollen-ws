import { withRouter, useRouter } from "next/router"
import client from "../apollo-client";
import { gql, useQuery } from '@apollo/client';
import styles from './movieDetails.module.css'
import Image from 'next/image'

// Sets the number of stars we wish to display
const numStars = 100;

// For every star we want to display
for (let i = 0; i < numStars; i++) {
    if (process.browser) {
        let star = document?.createElement("div");
        star.className = styles.star;
        var xy = getRandomPosition();
        star.style.top = xy[0] + 'px';
        star.style.left = xy[1] + 'px';
        document.body.append(star);
    }
}

// Gets random x, y values based on the size of the container
function getRandomPosition() {
    var y = window.innerWidth;
    var x = window.innerHeight;
    var randomX = Math.floor(Math.random() * x);
    var randomY = Math.floor(Math.random() * y);
    return [randomX, randomY];
}

const GET_FILM = gql`
    query Query($id: ID!) {
        film (id: $id) {
            id
            episodeID
            openingCrawl
            title
            releaseDate
            director
            }
        }
`;

function romanize(num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function MovieDetails() {
    const router = useRouter();
    const { loading, error, data } = useQuery(GET_FILM, {
        client,
        variables: { id: router.query.id },
    });

    if (loading) {
        return <p>LASTER INN </p>
    }

    return (
        <>

            <iframe width="1" height="1" wmode="transparent" src="https://www.youtube.com/watch?v=tGsKzZtRwxw&autoplay=1" allow="autoplay*" frameborder="0" allowfullscreen />
            <section className={styles.starWars}>
                <div className={styles.crawl}>
                    <div className={styles.title}>
                        <p>{`Episode ${romanize(data?.film.episodeID)}`}</p>
                        <h1>{data?.film.title}</h1>
                    </div>
                    {data?.film.openingCrawl.split(".\n").map((p) => <p style={{ marginTop: '10px' }}>{p}</p>)}
                </div>
            </section>
            <div style={{ color: "#feda4a" }}>
                <h1>{data?.film.title}</h1>
                <p>Release date: {data?.film.releaseDate}</p>
                <p>Director: {data?.film.director}</p>
                <button onClick={() => router.push("/")}>Tilbake</button>
                <Image src={`/static/assets/${data?.film?.episodeID}.jpg`} height="100" width="70" />
            </div>
        </>
    )
}



export default withRouter(MovieDetails)