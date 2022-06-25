import { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {  ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MemberNameEdit from './editMember/MemberNameEdit';
import MemberCityEdit from './editMember/MemberCityEdit';
import MemberEmailEdit from './editMember/MemberEmailEdit';
import { deleteMemberAction, deleteMovieSubs } from '../../redux/action/membersAction';
import AddMoviesSubsComp from './addMovieSubs';
import { deleteSubsMovie } from './../../redux/action/MoviesAction';



const SingleMemberComp = ({member}) => {
    const dispatch = useDispatch()
    const [showMemberName, setShowMemberName] = useState(false)
    const [showMemberEmail, setShowMemberEmail] = useState(false)
    const [showMemberCity, setShowMemberCity] = useState(false)
    const [addMovieSubs , setAddMovieSubs] = useState(false)
    const auth = useSelector((state) => state.auth);


  const deleteMember = (e) => {
    e.preventDefault()
    dispatch(deleteMemberAction(member?._id))
  }
  
  const showNameInput = (e) => {
    e.preventDefault();
    setShowMemberName(true);
  };
  const showEmailInput = (e) => {
    e.preventDefault();
    setShowMemberEmail(true);
  };
  const showCityInput = (e) => {
    e.preventDefault();
    setShowMemberCity(true);
  };

  const showAddMovies = (e) => {
    e.preventDefault();
    setAddMovieSubs(true);
  };

  const deleteMovieWatched = (id) => {
    let data = { MovieId: id.MovieId , ObjectId : id._id}
    dispatch(deleteMovieSubs(member._id , data , member.Movies)).then(() => {
      dispatch(deleteSubsMovie(id.MovieId , member._id))
    })
  }
  return (
    <div>
        <div style={{display: 'block', float: 'left', marginLeft: '0.5rem',width: '100%' ,textAlign: 'left'}}>
        {auth?.permissions.Delete_Subscriptions && <IconButton onClick={deleteMember} color="error" variant="outlined">
        <DeleteIcon />
        </IconButton>}
        </div>
        {!showMemberName ? 
        <div style={auth?.permissions.Update_Subscriptions ? {marginTop: "0rem" , marginBottom : "10px" , display: '-webkit-inline-box'} : {marginTop: "1rem" , marginBottom : "10px" , display: '-webkit-inline-box'}}>
        <h3 style={{marginBottom: '0px', marginTop: "0px"}}>{member?.Name}</h3>
        {auth?.permissions.Update_Subscriptions && <IconButton style={{padding: '0', marginLeft: '0.5rem'}} onClick={showNameInput} variant="outlined" >
        <EditIcon />
        </IconButton>}
        </div>
          :
          <MemberNameEdit member={member} setShowMemberName={setShowMemberName}/>
        }
        {!showMemberEmail ? 
        <div style={{marginBottom : "10px" , display: 'block'}}>
        <span>{member?.Email}</span>
        {auth?.permissions.Update_Subscriptions &&  <IconButton style={{padding: '0', marginLeft: '0.5rem'}} onClick={showEmailInput} variant="outlined" >
        <EditIcon />
        </IconButton>}
        </div> :
         <MemberEmailEdit member={member} setShowMemberEmail={setShowMemberEmail}/>
        }
        {
          !showMemberCity ? 
          <div style={{marginBottom : "10px" , display: 'block'}}>
        <span>{member?.City}</span>
        {auth?.permissions?.Update_Subscriptions &&  <IconButton style={{padding: '0', marginLeft: '0.5rem'}} onClick={showCityInput} variant="outlined" >
        <EditIcon />
        </IconButton>}
        </div> :
        <MemberCityEdit member={member} setShowMemberCity={setShowMemberCity}/>
        }
        {
          !addMovieSubs ? 
          <div >
          Movies Watched :  
          {auth?.permissions?.Create_Subscriptions && <IconButton style={{padding: '0', marginLeft: '0.5rem'}} onClick={showAddMovies} variant="outlined" >
          <AddIcon />
          </IconButton> }
          {member?.Movies?.length > 0 ?
                    <TableContainer component={Paper}>
                    <Table className='table-Movies-Watched' size="small" style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left" style={{padding: '6px 4px'}}>Movie Name</TableCell>
                          <TableCell align="left" style={{padding: '6px 4px'}}>Date</TableCell>
                          <TableCell style={{padding: '6px 4px'}}>Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {member?.Movies.map((item , index) => (
                          <TableRow key={item._id} >
                            <TableCell align="left" style={{padding: '6px 4px', width: '80%'}}><ListItemText>{item?.MovieName}</ListItemText></TableCell>
                            <TableCell align="left" style={{padding: '6px 4px',  width: '10%'}}><ListItemText>{item?.Date}</ListItemText></TableCell>
                            <TableCell  style={{padding: '6px 4px' , width: '10%'}}>
                            <IconButton onClick={() => deleteMovieWatched(item)} color="error" variant="outlined">
                              <DeleteIcon />
                            </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
              : <Alert severity="warning" style={{borderRadius: '0.7rem', width: '19rem', marginLeft: 'auto', marginRight: 'auto', marginTop: '1rem'}}>There are no movies for this subscription!</Alert>
          }
          </div> : <AddMoviesSubsComp member={member} setAddMovieSubs={setAddMovieSubs}/>
        }
    </div>
  )
}

export default SingleMemberComp