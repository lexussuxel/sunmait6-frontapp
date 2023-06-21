import { useNavigate } from "react-router-dom";
import "./styles.css";
function TableRow({ contact }) {
  const navigate = useNavigate();
  function edit(e) {
    e.preventDefault();
    navigate(`/update?id=${contact.id}`);
  }
  return (
    <tr>
      <td>
        <p>
          {contact.firstName + " " + (contact.lastName ? contact.lastName : "")}
        </p>
        <p>Телефон:{contact.phone}</p>
        {contact.work && <p>Работа:{contact.work}</p>}
        <p>Страна: {contact.country}</p>
        {contact.birthDay && <p>День рождения:{contact.birthDay.toString()}</p>}
        {contact.tags.length ? (
          <p>
            Теги:
            {contact.tags.map((tag) => (
              <div className="tag-wrapper">{tag}</div>
            ))}
          </p>
        ) : null}
      </td>
      <td>
        <button onClick={edit}>Редактировать</button>
      </td>
    </tr>
  );
}

export default TableRow;
