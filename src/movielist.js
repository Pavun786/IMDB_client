

import Movie from "./Moviecard";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, deleteMovie } from "./Features/slices/movieSlice.js";

function MovieList() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { movies, loading, error } = useSelector((state) => state.movies);

   useEffect(() => {
      dispatch(fetchMovies());
   }, [dispatch]);

   const handleDeleteMovie = (id) => {
      dispatch(deleteMovie(id));
   };

   if (loading) {
      return <p>Loading...</p>;
   }

   if (error) {
      return <p>Error: {error}</p>;
   }

   return (
      <div>
         <div className="App">
            {movies?.map((mv) => (
               <div key={mv._id} className="movie-card">
                  <Movie
                     movie={mv}
                     id={mv._id}
                     deleteButton={
                        <IconButton
                           onClick={() => handleDeleteMovie(mv._id)}
                           aria-label="delete"
                           color="error"
                        >
                           <DeleteIcon />
                        </IconButton>
                     }
                     editButton={
                        <IconButton
                           onClick={() => navigate(`/movie/edit/${mv._id}`)}
                           aria-label="edit"
                           color="primary"
                        >
                           <EditIcon />
                        </IconButton>
                     }
                  />
               </div>
            ))}
         </div>
      </div>
   );
}

export default MovieList;
