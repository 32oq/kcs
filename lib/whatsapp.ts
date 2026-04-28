import type { Package } from "./packages";

const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // Replace with actual WhatsApp business number

export interface BookingForm {
  name: string;
  phone: string;
  email: string;
  date: string;
  guests: string;
  notes?: string;
}

export function generateWhatsAppLink(pkg: Package, form: BookingForm): string {
  const message = `
🌿 *Kashmir Cascade — Booking Inquiry*

📦 *Package:* ${pkg.title} (${pkg.nights}N/${pkg.days}D)
📍 *Locations:* ${pkg.locations.join(", ")}
⭐ *Category:* ${pkg.category}
💰 *Price:* ₹${pkg.price.toLocaleString("en-IN")} per person

👤 *Name:* ${form.name}
📞 *Phone:* ${form.phone}
📧 *Email:* ${form.email}
📅 *Travel Date:* ${form.date}
👥 *Guests:* ${form.guests}
${form.notes ? `\n📝 *Special Requests:* ${form.notes}` : ""}

Please confirm availability and share the detailed itinerary.
  `.trim();

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
