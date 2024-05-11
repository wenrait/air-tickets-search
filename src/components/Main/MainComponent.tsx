import "./MainComponent.scss";
import { AsideComponent } from "../Aside/AsideComponent.tsx";
import { ButtonComponent } from "../Button/ButtonComponent.tsx";
import {
  selectFilteredSortedTickets,
  setSortBy,
} from "../../redux/ticketsSlice/ticketsSlice.ts";
import { SortBy } from "../../redux/ticketsSlice/types.ts";
import { useEffect, useState } from "react";
import { RootDispatch, RootState } from "../../redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketsData } from "../../redux/thunks/fetchTicketsData.ts";
import { TicketComponent } from "../Ticket/TicketComponent.tsx";

export const MainComponent = () => {
  const dispatch: RootDispatch = useDispatch();
  const tickets = useSelector(selectFilteredSortedTickets);
  const sortBy = useSelector((state: RootState) => state.ticketsReducer.sortBy);
  const [limit, setLimit] = useState(2);
  useEffect(() => {
    dispatch(fetchTicketsData()).then(() => {
      dispatch(setSortBy(sortBy));
    });
  }, [sortBy, dispatch, limit]);
  const handleSortBy = (value: SortBy) => {
    dispatch(setSortBy(value));
  };
  const handleAdd = () => {
    setLimit((prevLimit) => prevLimit + 2);
  };
  const selectedTickets = tickets.slice(0, limit);
  return (
    <div className={"Tickets"}>
      <div className={"Tickets__buttons"}>
        <ButtonComponent
          sortBy={SortBy.Price}
          text={"Самый дешёвый"}
          place={"header"}
          onClick={() => handleSortBy(SortBy.Price)}
        />
        <ButtonComponent
          sortBy={SortBy.Duration}
          text={"Самый быстрый"}
          place={"header"}
          onClick={() => handleSortBy(SortBy.Duration)}
        />
        <ButtonComponent
          sortBy={SortBy.Connections}
          text={"Самый оптимальный"}
          place={"header"}
          onClick={() => handleSortBy(SortBy.Connections)}
        />
      </div>
      <AsideComponent />
      {selectedTickets.map((ticket) => (
        <TicketComponent
          key={ticket.id}
          id={ticket.id}
          from={ticket.from}
          to={ticket.to}
          company={ticket.company}
          price={ticket.price}
          currency={ticket.currency}
          time={ticket.time}
          duration={ticket.duration}
          date={ticket.date}
          connections={ticket.connections}
        />
      ))}
      {selectedTickets.length < tickets.length && (
        <ButtonComponent
          text={"Загрузить ещё билеты"}
          place={"footer"}
          onClick={handleAdd}
        />
      )}
    </div>
  );
};
