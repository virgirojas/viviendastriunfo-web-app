"use server";

import { revalidatePath } from "next/cache";
import connectMongo from "@/lib/mongodb";
import Tipologia from "@/models/Tipologia";
import { verifyAuth } from "./auth";


async function handleFileUpload(imageFile: File | null): Promise<string | null> {
  if (!imageFile || imageFile.size === 0) return null;
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const mimeType = imageFile.type || "image/jpeg";
  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}

export async function createTipologia(formData: FormData) {
  await verifyAuth();
  await connectMongo();

  const imageFile = formData.get("image") as File;
  const imageUrl = await handleFileUpload(imageFile);

  const planFile = formData.get("planImage") as File;
  const planUrl = await handleFileUpload(planFile);

  const tipologia = {
    name: formData.get("name") as string,
    squareMeters: formData.get("squareMeters") as string,
    bedrooms: formData.get("bedrooms") as string,
    price: formData.get("price") as string,
    image: imageUrl || "",
    planImage: planUrl || "",
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    features: (formData.get("features") as string) || "",
    isFeatured: formData.get("isFeatured") === "on",
  };

  await Tipologia.create(tipologia);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateTipologia(id: string, formData: FormData) {
  await verifyAuth();
  await connectMongo();

  const tipologia: Record<string, string | boolean> = {
    name: formData.get("name") as string,
    squareMeters: formData.get("squareMeters") as string,
    bedrooms: formData.get("bedrooms") as string,
    price: formData.get("price") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    features: (formData.get("features") as string) || "",
    isFeatured: formData.get("isFeatured") === "on",
  };

  const imageFile = formData.get("image") as File;
  const imageUrl = await handleFileUpload(imageFile);
  if (imageUrl) {
    tipologia.image = imageUrl;
  }

  const planFile = formData.get("planImage") as File;
  const planUrl = await handleFileUpload(planFile);
  if (planUrl) {
    tipologia.planImage = planUrl;
  }

  await Tipologia.findByIdAndUpdate(id, tipologia);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteTipologia(id: string) {
  await verifyAuth();
  await connectMongo();
  await Tipologia.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/admin");
}
