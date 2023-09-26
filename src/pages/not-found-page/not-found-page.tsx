import { Link } from 'react-router-dom';
import MemoizedHeader from '../../components/header/header';
import MemoizedFooter from '../../components/footer/footer';
import styles from './not-found-page.module.css';


export default function NotFoundPage(): JSX.Element {

  return(

    <div className="wrapper">
      <MemoizedHeader />
      <section data-testid='not-found-test' className="not--found">
        <p className={`title title--h4 ${styles['not--found']}`}>404. Page not found</p>
        <div className={`title title--h4 ${styles['back']}`} >
          <Link to="/">Вернуться на главную</Link>
        </div>
      </section>
      <MemoizedFooter />
    </div>
  );
}
