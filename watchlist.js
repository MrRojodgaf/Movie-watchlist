let moviesFromLocalStorage = JSON.parse(localStorage.getItem("myList"))
const mode = document.getElementById('mode')

mode.addEventListener('click', function(){
    document.body.classList.toggle('black')
    if(moviesFromLocalStorage.length === 0){
        document.getElementById('plus-icon').classList.toggle('white')
    }
})

function renderList(){
    let render = ''
    if(moviesFromLocalStorage.length === 0){
        render = `<div class="explore">
                    <p class="movie-icon-label">Your watchlist is looking a little empty...</p>
                    <p class="add-movies-label"><a class="icon-link" href="index.html"><i class="fa-solid fa-circle-plus plusicon" id="plus-icon"></i></a>Let's add some movies</p>
                  </div>`
    }
    else {
        for(let data of moviesFromLocalStorage){
            render += ` <div class="movie-box">
                            <img class="poster" src="${data.Poster}">
                            <div class="data-container">
                            <h3>${data.Title}<span><i class="fa-solid fa-star star"></i>${data.imdbRating}</span></h3>
                            <div class="rgw-flex">
                                <p>${data.Runtime}</p>
                                <p class="runtime">${data.Genre}</p>
                                <div class="remove-watchlist">
                                <i id="remove-icon" class="fa-solid fa-circle-minus plus-icon" data-minus=${data.imdbID}></i>
                                <p class="remove" data-minus=${data.imdbID}>Remove</p>
                                </div>
                            </div>
                            <p class="plot">${data.Plot}</p>
                            </div>
                        </div>`            
        }
    }
        document.getElementById('movie-section').innerHTML = render
}

document.addEventListener('click', function(e){
    if(e.target.dataset.minus){
        const removedMovie = moviesFromLocalStorage.filter(function(movie){
        return e.target.dataset.minus == movie.imdbID
        })[0]
        const index = moviesFromLocalStorage.indexOf(removedMovie)
        moviesFromLocalStorage.splice(index, 1)
        localStorage.setItem("myList", JSON.stringify(moviesFromLocalStorage))
        renderList()
    }
})

renderList()
