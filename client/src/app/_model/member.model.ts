import { Photo } from "./photo.model";

export interface Member {
  id: number;
  userName: string;
  dateOfBirth: string;
  knownAs: string;
  photoUrl: string;
  created: string;
  lastActive: string;
  gender: string;
  introduction: string;
  interests: string;
  lookingFor: string;
  city: string;
  country: string;
  age: number;
  photos: Photo[];
}
