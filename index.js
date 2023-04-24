const text = document.getElementById('text')
const searchBtn = document.getElementById('search-btn')
const mode = document.getElementById('mode')
let allMovieArray = []

mode.addEventListener('click', function(){
    document.body.classList.toggle('black')
})


async function getMovieList(){
    const titleArray = []
    const prom = await fetch(`https://www.omdbapi.com/?s=${text.value}&apikey=786c1d7b`)
    const data = await prom.json()
    if(data.Search){
        for(let movie of data.Search){
        titleArray.push(movie.Title)
        }
        getMovieInfo(titleArray)
    }
    else {
        document.getElementById('movie-section').innerHTML = `
                    <div class="explore">
                        <i class="fa-sharp fa-solid fa-circle-xmark movie-icon"></i>
                        <p class="movie-icon-label" style="font-size: 1.5em;">${data.Error}😩</p>
                    </div>`
    }
}

function getMovieInfo(movieArr){
    allMovieArray = []
    for(let title of movieArr) {
        fetch(`https://www.omdbapi.com/?t=${title}&apikey=786c1d7b`)
        .then(res => res.json())
        .then(data => {
           allMovieArray.push(data)
           renderMovie(allMovieArray)
        })
    }    
}

function renderMovie(array){
    let render = ''
    for(let data of array){
        render += `<div class="movie-box">
                    <img class="poster" src="${data.Poster}">
                    <div class="data-container">
                    <h3>${data.Title}<span><i class="fa-solid fa-star star"></i>${data.imdbRating}</span></h3>
                    <div class="rgw-flex">
                        <p>${data.Runtime}</p>
                        <p class="runtime">${data.Genre}</p>
                        <div id="add-watchlist${data.imdbID}" class="add-watchlist">
                        <i class="fa-solid fa-circle-plus plus-icon" data-add=${data.imdbID}></i>
                        <p class="watchlist">Watchlist</p>
                        </div>
                    </div>
                    <p class="plot">${data.Plot}</p>
                    </div>
                </div>`
    
    }
    document.getElementById('movie-section').innerHTML = render
}


searchBtn.addEventListener('click', getMovieList)
document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        const clickedMovie = allMovieArray.filter(function(movie){
            return e.target.dataset.add == movie.imdbID
        })[0]
        const movieHistory = JSON.parse(localStorage.getItem('myList'))
        if(!movieHistory.includes(clickedMovie)){
            movieHistory.push(clickedMovie)
            localStorage.setItem("myList", JSON.stringify(movieHistory))
            document.getElementById('num-span').innerHTML = movieHistory.length
            document.getElementById(`add-watchlist${e.target.dataset.add}`).innerHTML = `<p class="watchlist">Added to watchlist<i class="fa-solid fa-circle-check"></i></p>`
        }
    }
})





