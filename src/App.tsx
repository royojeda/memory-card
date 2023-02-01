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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [score, setScore] = useState({ current: 0, highest: 0 });

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
      setScore({ ...score, current: 0 });
      setClickedCards([]);
      console.log("Game Over!");
    } else {
      if (score.current >= score.highest) {
        setScore({ current: score.current + 1, highest: score.highest + 1 });
      } else {
        setScore({ ...score, current: score.current + 1 });
      }
      setClickedCards([...clickedCards, card]);
    }
  };

  return (
    <div className="flex min-h-screen max-w-[100vw] bg-slate-800 text-slate-300">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-8 xl:gap-16">
        <div className="flex w-52 select-none divide-x divide-slate-500 rounded-md bg-slate-700 px-4 py-2 text-center shadow shadow-slate-900 xl:px-8 xl:py-4">
          <div className="w-1/2 min-w-fit pr-4 xl:pr-8 xl:text-lg">
            <div>Score</div>
            <div className="text-2xl xl:text-3xl">{score.current}</div>
          </div>
          <div className="w-1/2 min-w-fit pl-4 xl:pl-8 xl:text-lg">
            <div>Best</div>
            <div className="text-2xl xl:text-3xl">{score.highest}</div>
          </div>
        </div>
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
