import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function withAuth(WrappedComponent, allowedUserType) {
  return function WithAuthComponent(props) {
    const router = useRouter();
    
    useEffect(() => {
      const userType = localStorage.getItem('userType');
      if (!userType || userType !== allowedUserType) {
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}