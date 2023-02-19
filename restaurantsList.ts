import {Restaurants} from './restaurantListSlice';

type ResponseKind = 'success' | 'failure';

type NetworkResponse<T> = {
    kind: ResponseKind;
    body?: T;
}

export const fetchRestaurants = async (): Promise<NetworkResponse<Restaurants>> => {
    const response = await fetch(`http://205.134.254.135/~mobile/interview/public/api/restaurants_list`,
    {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const json = await response.json()
    if(response.ok){
        return {
            kind: 'success',
            body: json.data
        }
    } else {
        return {
            kind: 'failure',
        }
    }
}