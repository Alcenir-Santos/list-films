import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import api from "../../services/api";
import './styles.css';

export default function Filme() {
    const { id } = useParams();
    const [film, setFilm] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() =>{
        async function loadFilm() {
            await api.get(`movie/${id}`).then((res)=>{
                setFilm(res.data);
                setLoading(false);
            }).catch((err)=>{
                navigate('/', {replace: true});
            })
        }
        loadFilm();
    }, [id, navigate]);
    if(loading){
        return <div className="loading"><h1>Carregando detalhes...</h1></div>
    }
    const saveFilm = () => {
        const listFilms = localStorage.getItem('films');
        let filmsSaveds = JSON.parse(listFilms) || [];
        const hasFilm = filmsSaveds.some((filmSaved) => filmSaved.id === film.id);
        if(hasFilm){
            toast.warn('Filme ja consta na lista.');
            return;
        }
        
        filmsSaveds.push(film);
        localStorage.setItem('films', JSON.stringify(filmsSaveds));
        toast.success('Filme salvo com sucesso.');

    }

    return (
        <div className="film-info">
            <h1>{film.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`} alt={film.title} />
            <h3>Sinopse</h3>
            <span>{film.overview}</span>
            <strong>{`Avaliação: ${film.vote_average.toFixed(2)} /10`}</strong>
            <div className="buttons">
                <button onClick={saveFilm}>Salvar</button>
                <button><a rel="external" href={`https://youtube.com/results?search_query=${film.title} trailer`} target='blank'>Trailer</a></button>
            </div>
        </div>
    );
}