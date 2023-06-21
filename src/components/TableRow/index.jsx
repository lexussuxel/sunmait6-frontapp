import { useNavigate } from "react-router-dom";
import "./styles.css";

//{firstName="", lastName="", phone="", work="", country="", tags=[], birthDay=new Date()}
function TableRow({ contact }) {
  const navigate = useNavigate();
  function edit(e) {
    e.preventDefault();
    navigate(`/update?id=${contact.id}`);
  }
  return (
    <tr>
      <td>
        <p>{contact.firstName + " " + contact.lastName}</p>
        <p>Телефон:{contact.phone}</p>
        <p>Страна: {contact.country}</p>
        <p>Работа:{contact.work}</p>
        <p>День рождения:{contact.birthDay.toString()}</p>
        <p>
          Теги:
          {contact.tags.map((tag) => (
            <div className="tag-wrapper">{tag}</div>
          ))}
        </p>
      </td>
      <td>
        <button onClick={edit}>Редактировать</button>
      </td>
    </tr>
  );
}

export default TableRow;
