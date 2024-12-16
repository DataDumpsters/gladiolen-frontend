interface Union {
  id: number;
  name: string;
  address: string;
  postalCode: string;
  municipality: string;
  vatNumber: string;
  accountNumber: string;
  numberOfParkingTickets: number;
  users?: User[];
}
