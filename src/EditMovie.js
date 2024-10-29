// import { useState,useEffect } from "react";
// import {useFormik} from "formik";
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { useNavigate,useParams } from "react-router-dom";
// import * as yup from "yup";
// import {API} from "./Global.js";
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';

// import FormLabel from '@mui/material/FormLabel';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMovieById,updateMovie } from "./Features/slices/movieSlice.js";

// const movieValidationSchema = yup.object({
//   Poster:yup.string().required(),
//  Year_of_Release : yup.number().required(),
//  Name:yup.string().required(),
//  Plot:yup.string().required().min(20),
//  Trailer:yup.string().required().min(4),
//  Actors:yup.array().required().min(0).max(10),
//  Producer : yup.string().required()

// });

// function EditMovie(){
     
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const {movies, loading, error, currentMovie} = useSelector((state) => state.movies);

 
//    //const movie = useSelector((state) => state.movies.currentMovie);
  

//   useEffect(() => {
//     dispatch(fetchMovieById(id));
//   }, [dispatch, id]);

//   const handleUpdateMovie = (updatedMovie) => {
//     dispatch(updateMovie({ id, movieData: updatedMovie }))
//     .then(() =>
//       navigate("/movies")
//     );
//   };
 
//   return(
//     <div>
//         {/* here table came befor than data..its not correctway.so,we set a conditional rendering */}
//         {loading ? "Loading..." : <EditMovieForm movie={currentMovie} onSubmit={handleUpdateMovie} />}
 
//     </div>
//  )
 
  
// }
//   function EditMovieForm({movie,onSubmit}){ 

//     console.log("movie",movie)
//     const [producers,setProducers]= useState([])
//     const [names,setNames] = useState([])

//     const ITEM_HEIGHT = 48;
//     const ITEM_PADDING_TOP = 8;
//     const menuProps = {
//      PaperProps: {
//        style: {
//          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//          width: 250,
//     },
//   },
// };



// useEffect(()=>{
//   getAllActors()
//   getAllProducers()
// },[])

// const navigate =useNavigate()


// const getAllActors = ()=>{
        
//   fetch(`${API}/actor/allActors`,{
//      method : "GET"
//    }).then((dt)=> dt.json())
//      .then((val)=> setNames(val))

// }


// const getAllProducers = ()=>{

//   fetch(`${API}/producer/allProducers`,{
//     method : "GET"
//   }).then((dt)=> dt.json())
//  .then((val)=> setProducers(val.map((ele)=>ele)))

// }




//     let res = movie?.Actors?.map((ele)=> ele.Name)




//   const {handleSubmit,values,handleChange,handleBlur,touched,errors,setFieldValue} = useFormik({
//     initialValues:{
//       // Name: movie?.Name,
//       // Year_of_Release:movie?.Year_of_Release,
//       // Plot : movie?.Plot,
//       // Trailer:movie?.Trailer,
//       // Poster: movie?.Poster?.url,
//       // Actors: res ? res : [],
//       // Producer: movie?.Producer?.Name

//       Name: movie?.Name || "",
//       Year_of_Release: movie?.Year_of_Release || "",
//       Plot: movie?.Plot || "",
//       Trailer: movie?.Trailer || "",
//       Poster: movie?.Poster?.url || "",
//       Actors: movie?.Actors?.map((actor) => actor.Name) || [],
//       Producer: movie?.Producer?.Name || "",
//     },

//     validationSchema:movieValidationSchema,
    
//     onSubmit:(updateMovie)=>{

//        console.log(updateMovie)

//       //  let res = updateMovie.Actors
      
//       //  const filterIds = names.filter((obj)=> res.includes(obj.Name)).map(obj => obj._id)

//       //  updateMovie.Actors=filterIds

//       //  let res2 = updateMovie.Producer

//       //  const filterProducerIds = producers.filter((obj)=> obj.Name == res2 ).map((val)=> val._id)

//       //  updateMovie.Producer = filterProducerIds[0]


//       const actorIds = names.filter((actor) => updateMovie.Actors.includes(actor.Name)).map((actor) => actor._id);
//       updateMovie.Actors = actorIds;

//       const producerId = producers.find((producer) => producer.Name === updateMovie.Producer)?._id;
//       updateMovie.Producer = producerId;


//       console.log("Form values: ",updateMovie)
     
//       // editMovie(updateMovie);
//       onSubmit(updateMovie); 
//      }
  
//   })

  

  

  
 
// //  This is function,its trigger by onclick event   
    
//     // const editMovie = (updateMovie) => { 
  
//     // console.log(updateMovie)
    
//     // fetch(`${API}/movie/${movie._id}`,{
//     //   method:"PUT",
//     //   body:JSON.stringify(updateMovie),
//     //   headers:{"Content-Type": "application/json"},

//     //  }).then(()=> navigate("/movies"))

//     // }
    
//     return(
//     //   <form className="smallBox" onSubmit={handleSubmit}>
          
//     //       <TextField 
//     //    label="Name"
//     //    value={values.Name}
//     //    name="Name"
//     //    onChange={handleChange}
//     //    onBlur={handleBlur}
//     //    error={touched.Name && errors.Name} 
//     //    helperText={touched.Name && errors.Name ? errors.Name : null}
//     //   /> 


