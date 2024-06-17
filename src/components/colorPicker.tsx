"use client";

import { HexColorPicker } from "react-colorful";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"

type ColorPickerProps = {
  value: string;
  onChange: (value: string) => void;
};

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const toggleColorPicker = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <div>
      <div className="ml-1 mt-2 flex items-center gap-3">
        <div 
          className="w-6 h-6 rounded-md ring-2 ring-orange-500 ring-offset-2 cursor-pointer"
          style={{ backgroundColor: value }}
          onClick={toggleColorPicker}
        />
        <input 
          type="text"
          className="w-fit uppercase bg-transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute z-10 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={pickerRef}
          >
            <HexColorPicker 
              color={value} 
              onChange={onChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
};

export default ColorPicker;