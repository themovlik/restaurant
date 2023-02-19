import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as restaurantsList from './restaurantsList';
export type Restaurants = {
    name: string;
}

export type RestaurantsListState = {
    restaurants: Restaurants[];
    loading: boolean;
    error: boolean;
    errorMessage: string;
}

const initialState: RestaurantsListState = {
    restaurants: [],
    loading: false,
    error: false,
    errorMessage: '',
}

export const fetchRestaurants = createAsyncThunk<{restaurants: Restaurants[]}>(
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
        })
        .addCase(fetchRestaurants.rejected, (state) => {
            state.error = true;
            state.loading = false;
        })
    },
})

export default restaurantsListSlice.reducer;