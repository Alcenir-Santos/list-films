import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import './styles.css';

export default function Home() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilms() {
            const resp = await api.get('movie/now_playing', {
                params: {
                    page: 1
                }
            });
            // console.log(resp.data.results);
            setFilms(resp.data.results);
            setLoading(false);
        }

        loadFilms();
    }, []);
    if (loading) {
        return (
            <div className="loading">
                <h1>Carregando...</h1>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="list-films">
                {films.map((film) => {
                    return (
                        <article key={film.id}>
                            <strong>{film.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} alt={film.title} />
                            <Link to={`film/${film.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    );
}

