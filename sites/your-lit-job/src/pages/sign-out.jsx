import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { useAuth } from '../contexts/AuthContext';
import PageDimensions from '../components/page-dimensions';

function SignOut() {
  const { isSignedIn, signOut } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      signOut();
    }
    navigate('/');
  }, [isSignedIn]);

  const pageDimensions = {
    contentType: 'sign-out',
  };

  return <PageDimensions dimensions={pageDimensions} />;
}

export default SignOut;
