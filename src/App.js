import React, {useEffect, useState} from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import {URL_USERS} from './const';

function App() {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [onInputValue, setOnInputValue] = useState('');
  const [invited, setInvited] = useState([]);
  const [sendInvite, setSendInvite] = useState(false);

  const onClickInvite = (id) => {
    if (invited.includes(id)) {
      setInvited(invited.filter(_id => _id !== id));
    } else {
      setInvited(prev => [...prev, id]);
    }
  }

  const onClickSuccess = () => {
    if (invited.length) setSendInvite(true);
  }

  useEffect(() => {
    fetch(URL_USERS)
      .then(response => response.json())
      .then(result => setUsers(result.data))
      .catch((err) => {
        console.warn(err);
        alert(`Ошибка запроса пользователей`);
      })
      .finally(() => setIsLoading(false));
  }, [])

  return (
    <div className="App">
      {
        sendInvite ?
          <Success setSendInvite={setSendInvite} count={invited.length} /> :
          <Users
            onClickSucces={onClickSuccess}
            onInputValue={onInputValue}
            setOnInputValue={setOnInputValue}
            items={users}
            isLoading={isLoading}
            invited={invited}
            setInvited={setInvited}
            onClickInvite={onClickInvite}
          />
      }
    </div>
  );
}

export default App;
