import IconButton from '@mui/material/IconButton';
import  CheckIcon  from '@mui/icons-material/Check';
import  CloseIcon  from '@mui/icons-material/Close';
import { pink } from '@mui/material/colors';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMoviesForSubs } from '../../redux/action/MoviesAction';
import { useState } from 'react';
import { TextField, CircularProgress, Autocomplete } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';
import { addMovieSubs } from '../../redux/action/membersAction';
import { addSubsMovie } from '../../redux/action/MoviesAction';


const AddMoviesSubsComp = ({member , setAddMovieSubs}) => {
    const dispatch = useDispatch()
    const moviesSubs = useSelector(state => state.movies.moviesSubs)
    const [movieSelect, setMovieSelect] = useState('')
    const [date, setDate] = useState('')
    const [progress, setProgress] = useState(<CircularProgress style={{width: '1.7rem', height: '1.7rem' , marginRight: 'auto' , marginLeft: 'auto'}}/>)


    useEffect(() => {
      dispatch(getMoviesForSubs())
  },[dispatch])

  const movies =  moviesSubs?.map(item => ({id : item?.id , name : item?.name}))

    const timestamp = new Date(date).getTime();
    const dateFormat = new Date(timestamp);

    const addMovieForSubs = (e) => {
        e.preventDefault()
        let filterMovieId = member.Movies.find(movie => movie.MovieId === movieSelect.id)
        let data = {MovieId : movieSelect.id , MovieName : movieSelect.name , Date : dateFormat.toLocaleDateString('es-SV')}
        let SubscriptionData = {SubscriptionsId : member._id , SubscriptionsName : member.Name , Date : dateFormat.toLocaleDateString('es-SV')}
        if(filterMovieId !== undefined) {
          toast.error("Movie is exist in this member!")
        }
        else if (movieSelect.name === undefined && movieSelect.id === undefined && date !== ""){
          toast.error("Movie was not chosen!")
        }
      
      else if (movieSelect.name !== "" && movieSelect.id !== "" && date === ""){
        toast.error("Date was not chosen!")
        }
    
      else if(movieSelect.name === undefined && movieSelect.id === undefined && date === undefined) {
        toast.error("Movie and Date were not chosen!")
        }

      else {
        dispatch(addMovieSubs(member._id , data)).then((movieData) => {
          dispatch(addSubsMovie(movieSelect.id , SubscriptionData))
        })
        setAddMovieSubs(false)
      }
    }

  return (
    <div>
        <form onSubmit={addMovieForSubs}>
          <Stack style={{width: '13rem', marginLeft: 'auto', marginRight: 'auto'}}>
            {movies !== undefined ? 
            <Autocomplete
            id="cinema_Movie"
            getOptionLabel={movies => `${movies?.name}`}
            options={movies === undefined ? progress : movies}
            sx={{width : '13rem'}}
            onChange={e => setMovieSelect({name : e.target.innerText , id : e.target.dataset.id})}
            isOptionEqualToValue={(option, value) => 
              option?.id === value?.id
            }
            noOptionsText={"NO AVAILABLE MOVIES..."}
            renderOption={(props , movies) => (
              <Box component="li" {...props} key={movies?.id} data-id={movies?.id}>
                {movies?.name}
              </Box>
            )}
            renderInput={params => <TextField variant="standard" {...params} label="Search Movie" />}
            /> 
            : progress
            }
         <TextField
        fullWidth
        id="standard-basic-date"
        label="Date"
        variant="standard"
        type="date"
        sx={{width : '13rem' , marginTop : "0.5rem"}}
        onChange={e => setDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
          </Stack>
        <IconButton type='submit' style={{marginTop: '0.7rem'}} onClick={addMovieForSubs} variant="outlined">
        <CheckIcon color="success" />
         </IconButton>
        <IconButton style={{marginTop: '0.7rem'}} onClick={() => setAddMovieSubs(false)} variant="outlined">
        <CloseIcon sx={{ color: pink[500] }} />
         </IconButton>
        </form>
    </div>
  )
}

export default AddMoviesSubsComp