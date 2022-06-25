import { CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../redux/action/membersAction';
import SingleMemberComp from './member';


const AllMembersPageComp = () => {
    const dispatch = useDispatch()
    const [searchTerm , setSearchTerm] = useState("")
    const members = useSelector( state => state.members.members )
    const loading = useSelector( state => state.members.membersLoading )
    const [progress, setProgress] = useState(<CircularProgress style={{width: '6rem', height: '6rem', marginTop: '4rem'}}/>)

  useEffect(() => {
    dispatch(getMembers())
  },[dispatch])

    let sortMembers = members.sort((a,b) => {
      return new Date(b?.CreatedDate) - new Date(a?.CreatedDate)
    })

  return (
    <div>
        {loading ? <div style={{textAlign : "center"}}>{progress}</div> :
            <>
            <div style={{textAlign : "center" , marginTop : "5px"}}>
              <TextField
              id="standard-search"
              label="Search Member..."
              type="search"
              onChange={e => setSearchTerm(e.target.value)}
              variant="standard"
            />
            </div>
            <div style={{width: '73%' ,paddingTop : "2rem" , paddingBottom : "2rem" ,display : "grid" , gridTemplateColumns: '25rem 25rem 25rem' , marginLeft: 'auto' , marginRight: 'auto'}}>
            {
              sortMembers?.filter(item => {
                if(searchTerm === "") {
                  return item
                } else if(item.Name.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return item
                }
              })?.map(item => {
                return <div style={{margin : "7px" , paddingBottom : "2rem" , border: '1px solid black', textAlign: 'center', borderRadius: '10px' , height: 'fit-content'}} key={item._id}>
                  <SingleMemberComp member={item}/>
                </div>
              })
            }
          </div>
            </>
        }
          </div>
  )
}

export default AllMembersPageComp