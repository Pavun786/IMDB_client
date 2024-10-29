import {useState } from "react";
import {useFormik} from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useNavigate } from "react-router-dom";
import * as yup from "yup";
import {API} from "./Global.js";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


const actorValidationSchema = yup.object({
 
 Name:yup.string().required(),
 Image:yup.string().required(),
 Gender:yup.string().required(),
  Bio:yup.string().required(),
 

});


function CreateActor(){
 
    const [value, setValue] = useState(null);

    const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
    initialValues:{
        Name: "",
        Image : "",
        Gender : "",
        Bio : ""
    },

    validationSchema:actorValidationSchema,
    
    onSubmit:(newActor)=>{
        // newActor.DOB = value.$d
        newActor.DOB = value ? value.$d : null;
       console.log(newActor)
      addActor(newActor);
     }
  
    })
  
  const navigate =useNavigate()
  const addActor = (newActor) => { 
     
    
   fetch(`${API}/actor/createActor`,{
      method:"POST",
      body:JSON.stringify(newActor),
      headers:{"Content-Type": "application/json"},

     }).then(()=> navigate("/movies"))
     

  } 

    return(
      <form className="smallBox" onSubmit={handleSubmit}>
      <h3>Create Actor</h3>
      <TextField 
       label="Name"
       value={values.Name}
       name="Name"
       onChange={handleChange}
       onBlur={handleBlur}
       error={touched.Name && errors.Name} 
       helperText={touched.Name && errors.Name ? errors.Name : null}
      /> 

     <TextField  
      label="Image"
      value={values.Image}
       name="Image"
       onChange={handleChange}
       onBlur={handleBlur} 
       //here error & helpertext attribute are Meterial UI feature word..
       //Inside of {...} is error message handle by formik
       error={touched.Poster && errors.Poster}
       helperText={touched.Poster && errors.Poster ? errors.Poster : null}/>


       <TextField
       label="Gender" 
       value={values.Gender}
       name="Gender"
       onChange={handleChange}
       onBlur={handleBlur} 
       error={touched.Gender && errors.Gender}
       helperText={touched.Gender && errors.Gender ? errors.Gender : null}/> 

     <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="DOB"
          name="DOB"
          onChange={(newValue) => setValue(newValue)}
          value={value}
        
        />
      </LocalizationProvider>
               
      <TextField 
      label="Bio" 
      value={values.Bio}
       name="Bio"
       onChange={handleChange}
       onBlur={handleBlur}
       error={touched.Bio && errors.Bio }
       helperText={touched.Bio && errors.Bio ? errors.Bio : null}
    />
          
     <Button variant="contained" type="submit">Create Actor</Button>
        </form>
  
    )
  }
  export default CreateActor ;