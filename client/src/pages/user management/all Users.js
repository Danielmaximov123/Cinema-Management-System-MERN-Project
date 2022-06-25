import { CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from './../../redux/action/UsersAction';
import SingleUserComp from './user';


const AllUsersPageComp = () => {
    const dispatch = useDispatch()
    const [searchTerm , setSearchTerm] = useState("")
    const users = useSelector( state => state.users.users )
    const loading = useSelector( state => state.users.usersLoading )
    const [progress, setProgress] = useState(<CircularProgress style={{width: '6rem', height: '6rem', marginTop: '4rem'}}/>)
    
    useEffect(() => {
      dispatch(getUsers())
    },[dispatch])
    
    let filterUser = users.sort((a,b) => {
      return new Date(b.CreatedDate) - new Date(a.CreatedDate)
    }).filter(user => user._id !== undefined)
    
  return (
    <div>
        {loading ? <div style={{textAlign : "center"}}>{progress}</div> :
            <>
            <div style={{textAlign : "center" , marginTop : "5px"}}>
              <TextField
              id="standard-search"
              label="Search User..."
              type="search"
              onChange={e => setSearchTerm(e.target.value)}
              variant="standard"
            />
            </div>
            <div style={{width: '73%' ,paddingTop : "2rem" , paddingBottom : "2rem" ,display : "grid" , gridTemplateColumns: '23rem 23rem 23rem' , marginLeft: 'auto' , marginRight: 'auto'}}>
            {
              loading ? 
              progress :
              filterUser?.filter(item => {
                if(searchTerm === "") {
                  return item
                } else if(item?.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return item
                }
              })?.map(item => {
                return <div style={{margin : "7px" ,  border: '1px solid black', textAlign: 'center', borderRadius: '10px', }} key={item._id}>
                <SingleUserComp user={item}/>
              </div>
              })
            }
          </div>
            </>
        }
          </div>
  )
}

export default AllUsersPageComp