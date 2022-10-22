import axios from 'axios';
const BASE_URL: string = "http://127.0.0.1:8000/api/";
export async function get_all_phonebooks() {
  try {
    const url = BASE_URL + 'get-all-phonenumbers/';
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log("Error in get_all_phonebooks");
  }
}
export async function set_phonebook(user: any) {
  try {
    const url = BASE_URL + 'set-phonenumber';
    const input_data = {
      "first_name": user.first_name,
      "last_name": user.last_name,
      "phone_number": user.phone_number
    }
    console.log("user=", input_data);
    const response = await axios.get(url, { params: input_data });
    return response;
  } catch (error) {
    console.log("Error in set_phonebook");
  }
}
export async function update_phonebook(user: any) {
  try {
    const url = BASE_URL + 'update-phonenumber/';
    const input_data = {
      "first_name": user.first_name,
      "last_name": user.last_name,
      "phone_number": user.phone_number
    }
    const response = await axios.get(url, { params: input_data });
    return response;
  } catch (error) {
    console.log("Error in get_all_phonebooks");
  }
}
export async function delete_phonebooks(user: any) {
  try {
    const url = BASE_URL + 'delete-phonenumber/';
    const input_data = {
      "first_name": user.first_name,
      "last_name": user.last_name,
      "phone_number": user.phone_number
    }
    const response = await axios.get(url, { params: input_data });
    return response;
  } catch (error) {
    console.log("Error in get_all_phonebooks");
  }
}