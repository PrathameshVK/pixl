import { useState } from "react";
import {
  TbBucketDroplet,
  TbColorPicker,
  TbDownload,
  TbEraser,
  TbNewSection,
  TbPencil,
  TbTrash,
} from "react-icons/tb";
import styled from "styled-components";

const ToolsContainer = styled.div`
  width: fit-content;
  border: 4px solid black;
  border-left: none;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ToolsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  &:nth-child(2n) {
    border-left: 2px solid black;
    padding-left: 1rem;
  }
`;

const ColorPalette = styled.input`
  appearance: none;
  -webkit-appearance: none;
  border: none;
  width: 2rem;
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

const ColorBlock = styled.div`
  height: 2rem;
  width: 2rem;
  border: 2px solid black;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: ${(props) => props.color};
`;

const OptionsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-items: center;
`;

const ToolWrapper = styled.div`
  background-color: ${(props) => props.active && "black"};
  padding: 0.25rem;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tools = ({
  currentColor,
  currentTool,
  toggleNewFileModal,
  handleCurrentColor,
  handleCurrentTool,
  handleTrash,
  handleDownload,
  canvasRef,
}) => {
  const [prevColors, setPrevColors] = useState([]);

  const handlePrevColors = (value) => {
    if (prevColors.length < 5 && !prevColors.includes(value)) {
      setPrevColors([...prevColors, value]);
    } else {
      const updatedPrevColors = [...prevColors.slice(1)];
      updatedPrevColors.push(value);
      setPrevColors(updatedPrevColors);
    }
  };

  return (
    <ToolsContainer>
      <ToolsBlock>
        <OptionsBlock>
          <TbNewSection
            size="2rem"
            onClick={toggleNewFileModal}
            cursor="pointer"
          />
          <TbDownload
            size="2rem"
            onClick={() => handleDownload(canvasRef?.current, "pixl")}
            cursor="pointer"
          />
        </OptionsBlock>
        <ToolWrapper active={currentTool === "pencil"}>
          <TbPencil
            size={"1.5rem"}
            cursor="pointer"
            color={currentTool === "pencil" ? "white" : "black"}
            onClick={() => handleCurrentTool("pencil")}
          />
        </ToolWrapper>
        <ToolWrapper active={currentTool === "eraser"}>
          <TbEraser
            size={"1.5rem"}
            cursor="pointer"
            color={currentTool === "eraser" ? "white" : "black"}
            onClick={() => handleCurrentTool("eraser")}
          />
        </ToolWrapper>
        <ToolWrapper active={currentTool === "bucket"}>
          <TbBucketDroplet
            size={"1.5rem"}
            cursor="pointer"
            color={currentTool === "bucket" ? "white" : "black"}
            onClick={() => handleCurrentTool("bucket")}
          />
        </ToolWrapper>
        <ToolWrapper active={currentTool === "picker"}>
          <TbColorPicker
            size={"1.5rem"}
            cursor="pointer"
            color={currentTool === "picker" ? "white" : "black"}
            onClick={() => handleCurrentTool("picker")}
          />
        </ToolWrapper>
        <ToolWrapper>
          <TbTrash size={"1.5rem"} cursor="pointer" onClick={handleTrash} />
        </ToolWrapper>
        <ColorPalette
          type="color"
          value={currentColor}
          onChange={(e) => handleCurrentColor(e.target.value)}
          onBlur={(e) => handlePrevColors(e.target.value)}
        />
      </ToolsBlock>
      {prevColors.length > 0 && (
        <ToolsBlock>
          {prevColors.map((color, index) => {
            return (
              <ColorBlock
                color={color}
                onClick={() => handleCurrentColor(color, true)}
                key={index}
              />
            );
          })}
        </ToolsBlock>
      )}
    </ToolsContainer>
  );
};

export default Tools;
