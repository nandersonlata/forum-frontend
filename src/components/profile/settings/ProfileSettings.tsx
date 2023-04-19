import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import * as React from 'react';

export function ProfileSettings() {
  return (
    <Box aria-label={'profile-settings'}>
      <Typography component="h1" variant="h5">
        Update Profile Settings
      </Typography>
      <Link to="/profile/deactivate" style={{ textDecoration: 'none' }}>
        <Button
          id="sign-in-button"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Deactivate Account
        </Button>
      </Link>
    </Box>
  );
}
