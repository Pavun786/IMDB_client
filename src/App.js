// import './App.css';
// import {Routes,Route,Link, Navigate,useParams, useNavigate} from "react-router-dom"
// import MovieList from './movielist';
// import NotFound from './notfound';
// import AddMovie from './Addmovie';
// import { useState} from "react";
// import Button from '@mui/material/Button';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import MovieDetails from './MovieDetails';
// import EditMovie from './EditMovie';
// import { Login } from './Login';
// import { Register } from './Register';
// import Home from './Home';
// import MoviesByActor from './MoviesByActor';
// import CreateActor from './CreateActor';
// import EditActor from './EditActor';
// import CreateProducer from './CreateProducer';
// import EditProducer from './EditProducer';
// import MoviesByProducer from './MoviesByProducer';
// import ProtectedRoute from './ProtectedRoute';



// function App() {
//   const [data, setData] = useState();
  
//   const navigate=useNavigate()
  
//  const[mode,setMode]=useState('light')

//   const darkTheme = createTheme({
//     palette: {
//       mode: mode,
//     },
//   });
  
//    const token = localStorage.getItem("token")
//    const role = localStorage.getItem("Role")

//    const LoggingOut=()=>{
  
//      localStorage.clear()
//      navigate("/")
//   }

//   return (
//       <ThemeProvider theme={darkTheme}>
//         <Paper elevation={4} style={{minHeight:"100vh"}}>
//       <div>
//          <AppBar position="static">
//         <Toolbar>
          
//           <Button onClick={()=>navigate("/movies")}color="inherit">Movielist</Button>
//           { role == 1 ? <Button onClick={()=>navigate("/addmovie")}color="inherit">AddMovie</Button> : null}
//           { role == 1 ? <Button onClick={()=>navigate("/actor")}color="inherit">Add Actor</Button> : null}
//           { role ==1 ? <Button onClick={()=>navigate("/producer")} color="inherit">Add Producer</Button> : null }
          
//          <Button 
          
//            sx={{marginLeft:"auto"}}
//            startIcon={mode ==="dark" ? <Brightness7Icon /> : <Brightness4Icon /> }
//           onClick={()=>setMode( mode === "light" ? "dark":"light")}color="inherit">
            
//             {mode=== "light" ? "dark":"light"}mode</Button>

//            {
//              token ?  <Button onClick={()=>LoggingOut()}color="inherit">
//              Logout
//             </Button> : "Login"
//            } 
           
//         </Toolbar>
//       </AppBar> 
       
//       <Routes>
//         <Route path="/" element={<Login/>}/>
//         <Route path="/register" element={<Register/>}/>
//         <Route path="/home" element={<Home/>}/>
//         <Route path='/movies' element={
//         <ProtectedRoute>
//         <MovieList/>
//         </ProtectedRoute>} />
        
//         <Route path='*' element={<NotFound/>} />
//         <Route path='/flims' element={<Navigate replace to ="/movies"/>}/>
//         <Route path='/addmovie' element={
//           <ProtectedRoute>
//           <AddMovie addMovieData={data} setMovieData={setData}/>
//           </ProtectedRoute>
//           }/>
//         <Route path='/movie/:id' element={
//         <ProtectedRoute>
//         <MovieDetails movie={data} setMovie={setData}/>
//         </ProtectedRoute>
//         } />
//         <Route path='/movie/edit/:id' element={<EditMovie/>} />
//         <Route path='/actor/:id' element={<MoviesByActor/>}/>
//         <Route path='/producer/:id' element={<MoviesByProducer/>}/>
//         <Route path='/actor' element={<CreateActor/>}/>
//         <Route path='/edit/actor/:id' element={<EditActor/>}/>
//         <Route path='/producer' element={<CreateProducer/>}/>
//         <Route path='/edit/producer/:id' element={<EditProducer/>}/>
       
//       </Routes>
//    </div>
//        </Paper>
//        </ThemeProvider>
//   )
//         }
    
// export default App;


