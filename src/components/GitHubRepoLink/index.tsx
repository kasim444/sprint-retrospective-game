import { Image } from "@chakra-ui/react";
import { FC } from "react";
import MotionLink, { IMotionLink } from "../MotionLink";

type IGitHubRepoLink = IMotionLink;

const GitHubRepoLink: FC<IGitHubRepoLink> = (props) => {
  return (
    <MotionLink
      href="https://github.com/kasim444/sprint-retrospective-game"
      target={"_blank"}
      isExternal
      width={"40px"}
      title="Star this repository"
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.4 },
      }}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      <Image src="/images/github-logo.png" alt="GitHub Logo" />
    </MotionLink>
  );
};

export default GitHubRepoLink;
