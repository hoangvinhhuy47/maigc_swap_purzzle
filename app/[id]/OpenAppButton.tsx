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

const buildDeepLink = (id: string, token?: string) => {
  const params = new URLSearchParams({ id });
  if (token) {
    params.set("token", token);
  }
  return `${currentDeep.app}?${params.toString()}`;
};

const getPlatform = () => {
  if (typeof navigator === "undefined")
    return { isAndroid: false, isIOS: false };
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

  const start = Date.now();

  window.location.href = deepLink;

  setTimeout(() => {
    const elapsed = Date.now() - start;

    // Nếu app mở thì browser thường bị background
    if (elapsed < 1500) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.bho.ai.magicswappuzzle";
    }
  }, 1200);
}, [id, token]);

  useEffect(() => {
    if (autoOpen) {
      openAppInstalled();
    }
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
      Open app or go to store
    </button>
  );
}
