import { useSelector } from 'react-redux';

const HomePageComp = () => {
    const auth = useSelector( state => state.auth )
  return (
    <div style={{textAlign : "center"}}>
        <h1>Hello , {auth.fname} {auth.lname}</h1>
    </div>
  )
}

export default HomePageComp