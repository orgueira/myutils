import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.REMOVE_BG_API_KEY;

    // Si no hay API key configurada, forzamos el fallback local inmediatamente
    if (!apiKey) {
      return NextResponse.json(
        { error: "NO_API_KEY", message: "API Key de Remove.bg no configurada. Usa fallback local." },
        { status: 503 } // 503 Service Unavailable para que el cliente haga fallback
      );
    }

    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó imagen" }, { status: 400 });
    }

    // Preparar el formData para la API de remove.bg
    const apiFormData = new FormData();
    apiFormData.append("image_file", file);
    apiFormData.append("size", "auto"); // 'auto' o 'regular'/'hd' dependiendo de la API

    // Llamada a la API de Remove.bg
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: apiFormData as any, // TypeScript puede quejarse de FormData de Node vs Web
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Remove.bg API Error:", response.status, errorText);
      // Fallará si hay créditos agotados, rate limit, etc.
      // 402: Payment Required (créditos agotados)
      // 429: Too Many Requests
      return NextResponse.json(
        { error: "API_ERROR", message: "La API externa falló o agotó sus créditos.", details: errorText },
        { status: 503 }
      );
    }

    // Obtener el PNG binario
    const arrayBuffer = await response.arrayBuffer();

    // Devolver la imagen directamente
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error: any) {
    console.error("Internal Server Error en remove-bg route:", error);
    return NextResponse.json(
      { error: "INTERNAL_ERROR", message: error.message },
      { status: 500 }
    );
  }
}