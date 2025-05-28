import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import forge from "node-forge";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { AI_PATH_NAMES, BOT_TYPE, ERROR } from "@/service/enums/texts";

export const decodeJwt = (token: string) => {
  try {
    const authToken = token.split(" ")[1];
    return jwtDecode(authToken);
  } catch (error) {
    throw error;
  }
};

export const generateJwt = async (tokenData: any) => {
  const jwtData = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    expiresIn: "3d",
  });
  return jwtData;
};

// export const customFetch = async (url: string, options: any) => {
//   try {
//     const res = await fetch(url, options);
//     return res.json();
//   } catch (error) {
//     throw error;
//   }
// };

export const customFetch = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);

    // Check if response is ok (status 2xx)
    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Fetch failed with status ${res.status}: ${errorBody}`);
    }

    // Safe parse
    return await res.json();
  } catch (error) {
    console.error("Error in customFetch:", error);
    throw error;
  }
};

export const setLocalStorage = (key: string, value: string | null) => {
  if (value) localStorage.setItem(key, value);
  else localStorage.removeItem(key);
};

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const encrypt = (data: any, password: string) => {
  const iv = forge.random.getBytesSync(16);
  const md = forge.md.sha256.create();
  md.update(password);
  const key = md.digest().bytes(); // Use bytes() to get the key in byte format

  const cipher = forge.cipher.createCipher("AES-CTR", key);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(data));
  cipher.finish();
  const encrypted = cipher.output.toHex();

  return {
    iv: forge.util.bytesToHex(iv),
    encrypted: encrypted,
  };
};

export const decrypt = (encrypted: string, ivHex: string, password: string) => {
  try {
    // Convert IV from hex to bytes
    const iv = forge.util.hexToBytes(ivHex);
    // Derive the key from the password using SHA-256
    const md = forge.md.sha256.create();
    md.update(password);
    const key = md.digest().bytes();
    // Create and initialize the decipher
    const decipher = forge.cipher.createDecipher("AES-CTR", key);
    decipher.start({ iv: iv });
    // Convert encrypted data from hex to bytes and update the decipher
    decipher.update(forge.util.createBuffer(forge.util.hexToBytes(encrypted)));
    decipher.finish();
    // Get the decrypted data
    const decrypted = decipher.output.toString();
    return decrypted;
  } catch (error) {
    return null;
  }
};

export const formatMinutesToSec = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export const preprocessLaTeX = (content: string) => {
  const blockProcessedContent = content.replace(/\\\[(.*?)\\\]/gs, (_, equation) => `$$${equation}$$`);
  const inlineProcessedContent = blockProcessedContent.replace(/\\\((.*?)\\\)/gs, (_, equation) => `$${equation}$`);
  return inlineProcessedContent;
};

// for shuffle arrays
export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// use only for api to check whether the use authorized or not
export const verfiyAuthentication = (authToken: string | null) => {
  if (!authToken || !authToken.startsWith("Bearer"))
    return NextResponse.json({ success: false, message: ERROR.NOT_A_VALID_USER }, { status: 401 });
  return decodeJwt(authToken);
};

export const formatDate = (date: Date) =>
  `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;

    export const formatDateWithMonth = (date: string | Date) => {
      const newDate = new Date(date); // Convert string to Date object
      return newDate.toLocaleDateString("en-US", {
        month: "short", // "Feb"
        day: "2-digit", // "04"
        year: "numeric", // "2025"
      });
    };

export const convertSearchableTxt = (value: string) => value?.toLowerCase().replaceAll(" ", "");

export const getStudyPlanDate = (days: number, date = new Date()): string => {
  let futureDate = new Date(date.setDate(date.getDate() + days));
  const day = futureDate.getDate().toString().padStart(2, "0");
  const month = (futureDate.getMonth() + 1).toString().padStart(2, "0");
  const year = futureDate.getFullYear();
  return `${day}-${month}-${year}`;
};

export const getGoogleCalendarDate = (days: number): string => {
  const today = new Date();
  let futureDate = new Date(today.setDate(today.getDate() + days));
  const day = futureDate.getDate().toString().padStart(2, "0");
  const month = (futureDate.getMonth() + 1).toString().padStart(2, "0");
  const year = futureDate.getFullYear();
  return `${year}-${month}-${day}`;
};

export const convertToValidDateFormat = (date: string) => {
  const [day, month, year] = date.split("-");
  return `${month}/${day}/${year}`;
};

export const getThisMonth = (
  day?: string,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "2-digit" }
) => {
  const date = day ? new Date(day) : new Date();
  return date.toLocaleDateString("en-US", options);
};

export const getDateDifference = (startDate: string, endDate: string) => {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const DifferenceInTime = date2.getTime() - date1.getTime();
  const DifferenceInDays = Math.round(DifferenceInTime / (1000 * 3600 * 24));
  return DifferenceInDays + 1;
};

export const getCurrentTime = (date = new Date()) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

export const getCurrentDay = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  return days[today.getDay()];
};

export const getLiveTime = (setTime: (time: any) => void) => {
  const updateTime = () => setTime(getCurrentTime());
  // Align with the start of the next minute
  const now = new Date();
  const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
  const timeoutId = setTimeout(() => {
    updateTime();
    // Start an interval to update every minute
    const intervalId = setInterval(updateTime, 60000);
    // Clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, delay);
  return timeoutId;
};

export const percentToValue = (total: number, percentage: number, percentageMax = 100) => {
  return (total / percentageMax) * percentage;
};

// used to convert from one value to targe values per
export const scaleScoreToTarget = (score: number, maxScore: number, targetMax: number): number => {
  return (score / maxScore) * targetMax;
};

export const convertToPercentage = (value: number, totalValue: number) => {
  return (value / totalValue) * 100;
};

export const generateUuid = (): string => `${uuidv4().substring(0, 35)}`;

export const getBotTypeByPathname = (pathName: string) => {
  if (pathName.includes(AI_PATH_NAMES.STUDY_PLAN_BOT)) return BOT_TYPE.STUDY_PLAN_BOT;
  if (pathName.includes(AI_PATH_NAMES.NEET_MENTOR)) return BOT_TYPE.COMMON_BOT;
  if (pathName.includes(AI_PATH_NAMES.ASK_DOUBTS)) return BOT_TYPE.ASK_DOUBTS;
  if (pathName.includes(AI_PATH_NAMES.PYQS_DOUBTS_AI)) return BOT_TYPE.PYQs_BOT;
  return BOT_TYPE.ASK_ADMISSIONS;
};

export const convertTimeToMinsOrSec = (time: number) => {
  return (time > 60 ? time / 60 : time).toFixed();
};

export const getTimeExtension = (time: number) => {
  return time > 60 ? "mins" : "Secs";
};

export function daysBefore(attendedDate: Date) {
  const currentDate = new Date();

  // Convert both dates to milliseconds
  const attendedDateMs = new Date(attendedDate).getTime();
  const currentDateMs = currentDate.getTime();

  // Calculate the difference in milliseconds
  const differenceMs = currentDateMs - attendedDateMs;

  // Convert the difference to days (1 day = 24 * 60 * 60 * 1000 ms)
  const daysDifference = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

  return daysDifference;
}
