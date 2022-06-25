import { CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../../redux/action/MoviesAction';
import SingleMovieComp from './movie';


const AllMoviesPageComp = () => {
    const dispatch = useDispatch()
    const [searchTerm , setSearchTerm] = useState("")
    const movies = useSelector( state => state.movies.movies )
    const loading = useSelector( state => state.movies.moviesLoading )
    const [progress, setProgress] = useState(<CircularProgress style={{width: '6rem', height: '6rem', marginTop: '4rem'}}/>)

    let sortMovies = movies?.sort((a,b) => {
      return new Date(b?.CreatedDate) - new Date(a?.CreatedDate)
    })

    useEffect(() => {
      dispatch(getMovies())
    },[])

  return (
    <div>
        {loading ? <div style={{textAlign : "center"}}>{progress}</div> :
            <>
            <div style={{textAlign : "center" , marginTop : "5px"}}>
              <TextField
              id="standard-search"
              label="Search movie..."
              type="search"
              onChange={e => setSearchTerm(e.target.value)}
              variant="standard"
            />
            </div>
            <div style={{width: '73%' ,paddingTop : "2rem" , paddingBottom : "2rem" ,display : "grid" , gridTemplateColumns: '23rem 23rem 23rem' , marginLeft: 'auto' , marginRight: 'auto'}}>
            {
              sortMovies?.filter(item => {
                if(searchTerm === "") {
                  return item
                  } else if(item?.Name?.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return item
                  }
                })?.map(item => {
                  return <div style={{margin : "7px" , paddingBottom : "2rem" , height: 'auto' , border: '1px solid black', textAlign: 'center', borderRadius: '10px', }} key={item._id}>
                    <SingleMovieComp movie={item}/>
                  </div>
                })
              }
              </div>
            </> 
        }
          </div>
  )
}

export default AllMoviesPageComp