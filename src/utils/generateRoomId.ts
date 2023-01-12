export const generateRoomId = (length = 8) =>
  parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace(".", "")
  ).toString();
