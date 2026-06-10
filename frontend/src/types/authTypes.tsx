export type AuthContextType = {
  user: User | null;
  setToken: (token: string) => void;
  setUserHandler: (user: User) => void;
  getUserHandler: () => User | null;
  logout: () => void;
  isAuthenticated: boolean;
};

export type User = {
  email: string;
  id: string;
  name: string;
};

export interface Game {
  id: string; // change to number if you're using numeric ids
  label: string;
  text: string;
  image: string;
  platforms: string[];
  price_inr: number;
}
