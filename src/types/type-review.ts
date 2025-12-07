export type Review = {
  id: number;
  offerId: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  date: string;
  text: string;
};
