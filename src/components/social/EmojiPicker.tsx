import React from 'react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const emojis = ['😊', '🙏', '❤️', '✨', '🎉', '🙌', '🌟', '✝️', '🕊️', '🎵', '🤝', '💪', '🌈', '🙂', '😇'];

  return (
    <div className="absolute bottom-full right-0 mb-2 p-2 bg-white border rounded-lg shadow-lg z-10">
      <div className="grid grid-cols-5 gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              onSelect(emoji);
              onClose();
            }}
            className="p-2 hover:bg-gray-100 rounded"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}