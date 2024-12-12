interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: Role;
  registryNumber: string;
  password: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string; // Use string to represent date-time
  union?: {
    id: number;
    name: string;
    address: string;
    postalCode: string;
    municipality: string;
    vatNumber: string;
    accountNumber: string;
    numberOfParkingTickets: number;
    users?: User[];
  };
  tshirt?: {
    id: number;
    size: string;
    sex: string;
    job: string;
    quantity: number;
  };
  shifts?: Array<{
    id: number;
    name: string;
  }>;
}
