import { ReactElement, memo } from 'react';
import styles from './ProfilePage.module.scss';
import { PageWrapper } from '../../PageWrapper';

function ProfilePage(): ReactElement {
    return (
        <PageWrapper>
            <h1>Профиль</h1>
        </PageWrapper>
    );
}

export default memo(ProfilePage);
