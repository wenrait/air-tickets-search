import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { fetchTicketsData } from "../thunks/fetchTicketsData.ts";
import { ITicketData } from "../../data/ticketDataTypes.ts";
import { SetFilterBy, SortBy, TicketsState } from "./types.ts";
export const ticketsAdapter = createEntityAdapter<ITicketData>();
const initialState: TicketsState = {
  tickets: ticketsAdapter.getInitialState(),
  sortBy: SortBy.Price,
  filters: {
    connections: [],
    company: [],
  },
  loading: false,
  error: null,
};
export const selectAllTickets = createSelector(
  (state) => state.ticketsReducer.tickets,
  ticketsAdapter.getSelectors().selectAll,
);
export const selectFilteredSortedTickets = createSelector(
  [selectAllTickets, (state) => state.ticketsReducer],
  (tickets, { sortBy, filters }) => {
    const filteredTickets = tickets.filter(
      (ticket) =>
        (filters.connections.length === 0 ||
          filters.connections.includes(ticket.connections.toString())) &&
        (filters.company.length === 0 ||
          filters.company.includes(ticket.company)),
    );
    return filteredTickets.sort(
      (a, b) => a[sortBy as SortBy] - b[sortBy as SortBy],
    );
  },
);
export const ticketsSlice = createSlice({
  name: "ticketsSlice",
  initialState: initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    setFilterBy: (state, action: PayloadAction<SetFilterBy>) => {
      const { filterBy, id, checked } = action.payload;
      if (checked) {
        state.filters[filterBy].push(id);
      } else {
        state.filters[filterBy] = state.filters[filterBy].filter(
          (item) => item !== id,
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTicketsData.fulfilled, (state, action) => {
        ticketsAdapter.setAll(state.tickets, action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTicketsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});
export const { setSortBy, setFilterBy } = ticketsSlice.actions;
