import { ReactElement, ReactNode } from 'react';
import { Sidebar } from '../../widgets';
import styles from './PageWrapper.module.scss';
import { Actions } from '../../actions';

type PageWrapperProps = {
  children: ReactNode;
};

function PageWrapper({ children }: PageWrapperProps): ReactElement {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
      <Actions />
    </div>
  );
}

export default PageWrapper;
