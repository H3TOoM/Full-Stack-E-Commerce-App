import { IItem } from './IItem';

export interface ICart {
  id: number;
  userId: number;
  items: IItem[];
}
