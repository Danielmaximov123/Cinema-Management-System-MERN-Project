import { IconButton, Tooltip, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { pink } from "@mui/material/colors";
import ImageUploading from "react-images-uploading";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateMovie } from "../../../redux/action/MoviesAction";

const MovieImageEdit = ({ setShowMovieImage, movie }) => {
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState("");
  const [imgUpload, setImgUpload] = useState(null);

  const onChange = (imageList) => {
    setImgUpload(imageList[0]);
  };

  useEffect(() => {
    if (movie?.Image !== null) {
      setImgUrl(movie.Image);
    } 
  }, [movie]);

  useEffect(() => {
    if (imgUrl !== "") {
      setImgUpload(null);
    }
  }, [imgUrl]);

  useEffect(() => {
    if (imgUpload !== null) {
      setImgUrl("");
    }
  }, [imgUpload]);

  const changeImageName = (e) => {
    e.preventDefault();
    let data = {
      image:
        imgUrl !== ""
          ? imgUrl
          : imgUpload !== null
          ? imgUpload?.data_url
          : null,
    };
    dispatch(updateMovie(movie._id, data)).then(() => {
      setShowMovieImage(false);
    });
  };

  return (
    <div>
      <div>
        <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Image From Url"
            style={{ marginTop: "0", marginBottom: "8px" }}
            variant="standard"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </div>
        {imgUrl === "" ? (
          <ImageUploading
            multiple
            value={imgUpload}
            onChange={onChange}
            maxNumber="1"
            dataURLKey="data_url"
          >
            {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
              <div className="upload__image-wrapper">
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

                  {imgUpload !== null || imgUrl !== "" ? (
                <div style={{ textAlign: "center" }}>
                <img className="UploadImg" style={{ width: "40%" }} src={imgUpload.data_url} alt={imgUpload.data_url !== "" ? movie?.Name : null}/>
                    <div
                      style={{
                        display: "inline-grid",
                        verticalAlign: "top",
                        marginLeft: "0.3rem",
                      }}
                      >
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
                          </div>
                    </div>
                  ) : null}
                </div>
            )}
          </ImageUploading>
        ) : null}
        {imgUrl !== "" ? (
          <div style={{ textAlign: "center" }}>
            <img style={{ width: "40%" }} src={imgUrl} alt="" />
            <Tooltip title="Delete" arrow placement="right">
              <IconButton
                variant="contained"
                component="label"
                color="primary"
                style={{
                  display: "inline-grid",
                  verticalAlign: "top",
                  marginLeft: "0.3rem",
                }}
                onClick={() => setImgUpload(null) || setImgUrl("")}
              >
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
            </Tooltip>
          </div>
        ) : null}
        <IconButton
          style={{ marginTop: "0.7rem" }}
          onClick={changeImageName}
          variant="outlined"
        >
          <CheckIcon color="success" />
        </IconButton>
        <IconButton
          style={{ marginTop: "0.7rem" }}
          onClick={() => setShowMovieImage(false)}
          variant="outlined"
        >
          <CloseIcon sx={{ color: pink[500] }} />
        </IconButton>
      </div>
    </div>
  );
};

export default MovieImageEdit;
