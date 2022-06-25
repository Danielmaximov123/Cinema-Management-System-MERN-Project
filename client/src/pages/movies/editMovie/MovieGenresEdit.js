import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import genres from '../genres.json'
import  CheckIcon  from '@mui/icons-material/Check';
import  CloseIcon  from '@mui/icons-material/Close';
import { pink } from '@mui/material/colors';
import { MultiSelect } from 'react-multi-select-component';
import { updateMovie } from './../../../redux/action/MoviesAction';

const MovieGenresEdit = ({setShowMovieGenres , movie}) => {
    const dispatch = useDispatch()
    const [selectedGenres, setSelectedGenres] = useState([]);

    let genresSelected = selectedGenres.map(item => {
      return item.value
    })
    const customValueRenderer = (selected, _options) => {
      return selected.length
        ? selected.map(({ label }) => label + " ")
        : "Select Genres...";
    };

    const changeMovieName = (e) => {
        e.preventDefault();
        let data = { genres : genresSelected }
        dispatch(updateMovie(movie._id , data)).then(() => {
          setShowMovieGenres(false)
        })
      }

  return (
    <div>
        <div style={{display: 'block'}}>
        <MultiSelect
        options={genres}
        className="multiSelect"
        valueRenderer={customValueRenderer}
        value={selectedGenres}
        onChange={setSelectedGenres}
      />
        <IconButton style={{marginTop: '0.7rem'}} onClick={changeMovieName} variant="outlined">
        <CheckIcon color="success" />
         </IconButton>
        <IconButton style={{marginTop: '0.7rem'}} onClick={() => setShowMovieGenres(false)} variant="outlined">
        <CloseIcon sx={{ color: pink[500] }} />
         </IconButton>
        </div>
    </div>
  )
}

export default MovieGenresEdit