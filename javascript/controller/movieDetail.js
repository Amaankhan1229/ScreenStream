import MOVIESERVICE from "../services/movieService.js";

window.addEventListener("DOMContentLoaded",events);

function events(){
    getMovieId();
}

function getMovieId(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const movieId = urlParams.get("movieId");
    movieDetail(movieId)
}

 async function movieDetail(movieId){
   
    const movie = await MOVIESERVICE.getMovieDetail(movieId);
    const videoData = await MOVIESERVICE.getMovieTrailer(movieId);


    console.log(movie);


    showMovie(movie);
    showVideo(videoData);
}
function showMovie(movie){
    const main = document.getElementById("main");

    const backImage = document.createElement("img");

    backImage.src = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`

    // backImage.classList.add("backDropImage")
    const title = document.createElement("h1")
    title.textContent = movie.original_title

    main.appendChild(backImage)
    main.appendChild(title);
}
function showVideo(videoData){
    const main =document.getElementById("main");

    videoData.forEach(video => {
        const div = document.createElement("div")
        div.innerHTML = `<iframe width="100%" height="440" src="https://www.youtube.com/embed/${video.videoPath}" title="${video.videoName}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`

        main.appendChild(div);
        
    });

    
}