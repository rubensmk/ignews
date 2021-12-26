import { render, screen, fireEvent } from "@testing-library/react";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { mocked } from 'jest-mock';
import { SubscribeButton } from '.';

jest.mock('next-auth/client');

jest.mock('next/router');

describe('Subscribe Button Component', () => {

    it('renders correctly',() => {
        const userSessionMocked = mocked(useSession);

        userSessionMocked.mockReturnValueOnce([null, false]);

        render(
            <SubscribeButton />
        )
        expect(screen.getByText('Subscribe now')).toBeInTheDocument()
    });

    it('redirects user to sign in when not authenticated', () => {

        const userSessionMocked = mocked(useSession);
        const signInMocked = mocked(signIn);

        userSessionMocked.mockReturnValueOnce([null, false]);

        render(
        <SubscribeButton/>
        )

        const subscribeButton = screen.getByText('Subscribe now');

        fireEvent.click(subscribeButton)

        expect(signInMocked).toHaveBeenCalled();
        
    });

    it('redirects user to sign in when authenticated', () => {
        const useRouterMocked = mocked(useRouter);
        const useSessionMocked = mocked(useSession);
        const pushMock = jest.fn();

        useSessionMocked.mockReturnValueOnce([
            {
                user:{
                    name:"John Doe",
                    email:"john.doe@example.com"
                },
                activeSubscription:'fake-active-subscription',
                expires:"fake-expires"
            }, 
            false
        ])

        useRouterMocked.mockReturnValueOnce({
            push: pushMock,
        } as any);

        render(
        <SubscribeButton/>
        );

        const subscribeButton = screen.getByText('Subscribe now');

        fireEvent.click(subscribeButton);

        expect(pushMock).toHaveBeenCalledWith('/posts');

    })

})
