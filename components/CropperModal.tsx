import React, { Dispatch, useCallback, useRef } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { useImageCrop } from "./hooks/useImageCrop";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type PROPS = {
  open: boolean;
  setOpen: (open: boolean) => void;
  myFiles: File[];
  setMyFiles: (myFiles: File[]) => void;
  src: string;
  imageInput: any;
  setImageInput: Dispatch<any>;
  setResult: Dispatch<React.SetStateAction<undefined>>;
};

const CropperModal: React.FC<PROPS> = ({
  open,
  setOpen,
  src,
  setMyFiles,
  imageInput,
  setImageInput,
  setResult,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [crop, setCrop, previewImg] = useImageCrop(
    imgRef,
    setImageInput,
    setResult
  );

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      imgRef.current = e.currentTarget;
    },
    []
  );

  // モーダルを閉じる際に実行するコールバック関数
  const closeHandle = () => {
    setOpen(!open);
    setMyFiles([]);
  };

  return (
    <Modal isOpen={open} onClose={closeHandle}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>診断する画像をトリミング</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ReactCrop
            ruleOfThirds
            crop={crop}
            onChange={(c) => setCrop(c)}
            aspect={16 / 9}
          >
            <img src={src} alt="cropperImg" onLoad={onImageLoad} />
          </ReactCrop>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={closeHandle}>
            閉じる
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            トリミングする
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CropperModal;
