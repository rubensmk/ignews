import { render, screen } from '@testing-library/react';
import Home, { getStaticProps } from '../../pages';
import { stripe } from '../../services/stripe';
import { mocked } from 'jest-mock';

jest.mock('next/router');
jest.mock('next-auth/client', () => {
    return{
        useSession:() => [null, false]
    }
});

jest.mock('../../services/stripe');

describe('Home Page', () => {
    it('should renders correctly', () => {

        render(
        <Home product={{ priceId:'fake-price-id', amount:'$10.00' }} />
        )

        expect(screen.getByText("for $10.00 month")).toBeInTheDocument();
    });

    it('loads initial data', async () => {
        const retrievedStripePricesMocked = mocked(stripe.prices.retrieve);
        
        retrievedStripePricesMocked.mockResolvedValueOnce({
            id:'fake-price-id',
            unit_amount: 1000,
        } as any);

        const response = await getStaticProps({});


        console.log(response);

        // expect(response).toEqual(
        //     expect.objectContaining({
        //         props:{
        //             product: {
        //                 priceId: 'fake-price-id',
        //                 amount: '$10.00'
        //             }
        //         }
        //     })
        // );


    })

})