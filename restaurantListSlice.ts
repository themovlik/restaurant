import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native/types";
import * as restaurantsList from './restaurantsList';
export type Restaurants = {
    id: string;
    title: string;
    image: ImageSourcePropType;
    latitude: number;
    longitude: number;
    rating: number;
}

export type RestaurantsListState = {
    restaurants: Restaurants[];
    loading: boolean;
    error: boolean;
    errorMessage: string;
    status?: string;
    nextPage?: number;
}

const initialState: RestaurantsListState = {
    restaurants: [],
    loading: false,
    error: false,
    errorMessage: '',
    status: undefined,
    nextPage: undefined,
}

export const fetchRestaurants = createAsyncThunk<{restaurants: Restaurants[], nextPage: number}>(
    'fetchRestaurants',
    async () => {
        const response = await restaurantsList.fetchRestaurants();
        if(response.kind === 'success'){
            return {
                restaurants: response.body ?? [],
            }
        } else {
            console.log("this is body",response.body)
            throw 'Error fetching restaurants';
        }
    },
);

const restaurantsListSlice = createSlice({
    name: 'restaurantsList',
    initialState: initialState,
    reducers: {
        getRestaurantsList: (state, action) => {
            state.restaurants = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRestaurants.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(fetchRestaurants.fulfilled, (state, action) => {
            state.restaurants = action.payload.restaurants;
            state.loading = false;
            state.status = 'fulfilled';
            state.nextPage = (state.nextPage || 0) + 1;
        })
        .addCase(fetchRestaurants.rejected, (state) => {
            state.error = true;
            state.loading = false;
            state.status = 'rejected';
            state.nextPage = undefined;
        })
    },
})

export default restaurantsListSlice.reducer;