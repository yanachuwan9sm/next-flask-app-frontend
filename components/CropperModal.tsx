import React, { useCallback, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  AspectRatio,
  Box,
} from "@chakra-ui/react";

import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { addScaleCorrection } from "framer-motion";

export type PROPS = {
  open: boolean;
  setOpen: (open: boolean) => void;
  myFiles: File[];
  setMyFiles: (myFiles: File[]) => void;
  previewImg: string;
  aspectVertical: number;
  aspectHorizontal: number;
};

export const CropModal: React.VFC<PROPS> = ({
  open,
  setOpen,
  previewImg,
  setMyFiles,
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 400,
    height: 250,
  });

  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const onLoad = useCallback((img: HTMLImageElement) => {
    imageRef.current = img;
  }, []);

  // モーダルを閉じる際に実行するコールバック関数
  const closeHandle = useCallback(() => {
    setOpen(!open);
    setMyFiles([]);
  }, []);

  return (
    <Modal isOpen={open} onClose={closeHandle}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>診断する画像をトリミング</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box flexShrink="1">
            {previewImg && (
              <ReactCrop
                src={previewImg}
                crop={crop}
                ruleOfThirds
                onComplete={(c: Crop) => {
                  setCompletedCrop(c);
                }}
                onChange={(c: Crop) => {
                  setCrop(c);
                }}
                onImageLoaded={onLoad}
                imageStyle={{
                  maxWidth: "200px",
                  minWidth: "200px",
                }}
              />
            )}
          </Box>
          <Box>
            <canvas
              ref={previewCanvasRef}
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
                display: "none",
              }}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={closeHandle}>
            閉じる
          </Button>
          <Button variant="ghost">トリミングする</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
