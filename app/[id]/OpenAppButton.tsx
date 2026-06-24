"use client";

import { useCallback, useEffect } from "react";

interface OpenAppButtonProps {
  id: string;
  token?: string;
  autoOpen?: boolean;
}

const DEEP_LINK = "magicapp://open";

const STORE_URL =
  "https://play.google.com/store/apps/details?id=com.bho.ai.magicswappuzzle";

const buildDeepLink = (id: string, token?: string) => {
  const params = new URLSearchParams({ id });

  if (token) {
    params.set("token", token);
  }

  return `${DEEP_LINK}?${params.toString()}`;
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
  const openApp = useCallback(() => {
    const { isAndroid } = getPlatform();

    const deepLink = buildDeepLink(id, token);

    let pageHidden = false;

    const onVisibilityChange = () => {
      if (document.hidden) {
        pageHidden = true;
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    // mở app
    window.location.href = deepLink;

    // fallback nếu app không mở
    setTimeout(() => {
      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );

      // nếu trang vẫn đang visible => app không mở
      if (!pageHidden) {
        if (isAndroid) {
          window.location.href = STORE_URL;
        }
      }
    }, 2500);
  }, [id, token]);

  useEffect(() => {
    if (!autoOpen) return;

    const timer = setTimeout(() => {
      openApp();
    }, 400);

    return () => clearTimeout(timer);
  }, [autoOpen, openApp]);

  return (
    <button
      type="button"
      onClick={openApp}
      className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
    >
      Open app
    </button>
  );
}