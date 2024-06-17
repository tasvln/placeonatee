
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"

type ExportProps = {
  title: string;
  handleConvert: (format: 'png' | 'jpeg' | 'jpg') => void;
};

const Export = ({ title, handleConvert }: ExportProps) => {
  const [openExport, setOpenExport] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleExport = useCallback(() => {
    setOpenExport((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenExport(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button 
        className="w-full p-2 px-3 bg-orange-600 text-white mt-4 lowercase disabled:opacity-30" 
        onClick={toggleExport}
        disabled={title === ""}
      >
        export
      </button>

      <AnimatePresence>
        {openExport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-10 w-full h-screen bg-orange-200 bg-opacity-50 top-0 left-0 flex items-center justify-center cursor-pointer"
          >
            <div className="w-full xl:w-1/3 bg-white p-4 cursor-default" ref={modalRef}>
              {/* Export as Image Section */}
              <div className="flex items-center gap-4">
                <button 
                  className="w-full bg-orange-500 text-center lowercase text-white py-2"
                  onClick={() => handleConvert('png')}
                >
                  download as png
                </button>
                <button 
                  className="w-full bg-orange-500 text-center lowercase text-white py-2"
                  onClick={() => handleConvert('jpeg')}
                >
                  download as jpeg
                </button>
              </div>
              {/* Export animated version */}
              <div className="flex flex-col gap-1 mt-6 pointer-events-none opacity-30">
                <p className="text-gray-500 text-left">* vinyl would be rotating with music uploaded</p>
                <div className="w-full p-2 px-3 border border-gray-300 py-2 mb-1 flex justify-center items-center">
                  <p className="text-gray-500 lowercase">Upload Song *</p>
                </div>
                <button 
                  className="w-full bg-orange-500 text-center lowercase text-white py-2 disabled:opacity-40"
                  disabled
                >
                  download as mp4
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
};

export default Export;