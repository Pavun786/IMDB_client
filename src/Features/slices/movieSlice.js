import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../Global';


export const fetchMovies = createAsyncThunk("movies/fetchMovies",async()=>{

      console.log("exe")
      const response = await fetch(`${API}/movie/getAllMovies`);

      if(!response.ok){
          throw new Error("Failed to fetch movies")
      }

      console.log(response)

      return await response.json()

})


export const fetchMovieById = createAsyncThunk( 'movies/fetchById',async (id) => {
    
   const response = await fetch(`${API}/movie/${id}`);

    if(!response.ok){
      throw new Error("Failed to fetch movies")
  }

   const data = await response.json();
    return data;
  }
);



export const addMovie = createAsyncThunk('movies/addMovie', async (movieData) => {
    const response = await fetch(`${API}/movie/createMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) {
      throw new Error('Failed to add movie');
    }
    
    return await response.json();
  });


  export const updateMovie = createAsyncThunk('movies/updateMovie', async ({ id, updatedData }) => {
    const response = await fetch(`${API}/movie/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Failed to update movie');
    }

    const out = await response.json()
    console.log(out)
    return out;
  });


  
  export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
    const response = await fetch(`${API}/movie/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
    return id;
  });
  




 const movieSlice = createSlice({
     
     name : "movies",
     initialState : {
         movies : [],
         currentMovie: null,
         loading : false,
         error : null
     },

    
     
     extraReducers : (builder)=>{

      
          
        builder
          .addCase(fetchMovies.pending,(state)=>{
             state.loading = true;
          })

          .addCase(fetchMovies.fulfilled,(state,action)=>{
              state.loading = false;
              state.movies = action.payload;
              console.log(state.movies)
             
          })

          .addCase(fetchMovies.rejected,(state,action)=>{
              state.loading = false;
              state.error = action.error.message
          })

         .addCase(fetchMovieById.pending, (state) => {
            state.loading = true;
            state.error = null; // Reset error on new request
          })
          .addCase(fetchMovieById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentMovie = action.payload;
            // console.log("extra",initialState)
          })
          .addCase(fetchMovieById.rejected, (state, action) => {
            state.loading= false;
            state.error= action.error.message;
          })
    
         .addCase(addMovie.fulfilled, (state, action) => {
            state.movies.push(action.payload);
          })

          .addCase(updateMovie.fulfilled, (state, action) => {
            console.log(state.movies); 
            const index = state.movies.findIndex((movie) => movie._id == action.payload._id);
            state.movies[index] = action.payload;
            
          })

          .addCase(deleteMovie.fulfilled, (state, action) => {
            state.movies = state.movies.filter((movie) => movie._id !== action.payload);
          });

     }
 })

 export default movieSlice.reducer;