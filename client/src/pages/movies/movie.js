import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  TableCell,
  ListItemText,
  TableBody,
  TableRow,
  TableHead,
  Table,
  Paper,
  TableContainer,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovies } from "../../redux/action/MoviesAction";
import MovieNameEdit from "./editMovie/MovieNameEdit";
import MoviePremieredEdit from "./editMovie/MoviePremieredEdit";
import MovieImageEdit from "./editMovie/MovieImageEdit";
import MovieGenresEdit from "./editMovie/MovieGenresEdit";

const SingleMovieComp = ({ movie }) => {
  const dispatch = useDispatch();
  const [showMovieName, setShowMovieName] = useState(false);
  const [showMoviePremiered, setShowMoviePremiered] = useState(false);
  const [showMovieGenres, setShowMovieGenres] = useState(false);
  const [showMovieImage, setShowMovieImage] = useState(false);
  const auth = useSelector((state) => state.auth);

  const deleteMovie = (e) => {
    dispatch(deleteMovies(movie?._id));
  };
  const showNameInput = (e) => {
    e.preventDefault();
    setShowMovieName(true);
  };
  const showPremieredInput = (e) => {
    e.preventDefault();
    setShowMoviePremiered(true);
  };
  const showGenresInput = (e) => {
    e.preventDefault();
    setShowMovieGenres(true);
  };

  const showImageInput = (e) => {
    e.preventDefault();
    setShowMovieImage(true);
  };

  return (
    <div>
      <div
        style={{
          display: "block",
          float: "left",
          marginLeft: "0.5rem",
          width: "100%",
          textAlign: "left",
        }}
      >
        {auth.permissions.Delete_Movies && (
          <IconButton onClick={deleteMovie} color="error" variant="outlined">
            <DeleteIcon />
          </IconButton>
        )}
      </div>
      {!showMovieName ? (
        <div style={auth?.permissions.Update_Subscriptions ? {marginTop: "0rem" , marginBottom : "10px" , display: '-webkit-inline-box'} : {marginTop: "1rem" , marginBottom : "10px" , display: '-webkit-inline-box'}}>
          <h3 style={{marginBottom: '0px', marginTop: "0px"}}>{movie?.Name}</h3>
          {auth.permissions.Update_Movies && (
            <IconButton
              style={{ padding: "0", marginLeft: "0.5rem" }}
              onClick={showNameInput}
              variant="outlined"
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
      ) : (
        <MovieNameEdit setShowMovieName={setShowMovieName} movie={movie} />
      )}
      <br />
      {!showMoviePremiered ? (
        <div style={{ marginBottom: "10px", display: "-webkit-inline-box" }}>
          <span style={{ display: "block" }}>{movie?.Premiered}</span>
          {auth.permissions.Update_Movies && (
            <IconButton
              style={{ padding: "0", marginLeft: "0.5rem" }}
              onClick={showPremieredInput}
              variant="outlined"
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
      ) : (
        <MoviePremieredEdit
          setShowMoviePremiered={setShowMoviePremiered}
          movie={movie}
        />
      )}
      <br />
      {!showMovieImage ? (
        <div style={{ marginBottom: "10px", display: "-webkit-inline-box" }}>
          <div>
            <img
              src={
                movie?.Image === null
                  ? "https://elitegymequipment.com/wp-content/uploads/2020/04/Life-Fitness-Bicep-Curl.jpg"
                  : movie?.Image
              }
              alt={movie?.name}
              style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "5px",
                width: "150px",
              }}
            />
          </div>
          {auth.permissions.Update_Movies && (
            <IconButton
              style={{ padding: "0", marginLeft: "0.5rem" }}
              onClick={showImageInput}
              variant="outlined"
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
      ) : (
        <MovieImageEdit setShowMovieImage={setShowMovieImage} movie={movie} />
      )}
      {!showMovieGenres ? (
        <div style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
          Genres :{" "}
          {movie?.Genres?.map((item, index) => <span key={index}>{ (index ? ' | ' : '') + item }</span>)}
          {auth.permissions.Update_Movies && (
            <IconButton
              style={{ padding: "0", marginLeft: "0.5rem" }}
              onClick={showGenresInput}
              variant="outlined"
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
      ) : (
        <MovieGenresEdit
          setShowMovieGenres={setShowMovieGenres}
          movie={movie}
        />
      )}
      <div>
        Subscriptions Watched :
        {movie?.Subscriptions?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table
              className="table-Movies-Watched"
              size="small"
              style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ padding: "6px 4px" }}>
                    Movie Name
                  </TableCell>
                  <TableCell align="left" style={{ padding: "6px 4px" }}>
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movie?.Subscriptions.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell
                      align="left"
                      style={{ padding: "6px 4px", width: "80%" }}
                    >
                      <ListItemText>{item?.SubscriptionsName}</ListItemText>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ padding: "6px 4px", width: "10%" }}
                    >
                      <ListItemText>{item?.Date}</ListItemText>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert
            severity="warning"
            style={{
              borderRadius: "0.7rem",
              width: "18rem",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "1rem",
            }}
          >
            There are no subscribers to this movie!
          </Alert>
        )}
      </div>
    </div>
  );
};

export default SingleMovieComp;
