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
    const url = buildDeepLink(id, token);

    if (isAndroid) {
      window.location.replace(url);

      window.setTimeout(() => {
        window.location.replace(
          "https://play.google.com/store/apps/details?id=com.bho.ai.magicswappuzzle",
        );
      }, 1000);
    } else if (isIOS) {
      window.location.replace(url);

      window.setTimeout(() => {
        window.location.replace(
           "https://play.google.com/store/apps/details?id=com.bho.ai.magicswappuzzle",
        );
      }, 1000);
    }
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
