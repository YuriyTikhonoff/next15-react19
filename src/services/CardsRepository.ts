import { LocalStorageFields, MemoCard } from "@/types/app";

class CardsRepository {
  private static instance: CardsRepository;
  private cards: MemoCard[] = [];

  private constructor() {}

  public static getInstance(): CardsRepository {
    if (!this.instance) {
      this.instance = new CardsRepository();
    }
    return this.instance;
  }

  public addCard(card: MemoCard): void {
    this.cards.push(card);
    localStorage.setItem(LocalStorageFields.Cards, JSON.stringify(this.cards));
  }

  public getCards(): MemoCard[] {
    const cards = localStorage.getItem(LocalStorageFields.Cards);
    this.cards = cards ? JSON.parse(cards) : [];
    return this.cards;
  }

  public removeCard(cardId: string): void {
    this.cards = this.cards.filter((card) => card.id !== cardId);
    localStorage.setItem(LocalStorageFields.Cards, JSON.stringify(this.cards));
  }
}

export default CardsRepository.getInstance();
