import { Link, LinkProps } from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";

type Merge<P, T> = Omit<P, keyof T> & T;
export type IMotionLink = Merge<LinkProps, HTMLMotionProps<"a">>;

const MotionLink: React.FC<IMotionLink> = motion(Link);

export default MotionLink;
