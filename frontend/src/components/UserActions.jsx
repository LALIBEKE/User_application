
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import Snackbar from '@mui/material/Snackbar'; 
import Alert from '@mui/material/Alert'; 
import { currentUser, deleteUser, signOut, updateUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

export default function UserActions() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openedit, setOpenedit] = React.useState(false);
  const [email, setEmail] = React.useState(currentUser.email);
  const [name, setName] = React.useState(currentUser.name);
  const [phone, setPhone] = React.useState(currentUser.phone);
  const [password, setPassword] = React.useState(currentUser.password);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(''); 
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success'); 

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleDeleteUser = async () => {
    try {
      await dispatch(deleteUser(currentUser.email));
      setSnackbarMessage('User deleted successfully');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Error deleting user');
      setSnackbarSeverity('error');
      console.error(error);
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleEditUser = async () => {
    try {
      const user = {
        name,
        email,
        phone,
        password,
      };
      await dispatch(updateUser(user));
      setSnackbarMessage('User updated successfully');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Error updating user');
      setSnackbarSeverity('error');
      console.error(error);
    } finally {
      setSnackbarOpen(true);
      handleClose();
    }
  };

  const handleCloseEditUser = () => {
    setOpenedit(false);
    setOpenProfile(true);
  };

  const handleSignOut = () => {
    alert('You Signed Out!');
    dispatch(signOut());
    handleClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            😀 Hi <span id="username">{currentUser.name}</span>!
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Dialog
        open={openProfile}
        onClose={handleClickProfile}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.name;
            console.log(name);
            handleClickProfile();
          },
        }}
      >
        <DialogTitle>Profile</DialogTitle>
        <span>name={currentUser.name}</span>
        <span>email={currentUser.email}</span>
        <span>phone={currentUser.phone}</span>
        <DialogActions>
          <Button onClick={handleClickProfile}>Close</Button>
          <IconButton onClick={handleDeleteUser} aria-label="delete" color="primary">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => setOpenedit(true)} aria-label="edit" color="primary">
            <EditIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openedit}
        onClose={() => setOpenedit(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="string"
            fullWidth
            variant="standard"
            defaultValue={currentUser.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={currentUser.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Phone"
            type="string"
            fullWidth
            variant="standard"
            defaultValue={currentUser.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            defaultValue={currentUser.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenedit(false)}>Cancel</Button>
          <Button onClick={handleEditUser} type="submit">Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
        sx={{
          '& .MuiSnackbarContent-root': {
            width: '300px', 
            maxWidth: '80vw', 
            borderRadius: '8px', 
            fontSize: '16px', 
          },
        }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}



