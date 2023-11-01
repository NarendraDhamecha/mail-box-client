import { useSelector } from "react-redux";
import Box from "./Box";

const SentBox = () => {
  const LoggedInemail = useSelector((state) => state.Auth.email);
  const emailData = useSelector((state) => state.Email.sentBox);

  const filteredList = emailData.filter((email) => {
      return email.from === LoggedInemail;
    });

    return(
      <Box filteredList={filteredList} match={'sentbox'}/>
    )
};

export default SentBox;
