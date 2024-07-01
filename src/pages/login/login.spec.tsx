import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from './login';

describe('Login Page', () => {
    test('Should return valid text', async () => {
        render(<LoginPage />);
        // getBy=> throw error
        // queryBy=> null
        // findBy=> Async
        expect(screen.getByText('Sign in')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Log in' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('checkbox', { name: 'Remember me' })
        ).toBeInTheDocument();
        expect(screen.getByText('Forget password')).toBeInTheDocument();
    });
});
