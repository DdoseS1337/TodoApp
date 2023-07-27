import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useConfirmEmail } from '../../hooks/user.hooks';
import { APP_KEYS } from '../consts';

const EmailVerificationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const сonfirmEmail = useConfirmEmail();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (id) {
      сonfirmEmail
        .mutateAsync(id)
        .then(() => {
          setIsVerified(true);
          setTimeout(() => {
            if (mounted) {
              history.push(APP_KEYS.ROUTER_KEYS.TODOS);
            }
          }, 15000);
        })
        .catch(() => {
          setIsVerified(false);
        });
    } else {
      setIsVerified(false);
    }

    return () => {
      setMounted(false);
    };
  }, [id, history, mounted]);

  return (
    <div>
      <h1>Email Verification Page</h1>
      {isVerified === true && <p>Your email has been successfully verified!</p>}
      {isVerified === false && <p>Failed to verify your email. Please try again.</p>}
    </div>
  );
};

export default EmailVerificationPage;
