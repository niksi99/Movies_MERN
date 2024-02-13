import axios from "axios";
import { useState } from "react";
import { useNavigate} from "react-router-dom";

const CreateMovie = () => {

    const [Title, setTitle] = useState('')
    const [DirectedBy, setDirectedBy] = useState('')
    const [WrittenBy, setWrittenBy] = useState('')
    const [ReleaseYear, setReleaseYear] = useState('')
    const [Genre, setGenre] = useState([""])
    const [Rating, setRating] = useState(0)

    const navigate = useNavigate();

    const handleMovieCreation = (event) => {
        event.preventDefault();

        const data = {
            Title, DirectedBy, WrittenBy, ReleaseYear, Genre, Rating
        }

        axios.post("http://localhost:1001/create",data)
             .then((res) => {
                console.log(res)
                navigate('/');
             })
             .catch((error) => {
                console.log(error.message)
             })
             
    }
    return ( 
        <div>
            Add a new movie!
            <form onSubmit={handleMovieCreation}>
                <div>
                    <label htmlFor="titleInput">Title: </label>
                    <input type="text" id="titleInput"
                        required value={Title}
                        onChange={(event) => setTitle(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="directedByInput">Directed by: </label>
                    <input type="text" id="directedByInput"
                        required value={DirectedBy}
                        onChange={(event) => setDirectedBy(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="writtenByInput">Written by: </label>
                    <input type="text" id="writtenByInput"
                        required value={WrittenBy}
                        onChange={(event) => setWrittenBy(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="releaseYearInput">Release year: </label>
                    <input type="number" id="releaseYearInput"
                        required value={ReleaseYear}
                        onChange={(event) => setReleaseYear(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="genreInput">Genre: </label>
                    <input type="text" id="genreInput"
                        required value={Genre}
                        onChange={(event) => setGenre(event.target.value.split(','))}/>
                </div>
                <div>
                    <label htmlFor="ratingInput">Rating: </label>
                    <input type="number" id="ratingInput"
                        required value={Rating}
                        onChange={(event) => setRating(event.target.value)}/>
                </div>
                <button>Create</button>
            </form>
        </div>
     );
}
 
export default CreateMovie;