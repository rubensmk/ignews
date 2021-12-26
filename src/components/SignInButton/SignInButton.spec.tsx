import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { mocked } from 'jest-mock';
import { SignInButton } from '.';

jest.mock('next-auth/client');

describe('SignIn Button Component', () => {

    it('renders correctly when user is not authenticated',() => {

        const useSessionMocked = mocked(useSession);

        useSessionMocked.mockReturnValueOnce([ null, false ]);

        render(
            <SignInButton />
        )
        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    });

    it('renders correctly when user is not authenticated',() => {

        const useSessionMocked = mocked(useSession);

        useSessionMocked.mockReturnValueOnce([{
            user:{
                name:"John Doe",
                email:"johndoe@email.com"
            },
            expires:"fake-expires"
        }, false ]);

        render(
            <SignInButton />
        )
        expect(screen.getByText('John Doe')).toBeInTheDocument()
    });

})
