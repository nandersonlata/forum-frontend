import Typography from '@mui/material/Typography';
import * as React from 'react';

type SignUpErrorsProps = {
  emailTaken: boolean;
  displayNameTaken: boolean;
  validEmail: boolean;
  validPassword: boolean;
  passwordsMatch: boolean;
  password: string;
  email: string;
};

export function SignUpErrors(props: SignUpErrorsProps) {
  const {
    emailTaken,
    displayNameTaken,
    validEmail,
    validPassword,
    passwordsMatch,
    password,
    email,
  } = props;
  return (
    <div>
      {!passwordsMatch && (
        <Typography variant="body1" sx={{ color: 'red' }}>
          Passwords do not match!
        </Typography>
      )}
      {password.trim().length > 0 && !validPassword && (
        <Typography variant="body1" sx={{ color: 'red' }}>
          Passwords must be between 5 and 25 characters long and contain at
          least 1 uppercase and lowercase letter and number
        </Typography>
      )}
      {emailTaken && (
        <Typography variant="body1" sx={{ color: 'red' }}>
          Email already taken, please use a different email!
        </Typography>
      )}
      {displayNameTaken && (
        <Typography variant="body1" sx={{ color: 'red' }}>
          Display name already taken, please use a different display name!
        </Typography>
      )}
      {email.trim().length > 0 && !validEmail && (
        <Typography variant="body1" sx={{ color: 'red' }}>
          Please provide a valid email
        </Typography>
      )}
    </div>
  );
}
