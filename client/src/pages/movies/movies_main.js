  import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AllMoviesPageComp from './all Movies';
import AddMovieComp from './addMovie';
import { getMovies } from '../../redux/action/MoviesAction';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import AddIcon from '@mui/icons-material/Add';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Box } from '@mui/system';

const MoviesPageComp = () => {
    const dispatch = useDispatch()
    const [addMovie, setAddMovie] = useState(false)
    const [allMovies, setAllMovies] = useState(true)
    const [value, setValue] = useState(0);
    const auth = useSelector( state => state.auth)

    useEffect(() => {
      document.title = "Movies"
   }, []);

    const showAllMovies = (e) => {
      e.preventDefault()
      setAllMovies(true)
      setAddMovie(false)
    }

    const showAddMovie = (e) => {
      e.preventDefault()
      setAddMovie(true)
      setAllMovies(false)
    }

    useEffect(() => {
        dispatch(getMovies())
    },[])

    useEffect(() => {
      if(allMovies === true) {
        setAddMovie(false)
      }
    },[allMovies])

    useEffect(() => {
      if(addMovie === true) {
        setAllMovies(false)
      }
    },[addMovie])

  return (
    <div>
      <div style={{textAlign : "center"}}>
      <h1>Movies</h1>
      <Box sx={{ width: 500 ,marginLeft: 'auto', marginRight: 'auto'}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        { auth?.permissions?.View_Movies ? <BottomNavigationAction onClick={showAllMovies} label="All Movies" icon={<LocalMoviesIcon />} /> : null}
        { auth?.permissions?.Create_Movies ? <BottomNavigationAction onClick={showAddMovie}  label="Add Movies" icon={<AddIcon />} /> : null}
      </BottomNavigation>
    </Box>
    </div>
        {allMovies && <AllMoviesPageComp/>}
        {addMovie && <AddMovieComp setAllMovies={setAllMovies} setAddMovie={setAddMovie}/>}


    </div>
  )
}

export default MoviesPageComp