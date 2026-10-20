import { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import Card from "./components/Card";
import Modal from "./components/Modal";

interface CardType {
  id: string;
  content: string;
}

export default function App() {
  const [cards] = useState(
    [...Array(50)].map((e, i) => ({
      id: uniqid(),
      content: `${i + 1}`,
    }))
  );
  const [clickedCards, setClickedCards] = useState<Array<CardType>>([]);
  const [displayedCards, setDisplayedCards] = useState<Array<CardType>>([]);
  const [score, setScore] = useState({
    current: 0,
    highest: localStorage.getItem("highScore")
      ? Number(localStorage.getItem("highScore"))
      : 0,
  });
  const [gameResult, setGameResult] = useState<
    { outcome: "won" } | { outcome: "lost"; repeatedCard: CardType } | null
  >(null);
  const bestAtStart = useRef(score.highest);
  const isTapPending = useRef(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const focusedSlot = useRef(-1);

  const shuffle = (inputArray: CardType[]) => {
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

  const chooseCards = (): CardType[] => {
    const filteredCards = cards.filter((card) => !clickedCards.includes(card));
    const numberOfDisplayedCards = 12;

    if (filteredCards.length === 0) {
      setGameResult({ outcome: "won" });
      return shuffle(clickedCards.slice(0, numberOfDisplayedCards));
    }

    const numberOfUnclickedCardsToChoose =
      clickedCards.length >= numberOfDisplayedCards
        ? 1
        : numberOfDisplayedCards - clickedCards.length;
    const validUnclickedCards = shuffle(filteredCards);
    return shuffle([
      ...shuffle(clickedCards).slice(0, numberOfDisplayedCards - 1),
      ...validUnclickedCards.slice(0, numberOfUnclickedCardsToChoose),
    ]);
  };

  useEffect(() => {
    setDisplayedCards(chooseCards());
    isTapPending.current = false;
  }, [clickedCards]);

  // Keep keyboard focus on the same grid position after a reshuffle, rather
  // than following the picked card to its new position.
  useEffect(() => {
    const slot = gridRef.current?.children[focusedSlot.current];
    if (slot instanceof HTMLElement) slot.focus();
    focusedSlot.current = -1;
  }, [displayedCards]);

  const handleClick = (card: CardType) => {
    // Ignore taps until the previous one has reshuffled the cards, so that
    // this handler never acts on stale state.
    if (isTapPending.current) return;
    isTapPending.current = true;
    focusedSlot.current = Array.from(gridRef.current?.children ?? []).indexOf(
      document.activeElement as Element
    );

    // Let the press animation play before the cards reshuffle.
    setTimeout(() => {
      if (clickedCards.includes(card)) {
        setGameResult({ outcome: "lost", repeatedCard: card });
      } else {
        if (score.current >= score.highest) {
          setScore({ current: score.current + 1, highest: score.highest + 1 });
          localStorage.setItem("highScore", `${score.highest + 1}`);
        } else {
          setScore({ ...score, current: score.current + 1 });
        }
        setClickedCards([...clickedCards, card]);
      }
    }, 200);
  };

  const handlePlayAgain = () => {
    bestAtStart.current = score.highest;
    setScore({ ...score, current: 0 });
    setClickedCards([]);
    setGameResult(null);
  };

  return (
    <div className="flex min-h-dvh max-w-[100vw] select-none bg-slate-800 text-slate-300">
      {gameResult && (
        <Modal
          heading={
            gameResult.outcome === "won"
              ? `You remembered all ${cards.length}!`
              : "GAME OVER!"
          }
          message={
            gameResult.outcome === "lost"
              ? `You already picked ${gameResult.repeatedCard.content}.`
              : null
          }
          isNewBest={score.current > bestAtStart.current}
          onClick={handlePlayAgain}
        />
      )}
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 sm:gap-8 sm:p-8 xl:gap-16 short:flex-row short:gap-4 short:p-4">
        <div className="flex flex-col items-center gap-2">
          <div className="z-20 flex w-56 divide-x divide-slate-500 rounded-md bg-slate-700 px-4 py-2 text-center shadow shadow-slate-900 xl:px-8 xl:py-4 short:w-auto short:flex-col short:divide-x-0 short:divide-y short:px-4 short:py-2">
            <div className="w-1/2 min-w-fit pr-4 xl:pr-8 xl:text-lg short:w-auto short:px-0 short:pb-2 short:text-base">
              <div>Score</div>
              <div className="text-2xl xl:text-3xl short:text-2xl">
                {score.current}
              </div>
            </div>
            <div className="w-1/2 min-w-fit pl-4 xl:pl-8 xl:text-lg short:w-auto short:px-0 short:pt-2 short:text-base">
              <div>Best</div>
              <div className="text-2xl xl:text-3xl short:text-2xl">
                {score.highest}
              </div>
            </div>
          </div>
          <p className="max-w-56 text-balance text-center text-sm text-slate-400 short:max-w-20 short:text-xs">
            Tap all {cards.length} numbers, each only once.
          </p>
        </div>
        <div
          ref={gridRef}
          className="grid w-full max-w-sm grid-cols-3 gap-3 sm:w-auto sm:max-w-none sm:grid-cols-4 sm:gap-4 lg:grid-cols-6 xl:gap-8 short:h-[calc(100dvh-2rem)] short:max-w-3xl short:flex-1 short:grid-cols-6 short:grid-rows-2 short:gap-3"
        >
          {displayedCards.map((card) => (
            <Card
              key={card.id}
              content={card.content}
              disabled={gameResult !== null}
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
