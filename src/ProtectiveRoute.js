import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, userLevel, expectedLevel }) {
  if (userLevel !== expectedLevel) {
    return <Navigate to="/" />;
  }
  return children;
}
