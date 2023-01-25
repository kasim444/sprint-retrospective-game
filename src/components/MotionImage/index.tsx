import { BoxProps, Image, ImageProps } from "@chakra-ui/react";
import { HTMLMotionProps } from "framer-motion";
import MotionBox from "../MotionBox";

interface IMotionImage {
  containerProps?: BoxProps;
  motionProps?: HTMLMotionProps<"div">;
  imageProps?: ImageProps;
  imgUrl: string;
  imgAlt: string;
  fallbackSrc?: string;
}

const MotionImage = ({
  containerProps,
  motionProps,
  imageProps,
  imgAlt,
  imgUrl,
  fallbackSrc,
}: IMotionImage) => (
  <MotionBox {...motionProps} {...containerProps}>
    <Image
      src={imgUrl}
      fallbackSrc={
        fallbackSrc || "/img/placeholders/no-image-available-icon.png"
      }
      alt={imgAlt}
      {...imageProps}
    />
  </MotionBox>
);

export default MotionImage;
