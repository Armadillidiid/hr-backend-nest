import { customAlphabet } from "nanoid";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
export const generateUniqueId = customAlphabet(alphabet, 12);

