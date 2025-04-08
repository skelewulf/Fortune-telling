
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const majorArcana = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
  "Judgement", "The World"
];

const fullDeck = [...majorArcana]; // Placeholder: can be expanded with Minor Arcana later

function shuffle(deck) {
  return [...deck].sort(() => Math.random() - 0.5);
}

export default function FortuneApp() {
  const [deckType, setDeckType] = useState(null);
  const [readingType, setReadingType] = useState(null);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [placement, setPlacement] = useState({});

  const handleShuffle = () => {
    const deck = deckType === "major" ? majorArcana : fullDeck;
    setShuffledDeck(shuffle(deck));
    setDrawnCards([]);
    setPlacement({});
  };

  const handleDraw = () => {
    const cards = shuffledDeck.slice(0, 3);
    setDrawnCards(cards);
    if (readingType === "yesno") {
      const yesCount = cards.filter((_, i) => i % 2 === 0).length; // Simple logic
      setPlacement({ result: yesCount >= 2 ? "Yes" : "No" });
    }
  };

  const handlePlacement = (pos, card) => {
    setPlacement((prev) => ({ ...prev, [pos]: card }));
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Fortune Reading</h1>

      {!deckType ? (
        <div className="space-x-2">
          <Button onClick={() => setDeckType("full")}>78 Card Tarot Deck</Button>
          <Button onClick={() => setDeckType("major")}>Only Major Arcana</Button>
        </div>
      ) : !readingType ? (
        <div className="space-x-2">
          <Button onClick={() => setReadingType("yesno")}>Yes/No Reading</Button>
          <Button onClick={() => setReadingType("general")}>General Reading</Button>
        </div>
      ) : (
        <>
          <Button onClick={handleShuffle}>Shuffle Deck</Button>

          {readingType === "yesno" && shuffledDeck.length > 0 && (
            <div className="space-y-2">
              <Button onClick={handleDraw}>Read</Button>
              {drawnCards.length > 0 && (
                <div>
                  <p>Cards: {drawnCards.join(", ")}</p>
                  <p className="text-xl font-semibold">Answer: {placement.result}</p>
                </div>
              )}
            </div>
          )}

          {readingType === "general" && shuffledDeck.length > 0 && drawnCards.length === 0 && (
            <div className="space-y-2">
              <Button onClick={() => setDrawnCards(shuffledDeck.slice(0, 3))}>Draw 3 Cards</Button>
            </div>
          )}

          {readingType === "general" && drawnCards.length > 0 && (
            <div className="space-y-2">
              <p>Drawn Cards: {drawnCards.join(", ")}</p>
              <div className="grid grid-cols-2 gap-2">
                {drawnCards.map((card, i) => (
                  <div key={i}>
                    <p>{card}</p>
                    <Button onClick={() => handlePlacement("Past", card)}>Past</Button>
                    <Button onClick={() => handlePlacement("Present", card)}>Present</Button>
                    <Button onClick={() => handlePlacement("Future", card)}>Future</Button>
                    <Button onClick={() => handlePlacement("FortuneTeller", card)}>Fortune Teller</Button>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="text-xl font-bold">Card Placement</h2>
                {Object.entries(placement).map(([key, val]) => (
                  <p key={key}>{key}: {val}</p>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
