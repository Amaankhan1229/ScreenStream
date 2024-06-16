import Genere from "../model/genere.js";
import Movie from "../model/movie.js";
import MovieDetail from "../model/movieDetail.js";
import { Video } from "../model/video.js";


const MOVIESERVICE = {
    movieList:{
        popular:[],
        top_rated:[],
        upcoming:[],
        now_playing:[],
        searchMovie:[],
        genereList:[],
        genreMovieList:[],
        videoList:[]

    },
    getMovieList:async function (type,page){

        const response = await fetch(  `https://api.themoviedb.org/3/movie/${type}?api_key=664e565dee7eaa6ef924c41133a22b63&page=${page}`);
        const data = await response.json();
        const totalPage = data.total_pages
        const currentPage = data.page
        data.results.forEach(movie => {
            const movieObj = new Movie(movie.id,movie.original_title,movie.poster_path);
        this.movieList[type].push(movieObj);
        });
        console.log(this.movieList);
        return {movies:this.movieList[type],totalPage:totalPage,page:currentPage}
    },

    getMovieDetail:async function (movieId){
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=664e565dee7eaa6ef924c41133a22b63`);

        const data = await response.json(); 

        const movieDetailObj = new MovieDetail(data);
        return movieDetailObj.props;
    },
    getMovieBySearch:async function (query,page){

        const response = await fetch(  `https://api.themoviedb.org/3/search/movie?api_key=664e565dee7eaa6ef924c41133a22b63&query=${query}&page=${page}`);
        const data = await response.json();
        const totalPage = data.total_pages
        const currentPage = data.page
        this.movieList.searchMovie= []

        data.results.forEach(movie => {
            const movieObj = new Movie(movie.id,movie.original_title,movie.poster_path);
        this.movieList.searchMovie.push(movieObj);
        });
        return  {movies:this.movieList.searchMovie,totalPage:totalPage,page:currentPage}
    },
    getGeneres:async function(){
        const response = await fetch(  `https://api.themoviedb.org/3/genre/movie/list?api_key=664e565dee7eaa6ef924c41133a22b63`);
        const data = await response.json();
        data.genres.forEach(gen => {
            const gObj = new Genere(gen.id,gen.name);
        this.movieList.genereList.push(gObj);
        });
        return this.movieList.genereList
    },
    getMovieTrailer:async function(movieId){
        const response = await fetch(  `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=664e565dee7eaa6ef924c41133a22b63
            `);
            const data = await response.json();
            data.results.forEach((movie)=>{
                const videoDetail= new Video(movie.key,movie.name);
                this.movieList.videoList.push(videoDetail);
    
        })
                return this.movieList.videoList; 
    
    },
    getMovieByGenre:async function(genre,page){
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=664e565dee7eaa6ef924c41133a22b63&with_genres=${genre}&page=${page}`);

        const data  =  await response.json();
        const totalPage = data.total_pages
        const currentPage = data.page
        data.results.forEach(movie => {
            const movieObj = new Movie(movie.id,movie.original_title,movie.poster_path);
        this.movieList.genreMovieList.push(movieObj);
        });
        console.log(this.movieList);
        return {movies:this.movieList.genreMovieList,totalPage:totalPage,page:currentPage}
    }
}

export default MOVIESERVICE;