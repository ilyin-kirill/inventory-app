import { ReactElement, memo } from 'react';
import styles from './MainPage.module.scss';
import { PageWrapper } from '../../PageWrapper';
import { InventoryTable } from '../../../entities';

function MainPage(): ReactElement {
  return (
    <PageWrapper>
      <h1>Оборудование</h1>
      <InventoryTable />
    </PageWrapper>
  );
}

export default memo(MainPage);
