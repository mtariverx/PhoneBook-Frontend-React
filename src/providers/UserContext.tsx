import React, {useReducer} from "react";

// export function abc(){

// }
type user = {
  type?:string,
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

type Action = { type: string, userData: user }
type Dispatch = (action: Action) => void;
type State = user;
type UserDataProviderProps = { children: React.ReactNode };
const UserDataContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

export function UserDataProvider({ children }: UserDataProviderProps) {

  const [state, dispatch] = React.useReducer(userDataReducer, {});
  return (
    <UserDataContext.Provider value={{ state , dispatch }}>
      {children}
    </UserDataContext.Provider>
  )
}

function userDataReducer(state: State, action: Action) {
  let newState = action.userData;
  switch (action.type) {
    case 'connect': {
      return newState;
    }
    case 'disconnect': {
      return {};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

async function callUserData(dispatch: any, type:string,first_name: string, last_name: string, phone_number: string) {
  let newData = { type:type, first_name: first_name, last_name: last_name, phone_number: phone_number }
  console.log("--new data--", newData)
  dispatch({ type: 'connect', userData: newData })
}


export function useUserData() {
  const { state, dispatch } = React.useContext(UserDataContext);
  return { user: state, dispatch, callUserData };
}