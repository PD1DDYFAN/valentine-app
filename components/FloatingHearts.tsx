
import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [items, setItems] = useState<{ id: number; left: string; duration: string; size: string; content: string; isText: boolean }[]>([]);

  const phrases = [
    "I love you", "my girl", "my baby", "my princess", "Monika ❤️", 
    "cutie", "habibi", "my soulmate", "my world", "my queen"
  ];

  const hearts = ["❤️", "💖", "🌸", "💕", "🌹", "✨"];

  useEffect(() => {
    const interval = setInterval(() => {
      // 40% chance to show a nickname, 60% chance to show a heart/symbol
      const isText = Math.random() > 0.6;
      const content = isText 
        ? phrases[Math.floor(Math.random() * phrases.length)]
        : hearts[Math.floor(Math.random() * hearts.length)];

      const newItem = {
        id: Date.now(),
        left: `${Math.random() * 100}%`,
        duration: `${6 + Math.random() * 8}s`,
        size: isText ? `${14 + Math.random() * 8}px` : `${15 + Math.random() * 25}px`,
        content: content,
        isText: isText
      };
      
      setItems((prev) => [...prev.slice(-25), newItem]);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className={`heart absolute bottom-[-100px] whitespace-nowrap select-none ${
            item.isText ? 'text-pink-400 font-bold italic cursive opacity-70' : 'text-pink-300 opacity-60'
          }`}
          style={{
            left: item.left,
            animationDuration: item.duration,
            fontSize: item.size,
          }}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
