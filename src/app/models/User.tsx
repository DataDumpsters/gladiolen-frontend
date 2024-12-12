interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
  registryNumber: string;
  union?: {
    id: number;
    name: string;
  };
  tshirt?: {
    size: string;
    sex: string;
    job: string;
    quantity: number;
  };
}
