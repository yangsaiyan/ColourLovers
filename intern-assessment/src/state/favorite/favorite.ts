import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Colors {
    id: number;
    title: string;
    userName: string;
    numViews: number;
    numVotes: number;
    numComments: number;
    numHearts: number;
    rank: number;
    dateCreated: string;
    hex: string;
    rgb: Rgb;
    hsv: Hsv;
    description: string;
    url: string;
    imageUrl: string;
    badgeUrl: string;
    apiUrl: string;
}
export interface Rgb {
    red: number;
    green: number;
    blue: number;
}
export interface Hsv {
    hue: number;
    saturation: number;
    value: number;
}

interface FavoritesState{

    colors: Colors[];
}

const initialState: FavoritesState = {
//empty at first
    colors: []
}

const favoritesSlice = createSlice({

    name: 'favorites',
    initialState,
    reducers:{
        //push to the array
        addFavorite: (state, action: PayloadAction<Colors>) => {
            state.colors.push(action.payload);
        },
        //remove from the array
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.colors = state.colors.filter(color => color.id !== action.payload);
        }
    }
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;