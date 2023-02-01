import { useEffect, useState } from "react";
import uniqid from "uniqid";
import Card from "./components/Card";

export default function App() {
  const [cards, setCards] = useState(
    [...Array(12)].map((e, i) => ({
      id: uniqid(),
      content: `${i + 1}`,
    }))
  );

  const [clickedCards, setClickedCards] = useState<
    Array<{ id: string; content: string }>
  >([]);

  const shuffle = <Type,>(inputArray: Type[]): Type[] => {
    const outputArray = [...inputArray];

    let maxIndex = inputArray.length;
    while (maxIndex > 0) {
      const randomIndex = Math.floor(Math.random() * maxIndex);
      maxIndex -= 1;

      if (randomIndex !== maxIndex) {
        [outputArray[maxIndex], outputArray[randomIndex]] = [
          outputArray[randomIndex],
          outputArray[maxIndex],
        ];
      }
    }

    return outputArray;
  };

  useEffect(() => {
    setCards(shuffle(cards));
    console.clear();
    console.table(clickedCards);
  }, [clickedCards]);

  const handleClick = (card: { id: string; content: string }) => {
    if (clickedCards.includes(card)) {
      console.log("Game Over!");
    } else {
      setClickedCards([...clickedCards, card]);
    }
  };

  return (
    <div className="flex min-h-screen max-w-[100vw] bg-slate-800 text-slate-300">
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:gap-8">
          {cards.map((card) => (
            <Card
              key={card.id}
              content={card.content}
              onClick={() => {
                handleClick(card);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
