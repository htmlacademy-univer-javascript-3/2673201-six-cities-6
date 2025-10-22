export type Review = {
  id: number;
  offerId: number;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  date: string;
  text: string;
};
