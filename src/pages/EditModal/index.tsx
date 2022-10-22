import './style.scss';
import * as pic from '../../pic/pic';
import { useState } from 'react';
import PhoneItem from '../../components/PhoneItem';
import { useQuery } from "react-query";
import * as mirror from '../../pic/mirror_helper';

type props_type = {
  type: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  setModal: any;
}
const UserModal: React.FC<props_type> = (props) => {
  // const { type, first_name, last_name } = props;
  const [inputFirstName, setInputFirstName] = useState<string>();
  const [inputLastName, setInputLastName] = useState<string>();
  const [inputPhoneNumber, setInputPhoneNumber] = useState<string>();
  // const { isSuccess, data } = useQuery("all_data", () =>

  // );

  // console.log(data);
  const onClickAction = async () => {
    let input_data;
    if (props.type == 'create') {
      input_data = {
        first_name: inputFirstName,
        last_name: inputLastName,
        phone_number: inputPhoneNumber
      }
      const response: any = await mirror.set_phonebook(input_data);
      if (response.statusText == "Created") {
        alert("Created!!")
        props.setModal(0);
      }
    } else {

      input_data = {
        first_name: props.first_name,
        last_name: props.last_name,
        phone_number: inputPhoneNumber
      }
      const response: any = await mirror.update_phonebook(input_data);
      if (response.statusText == "OK") {
        alert("Modified!!")
        props.setModal(0);
      }
      console.log("create=", response);
    }
  }
  const onClickCancel = () => {
    props.setModal(0);
  }
  const handleFirstName = (e: any) => {
    setInputFirstName(e.target.value);
  }
  const handleLastName = (e: any) => {
    setInputLastName(e.target.value);
  }
  const handlePhoneNumber = (e: any) => {
    setInputPhoneNumber(e.target.value);
  }
  return (
    <div className="usermodal-window">
      <div className="usermodal-main">
        <div className="modal-title">
          {props.type == 'create' ? 'Welcoem to create a new user' : 'Welcome to modify the user'}
        </div>
        <div className='user-info'>
          <div className='user-input'>
            {props.type == 'create' ?
              <input type="text" value={inputFirstName} placeholder="First Name" onChange={handleFirstName} />
              :
              <div className='each-user'>{props.first_name}</div>
            }
          </div>
          <div className='user-input'>
            {props.type == 'create' ?
              <input type="text" value={inputLastName} placeholder="Last Name" onChange={handleLastName} />
              :
              <div className='each-user'>{props.last_name}</div>
            }
          </div>
          <div className='user-input'>
            <input type="text" value={inputPhoneNumber} placeholder="Phone Number" onChange={handlePhoneNumber} />
          </div>
        </div>
        <div className='modal-btn'>
          <div className='btn' onClick={onClickAction}>
            Submit
          </div>
          <div className='btn' onClick={onClickCancel}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserModal;