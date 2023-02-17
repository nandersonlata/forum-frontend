import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import {useState} from "react";
import {addTokensFromResponseToLocalStorage} from "./util";

const theme = createTheme();

export default function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [validSignup, setValidSignup] = useState<boolean>(false);
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

    function handleEmailChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setPassword(event.target.value);
        validatePasswords(password, passwordConfirmation);
    }

    function handlePasswordConfirmationChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setPasswordConfirmation(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validPasswords = validatePasswords(password, passwordConfirmation);
        console.log(validPasswords);
        if (!validPasswords) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', {
                email,
                password
            });

            addTokensFromResponseToLocalStorage(response);

            setValidSignup(false);
        } catch (error) {
            setValidSignup(true);
        }
    };

    function validatePasswords(password: string, passwordConfirmation: string): boolean {
        console.log(password, passwordConfirmation);
        const passwordsMatch = password === passwordConfirmation;
        setPasswordsMatch(passwordsMatch);
        return passwordsMatch;
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Account
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            onChange={handleEmailChange}
                            error={validSignup}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handlePasswordChange}
                            error={!passwordsMatch}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password-confirmation"
                            label="Confirm Password"
                            type="password"
                            id="password-confirmation"
                            onChange={handlePasswordConfirmationChange}
                            error={!passwordsMatch}
                        />
                        {!passwordsMatch && <Typography variant='body1' sx={{color: 'red'}}>Passwords do not match!</Typography>}
                        {validSignup && <Typography variant='body1' sx={{color: 'red'}}>Email already taken, please use a different email!</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}