import { Model } from './../admin/guitars/metadata/models/model.model';
import { Make } from './../admin/guitars/metadata/makes/make.model';
export interface Guitar {
  id: string;
  make: Make;
  model: Model;
  subModel: string;
  imageUrl: string;
  description: string;
  price: number;
  addDate: Date;
}
