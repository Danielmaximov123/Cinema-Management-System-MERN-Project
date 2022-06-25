import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { addMember } from "../../redux/action/membersAction";

const AddMemberComp = ({ setAllMembers }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const addNewMember = (e) => {
    e.preventDefault();
    let data = {
      name: name,
      email : email,
      city: city,
    };
    dispatch(addMember(data));
    setAllMembers(true);
  };

  return (
    <div>
      <form
        onSubmit={(e) => addNewMember(e)}
        style={{ width: "30%", margin: "auto" }}
      >
        <TextField
          fullWidth
          id="standard-basic"
          label="Name"
          style={{ marginTop: "0", marginBottom: "8px" }}
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          id="standard-basic"
          label="Email"
          style={{ marginTop: "0", marginBottom: "8px" }}
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          id="standard-basic"
          label="City"
          style={{ marginTop: "0", marginBottom: "8px" }}
          variant="standard"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <div style={{ margin: "auto", width: "55%", padding: "1rem" }}>
          <Button
            style={{ marginRight: "5px" }}
            variant="contained"
            color="error"
            onClick={() => setAllMembers(true)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add new movie
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMemberComp;
