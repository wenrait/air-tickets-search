import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchTicketsData = createAsyncThunk(
  "tickets/fetchTicketsData",
  async () => {
    const response = await fetch("/src/data/ticketsData.json");
    if (!response.ok) {
      throw new Error("Error");
    }
    return await response.json();
  },
);
