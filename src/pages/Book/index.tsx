import './style.scss';
import * as pic from '../../pic/pic';
import { useState } from 'react';
import PhoneItem from '../../components/PhoneItem';
import EditModal from '../EditModal';
import { useQuery } from "react-query";
import * as mirror from '../../pic/mirror_helper';
import { useUserData } from '../../providers/UserContext';
const Book: React.FC = (props) => {
  const [books, setBooks] = useState<Array<pic.book_type>>([]);
  const [is_modal, setModal] = useState<number>(0);
  const [selected_user, setSelectedUser] = useState<any>();
  const [is_selected, setIsSelected] = useState<boolean>(false);
  const { dispatch, user, callUserData } = useUserData();

  const onClickAddUser = () => {
    callUserData(dispatch, 'create', '', '', '');
    setModal(1);
  }
  const onClickModifyUser = () => {
    if (!selected_user) {
      alert("Please select a user");
    } else {
      callUserData(dispatch, 'modify', selected_user.first_name, selected_user.last_name, selected_user.phone_number);
      setModal(2);
    }
  }
  const onClickDeleteUser = async () => {
    if (selected_user) {
      const response: any = await mirror.delete_phonebooks(selected_user);
      console.log("delete=", response);
      if (response.statusText == "OK") {
        alert("Deleted!!")
        setSelectedUser(undefined);
      }
    } else {
      alert("Any user not selected!!")
    }
  }
  const { isSuccess, data } = useQuery("all_data", () =>
    mirror.get_all_phonebooks().then((res: any) => res.data)
  );
  return (
    <div className="phone-book-main">
      <div className="phone-book-body">
        <div className="phone-book-title">
          Welcome Phone Book!
        </div>
        {data ?
          <div className="phone-book-group">
            {data.map((item: any, index: number) => {
              return (
                <PhoneItem
                  first_name={item.first_name}
                  last_name={item.last_name}
                  phone_number={item.phone_number}
                  // is_selected={false}
                  is_selected={selected_user?.first_name === item.first_name}
                  setSelectedUser={setSelectedUser}

                />
              )
            })}
          </div>
          : ''
        }
        <div className="phone-book-tools">
          <div className="btn" onClick={onClickAddUser}>
            Add
          </div>
          <div className="btn" onClick={onClickModifyUser}>
            Modify
          </div>
          <div className="btn" onClick={onClickDeleteUser}>
            Delete
          </div>
        </div>
      </div>
      {is_modal == 1 ?
        <EditModal setModal={setModal} /> : ''
      }
      {is_modal == 2 && selected_user ?
        <EditModal setModal={setModal} />
        : ''
      }

    </div>
  );
}
export default Book;