import { IconButton, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  CheckIcon  from '@mui/icons-material/Check';
import  CloseIcon  from '@mui/icons-material/Close';
import { pink } from '@mui/material/colors';
import { updateMovie } from './../../../redux/action/MoviesAction';

const MovieNameEdit = ({setShowMovieName , movie}) => {
    const dispatch = useDispatch()
    const [movieName, setMovieName] = useState("");

    useEffect(() => {
      setMovieName(movie.Name)
    },[movie])


    const changeMovieName = (e) => {
        e.preventDefault();
        let data = { name : movieName }
        dispatch(updateMovie(movie._id , data)).then(() => {
          setShowMovieName(false)
        })
      }

  return (
    <div>
        <div>
          <TextField
          id="standard-basic"
          label="Movie Name"
          style={{ marginTop: "0", marginBottom: "8px" }}
          variant="standard"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <IconButton style={{marginTop: '0.7rem'}} onClick={changeMovieName} variant="outlined">
        <CheckIcon color="success" />
         </IconButton>
        <IconButton style={{marginTop: '0.7rem'}} onClick={() => setShowMovieName(false)} variant="outlined">
        <CloseIcon sx={{ color: pink[500] }} />
         </IconButton>
        </div>
    </div>
  )
}

export default MovieNameEdit