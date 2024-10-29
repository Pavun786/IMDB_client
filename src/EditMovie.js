
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, TextField, OutlinedInput, InputLabel, MenuItem, ListItemText, Select, Checkbox, Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import {API} from "./Global.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieById, updateMovie } from "./Features/slices/movieSlice.js";

const movieValidationSchema = yup.object({
  Poster: yup.string().required(),
  Year_of_Release: yup.number().required(),
  Name: yup.string().required(),
  Plot: yup.string().required().min(20),
  Trailer: yup.string().required().min(4),
  Actors: yup.array().required().min(1).max(10),
  Producer: yup.string().required(),
});

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movies, loading, error, currentMovie } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovieById(id));
  }, [dispatch, id]);

  const handleUpdateMovie = (updatedMovie) => {
    dispatch(updateMovie({ id, updatedData: updatedMovie }))
      .then(() => navigate("/movies"));  
  };

  return (
    <div>
      {loading ? "Loading..." : <EditMovieForm movie={currentMovie} onSubmit={handleUpdateMovie} />}
    </div>
  );
}

function EditMovieForm({ movie, onSubmit }) {
  const [producers, setProducers] = useState([]);
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetchActors();
    fetchProducers();
  }, []);

  const fetchActors = () => {
    fetch(`${API}/actor/allActors`, { method: "GET" })
      .then((res) => res.json())
      .then((actors) => setNames(actors));
  };

  const fetchProducers = () => {
    fetch(`${API}/producer/allProducers`, { method: "GET" })
      .then((res) => res.json())
      .then((producers) => setProducers(producers));
  };

  const { handleSubmit, values, handleChange, handleBlur, touched, errors, setFieldValue } = useFormik({
    initialValues: {
      Name: movie?.Name || "",
      Year_of_Release: movie?.Year_of_Release || "",
      Plot: movie?.Plot || "",
      Trailer: movie?.Trailer || "",
      Poster: movie?.Poster?.url || "",
      Actors: movie?.Actors?.map((actor) => actor.Name) || [],
      Producer: movie?.Producer?.Name || "",
    },
    validationSchema: movieValidationSchema,
    onSubmit: (updatedMovie) => {
      const actorIds = names.filter((actor) => updatedMovie.Actors.includes(actor.Name)).map((actor) => actor._id);
      updatedMovie.Actors = actorIds;

      const producerId = producers.find((producer) => producer.Name === updatedMovie.Producer)?._id;
      updatedMovie.Producer = producerId;

      onSubmit(updatedMovie);
    },
  });

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  return (
    <form className="smallBox" onSubmit={handleSubmit}>
      <TextField 
      label="Name" 
      value={values.Name} 
      name="Name" 
      onChange={handleChange} 
      onBlur={handleBlur} 
      error={!!(touched.Name && errors.Name)} helperText={touched.Name && errors.Name ? errors.Name : null} />

      <TextField 
      label="Year_of_Release" 
      value={values.Year_of_Release}
       name="Year_of_Release" 
       onChange={handleChange} 
       onBlur={handleBlur} 
       error={!!(touched.Year_of_Release && errors.Year_of_Release)} helperText={touched.Year_of_Release && errors.Year_of_Release ? errors.Year_of_Release : null} />
      
      <TextField 
      label="Plot" 
      value={values.Plot}
       name="Plot" 
       onChange={handleChange} 
       onBlur={handleBlur} 
       error={!!(touched.Plot && errors.Plot)} helperText={touched.Plot && errors.Plot ? errors.Plot : null} />
      
      <TextField 
      label="Trailer" 
      value={values.Trailer} 
      name="Trailer" 
      onChange={handleChange} 
      onBlur={handleBlur} 
      error={!!(touched.Trailer && errors.Trailer)} helperText={touched.Trailer && errors.Trailer ? errors.Trailer : null} />
      
      <TextField 
      label="Poster" 
      value={values.Poster} 
      name="Poster" 
      onChange={handleChange} 
      onBlur={handleBlur} 
      error={!!(touched.Poster && errors.Poster)} helperText={touched.Poster && errors.Poster ? errors.Poster : null} />
      
      <InputLabel id="actors-label">Select Actors</InputLabel>
      <Select labelId="actors-label" id="actors-checkbox" multiple value={values.Actors} onChange={(event) => setFieldValue("Actors", event.target.value)} input={<OutlinedInput label="Actors" />} renderValue={(selected) => selected.join(", ")} MenuProps={menuProps}>
        {names.map((name) => (
          <MenuItem key={name._id} value={name.Name}>
            <Checkbox checked={values.Actors.includes(name.Name)} />
            <ListItemText primary={name.Name} />
          </MenuItem>
        ))}
      </Select>
      <FormLabel>Producer</FormLabel>
      <RadioGroup name="Producer" value={values.Producer} onChange={handleChange}>
        {producers.map((producer) => (
          <FormControlLabel key={producer._id} value={producer.Name} control={<Radio />} label={producer.Name} />
        ))}
      </RadioGroup>
      <Button variant="contained" type="submit">Submit</Button>
    </form>
  );
}

export default EditMovie;
