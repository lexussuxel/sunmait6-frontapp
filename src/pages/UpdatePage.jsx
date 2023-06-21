import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { edit, getOneContact } from "../api/contacts";
import { COUNTRIES, PROFESSIONS, TAGS } from "../utils.js/mockdata";

//{firstName="", lastName="", phone="", work="", country="", tags=[], birthDay=new Date()}
function UpdatePage() {
  const [params] = useSearchParams();
  const [id, setId] = useState();
  const [contact, setContact] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState("");
  const [tags, setTags] = useState([]);
  const [birthDay, setBirthDay] = useState();
  const [work, setWork] = useState("");
  function inputHandler(e, setter) {
    setter(e.target.value);
  }

  function tagsHandler(e) {
    console.log(tags);
    console.log(e.target.value);
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
    console.log(contact);
    if (contact) {
      console.log(contact);
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
    edit({ firstName, lastName, phone, id, country, tags, birthDay, work });
  }
  return (
    <div>
      <h2>Введите данные для элемента:</h2>
      <form>
        <div>
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

        <div>
          <label>Телефон*: </label>
          <input
            type="number"
            value={phone}
            onInput={(e) => inputHandler(e, setPhone)}
          />
        </div>
        <div>
          <label>Страна*: </label>
          <select value={1} onChange={(e) => inputHandler(e, setCountry)}>
            {COUNTRIES.map((con, i) => (
              <option key={i}>{con}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Место работы: </label>
          <select value={work} onChange={(e) => inputHandler(e, setWork)}>
            {PROFESSIONS.map((con, i) => (
              <option key={i}>{con}</option>
            ))}
          </select>
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
          <label>День рождения:</label>
          <input
            type="datetime-local"
            value={birthDay}
            onChange={(e) => inputHandler(e, setBirthDay)}
          />
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
