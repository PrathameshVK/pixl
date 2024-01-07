import { useRef, useState } from "react";
import styled, { css } from "styled-components";

const CanvasContainer = styled.div`
  aspect-ratio: 1 / 1;
  width: 80%;
  margin-left: auto;
  border: 4px solid black;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const CanvasBody = styled.div`
  width: 100%;
`;

const Pixel = styled.div`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  background-color: ${(props) => props.fill !== 0 && props.fill};
  ${({ isOddRow }) =>
    isOddRow
      ? css`
          &:nth-child(2n-1) {
            background-color: ${(props) =>
              props.fill !== 0 ? props.fill : "#d6d6d6"};
          }
        `
      : css`
          &:nth-child(2n) {
            background-color: ${(props) =>
              props.fill !== 0 ? props.fill : "#d6d6d6"};
          }
        `}
  cursor: crosshair;
`;

const PixelRow = styled.div`
  display: flex;
`;

const Canvas = ({
  currentColor,
  currentTool,
  pixels,
  pixelSize,
  handlePixelFill,
  handleBucketFill,
  handleColourPicker,
  canvasRef,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const pixelRef = useRef();

  const onMouseOver = (pixel, pixelRowIndex, pixelColumnIndex, color) => {
    if (isMouseDown) {
      if (currentTool === "pencil" && pixel !== currentColor) {
        handlePixelFill(pixelRowIndex, pixelColumnIndex, color);
      } else if (currentTool === "eraser") {
        handlePixelFill(pixelRowIndex, pixelColumnIndex, color);
      } else if (currentTool === "bucket") {
        handleBucketFill(pixelRowIndex, pixelColumnIndex);
      }
    }
  };

  const onMouseDown = (pixel, pixelRowIndex, pixelColumnIndex, color) => {
    if (!isMouseDown) {
      setIsMouseDown(true);
      if (currentTool === "pencil" && pixel !== currentColor) {
        handlePixelFill(pixelRowIndex, pixelColumnIndex, color);
      } else if (currentTool === "eraser") {
        handlePixelFill(pixelRowIndex, pixelColumnIndex, color);
      } else if (currentTool === "bucket") {
        handleBucketFill(pixelRowIndex, pixelColumnIndex);
      }
    }
  };

  return (
    <CanvasContainer>
      <CanvasBody
        ref={canvasRef}
        id="canvas-container"
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseLeave={() => setIsMouseDown(false)}
      >
        {pixels.map((pixelRow, rowIndex) => {
          const isOddRow = rowIndex % 2 === 1;
          return (
            <PixelRow key={rowIndex + "-row"}>
              {pixelRow.map((pixel, columnIndex) => {
                return (
                  <Pixel
                    ref={pixelRef}
                    key={columnIndex}
                    fill={pixel}
                    isOddRow={isOddRow}
                    size={`${pixelSize}px`}
                    onClick={() => handleColourPicker(pixel)}
                    onMouseOver={() =>
                      onMouseOver(
                        pixel,
                        rowIndex,
                        columnIndex,
                        currentTool === "pencil" ? currentColor : 0
                      )
                    }
                    onMouseDown={() =>
                      onMouseDown(
                        pixel,
                        rowIndex,
                        columnIndex,
                        currentTool === "pencil" ? currentColor : 0
                      )
                    }
                  />
                );
              })}
            </PixelRow>
          );
        })}
      </CanvasBody>
    </CanvasContainer>
  );
};

export default Canvas;
