import type { Metadata } from "next";
import OpenAppButton from "./OpenAppButton";

interface PageProps {
  params: {
    id: string;
  };
}

const decodeImageUrl = (encoded: string) => {
  try {
    return Buffer.from(encoded, "base64").toString("utf8");
  } catch (_) {
    return "";
  }
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const imageUrl = decodeImageUrl(params.id);

  const title = "Magic Swap Puzzle - View Image";
  const description =
    "Open this link on mobile to view the shared image and open the app.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: imageUrl ? [imageUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default function Page({ params }: PageProps) {
  const imageUrl = decodeImageUrl(params.id);

  return (
    <>
      <OpenAppButton id={params.id} autoOpen={true} />

      <div className="w-full h-screen bg-black flex items-center justify-center p-4">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Shared Image"
            className="h-auto max-w-sm object-contain"
          />
        )}
      </div>
    </>
  );
}
