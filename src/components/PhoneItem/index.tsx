import { useState } from 'react';
import './style.scss';
type phone_item = {
  first_name: string;
  last_name: string;
  phone_number: string;
  setSelectedUser: any;
  is_selected: boolean;
}
const PhoneItem: React.FC<phone_item> = (props) => {
  const { first_name, last_name, phone_number, is_selected, setSelectedUser } = props;
  const onClickUser = () => {
    setSelectedUser({
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number
    })
  }
  return (
    <div className={`phone-item-main ${is_selected ? 'clicked' : ''}`} onClick={onClickUser}>
      <div className="first-name">{first_name}</div>
      <div className="last-name">{last_name}</div>
      <div className="phone-number">{phone_number}</div>
    </div>
  )

}
export default PhoneItem;