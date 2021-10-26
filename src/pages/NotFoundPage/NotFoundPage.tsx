import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = (): JSX.Element => (
  <div className="center-container">
    <h1>404 - The page you are looking does not exist</h1>
    <span>Please, make sure to enter a valid URL or </span>
    <Link to="/">
      Go Home
    </Link>
  </div>
);
  
export default NotFoundPage;