// src/utils/telegramBridge.ts

interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TelegramInitDataUnsafe {
  query_id?: string;
  user?: TelegramUser;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: TelegramInitDataUnsafe;
  WebApp: {
    initData: string;
    initDataUnsafe: TelegramInitDataUnsafe;
    close: () => void;
    sendData: (data: string) => void;
    ready: () => void;
  };
}

declare global {
  interface Window {
    Telegram?: TelegramWebApp;
  }
}

export function getTelegramUser(): TelegramUser | null {
  return window.Telegram?.WebApp?.initDataUnsafe?.user ?? null;
}

export function sendGameDataToBot(data: object): void {
  if (window.Telegram?.WebApp?.sendData) {
    window.Telegram.WebApp.sendData(JSON.stringify(data));
  } else {
    console.warn("Telegram WebApp is not available.");
  }
}
