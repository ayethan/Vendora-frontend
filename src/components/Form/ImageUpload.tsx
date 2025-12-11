import React from 'react';
import { CloudDownload } from 'lucide-react';

interface ImageUploadProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  productImages: string[];
  setOpenFullScreenImage: React.Dispatch<React.SetStateAction<boolean>>;
  setFullScreenImage: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onFileUpload,
  productImages,
  setOpenFullScreenImage,
  setFullScreenImage,
}) => (
  <div>
    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Gallery</label>
    <label htmlFor="uploadImageInput">
      <div className="p-2 bg-slate-100 border border-gray-200 rounded h-32 w-full flex justify-center items-center cursor-pointer">
        <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
          <span className="text-4xl"><CloudDownload /></span>
          <p className="text-sm">Upload Product Image</p>
          <input type="file" id="uploadImageInput" className="hidden" onChange={onFileUpload} />
        </div>
      </div>
    </label>
    <div>
      {productImages.length > 0 ? (
        <div className="flex items-center gap-2">
          {productImages.map((el) => (
            <div className="relative group" key={el}>
              <img
                src={el}
                alt={el}
                width={80}
                height={80}
                className="bg-slate-100 border cursor-pointer"
                onClick={() => {
                  setOpenFullScreenImage(true);
                  setFullScreenImage(el);
                }}
              />
              <div className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer">
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-600 text-xs">*Please upload product image</p>
      )}
    </div>
  </div>
);

export default ImageUpload;
