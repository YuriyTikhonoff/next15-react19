import CardsRepository from "@/services/CardsRepository";
import { MemoCard } from "@/types/app";
import { useCallback, useState } from "react";

const useContainer = () => {
  const [cards, setCards] = useState<MemoCard[]>(CardsRepository.getCards());
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const grouppedCards = cards.reduce((acc, card) => {
    acc[card.category] = acc[card.category]
      ? [...acc[card.category], card]
      : [card];
    return acc;
  }, {} as Record<string, MemoCard[]>);

  const onAddNewCard = useCallback((newCard: MemoCard) => {
    setCards((prev) => [...prev, newCard]);
    CardsRepository.addCard(newCard);
  }, []);

  const onUpdateCard = useCallback((updatedCard: MemoCard) => {
    setCards((prev) =>
      prev.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
    CardsRepository.updateCard(updatedCard);
  }, []);

  const isPracticeCardsModeActive = activeCardIndex !== null;

  const calculateNextCardIndex = (prevIndex: number, cards: MemoCard[]) => {
    const maxIndex = cards.length - 1;
    return prevIndex === maxIndex ? 0 : prevIndex + 1;
  };

  const activeCard = cards[activeCardIndex ?? 0];

  const onCloseCardPractice = useCallback(() => {
    setActiveCardIndex(null);
  }, []);

  const onNextCard = useCallback(() => {
    setActiveCardIndex((prevIndex) =>
      prevIndex !== null ? calculateNextCardIndex(prevIndex, cards) : null
    );
  }, [cards]);

  const onPracticeCards = () => setActiveCardIndex(cards.length > 0 ? 0 : null);

  const onDeleteCard = useCallback((cardId: MemoCard["id"]) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
    CardsRepository.removeCard(cardId);
  }, []);

  return {
    activeCard,
    grouppedCards,
    isPracticeCardsModeActive,
    onAddNewCard,
    onCloseCardPractice,
    onDeleteCard,
    onNextCard,
    onPracticeCards,
    onUpdateCard,
  };
};

export default useContainer;
