import { COAS } from "@/lib/data";

function pdfSafe(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "-")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function makePdf(lines: { text: string; size?: number; gap?: number }[]) {
  const commands = ["BT", "/F1 11 Tf", "50 790 Td"];

  for (const [index, line] of lines.entries()) {
    if (index > 0) {
      commands.push(`0 -${line.gap ?? 24} Td`);
    }
    commands.push(`/F1 ${line.size ?? 11} Tf`);
    commands.push(`(${pdfSafe(line.text)}) Tj`);
  }

  commands.push("ET");
  const stream = commands.join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];

  let body = "%PDF-1.4\n";
  const offsets = [0];

  for (const [index, object] of objects.entries()) {
    offsets.push(body.length);
    body += `${index + 1} 0 obj\n${object}\nendobj\n`;
  }

  const xrefOffset = body.length;
  body += `xref\n0 ${objects.length + 1}\n`;
  body += "0000000000 65535 f \n";
  body += offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join("");
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  body += `startxref\n${xrefOffset}\n%%EOF`;

  return new TextEncoder().encode(body);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ batch: string }> },
) {
  const { batch } = await params;
  const coa = COAS.find((item) => item.batch === decodeURIComponent(batch));

  if (!coa) {
    return new Response("Certificate not found", { status: 404 });
  }

  const report = makePdf([
    { text: "ELITE BIOTECH", size: 20 },
    { text: "CERTIFICATE OF ANALYSIS", size: 16, gap: 32 },
    { text: `Compound: ${coa.compound}`, gap: 38 },
    { text: `Batch: ${coa.batch}` },
    { text: `Assayed: ${coa.assayed}` },
    { text: `Method: ${coa.method}` },
    { text: `Purity: ${coa.purity}%` },
    { text: `Mass found: ${coa.massFound}` },
    { text: `Mass expected: ${coa.massExpected}` },
    { text: "Result: PASS", gap: 36 },
    {
      text: "For laboratory and research use only. Not for human or veterinary use.",
      size: 9,
      gap: 48,
    },
  ]);

  return new Response(report, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="elite-biotech-${coa.batch}.pdf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
