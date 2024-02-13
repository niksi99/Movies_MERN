import { useEffect, useState } from "react";
import axios from 'axios'
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const Home = () => {
    const genreOptions = [
        "Drama",
        "Action",
        "Adventure",
        "Horror",
        "Sci-Fi",
        "Thriller",
        "Romance",
        "Comedy",
        "Animation",
        "Fantasy",
    ];

    const [movies, setMovies] = useState([])
    const [searching, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState(-1)
    const [genre, setGenre] = useState([""])
    const navigate = useNavigate();
    //const { id } = useParams();
    
    const handleClickDelete = async (id) => {

        const del = await axios.delete("http://localhost:1001/deleteOne/" + id)
            //  .then((result) => {
            //     // console.log(result)
            //     // navigate("/")
            //  })
            //  .catch((error) => {
            //     console.log(error)
            //  })
        const res = await axios.get(`http://localhost:1001/searchMovies?query=${searching}`)
        setMovies(res.data.movies)
            //  window.location.reload(false)
    }

    useEffect(() => {
        const getAllMovies = async () =>{

            try {
                console.log("Search: " + searching)
                const genresCombined = genre.join(`,`)
                const res = await axios.get(`http://localhost:1001/searchMovies?query=${searching}&page=${page}&genre=${genresCombined}&sort=${sort}`)
                setMovies(() => res.data.movies)
            } catch (err) {
                console.log(err);
            }
        }
        getAllMovies();
        
    }, [searching, page, sort, genre])

    const handlePrevious = () => {
        setPage((p) => {
          if (p === 1) return p;
          return p - 1;
        });
      }
    
      const handleNext = () => {
        setPage((p) => {
          return p + 1;
        });
      }

    const searchFilms = e =>{
        setSearch(e.target.value)
    } 
    

    return ( 
        <div>Home
            <div>
                <h1>All movies</h1>

                <div className="checkListBeeg">
                    <div className="title">Your CheckList:</div>
                        <div className="checkList">
                            {genreOptions.map((item, index) => (
                            <div className="checkItem" key={index}>
                                <label htmlFor={item}>{item}</label>
                                <input type="checkbox" id={item} value={item} onChange={(e) =>{
                                    let tempGenre = [...genre]
                                    if (e.target.checked) {
                                        tempGenre = [...genre, e.target.value]
                                    }
                                    else {
                                        tempGenre.splice(genre.indexOf(e.target.value), 1);
                                    }
                                    setGenre(tempGenre)
                            }
                        }></input>
                        </div>
                        ))}
                    </div>
                </div>
                <Link to='/create'>Add new movie</Link>
            </div>
            <div>
                <label htmlFor="search">Search</label>
                <input type="search" placeholder="Search" name="search" id="search" value={searching}
                onChange={searchFilms} style={{marginRight:150}}/>

                <label>Sort --{`>`} </label>
                <label htmlFor="ascending">Ascending</label>
                <input type="radio" name="sort" id="ascending" onClick={() => setSort(1)}/>
                <label htmlFor="descending">Descending</label>
                <input type="radio" name="sort" id="descending" onClick={() => setSort(-1)} defaultChecked/>
                
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Directed by</th>
                            {/* <th>Written by</th> */}
                            <th>Release year</th>
                            <th>Rating</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie, index) => (
                            <tr key={movie._id}>
                                <td>{index + 1 + (page-1) * 20}</td>
                                <td>{movie.Title}</td>
                                <td>{movie.DirectedBy}</td>
                                {/* <td>{movie.WrittenBy}</td> */}
                                <td>{movie.ReleaseYear}</td>
                                <td>{movie.Rating}</td>
                                <td>{(movie.Genre)}</td>
                                <td><Link to={`/showMovie/${movie._id}`}>Detailed</Link></td>
                                <td><Link to={`/edit/${movie._id}`}>Edit</Link></td>
                                <td><button className="Button-warning" onClick={async () => await handleClickDelete(movie._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <button disabled={page === 1} onClick={handlePrevious}>
                        Prev
                    </button>
                    <label>{page}</label>
                    <button onClick={handleNext}>
                        Next
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default Home;