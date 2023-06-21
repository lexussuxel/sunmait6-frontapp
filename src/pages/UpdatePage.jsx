import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { edit, getOneContact } from "../api/contacts";
import { COUNTRIES, PROFESSIONS, TAGS } from "../utils.js/mockdata";

//{firstName="", lastName="", phone="", work="", country="", tags=[], birthDay=new Date()}
function UpdatePage() {
  const [params] = useSearchParams();
  const [id, setId] = useState();
  const [contact, setContact] = useState({});
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState();
  const [tags, setTags] = useState([]);
  const [birthDay, setBirthDay] = useState();
  const [work, setWork] = useState("");
  const [radio1, setRadio1] = useState(false);
  const [radio2, setRadio2] = useState(false);
  const [errors, setErrors] = useState([]);
  function inputHandler(e, setter) {
    setter(e.target.value);
  }
  function checkHandler(e, setter) {
    setter(e.target.checked);
  }
  function tagsHandler(e) {
    setTags([...tags, e.target.value]);
  }

  useEffect(() => {
    let gotid = params.get("id");
    setId(gotid);
    getOneContact(gotid).then(({ data }) => {
      setContact(data);
    });
  }, []);

  useEffect(() => {
    if (contact.firstName) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setPhone(contact.phone);
      setCountry(contact.country);
      setTags(contact.tags);
      setBirthDay(contact.birthDay);
      setWork(contact.work);
    }
  }, [contact]);
  function send(e) {
    e.preventDefault();

    edit({
      firstName,
      lastName,
      phone,
      id,
      country,
      tags,
      birthDay: radio1 ? birthDay : null,
      work: radio2 ? work : null,
    }).catch((e) => setErrors(e.response.data));
  }
  return (
    <div>
      <h2>Введите данные для элемента:</h2>
      <form>
        <div className={errors.path == "firstName" && "warning"}>
          <label>Имя*: </label>
          <input
            type="text"
            value={firstName}
            onInput={(e) => inputHandler(e, setFirstName)}
          />
        </div>

        <div>
          <label>Фамилия: </label>
          <input
            type="text"
            value={lastName}
            onInput={(e) => inputHandler(e, setLastName)}
          />
        </div>

        <div className={errors.path == "phone" && "warning"}>
          <label>Телефон*: </label>
          <input
            type="number"
            value={phone}
            onInput={(e) => inputHandler(e, setPhone)}
          />
        </div>
        <div className={errors.path == "country" && "warning"}>
          <label>Страна*: </label>
          <select value={country} onChange={(e) => inputHandler(e, setCountry)}>
            {COUNTRIES.map((con, i) => (
              <option key={i}>{con}</option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="checkbox"
            value={radio2}
            onChange={(e) => checkHandler(e, setRadio2)}
          />
          <label>Место работы: </label>
          <select
            value={work}
            onChange={(e) => inputHandler(e, setWork)}
            disabled={!radio2}
          >
            {PROFESSIONS.map((con, i) => (
              <option key={i}>{con}</option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="checkbox"
            value={radio1}
            onChange={(e) => checkHandler(e, setRadio1)}
          />
          <label>День рождения:</label>
          <input
            disabled={!radio1}
            type="datetime-local"
            value={birthDay}
            onChange={(e) => inputHandler(e, setBirthDay)}
          />
        </div>
        <div>
          <label>Теги: </label>
          <select value={tags} onChange={tagsHandler}>
            {TAGS.map((con, i) => (
              <option key={i}>{con}</option>
            ))}
          </select>
        </div>
        <div>
          {tags?.map((tag) => (
            <div className="tag-wrapper">{tag}</div>
          ))}
        </div>
        <button onClick={(e) => send(e)}>Сохранить!</button>
      </form>
    </div>
  );
}

export default UpdatePage;
