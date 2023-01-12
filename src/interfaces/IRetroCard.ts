export const CARD_COLORS = [
  "blue",
  "green",
  "yellow",
  "pink",
  "purple",
  "orange",
  "red",
  "teal",
  "cyan",
  "gray",
] as const;

export type ICardColors = typeof CARD_COLORS[number];

export interface IRetroCard {
  cardId: string;
  question: string;
  color: ICardColors;
  handlePickCard: (cardId: string) => void;
  isDisabled?: boolean;
  isActive?: boolean;
  cardOwnerDisplayName?: string;
  uId?: string;
}
