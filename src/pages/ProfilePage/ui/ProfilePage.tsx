import { ReactElement, memo } from 'react';
import { Button, TextField } from '@mui/material';
import styles from './ProfilePage.module.scss';
import { PageWrapper } from '../../PageWrapper';
import { useAuth } from '../../../shared/hooks';

function ProfilePage(): ReactElement | null {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <PageWrapper>
      <div className={styles.global}>
        <div className={styles.title}>
          <h1>Персональные данные</h1>
          <div className={styles.imageDiv}>
            <img className={styles.image} src={user.image} alt="" />
          </div>
        </div>
        <div className={styles.wrapper}>
          <TextField
            disabled
            label="Должность"
            size="small"
            defaultValue={user.position}
          />
          <TextField
            disabled
            label="Структурное подразделение"
            size="small"
            defaultValue={user.structure}
          />
          <div className={styles.header}>
            <h3>Контакты</h3>
          </div>
          <TextField
            disabled
            label="Электронная почта"
            size="small"
            defaultValue={user.email}
          />
          <TextField
            disabled
            label="Телефон"
            size="small"
            defaultValue={user.phone}
          />
          <Button variant="contained" onClick={logout}>
            Выйти из профиля
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}

export default memo(ProfilePage);
