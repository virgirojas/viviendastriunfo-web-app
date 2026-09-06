"use server";

import connectMongo from "@/lib/mongodb";
import ContactQuery from "@/models/ContactQuery";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "./auth";

// Lista de palabras clave o patrones característicos de spam de dominios/ventas agresivas
const SPAM_KEYWORDS = [
  "domain is listed",
  "purchase it at any time",
  "owning the .com",
  "competitor -- could purchase",
  "getting it back later",
  "seo ranking",
  "buy backlinks",
  "crypto investment",
  "online casino",
  "mrmedhatatta",
];

function isSpamContent(name: string, email: string, subject: string, message: string): boolean {
  const content = `${name} ${email} ${subject} ${message}`.toLowerCase();
  return SPAM_KEYWORDS.some((keyword) => content.includes(keyword));
}

export async function submitContact(formData: FormData) {
  try {
    // 1. Honeypot check (campo trampa invisible para humanos, llenado por bots)
    const honeypot = formData.get("website_url_hp") as string;
    if (honeypot && honeypot.trim().length > 0) {
      // Simular éxito silencioso para que el bot no intente evitar el honeypot
      return { success: true };
    }

    // 2. Verificación matemática en el servidor (Server-Side Captcha)
    const captchaA = parseInt((formData.get("captcha_a") as string) || "0", 10);
    const captchaB = parseInt((formData.get("captcha_b") as string) || "0", 10);
    const captchaAns = parseInt((formData.get("captcha_ans") as string) || "0", 10);

    if (isNaN(captchaAns) || captchaAns !== captchaA + captchaB) {
      return { success: false, error: "La verificación de seguridad es incorrecta." };
    }

    // 3. Verificación de tiempo mínimo de llenado del formulario
    const renderedAt = parseInt((formData.get("rendered_at") as string) || "0", 10);
    if (renderedAt > 0 && Date.now() - renderedAt < 2000) {
      // Envío automatizado en menos de 2 segundos
      return { success: true };
    }

    const name = ((formData.get("name") as string) || "").trim();
    const email = ((formData.get("email") as string) || "").trim();
    const phone = ((formData.get("phone") as string) || "").trim();
    const subject = ((formData.get("subject") as string) || "").trim();
    const message = ((formData.get("message") as string) || "").trim();

    if (!name || !email || !subject || !message) {
      return { success: false, error: "Por favor, completa todos los campos requeridos." };
    }

    // 4. Filtro de palabras clave spam
    if (isSpamContent(name, email, subject, message)) {
      return { success: true };
    }

    await connectMongo();

    const query = new ContactQuery({
      name,
      email,
      phone,
      subject,
      message,
    });

    await query.save();

    return { success: true };
  } catch (error) {
    console.error("Error saving contact query:", error);
    return { success: false, error: "Hubo un error al enviar tu consulta. Por favor, inténtalo de nuevo." };
  }
}

export async function deleteContactAction(id: string): Promise<void> {
  try {
    await verifyAuth();
    await connectMongo();
    await ContactQuery.findByIdAndDelete(id);
    revalidatePath("/admin/contactos");
  } catch (error) {
    console.error("Error deleting contact query:", error);
  }
}


