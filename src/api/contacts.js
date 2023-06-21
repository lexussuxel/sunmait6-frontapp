import axios from "axios";

export async function getAllContacts() {
  const result = await axios.get(`${process.env.VITE_SERVER}/contacts`);
  return result;
}

export async function getOneContact(id) {
  const result = await axios.get(`${process.env.VITE_SERVER}/contacts/${id}`, {
    params: { id },
  });
  return result;
}

export async function edit(contact) {
  try {
    console.log(contact);
    const result = await axios.post(
      `${process.env.VITE_SERVER}/contacts/${contact.id}`,
      { ...contact }
    );
    return result;
  } catch (e) {
    alert(e.response.statusText);
  }
}
