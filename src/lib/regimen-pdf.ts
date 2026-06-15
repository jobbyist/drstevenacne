import jsPDF from "jspdf";

export interface RegimenPdfInput {
  conversation: string; // markdown / plain text summary from AI
}

const PRODUCTS = [
  "Acne Control Cleanser — AM & PM (Step 1)",
  "Acne Treatment Gel — PM (Step 2)",
  "Acne Control Moisturizer — AM & PM (Step 3)",
  "Acne Defence Sunscreen SPF 50+ — AM (Step 4)",
];

const LIFESTYLE = [
  "Limit high-glycemic foods, dairy, and whey protein.",
  "Hydrate (2L+ water daily) and prioritise 7–8h of sleep.",
  "Cleanse face within 30 min after sweating or workouts.",
  "Change pillowcases every 2–3 days; avoid touching your face.",
  "Avoid heavy oils, comedogenic silicones, fragrance, and harsh scrubs.",
  "Always wear SPF 50+ in the morning — even indoors.",
];

export function generateRegimenPdf(input: RegimenPdfInput) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const M = 48;
  let y = M;

  // Header band
  doc.setFillColor(20, 30, 70);
  doc.rect(0, 0, W, 90, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Dr Steven Acne", M, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Your Personalised STEVEN AI Regimen", M, 64);
  doc.setFontSize(9);
  doc.text(new Date().toLocaleDateString(), W - M, 64, { align: "right" });

  y = 120;
  doc.setTextColor(20, 30, 70);

  // Section helper
  const section = (title: string) => {
    if (y > 760) { doc.addPage(); y = M; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(title, M, y);
    y += 8;
    doc.setDrawColor(80, 130, 220);
    doc.setLineWidth(1.2);
    doc.line(M, y, M + 40, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(40, 40, 60);
  };

  const writeLines = (text: string) => {
    const lines = doc.splitTextToSize(text, W - M * 2);
    lines.forEach((line: string) => {
      if (y > 780) { doc.addPage(); y = M; }
      doc.text(line, M, y);
      y += 14;
    });
  };

  // Your conversation summary
  section("Your STEVEN AI Conversation Summary");
  const summary = input.conversation.trim() || "Open STEVEN AI and complete the acne profile to populate this section.";
  writeLines(summary);
  y += 8;

  // Product Checklist
  section("Product Checklist");
  PRODUCTS.forEach((p) => {
    if (y > 780) { doc.addPage(); y = M; }
    doc.setDrawColor(80, 130, 220);
    doc.setLineWidth(1);
    doc.rect(M, y - 9, 11, 11);
    doc.text(p, M + 20, y);
    y += 20;
  });
  y += 8;

  // Lifestyle Tips
  section("Lifestyle Tips");
  LIFESTYLE.forEach((tip) => {
    if (y > 780) { doc.addPage(); y = M; }
    doc.text("•", M, y);
    const lines = doc.splitTextToSize(tip, W - M * 2 - 14);
    lines.forEach((line: string, i: number) => {
      doc.text(line, M + 12, y + i * 13);
    });
    y += lines.length * 13 + 6;
  });

  // Footer
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 130);
    doc.text(
      "AI guidance — not a medical diagnosis. For severe acne consult a dermatologist.",
      W / 2,
      820,
      { align: "center" },
    );
  }

  doc.save("dr-steven-acne-regimen.pdf");
}
