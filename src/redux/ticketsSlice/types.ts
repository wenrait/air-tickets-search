import { ITicketData } from "../../data/ticketDataTypes.ts";

export enum SortBy {
  Price = "price",
  Duration = "duration",
  Connections = "connections",
}
export enum FilterBy {
  Connections = "connections",
  Company = "company",
}
export interface IFilters {
  connections: string[];
  company: string[];
}
export interface TicketsState {
  tickets: { ids: string[]; entities: { [id: string]: ITicketData } };
  sortBy: SortBy;
  filters: IFilters;
  loading: boolean;
  error: null | string;
}
export interface SetFilterBy {
  filterBy: FilterBy;
  id: string;
  checked: boolean;
}
