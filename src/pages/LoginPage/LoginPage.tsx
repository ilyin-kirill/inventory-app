import { TextField, Button } from '@mui/material';
import styles from './LoginPage.module.scss';
import { ChangeEvent, useState } from 'react';
import { users } from './constants';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/hooks';

function LoginPage() {
  const [error, setError] = useState('');
  const [user, setUser] = useState({ login: '', password: '' });

  const { login } = useAuth();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  // @ts-ignore
  const onClick = (e) => {
    e.preventDefault();
    setError('');

    // @ts-ignore
    const findUser = users.find(
      (item) => item.name === user.login && item.password === user.password
    );

    if (findUser) {
      login(findUser);

      setError('Неправильное имя пользователя или пароль');

      return;
    }

    setError('Неправильное имя пользователя или пароль');
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={onClick}>
        <div>
          <h3>Авторизация</h3>
        </div>
        <TextField
          label="Введите логин"
          size="small"
          name="login"
          value={user.login}
          onChange={onChange}
        />
        <TextField
          error={!!error}
          label="Введите пароль"
          size="small"
          type="password"
          helperText={error}
          name="password"
          value={user.password}
          onChange={onChange}
        />
        <Button type="submit" className={styles.button} variant="contained">
          ВОЙТИ
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
