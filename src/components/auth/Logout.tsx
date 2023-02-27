import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { logout } from './service';

export default function Logout() {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await logout();

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <IconButton sx={{ marginLeft: 'auto' }} onClick={handleLogout}>
      <LogoutIcon />
    </IconButton>
  );
}
