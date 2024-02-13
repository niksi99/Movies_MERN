import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowMovie = () => {

    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(false);
    const { id } = useParams(); 
    useEffect(() => {
        axios.get(`http://localhost:1001/oneMovie/${id}`)
             .then((res) => {
                console.log(res.data)
                setMovie(res.data.thatMovie)
             })
             .catch((error) => {
                setMovie({});
                console.log(error)
             })
    }, [])
    return ( 
        <div>
            <p>Title: {movie.Title}</p>
            <p>DirectedBy: {movie.DirectedBy}</p>
            <p>WrittenBy: {movie.WrittenBy}</p>
            <p>ReleaseYear: {movie.ReleaseYear}</p>
            <p>Genre: {movie.Genre}</p>
            <p>Rating: {movie.Rating}</p>
        </div> 
    );
}
 
export default ShowMovie;