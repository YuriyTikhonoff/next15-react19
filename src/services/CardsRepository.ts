import { MemoCard } from "@/types/app"

class CardsRepository {
  private static instance: CardsRepository
  private cards: MemoCard[] = []

  private constructor() {}

  public saveCardsPersistently(cards: MemoCard[]): void {
    console.log("Saving cards persistently:", cards)
  }

  public static getInstance(): CardsRepository {
    if (!this.instance) {
      this.instance = new CardsRepository()
    }
    return this.instance
  }

  public async addCard(card: MemoCard): Promise<void> {
    const cardPayload = {
      title: card.title,
      front: card.front,
      back: card.back,
      categoryId: card.category,
    }
    try {
      const response = await fetch(`/api/memo-cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardPayload),
      })
      if (!response.ok) {
        throw new Error(`Failed to add card: ${response.status}`)
      }
    } catch (error) {
      console.error("Error adding card to backend:", error)
    }
    this.cards.push(card)
    this.saveCardsPersistently(this.cards)
  }

  public updateCard(card: MemoCard): void {
    console.log("Updating card:", card)
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
