import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, topic, message } = body;

    // TODO: Configurar tu email en Vercel (Environment Variables)
    // Cuando estés listo, añade CONTACT_EMAIL="tu_correo@ejemplo.com" en Vercel
    const contactEmail = process.env.CONTACT_EMAIL || "ejemplo@tudominio.com";

    // Validar datos básicos
    if (!message || !topic) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // AQUI ES DONDE INTEGRARÍAS EL ENVÍO REAL DE CORREOS
    // Vercel recomienda usar 'Resend' (https://resend.com)
    /* 
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'TheNinjaBox <onboarding@resend.dev>',
      to: contactEmail,
      subject: `[${topic}] Nuevo mensaje de ${name || 'Anónimo'}`,
      text: `Remitente: ${name} (${email})\nAsunto: ${topic}\n\nMensaje:\n${message}`,
    });
    */

    console.log(`[Simulación Envío Email a ${contactEmail}]`);
    console.log(`Asunto: ${topic}`);
    console.log(`De: ${name || 'Anónimo'} <${email || 'Sin email'}>`);
    console.log(`Mensaje: ${message}`);

    // Devolvemos éxito simulado
    return NextResponse.json({ success: true, message: "Mensaje procesado" });

  } catch (error) {
    console.error("Error en API de contacto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}