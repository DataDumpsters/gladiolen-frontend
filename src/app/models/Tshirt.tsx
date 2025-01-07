import { User } from "@/app/models/User";

export interface Tshirt {
  id: number;
  size: Size;
  sex: Sex;
  job: Job;
  totalQuantity: number;
  user?: User;
}
