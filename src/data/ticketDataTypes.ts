export interface ITicketTime {
  startTime: string;
  endTime: string;
}
export interface ITicketData {
  id: string;
  from: string;
  to: string;
  company: string;
  price: number;
  currency: "RUB";
  time: ITicketTime;
  duration: number;
  date: string;
  connections: number;
}
