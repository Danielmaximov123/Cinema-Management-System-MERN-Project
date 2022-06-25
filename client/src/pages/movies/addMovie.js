import { Button, IconButton, TextField, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import genres from './genres.json'
import { MultiSelect } from 'react-multi-select-component';
import './style.css'
import ImageUploading from 'react-images-uploading';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from 'react-redux';
import { addMovie } from '../../redux/action/MoviesAction';


const AddMovieComp = ({setAllMovies}) => {
  const dispatch = useDispatch()
  const [movieName, setMovieName] = useState("")
  const [selectedGenres, setSelectedGenres] = useState([])
  const [imgUrl, setImgUrl] = useState("")
  const [imgUpload, setImgUpload] = useState(null)
  const [premiered, setPremiered] = useState("")

  const onChange = (imageList, addUpdateIndex) => {
    setImgUpload(imageList[0]);
  };

  let genresSelected = selectedGenres.map(item => {
    return item.value
  })
  
const customValueRenderer = (selected, _options) => {
  return selected.length
    ? selected.map(({ label }) => label + " ")
    : "Select Genres...";
};

useEffect(() => {
  if(imgUrl !== "") {
    setImgUpload(null)
  }
},[imgUrl])

useEffect(() => {
  if(imgUpload !== null ) {
    setImgUrl("")
  }
},[imgUpload])


const addNewMovie = (e) => {
  e.preventDefault()
  let data = { name : movieName , premiered , genres : genresSelected  , image : imgUrl !== "" ? imgUrl : imgUpload !== null ? imgUpload?.data_url : null }
  dispatch(addMovie(data))
  setAllMovies(true)
}

  return (
    <div>
      <form onSubmit={(e) => addNewMovie(e)} style={{width : "30%" , margin : "auto"}}>
      <TextField fullWidth id="standard-basic" label="Movie Name" style={{ marginTop: "0", marginBottom: "8px" }} variant="standard" value={movieName} onChange={(e) => setMovieName(e.target.value)} />
      <MultiSelect
        options={genres}
        valueRenderer={customValueRenderer}
        value={selectedGenres}
        onChange={setSelectedGenres}
      />
      <TextField
        fullWidth
        id="standard-basic-date"
        label="Premiered"
        variant="standard"
        type="date"
        style={{textAlign: 'end'}}
        onChange={e => setPremiered(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <div>
        <TextField fullWidth id="standard-basic" label="Image From Url" style={{ marginTop: "0", marginBottom: "8px" }} variant="standard" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
        </div>
         {imgUrl === "" ? 
         <ImageUploading
            multiple
            value={imgUpload}
            onChange={onChange}
            maxNumber="1"
            dataURLKey="data_url"
          >
            {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
              <div
                className="upload__image-wrapper"
              >
                {imgUpload === null || imgUpload.length === 0 ? (
                  <>
                    <Button
                      variant="contained"
                      component="label"
                      color="primary"
                      onClick={onImageUpload}
                    >
                      <PhotoCamera /> Upload image
                    </Button>
                  </>
                ) : null}
                
                <div style={{textAlign : "center"}}>
                <img style={{width: '40%'}} src={imgUpload?.data_url} alt=""/>
                {
                  imgUpload !== null || imgUrl !== "" ? <div
                  style={{ display: "inline-grid", verticalAlign: "top", marginLeft: "0.3rem" }}>
                  <Tooltip title="Delete" arrow placement="right">
                    <IconButton
                      variant="contained"
                      component="label"
                      color="primary"
                      onClick={() => setImgUpload(null) || setImgUrl("")}
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </Tooltip>
                </div> : null
                }
                </div>
              </div>
            )}
          </ImageUploading> : null}
          {
            imgUrl !== "" ? <div style={{textAlign: 'center'}}>
              <img style={{width: '40%'}} src={imgUrl} alt=""/>
              <Tooltip title="Delete" arrow placement="right">
                    <IconButton
                      variant="contained"
                      component="label"
                      color="primary"
                      style={{display: "inline-grid", verticalAlign: "top", marginLeft: "0.3rem"}}
                      onClick={() => setImgUpload(null) || setImgUrl("")}
                    >
                      <DeleteIcon sx={{ color: "red"  }} />
                    </IconButton>
                  </Tooltip>
            </div> : null
          }
          <div style={{ margin: 'auto', width: '55%', padding: '1rem' }}>
          <Button style={{marginRight : "5px"}} variant="contained" color="error" onClick={() => setAllMovies(true)}>Cancel</Button>
          <Button type='submit' variant="contained" color="primary">Add new movie</Button>
          </div>
      </form>
    </div>
  )
}

export default AddMovieComp