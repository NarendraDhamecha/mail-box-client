import { useSelector } from "react-redux";

import Box from "./Box";

const Inbox = () => {
  const emailData = useSelector((state) => state.Email.emails);
  const LoggedInemail = useSelector((state) => state.Auth.email);

  const filteredList = emailData.filter((email) => {
    return email.to === LoggedInemail;
  });

  return(
    <Box filteredList={filteredList} match={'inbox'}/>
  )
};

export default Inbox;
