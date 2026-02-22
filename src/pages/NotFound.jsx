import { Link } from 'react-router';

function NotFound() {
    return (
        <div>
            <p>Page Not Found</p>
            <Link to="/">Go back Home</Link>
        </div>
    );
}

export default NotFound;
