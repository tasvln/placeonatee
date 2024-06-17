"use client";

import ColorPicker from "@/components/colorPicker";
import DropBox from "@/components/dropBox";
import PointOne from "@/components/svg/pointOne";
import PointTwo from "@/components/svg/pointTwo";
import Tee from "@/components/svg/tee";
import { convertSvgToImage } from "@/lib/utils/helpers";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [teeColor, setTeeColor] = useState<string>("#ffffff");
  const [teeBorderColor, setTeeBorderColor] = useState<string>("#000000");
  const [uploadedImage, setUploadedImage] = useState<string | null>();

  const handleVinylConvertion = (format: 'png' | 'jpeg' | 'jpg') => {
    convertSvgToImage('tee', format)
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `placeonateetee.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error converting SVG:', error);
      });
  };

  return (
    <main className="h-dvh flex flex-col xl:overflow-hidden relative justify-center items-center p-4">
      <div className="hidden relative md:flex flex-col">
        <Tee 
          shirtColor={teeColor} 
          borderColor={teeBorderColor} 
          designImage={uploadedImage as string}
        />
        {/* bg point */}
        <div className="absolute top-0 right-0 -mr-[54%] mt-4">
          <div className="flex items-center gap-2">
            <PointOne />
            <div className="-mt-14">
              <ColorPicker 
                value={teeColor}
                onChange={setTeeColor}
              />
            </div>
          </div>
        </div>
        {/* border point */}
        <div className="absolute top-0 right-0 -mr-[64%] mt-24">
          <div className="flex items-center gap-2">
            <PointOne />
            <div className="-mt-14">
              <ColorPicker 
                value={teeBorderColor}
                onChange={setTeeBorderColor}
              />
            </div>
          </div>
        </div>
        {/* image point */}
        <div className="absolute top-0 right-0 -mr-[35%] mt-56">
          <div className="flex flex-col items-end gap-2">
            <PointTwo />
            <div className="">
              <DropBox 
                title="Upload" 
                additional="frame is 222px x 272px"
                acceptedFiles={{ 'image/*': ['.jpeg', '.png'] }}
                setPreview={(preview: string | null) => setUploadedImage(preview)}
                optional
              />
            </div>
          </div>
        </div>
        <button 
          className="w-full bg-orange-500 text-center lowercase text-white py-2 mt-8"
          onClick={() => handleVinylConvertion('png')}
        >
          download as png
        </button>
      </div>
      <p className="text-center text-gray-500 text-2xl md:hidden">best viewed on desktop :)</p>
    </main>
  );
}
