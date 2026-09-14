import { getStore } from "@netlify/blobs";

// Datos iniciales — se usan solo la primera vez, si todavía no existe nada guardado.
const DATOS_INICIALES = {
  "usuario": "isabel",
  "clave": "rancho2024",
  "avisoTitulo": "Aviso importante",
  "avisoTexto": "Los desechables tienen un costo adicional. El domicilio tiene un valor de $2.000.",
  "categorias": [
    {
      "id": "desayunos",
      "icono": "🌅",
      "nombre": "Desayunos",
      "items": [
        { "id": "caldo", "nombre": "Caldo del día", "desc": "Consulta con el mesero el caldo preparado hoy.", "opciones": "", "precio": null, "foto": "", "disponible": true },
        { "id": "huevos", "nombre": "Huevos al gusto", "desc": "Huevos preparados al gusto, acompañados de arroz, arepa o tajadas.", "opciones": "Pericos, Revueltos, Rancheros, Fritos", "precio": null, "foto": "", "disponible": true },
        { "id": "bandeja_desayuno", "nombre": "Bandeja con proteína", "desc": "Elige tu proteína para acompañar el desayuno.", "opciones": "Carne sudada, Pollo sudado, Cachama sudada, Pechuga para asar, Carne de res para asar, Carne de cerdo para asar, Hígado", "precio": null, "foto": "", "disponible": true }
      ]
    },
    {
      "id": "almuerzos",
      "icono": "🍲",
      "nombre": "Almuerzos Corrientes",
      "sopaDelDia": "",
      "principioDelDia": "",
      "ensalada": "",
      "acompanante": "Arroz, papa, yuca, patacón o tajadas (según el día)",
      "items": [
        { "id": "bandeja_almuerzo", "nombre": "Bandeja con proteína", "desc": "Acompañada de sopa, principio, ensalada y acompañante del día.", "opciones": "Carne sudada, Pescado sudado, Pollo sudado, Pechuga para asar, Res para asar, Cerdo para asar, Chorizo, Cachama frita", "precio": null, "foto": "", "disponible": true }
      ]
    },
    {
      "id": "carta",
      "icono": "🍽️",
      "nombre": "Comida a la Carta",
      "items": [
        { "id": "milanesa", "nombre": "Milanesa", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true },
        { "id": "chuleta", "nombre": "Chuleta", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true },
        { "id": "costilla", "nombre": "Costilla ahumada", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true },
        { "id": "paisa", "nombre": "Bandeja paisa", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true },
        { "id": "tilapia", "nombre": "Tilapia apanada", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true },
        { "id": "chicharron", "nombre": "Chicharrón ahumado", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true },
        { "id": "filete", "nombre": "Filete de pescado", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true }
      ]
    },
    {
      "id": "nocturna",
      "icono": "🌙",
      "nombre": "Nocturna — Fines de Semana",
      "activa": true,
      "diasTexto": "Viernes, sábado, domingo y festivos",
      "subcategorias": [
        {
          "nombre": "Picadas",
          "items": [
            { "id": "p_ranchera", "nombre": "Picada La Ranchera", "desc": "Una picada tradicional de la casa.", "opciones": "", "precio": null, "foto": "", "disponible": true, "personas": "" },
            { "id": "p_neon", "nombre": "Picada Neón", "desc": "Una combinación especial de carnes y acompañantes.", "opciones": "", "precio": null, "foto": "", "disponible": true, "personas": "" },
            { "id": "p_mirancho", "nombre": "Picada Mi Rancho", "desc": "Una picada con sabor tradicional.", "opciones": "", "precio": null, "foto": "", "disponible": true, "personas": "" },
            { "id": "p_explosion", "nombre": "Picada Explosión Neón", "desc": "Una picada especial de la casa.", "opciones": "", "precio": null, "foto": "", "disponible": true, "personas": "" },
            { "id": "p_gran", "nombre": "Picada Gran Rancho", "desc": "Una picada grande para compartir.", "opciones": "", "precio": null, "foto": "", "disponible": true, "personas": "" },
            { "id": "p_familiar", "nombre": "Picada Familiar Neón", "desc": "Una opción grande para compartir en familia.", "opciones": "", "precio": null, "foto": "", "disponible": true, "personas": "" }
          ]
        },
        {
          "nombre": "Salchipapas",
          "items": [
            { "id": "s_clasica", "nombre": "Salchipapa Clásica", "desc": "", "opciones": "Personal, Para compartir, Familiar", "precio": null, "foto": "", "disponible": true },
            { "id": "s_neon", "nombre": "Salchipapa Neón", "desc": "", "opciones": "Personal, Para compartir, Familiar", "precio": null, "foto": "", "disponible": true },
            { "id": "s_ranchera", "nombre": "Salchipapa Ranchera", "desc": "", "opciones": "Personal, Para compartir, Familiar", "precio": null, "foto": "", "disponible": true }
          ]
        },
        {
          "nombre": "Menú Infantil",
          "items": [
            { "id": "mini_neon", "nombre": "Mini Neón", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true },
            { "id": "mini_rancho", "nombre": "Mini Rancho", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true },
            { "id": "mini_fiesta", "nombre": "Mini Fiesta", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true }
          ]
        },
        { "nombre": "Combos en Familia", "items": [] }
      ]
    },
    {
      "id": "helados",
      "icono": "🍨",
      "nombre": "Helados Caseros",
      "saborDelDia": "",
      "items": [
        { "id": "helado_dia", "nombre": "Helado del día", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true },
        { "id": "helado_casa", "nombre": "Helado de la casa", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true },
        { "id": "copa_neon", "nombre": "Copa Neón", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true },
        { "id": "copa_rancho", "nombre": "Copa Mi Rancho", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true },
        { "id": "helado_especial", "nombre": "Helado especial", "desc": "", "opciones": "", "precio": null, "foto": "", "disponible": true }
      ]
    },
    {
      "id": "bebidas",
      "icono": "🥤",
      "nombre": "Bebidas",
      "subcategorias": [
        { "nombre": "Jugos Naturales", "items": [] },
        { "nombre": "Limonadas", "items": [] }
      ]
    },
    {
      "id": "servicios",
      "icono": "📋",
      "nombre": "Servicios",
      "items": [
        { "id": "domicilios", "nombre": "Domicilios", "desc": "Pregunta por nuestra cobertura y tiempos de entrega.", "opciones": "", "precio": null, "foto": "", "disponible": true },
        { "id": "reservas", "nombre": "Reservas", "desc": "Separa tu mesa con anticipación.", "opciones": "", "precio": null, "foto": "", "disponible": true },
        { "id": "eventos", "nombre": "Eventos y celebraciones", "desc": "Consulta por espacios para grupos y celebraciones.", "opciones": "", "precio": null, "foto": "", "disponible": true }
      ]
    }
  ]
};

export default async (req, context) => {
  const store = getStore("carta-neon-datos");

  if (req.method === "GET") {
    let datos = await store.get("menu", { type: "json" });
    if (!datos) {
      datos = DATOS_INICIALES;
      await store.setJSON("menu", datos);
    }
    return new Response(JSON.stringify(datos), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });
  }

  if (req.method === "POST") {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return new Response(JSON.stringify({ ok: false, error: "Cuerpo inválido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (!body || !body.clave || !body.datos) {
      return new Response(JSON.stringify({ ok: false, error: "Datos inválidos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    let actual = await store.get("menu", { type: "json" });
    if (!actual) actual = DATOS_INICIALES;

    if (body.clave !== actual.clave) {
      return new Response(JSON.stringify({ ok: false, error: "Clave de administrador incorrecta" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    const nuevo = body.datos;
    if (!nuevo.usuario) nuevo.usuario = actual.usuario;
    if (!nuevo.clave) nuevo.clave = actual.clave;

    await store.setJSON("menu", nuevo);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response("Método no permitido", { status: 405 });
};

export const config = { path: "/api/menu" };
