import { useEffect, useState } from "react";
import { getAllContacts } from "../api/contacts";
import TableRow from "../components/TableRow";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [contacts, setContatcs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllContacts().then(({ data }) => {
      setContatcs(data);
      console.log(data);
    });
  }, []);
  function newContactHandler(e) {
    e.preventDefault();
    navigate(`/update?id=${Date.now()}`);
  }
  return (
    <>
      <button onClick={newContactHandler}>Добавть контакт</button>
      <table>
        <thead></thead>
        <tbody style={{ width: "100%" }}>
          {contacts?.map((contact, i) => (
            <TableRow key={i} contact={contact} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default HomePage;
