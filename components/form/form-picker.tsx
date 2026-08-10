"use client";

import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { defaultImages } from "@/constants/images";
import { cn } from "@/lib/utils";

import { FormErrors } from "./form-errors";

type TFormPickerProps = {
    id: string;
    validationErrors?: string[];
};

type TUnsplashImage = {
    id: string;
    urls: {
        thumb: string;
        full: string;
    };
    links: {
        html: string;
    };
    user: {
        name: string;
    };
};

export const FormPicker = ({ id, validationErrors }: TFormPickerProps) => {
    const { pending } = useFormStatus();

    const [images, setImages] = useState<TUnsplashImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("/api/unsplash/random");

                if (!response.ok) {
                    console.error("Failed to get images from Unsplash");
                    setImages(defaultImages);
                    return;
                }

                const data = (await response.json()) as TUnsplashImage[];
                setImages(data);
            } catch (error) {
                console.log(error);
                setImages(defaultImages);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchImages();

        return function cleanup() {
            setIsLoading(false);
            setImages([]);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6">
                <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="mb-2 grid grid-cols-3 gap-2">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={cn(
                            "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                            pending && "opacity-50 hover:opacity-50 cursor-auto",
                        )}
                        onClick={() => {
                            if (pending) return;
                            setSelectedImageId(image.id);
                        }}
                    >
                        <input
                            type="radio"
                            id={id}
                            name={id}
                            className="hidden"
                            checked={selectedImageId === image.id}
                            disabled={pending}
                            readOnly
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                        />
                        <Image
                            src={image.urls.thumb}
                            alt="Unsplash image"
                            className="rounded-sm object-cover"
                            sizes="107px"
                            fill
                        />
                        {selectedImageId === image.id && (
                            <div className="absolute inset-y-0 flex h-full w-full items-center justify-center bg-black/30">
                                <Check className="h-4 w-4 text-white" />
                            </div>
                        )}
                        <Link
                            href={image.links.html}
                            target="_blank"
                            className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 group-hover:opacity-100 hover:underline"
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>
            <FormErrors id="image" errors={validationErrors} />
        </div>
    );
};
