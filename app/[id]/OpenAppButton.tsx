"use client";

import { useCallback, useEffect } from "react";

interface OpenAppButtonProps {
  id: string;
  token?: string;
  autoOpen?: boolean;
}

const currentDeep = {
  app: "magicapp://open",
};

const STORE_URL =
  "https://play.google.com/store/apps/details?id=com.bho.ai.magicswappuzzle";

const buildDeepLink = (id: string, token?: string) => {
  const params = new URLSearchParams({ id });

  if (token) {
    params.set("token", token);
  }

  return `${currentDeep.app}?${params.toString()}`;
};

const getPlatform = () => {
  if (typeof navigator === "undefined") {
    return {
      isAndroid: false,
      isIOS: false,
    };
  }

  const ua = navigator.userAgent || "";

  return {
    isAndroid: /Android/i.test(ua),
    isIOS: /iPhone|iPad|iPod/i.test(ua),
  };
};

export default function OpenAppButton({
  id,
  token,
  autoOpen = false,
}: OpenAppButtonProps) {
  const openAppInstalled = useCallback(() => {
    const { isAndroid, isIOS } = getPlatform();

    const deepLink = buildDeepLink(id, token);

    let appOpened = false;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        appOpened = true;
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    // Android Chrome thường ổn hơn với replace
    window.location.replace(deepLink);

    setTimeout(() => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      if (!appOpened) {
        if (isAndroid) {
          window.location.href = STORE_URL;
        } else if (isIOS) {
          // TODO: App Store URL
          // window.location.href = IOS_STORE_URL;
        }
      }
    }, 2000);
  }, [id, token]);

  useEffect(() => {
    if (!autoOpen) return;

    // Delay nhẹ để tránh một số browser chặn ngay lúc page render
    const timer = setTimeout(() => {
      openAppInstalled();
    }, 300);

    return () => clearTimeout(timer);
  }, [autoOpen, openAppInstalled]);

  if (autoOpen) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={openAppInstalled}
      className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
    >
      Open app
    </button>
  );
}