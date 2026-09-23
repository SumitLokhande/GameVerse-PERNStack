import { useState } from "react";

interface lazyImgProps {
  imgUrl: string;
  altText: string;
  styleClass: string;
}

const LazyImg = ({ imgUrl, altText, styleClass }: lazyImgProps) => {
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const isLoaded = loadedUrl === imgUrl;
  const hasError = failedUrl === imgUrl;

  return (
    <div className="relative h-full w-full">
      <img
        loading="lazy"
        decoding="async"
        src={imgUrl}
        alt={altText}
        onLoad={() => setLoadedUrl(imgUrl)}
        onError={() => setFailedUrl(imgUrl)}
        className={`${styleClass} transition-opacity duration-300 ${
          isLoaded && !hasError ? "opacity-100" : "opacity-0"
        }`}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
          <p>{hasError ? "Unable to load image" : "Loading..."}</p>
        </div>
      )}
    </div>
  );
};

export default LazyImg;
