import { LinkIcon } from "@chakra-ui/icons";
import { Button, useClipboard } from "@chakra-ui/react";
import { FC } from "react";

interface IShareRoomLink {
  roomId: string;
}

const ShareRoomLink: FC<IShareRoomLink> = ({ roomId }) => {
  const { onCopy, hasCopied } = useClipboard(
    `${window.location.origin}/room/${roomId}`
  );

  return (
    <Button
      rounded={"full"}
      fontWeight={"normal"}
      px={{ base: 3, lg: 6 }}
      onClick={onCopy}
      leftIcon={<LinkIcon />}
    >
      {hasCopied ? "Copied!" : "Share Room"}
    </Button>
  );
};

export default ShareRoomLink;
