import { useState, useEffect } from "react";

interface WindowDimentions {
  width: number;
  height: number;
}

function getDocumentDimensions(): WindowDimentions {
  const {
    document: {
      body: { scrollWidth, scrollHeight },
    },
  } = window;

  return {
    width: scrollWidth,
    height: scrollHeight,
  };
}

export function useDocumentDimensions(): WindowDimentions {
  const [documentDimensions, setDocumentDimensions] =
    useState<WindowDimentions>(getDocumentDimensions());

  useEffect(() => {
    function handleResize(): void {
      setDocumentDimensions(getDocumentDimensions());
    }

    window.addEventListener("resize", handleResize);

    return (): void => window.removeEventListener("resize", handleResize);
  }, []);

  return documentDimensions;
}
