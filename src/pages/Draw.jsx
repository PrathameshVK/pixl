import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import styled from "styled-components";

import { Text } from "../common/Headings";
import { LayoutBlock } from "../common/styles";
import Canvas from "../components/Canvas";
import Modal from "../components/Modal";
import PageLayout from "../components/PageLayout";
import Tools from "../components/Tools";
import { debounce } from "../helpers";

const NewFileInfo = styled.div`
  display: flex;
  width: 20rem;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid black;
`;

const PixelSizeRange = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  cursor: pointer;
  outline: none;
  /*  slider progress trick  */
  overflow: hidden;
  border-radius: 1rem;
  border: 2px solid black;

  &::-webkit-slider-runnable-track {
    height: 1rem;
    background: white;
    border-radius: 1rem;
  }
  &::-moz-range-track {
    height: 1rem;
    background: white;
    border-radius: 1rem;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 1rem;
    width: 1rem;
    background-color: #fff;
    border-radius: 50%;
    border: 2px solid black;
    /*  slider progress trick  */
    box-shadow: -407px 0 0 400px black;
  }
  &::-moz-range-thumb {
    height: 15px;
    width: 15px;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid black;
    /*  slider progress trick  */
    box-shadow: -407px 0 0 400px black;
  }
  &:focus {
    outline: none;
  }
`;

const BgColorPalette = styled.input`
  appearance: none;
  -webkit-appearance: none;
  border: none;
  width: 100%;
  height: 2rem;
  cursor: pointer;
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    border: 2px solid black;
    border-radius: 0.25rem;
  }
`;

const CreateButton = styled.button`
  border: 2px solid black;
  background-color: white;
  padding: 0.5rem 1rem;
  width: 100%;
  cursor: pointer;
  border-radius: 0.25rem;
  font-weight: bold;
`;

const BgCheck = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  opacity: ${(props) => (props.active ? 1 : 0.4)};
`;

const CheckBox = styled.div`
  height: 1rem;
  width: 1rem;
  border: 2px solid black;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: ${(props) => (props.checked ? "black" : "white")};
`;

const Draw = () => {
  const [pixels, setPixels] = useState([]);
  const [pixelSize, setPixelSize] = useState(16);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentTool, setCurrentTool] = useState("pencil");

  const [newPixelSize, setNewPixelSize] = useState(10);
  const [newBgColor, setNewBgColor] = useState(0);
  const [hasBgColor, setHasBgColor] = useState(false);

  const [showNewFileModal, setShowNewFileModal] = useState(false);

  const canvasRef = useRef();

  useEffect(() => {
    setPixels(generateNewPixels(10));
    getPixelSize(10);
  }, []);

  useEffect(() => {
    if (!hasBgColor) {
      setNewBgColor(0);
    }
  }, [hasBgColor]);

  // Create an array filled with initial arrays of length and filled with 0s
  const generateNewPixels = (length, color = 0) => {
    const resultArray = Array.from({ length }, () => Array(length).fill(color));
    return resultArray;
  };

  const getPixelSize = (length) => {
    const canvasWidth = document
      .getElementById("canvas-container")
      .getBoundingClientRect();
    const pixelSize = canvasWidth.width / length;
    setPixelSize(pixelSize);
  };

  const handlePixelFill = (pixelRowIndex, pixelColumnIndex, color) => {
    setPixels((prevArrays) => {
      const newArray = [...prevArrays];
      newArray[pixelRowIndex] = [...newArray[pixelRowIndex]];
      newArray[pixelRowIndex][pixelColumnIndex] = color;
      return newArray;
    });
  };

  // Debounce the onChange handler for color palette
  const debouncedHandleColorChange = debounce((someFunction, newColor) => {
    someFunction(newColor);
  }, 300);

  const handleCurrentColor = (value, prevColor = false) => {
    if (!prevColor) {
      debouncedHandleColorChange(setCurrentColor, value);
    } else {
      setCurrentColor(value);
    }
  };

  const handleCurrentTool = (tool) => {
    if (currentTool !== tool) {
      setCurrentTool(tool);
    }
  };

  const handleTrash = () => {
    if (window.confirm("Do you want to clear current work?")) {
      setPixels(generateNewPixels(pixels.length));
    }
  };

  const handleBucketFill = (pixelRowIndex, pixelColIndex) => {
    const targetColor = pixels[pixelRowIndex][pixelColIndex];
    const newPixels = [...pixels]; // Create a copy to avoid directly modifying state
    floodFill(
      newPixels,
      pixelRowIndex,
      pixelColIndex,
      targetColor,
      currentColor
    ); // Replace target color with new color
    setPixels(newPixels);
  };

  // Recursive flood fill algorithm
  const floodFill = (newPixels, row, col, targetColor, fillColor) => {
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

  const toggleNewFileModal = () => {
    setShowNewFileModal(!showNewFileModal);
  };

  const handleNewCanvas = () => {
    setPixels(generateNewPixels(parseInt(newPixelSize), newBgColor));
    getPixelSize(newPixelSize);
    setNewBgColor(0);
    setHasBgColor(false);
    toggleNewFileModal();
  };

  const handleNewBgColor = (value) => {
    debouncedHandleColorChange(setNewBgColor, value);
  };

  const handleColourPicker = (value) => {
    setCurrentColor(value);
  };

  const addBgColor = () => {
    setHasBgColor(!hasBgColor);
    if (!hasBgColor) {
      setNewBgColor("black"); //default bg color
    }
  };

  const handleDownload = async (el, imageFileName) => {
    const canvas = await html2canvas(el);
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);
  };

  // download the image
  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  return (
    <PageLayout>
      {showNewFileModal && (
        <Modal height="fit-content" width="fit-content">
          <ModalHeader>
            <Text fontSize="1.25rem">Create new canvas</Text>
            <FiX size="1.5rem" onClick={toggleNewFileModal} cursor="pointer" />
          </ModalHeader>
          <NewFileInfo>
            <Text>
              Pixel Dimensions: {newPixelSize}x{newPixelSize}
            </Text>
            <PixelSizeRange
              type="range"
              step={2}
              min={20}
              max={100}
              value={newPixelSize}
              onChange={(e) => setNewPixelSize(e.target.value)}
            />
            <BgCheck active={hasBgColor}>
              <Text>Background Color</Text>
              <CheckBox onClick={addBgColor} checked={hasBgColor}>
                <FaCheck color="white" />
              </CheckBox>
            </BgCheck>
            {hasBgColor && (
              <BgColorPalette
                type="color"
                value={newBgColor}
                onChange={(e) => handleNewBgColor(e.target.value)}
              />
            )}
            <CreateButton onClick={handleNewCanvas}>CREATE</CreateButton>
          </NewFileInfo>
        </Modal>
      )}
      <LayoutBlock width="50%">
        <Canvas
          currentColor={currentColor}
          currentTool={currentTool}
          pixels={pixels}
          pixelSize={pixelSize}
          handlePixelFill={handlePixelFill}
          handleBucketFill={handleBucketFill}
          handleColourPicker={handleColourPicker}
          canvasRef={canvasRef}
        />
      </LayoutBlock>
      <LayoutBlock width="20%">
        <Tools
          currentColor={currentColor}
          currentTool={currentTool}
          handleCurrentColor={handleCurrentColor}
          handleCurrentTool={handleCurrentTool}
          handleTrash={handleTrash}
          handleBucketFill={handleBucketFill}
          toggleNewFileModal={toggleNewFileModal}
          handleDownload={handleDownload}
          canvasRef={canvasRef}
        />
      </LayoutBlock>
    </PageLayout>
  );
};

export default Draw;
