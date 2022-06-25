import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import  CheckIcon  from '@mui/icons-material/Check';
import  CloseIcon  from '@mui/icons-material/Close';
import { pink } from '@mui/material/colors';
import { useEffect } from 'react';
import { updateMovie } from './../../../redux/action/MoviesAction';

const MoviePremieredEdit = ({setShowMoviePremiered , movie}) => {
    const dispatch = useDispatch()
    const [premiered, setPremiered] = useState("");

    useEffect(() => {
      setPremiered(movie.Premiered)
    },[movie])
  
      const changePremieredName = (e) => {
          e.preventDefault();
          let data = { premiered : premiered }
          dispatch(updateMovie(movie._id , data)).then(() => {
            setShowMoviePremiered(false)
          })
        }
  return (
    <div>
        <div>
        <TextField
        id="standard-basic-date"
        label="Premiered"
        variant="standard"
        type="date"
        style={{textAlign: 'end'}}
        value={premiered}
        onChange={e => setPremiered(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <IconButton style={{marginTop: '0.7rem'}} onClick={changePremieredName} variant="outlined">
        <CheckIcon color="success" />
         </IconButton>
        <IconButton style={{marginTop: '0.7rem'}} onClick={() => setShowMoviePremiered(false)} variant="outlined">
        <CloseIcon sx={{ color: pink[500] }} />
         </IconButton>
        </div>
    </div>
  )
}

export default MoviePremieredEdit