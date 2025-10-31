import { MemoCard } from "@/types/app"

class CardsRepository {
  private static instance: CardsRepository
  private cards: MemoCard[] = []

  private constructor() {}

  public saveCardsPersistently(cards: MemoCard[]): void {
    console.log("Saving cards persistently:", cards)
    console.log("Hello")
    // if (localStorage)
    //   localStorage.setItem(LocalStorageFields.Cards, JSON.stringify(cards))
  }

  public static getInstance(): CardsRepository {
    if (!this.instance) {
      this.instance = new CardsRepository()
    }
    return this.instance
  }

  public addCard(card: MemoCard): void {
    this.cards.push(card)
    this.saveCardsPersistently(this.cards)
  }

  public updateCard(card: MemoCard): void {
    const updatedCards = this.cards.map(currentCard =>
      currentCard.id === card.id ? card : currentCard
    )
    this.cards = updatedCards
    this.saveCardsPersistently(this.cards)
  }

  public getCards(): MemoCard[] {
    // const cards = localStorage
    //   ? localStorage.getItem(LocalStorageFields.Cards)
    //   : null
    const cards = null
    this.cards = cards ? JSON.parse(cards) : []
    return this.cards
  }

  public removeCard(cardId: string): void {
    this.cards = this.cards.filter(card => card.id !== cardId)
    this.saveCardsPersistently(this.cards)
  }
}

export default CardsRepository.getInstance()
