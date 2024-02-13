import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const EditMovie = () => {

    const [Title, setTitle] = useState('')
    const [DirectedBy, setDirectedBy] = useState('')
    const [WrittenBy, setWrittenBy] = useState('')
    const [ReleaseYear, setReleaseYear] = useState('')
    const [Genre, setGenre] = useState([""])
    const [Rating, setRating] = useState(0)

    const [movie, setMovie] = useState({})

    const { id } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        axios.get("http://localhost:1001/oneMovie/"+id)
             .then((res) => {
                setTitle(res.data.Title)
                setDirectedBy(res.data.DirectedBy)
                setWrittenBy(res.data.WrittenBy)
                setReleaseYear(res.data.ReleaseYear)
                setGenre(res.data.Genre)
                setRating(res.data.Rating)
             })
             .catch((error) => {
                console.log(error)
             })
    }, [])
    const handleMovieEditing = (event) => {
        event.preventDefault();

        const data = {
            Title, DirectedBy, WrittenBy, ReleaseYear, Genre, Rating
        }

        axios.put("http://localhost:1001/updateMovie/" + id, data)
             .then((res) => {
                console.log(res)
                navigate('/');
             })
             .catch((error) => {
                console.log(error)
             })

    }
    return ( 
        <div>
            Edit a movie!
            <form onSubmit={handleMovieEditing}>
                <div>
                    <label htmlFor="titleInput">Title: </label>
                    <input type="text" id="titleInput"
                        value={Title} placeholder={movie.Title}
                        onChange={(event) => setTitle(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="directedByInput">Directed by: </label>
                    <input type="text" id="directedByInput"
                        value={DirectedBy} placeholder={movie.DirectedBy}
                        onChange={(event) => setDirectedBy(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="writtenByInput">Written by: </label>
                    <input type="text" id="writtenByInput"
                        value={WrittenBy} placeholder={movie.WrittenBy}
                        onChange={(event) => setWrittenBy(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="releaseYearInput">Release year: </label>
                    <input type="number" id="releaseYearInput"
                        value={ReleaseYear} placeholder={movie.ReleaseYear}
                        onChange={(event) => setReleaseYear(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="genreInput">Genre: </label>
                    <input type="text" id="genreInput"
                        required value={Genre} placeholder={movie.Genre}
                        onChange={(event) => setGenre(event.target.value.split(','))}/>
                </div>
                <div>
                    <label htmlFor="ratingInput">Rating: </label>
                    <input type="number" id="ratingInput"
                        required value={Rating} placeholder={movie.Rating}
                        onChange={(event) => setRating(event.target.value)}/>
                </div>
                <button>Update</button>
            </form>
        </div>
     );
}
 
export default EditMovie;