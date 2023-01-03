import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import './styles.css';

export default function Favorites() {
    const [films, setFilms] = useState([]);
    useEffect(()=>{
        const listFilms = localStorage.getItem('films');
        setFilms(JSON.parse(listFilms) || []);
    },[])
    const deleteFilm = (id) => {
        const newListFilm = films.filter(film => film.id !== id);
        localStorage.setItem('films', JSON.stringify(newListFilm));
        setFilms(newListFilm);
        toast.success('Filme removido com sucesso!!!')
    }
    return (
        <div className="listFilms">
            <h1>Minha Lista de favoritos</h1>
            {films.length === 0 && <span>Você não possui nenhum filme salvo :( </span> }
            <ul>
                {films.map(film => {
                    return (
                        <li key={film.id}>
                            <span>{film.title}</span>
                            <div>
                                <Link to={`/film/${film.id}`}>ver detalhes</Link>
                                <button onClick={() => deleteFilm(film.id)}>excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}