import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async ({ apiBaseUrl, userId, token }) => {
    const response = await axios.get(`${apiBaseUrl}/ticket/user/information/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data;
});

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: { data: [], status: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickets.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTickets.rejected, (state) => { state.status = 'failed'; });
    },
});

export default ticketsSlice.reducer;
