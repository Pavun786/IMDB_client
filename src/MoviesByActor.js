import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {API} from "./Global.js"
import { colors } from "@mui/material";


function MoviesByActor(){

  const [movieByActor,setMovieByActor]= useState("")
  const {id} = useParams()
  const navigate = useNavigate()
  let role = localStorage.getItem("Role")
   

    useEffect(()=>{
        fetch(`${API}/actor/${id}`,{
            method: "GET"
        }).then((dt)=> dt.json())
        .then((mv)=> setMovieByActor(mv))
    },[])

     console.log(movieByActor)


   const deleteActor =(id)=>{
      fetch(`${API}/actor/${id}`,{
        method : "DELETE"
      }).then(()=>navigate("/movies"))
   }  

    return(
     <div className="actor-container">

      {/* <Card sx={{ maxWidth: 345 }}> */}
      <div className="actor-sub">
      <img src={movieByActor.Image?.url} className="actor-image"/>
      </div>
      <CardContent className="movie-single-actor">
        <Typography gutterBottom variant="h5" component="div">
        Actor_Name : {movieByActor.Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
       Gender : {movieByActor.Gender}
        </Typography>
       
        <Typography variant="body2" color="text.secondary">
       Bio : {movieByActor.Bio}
        </Typography>
        <Typography variant="body2"  className="movies-acted">
       Movies_Acted:{movieByActor?.Movies?.map((mv)=>{
       return(
        <div id="acted-movies">{mv.Name}</div>
       ) 
    })}
        </Typography>
      </CardContent>
      <CardActions className="actor-card btn">
        {role == 1 ? <Button size="small" onClick={()=>navigate(`/edit/actor/${movieByActor._id}`)}>Edit</Button> : null}
        {role == 1 ? <Button size="small" onClick={()=>deleteActor(`${movieByActor._id}`)}>Delete</Button> : null }
        
      </CardActions>
      
    {/* </Card> */}

    </div>
    )
}

export default MoviesByActor;