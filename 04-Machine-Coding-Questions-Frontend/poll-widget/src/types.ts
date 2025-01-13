export interface Poll {
  id: number;
  question: string;
  totalCount: number;
  options: Option[];
}
export interface Option {
  id: number;
  title: string;
  votes: number;
}
