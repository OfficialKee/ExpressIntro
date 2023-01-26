const express = require('express');
const app = express();
const port = 3000;


app.use(express.json()) //This line is necessary for Express to be able to parse JSON in requests body

let favoriteMovieList = [{
    title: 'Star Wars',
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    title: 'The Avengers',
    starRating: 4,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}];

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/all-movies', (req, res) => {
    res.json({
        success: true,
        'all-movies': favoriteMovieList

    })
})
app.get('/single-movie/:titleToFind', (req, res) => {
    const getMovie = favoriteMovieList.find(movie => {
        return movie.title = req.params.titleToFind
    })
    res.json({
        success: true,
        'single-movie': getMovie

    })
})
app.post('/new-movie', (req, res) => {
    const newMovie = {}

    newMovie.title = req.body.title
    newMovie.starRating = req.body.starRating
    newMovie.isRecommended = req.body.isRecommended
    newMovie.createdAt = new Date()
    newMovie.lastModified = new Date()

    favoriteMovieList.push(newMovie)

    res.json({
        success: true,

    })
})
app.put("/update-movie/:titleToUpdate", (req, res) => {
    const foundTitle = req.params.titleToUpdate

    const findMovieTitle = favoriteMovieList.find(movieTitle => {
        return movieTitle.title === foundTitle
    })
    const findMovieIndex = favoriteMovieList.findIndex(movie=> {
        return movie.title === foundTitle
    })
    if (!findMovieTitle) {
		res.json({
			success: false,
			message: "Could not find Movie in  list"
		})
		return
	}


    const updatedMovie ={}

    if (req.body.title !== undefined){
		updatedMovie.title = req.body.title
	} else {
		updatedMovie.title = findMovieTitle.title
	}

	if (req.body.starRating !== undefined){
		updatedMovie.starRating = req.body.starRating
	} else {
		updatedMovie.title = findMovieTitle.starRating
	}

	if (req.body.isRecommended !== undefined){
		updatedMovie.isRecommended= req.body.isRecommended
	} else {
		updatedMovie.isRecommended = findMovieTitle.isRecommended
	}


    updatedMovie.createdAt = favoriteMovieList[findMovieIndex].createdAt
    updatedMovie.lastModified = new Date()

    favoriteMovieList[findMovieIndex] = updatedMovie
    res.json({
        success:true,
        updatedMovie: updatedMovie
        
    })
})
app.delete('/delete-movie/:titleToDelete',(req,res)=>{
    
    const deleteTitle = req.params.titleToDelete

    const deleteMovieTitle = favoriteMovieList.find(movieTitle => {
        return movieTitle.title === deleteTitle
    })
    const deleteMovieIndex = favoriteMovieList.findIndex(movie=> {
        return movie.title === deleteTitle
    })
     favoriteMovieList = favoriteMovieList.filter(movie =>{
        return movie.title !== deleteTitle
     })
     res.json({
        success:true,
        newList: favoriteMovieList
     })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})