import './App.css';
import {Routes,Route,Link, Navigate,useParams, useNavigate} from "react-router-dom"
import MovieList from './movielist';
import NotFound from './notfound';
import AddMovie from './Addmovie';
import { useState} from "react";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MovieDetails from './MovieDetails';
import EditMovie from './EditMovie';
import { Login } from './Login';
import { Register } from './Register';
import Home from './Home';
import MoviesByActor from './MoviesByActor';
import CreateActor from './CreateActor';
import EditActor from './EditActor';
import CreateProducer from './CreateProducer';
import EditProducer from './EditProducer';
import MoviesByProducer from './MoviesByProducer';
import ProtectedRoute from './ProtectedRoute';
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect } from 'react';

function App() {
  const [mode, setMode] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState();
  
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

     const token = localStorage.getItem("token")
     const role = localStorage.getItem("Role")
     const userName = localStorage.getItem("userName")

   const LoggingOut=()=>{
  
     localStorage.clear()
     navigate("/")
  }

  // Close sidebar when resizing the window
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false); 
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={4} style={{ minHeight: "100vh" }}>
        <div className="navbar">
          <AppBar position="static">
            <Toolbar>
              <MenuIcon className="menu-icon" onClick={toggleSidebar} />
              <div className='nav-items'>
              <Button onClick={() => handleNavigation("/movies")} color="inherit">
                Movie List
              </Button>
              { role == 1 ? <Button onClick={()=>navigate("/addmovie")}color="inherit">AddMovie</Button> : null}
           { role == 1 ? <Button onClick={()=>navigate("/actor")}color="inherit">Add Actor</Button> : null}
           { role ==1 ? <Button onClick={()=>navigate("/producer")} color="inherit">Add Producer</Button> : null }
           </div>

              
              <Button
                sx={{ marginLeft: "auto" }}
                startIcon={mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                color="inherit"
              >
                {mode === "light" ? "Dark" : "Light"} Mode
              </Button>
               <div >{userName}</div>
              {
            token ?  <Button onClick={()=>LoggingOut()}color="inherit">
              Logout
             </Button> : "Login"
            } 
            </Toolbar>
          </AppBar>

          {/* Sidebar */}
          <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}  id={mode === "light" ? "light-mode" : "dark-mode"}>
            <button className="close-menu" onClick={toggleSidebar}>
              Close
            </button>
            <Link to="/movies" onClick={() => handleNavigation("/movies")}>
              Movie List
            </Link>
           
            {role == 1 ? (
              <>
                <Link to="/addmovie" onClick={() => handleNavigation("/addmovie")}>
                Add Movie
               </Link>
               <Link to="/actor" onClick={() => handleNavigation("/actor")}>
                Add Actor
               </Link>
               <Link to="/producer" onClick={() => handleNavigation("/producer")}>
               Add Producer
              </Link>
                 </>
           ) : null}

            
          </div>

        
          <Routes>
       <Route path="/" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
         <Route path="/home" element={<Home/>}/>
         <Route path='/movies' element={
        <ProtectedRoute>
        <MovieList/>
        </ProtectedRoute>} />
        
        <Route path='*' element={<NotFound/>} />
        <Route path='/flims' element={<Navigate replace to ="/movies"/>}/>
        <Route path='/addmovie' element={
          <ProtectedRoute>
          <AddMovie addMovieData={data} setMovieData={setData}/>
          </ProtectedRoute>
          }/>
        <Route path='/movie/:id' element={
        <ProtectedRoute>
        <MovieDetails movie={data} setMovie={setData}/>
        </ProtectedRoute>
        } />
        <Route path='/movie/edit/:id' element={<EditMovie/>} />
        <Route path='/actor/:id' element={<MoviesByActor/>}/>
        <Route path='/producer/:id' element={<MoviesByProducer/>}/>
        <Route path='/actor' element={<CreateActor/>}/>
        <Route path='/edit/actor/:id' element={<EditActor/>}/>
        <Route path='/producer' element={<CreateProducer/>}/>
        <Route path='/edit/producer/:id' element={<EditProducer/>}/>
       
      </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;

