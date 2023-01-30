import { useEffect, useState } from "react";
import uniqid from "uniqid";
import Card from "./components/Card";

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cards, setCards] = useState([
    { id: uniqid(), content: "1" },
    { id: uniqid(), content: "2" },
    { id: uniqid(), content: "3" },
    { id: uniqid(), content: "4" },
  ]);

  const [clickedCards, setClickedCards] = useState<
    Array<{ id: string; content: string }>
  >([]);

  useEffect(() => {
    console.clear();
    console.table(clickedCards);
  });

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
