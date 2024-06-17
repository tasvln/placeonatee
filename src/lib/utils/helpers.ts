export function convertSvgToImage(svgId: string, format: 'png' | 'jpeg' | 'jpg' = 'png'): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const svgElement = document.getElementById(svgId) as SVGSVGElement | null;

    if (!svgElement) {
      reject(new Error('SVG element not found'));
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(img, 0, 0);

        if (format === 'png') {
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            URL.revokeObjectURL(url);
          }, 'image/png');
        } else if (format === 'jpeg' || format === 'jpg') {
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            URL.revokeObjectURL(url);
          }, 'image/jpeg');
        } else {
          reject(new Error('Unsupported format'));
          URL.revokeObjectURL(url);
        }
      } else {
        reject(new Error('Failed to get canvas context'));
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load SVG'));
      URL.revokeObjectURL(url);
    };

    img.src = url;
  });
}
