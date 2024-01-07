export const debounce = (func, wait) => {
  let timer = null;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      const result = func(...args);
      timer = null;
      return result;
    }, wait);
  };
};

// Recursive flood fill algorithm
export const floodFill = (
  newPixels,
  pixels,
  row,
  col,
  targetColor,
  fillColor
) => {
  // Check boundaries and color equality
  if (
    row < 0 ||
    row >= pixels?.length ||
    col < 0 ||
    col >= pixels?.length ||
    newPixels[row][col] !== targetColor ||
    newPixels[row][col] === fillColor
  ) {
    return;
  }

  // Fill the current pixel
  pixels[row][col] = fillColor;

  // Recursive calls for neighboring pixels
  floodFill(pixels, row - 1, col, targetColor, fillColor); // Top
  floodFill(pixels, row + 1, col, targetColor, fillColor); // Bottom
  floodFill(pixels, row, col - 1, targetColor, fillColor); // Left
  floodFill(pixels, row, col + 1, targetColor, fillColor); // Right
};
