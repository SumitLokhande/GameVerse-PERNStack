export type AuthContextType = {
  user: User | null;
  setToken: (token: string) => void;
  setUserHandler: (user: User) => void;
  getUserHandler: () => User | undefined;
  logout: () => void;
  isAuthenticated: boolean;
};

export type User = {
  email: string;
  id: string;
  name: string;
};

export interface GameDetail {
  id: number; // change to number if you're using numeric ids
  title: string;
  text: string;
  image: string;
  images: string[];
  platforms: string[];
  rating: number;
  price: number;
  discount?: number;
  description: string;
  genre: string;
}

export interface Category {
  id: string;
  name: string;
  backgroundImage: string;
}

export interface CartItem extends GameDetail {
  quantity: number;
}

export interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  vram: string;
  directX: string;
  storage: string;
}

export interface GOTYGameDetail {
  id: number;
  title: string;
  developer: string;
  images: string[]; // Array of additional screenshot URLs
  year: number;
  awards: string[];
  description: string;
  rating: number;
  isWinner: boolean;
  category: string;
  platforms: string[];
  genre: string;
  discount: number;
  price: number;
  recommendedSystemRequirements: SystemRequirements;
}

export interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  gameTitle: string;
}

export type GameRecommendation = {
  name: string;
  description: string;
  genreType: string;
  platforms: string[];
  difficulty: "easy" | "medium" | "hard";
  players: number;
  estimatedPlaytime: string;
  releaseYear: number;
  developer: string;
  gameTags: string[];
  whyRecommended: string[];
  pros: string[];
  cons: string[];
  similarGames: string[];
};
