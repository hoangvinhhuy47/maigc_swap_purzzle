import type { Metadata } from "next";
import OpenAppButton from "./OpenAppButton";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const decodeImageUrl = (encoded: string) => {
  try {
    console.log("encoded =", encoded);

    const result = Buffer.from(encoded, "base64").toString("utf8");

    console.log("decoded =", result);

    return result;
  } catch (e) {
    console.error(e);
    return "";
  }
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const imageUrl = decodeImageUrl(id);

  return {
    title: "Magic Swap Puzzle - View Image",
    description:
      "Open this link on mobile to view the shared image and open the app.",
    openGraph: {
      title: "Magic Swap Puzzle - View Image",
      description:
        "Open this link on mobile to view the shared image and open the app.",
      type: "website",
      images: imageUrl ? [imageUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: "Magic Swap Puzzle - View Image",
      description:
        "Open this link on mobile to view the shared image and open the app.",
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const imageUrl = decodeImageUrl(id);
  console.log("imageUrl =", imageUrl);

  return (
    <>
      <OpenAppButton id={id} autoOpen={true} />

      <div className="w-full h-screen bg-black flex items-center justify-center p-4">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Shared"
        
          />
        )}
      </div>
    </>
  );
}
