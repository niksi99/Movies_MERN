const Movie = require('../models/Movie')

module.exports.CreateAMovie = async (req, res) => {

    const { Title, DirectedBy, WrittenBy, ReleaseYear, Genre, Rating } = req.body;
    if(Title === null) {
        return res.json({
            success: false,
            message: "Title is required"
        })
    }

    if(DirectedBy === null) {
        return res.json({
            success: false,
            message: "DirectedBy is required"
        })
    }

    if(WrittenBy === null) {
        return res.json({
            success: false,
            message: "WrittenBy is required"
        })
    }

    if(ReleaseYear === null) {
        return res.json({
            success: false,
            message: "ReleaseYear is required"
        })
    }

    if(Genre === null) {
        return res.json({
            success: false,
            message: "Genre is required"
        })
    }

    if(Rating === null) {
        return res.json({
            success: false,
            message: "Rating is required"
        })
    }

    try {
        const newMovie = await Movie.create(req.body);
        res.json({
            success: true,
            newMovie
        }) 
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports.GetAllMovies = async (req, res) => {

    try {
        const movies = await Movie.find({})

        res.json({
            success: true,
            movies
        })
    }catch(error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports.GetAMovie = async (req, res) => {

    try {
        const { id } = req.params
        const thatMovie = await Movie.findById(req.params.id)

        if(!thatMovie) {
            return res.json({
                success: false,
                message: "Nepostojeci film"
            })
        }
        res.json({
            success: true,
            thatMovie
        })
    }catch(error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports.SearchMovies = async (req, res) => {
    
    try {
        const PAGE_LIMIT = 20;
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

        const query = req.query.query || ""
        const page = (parseInt(req.query.page) - 1) || 0
        let genre = req.query.genre || ""
		let sort = parseInt(req.query.sort) || -1;
        
        genre == ""
        ? (genre = [...genreOptions])
        : (genre = genre.split(","));

        const movies3 = await Movie.aggregate( [
            {
                $match: 
                    {$and: 
                        [
                            {Title: { $regex: query, $options: "i"}}, 
                            {Genre: {$in: [...genre]}}
                        ]
                    }
            },
            {
                $sort: {Rating: sort}
            },
            {
                $skip: (page * PAGE_LIMIT)
            },
            {
                $limit: PAGE_LIMIT
            },
            ]
        )
       
        res.json({
            success: true,
            movies: movies3
        })
        }catch(error) {
            return res.json({
                success: false,
                message: error.message
        })
    }
}

module.exports.DeleteAMovie = async (req, res) => {
    const result = await Movie.createIndexes({ Title: 1 });
    console.log(`Index created: ${result}`);

    const { id } = req.params;
    const A = await Movie.findById(id)

    try {
        if(!A) {
            res.json({
                success: false,
                message: "Movie not found"
            })
        }

        const deleted = await Movie.findByIdAndDelete(id)

        res.json({
            success: true,
            message: `Obrisan je film sa aj dijem ${id}`
        })
    } catch (error) {   
        res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports.UpdateAMovie = async (req, res) => {

    try {
        
        const { Title, DirectedBy, WrittenBy, ReleaseYear, Genre, Rating } = req.body;
        if(Title === null) {
            return res.json({
                success: false,
                message: "Title is required"
            })
        }

        if(DirectedBy === null) {
            return res.json({
                success: false,
                message: "DirectedBy is required"
            })
        }

        if(WrittenBy === null) {
            return res.json({
                success: false,
                message: "WrittenBy is required"
            })
        }

        if(ReleaseYear === null) {
            return res.json({
                success: false,
                message: "ReleaseYear is required"
            })
        }

        if(Genre === null) {
            return res.json({
                success: false,
                message: "Genre is required"
            })
        }

        if(Rating === null) {
            return res.json({
                success: false,
                message: "Rating is required"
            })
        }

        const { id } = req.params;
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body) 

        if(!updatedMovie) {
            res.json({
                success: false,
                message: "Movie not found"
            })
        }

        return res.json({
            success: true,
            updatedMovie
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}