import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getUserState } from '@/store/slices/user'; // Assuming you have this selector

const useAuthPortalCheck = () => {
  const router = useRouter();
  const { token, roleAccount } = useSelector(getUserState);

  useEffect(() => {
    // If not logged in, redirect to home page "/"
    if (!token) {
      router.push('/');
      return;
    }

    // Role-based Routing
    if (roleAccount === 'UNIVERSITY') {
      if (!['/portal/companies', '/portal/companies/[id]', '/portal/jobs', '/portal/jobs/[id]', '/'].includes(router.pathname)) {
        router.push('/'); // Redirect to home page if the path is not allowed
      }
    } else if (roleAccount === 'COMPANY') {
      if (!['/portal/workshops', '/portal/workshops/[id]', '/portal/schools', '/portal/schools/[id]', '/'].includes(router.pathname)) {
        router.push('/'); // Redirect to home page if the path is not allowed
      }
    } else if (roleAccount === 'ADMIN') {
      // Admin has full access
      return;
    } else {
      // If an unknown role or invalid user, redirect to home page
      router.push('/');
    }
  }, [router, token, roleAccount]);
};

export default useAuthPortalCheck;