//     //  <TextField 
//     //    label="Year_of_Release"
//     //    value={values.Year_of_Release}
//     //    name="Year_of_Release"
//     //    onChange={handleChange}
//     //    onBlur={handleBlur}
//     //    error={touched.Year_of_Release && errors.Year_of_Release} 
//     //    helperText={touched.Year_of_Release && errors.Year_of_Release ? errors.Year_of_Release : null}
//     //   /> 


     
//     //     <TextField
//     //    label="Plot" 
//     //    value={values.Plot}
//     //    name="Plot"
//     //    onChange={handleChange}
//     //    onBlur={handleBlur} 
//     //    error={touched.Plot && errors.Plot}
//     //    helperText={touched.Plot && errors.Plot ? errors.Plot : null}/> 


               
//     //   <TextField 
//     //   label="Trailer" 
//     //   value={values.Trailer}
//     //    name="Trailer"
//     //    onChange={handleChange}
//     //    onBlur={handleBlur}
//     //    error={touched.Trailer && errors.Trailer }
//     //    helperText={touched.Trailer && errors.Trailer ? errors.Trailer : null}
//     // />
          
//     //   <TextField  
//     //   label="Poster"
//     //   value={values.Poster}
//     //    name="Poster"
//     //    onChange={handleChange}
//     //    onBlur={handleBlur} 
//     //    error={touched.Poster && errors.Poster}
//     //    helperText={touched.Poster && errors.Poster ? errors.Poster : null}/>



//     // <InputLabel id="demo-multiple-checkbox-label">Select Actors</InputLabel>
//     //     <Select
//     //       labelId="demo-multiple-checkbox-label"
//     //       id="demo-multiple-checkbox"
//     //       multiple
//     //       value={values.Actors}
//     //       onChange={(event) => setFieldValue('Actors', event.target.value)}
//     //       input={<OutlinedInput label="Tag" />}
//     //       renderValue={(selected) => selected.join(', ')}
//     //       MenuProps={MenuProps}
//     //     >
//     //       {names.map((name) => (
//     //         <MenuItem  value={name.Name}>
//     //           <Checkbox checked={values.Actors.indexOf(name.Name) > -1} />
//     //           <ListItemText primary={name.Name}  />
//     //         </MenuItem>
//     //       ))}
//     //     </Select>

//     //     <FormLabel id="demo-radio-buttons-group-label">Producer</FormLabel>
//     //     <RadioGroup
//     //     aria-labelledby="demo-radio-buttons-group-label"
//     //     value={values.Producer}
//     //     name="Producer"
//     //     onChange={handleChange}
//     //    >
//     //    {producers.map((ele)=> <FormControlLabel key={ele.Name} value={ele.Name} control={<Radio />} label={ele.Name} /> )}

        
//     //   </RadioGroup>
     
     
//     //    <Button variant="contained" type="submit">Submit</Button>
//     //     </form>

//     <form className="smallBox" onSubmit={handleSubmit}>
//       <TextField label="Name" value={values.Name} name="Name" onChange={handleChange} onBlur={handleBlur} error={!!(touched.Name && errors.Name)} helperText={touched.Name && errors.Name ? errors.Name : null} />
//       <TextField label="Year_of_Release" value={values.Year_of_Release} name="Year_of_Release" onChange={handleChange} onBlur={handleBlur} error={!!(touched.Year_of_Release && errors.Year_of_Release)} helperText={touched.Year_of_Release && errors.Year_of_Release ? errors.Year_of_Release : null} />
//       <TextField label="Plot" value={values.Plot} name="Plot" onChange={handleChange} onBlur={handleBlur} error={!!(touched.Plot && errors.Plot)} helperText={touched.Plot && errors.Plot ? errors.Plot : null} />
//       <TextField label="Trailer" value={values.Trailer} name="Trailer" onChange={handleChange} onBlur={handleBlur} error={!!(touched.Trailer && errors.Trailer)} helperText={touched.Trailer && errors.Trailer ? errors.Trailer : null} />
//       <TextField label="Poster" value={values.Poster} name="Poster" onChange={handleChange} onBlur={handleBlur} error={!!(touched.Poster && errors.Poster)} helperText={touched.Poster && errors.Poster ? errors.Poster : null} />
//       <InputLabel id="actors-label">Select Actors</InputLabel>
//       <Select labelId="actors-label" id="actors-checkbox" multiple value={values.Actors} onChange={(event) => setFieldValue("Actors", event.target.value)} input={<OutlinedInput label="Actors" />} renderValue={(selected) => selected.join(", ")} MenuProps={menuProps}>
//         {names.map((name) => (
//           <MenuItem key={name._id} value={name.Name}>
//             <Checkbox checked={values.Actors.includes(name.Name)} />
//             <ListItemText primary={name.Name} />
//           </MenuItem>
//         ))}
//       </Select>
//       <FormLabel>Producer</FormLabel>
//       <RadioGroup name="Producer" value={values.Producer} onChange={handleChange}>
//         {producers.map((producer) => (
//           <FormControlLabel key={producer._id} value={producer.Name} control={<Radio />} label={producer.Name} />
//         ))}
//       </RadioGroup>
//       <Button variant="contained" type="submit">Submit</Button>
//     </form>
  
//     )
//   }
//   export default EditMovie ;





// EditMovie Component
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
      .then(() => navigate("/movies"));  // Uncommented to navigate on submit
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
