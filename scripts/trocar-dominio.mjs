// Troca o domínio do site em todos os arquivos que o citam.
// Uso (na pasta companhia-niobio):
//   node scripts/trocar-dominio.mjs https://www.seudominio.com.br
import { readFileSync, writeFileSync } from "node:fs";

const DOMINIO_ATUAL = "https://niobio.vercel.app";
const ARQUIVOS = ["index.html", "robots.txt", "sitemap.xml"];

const novo = (process.argv[2] || "").replace(/\/+$/, "");
if (!/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}$/i.test(novo)) {
  console.error("Informe o novo domínio com https://, por exemplo: node scripts/trocar-dominio.mjs https://www.seudominio.com.br");
  process.exit(1);
}

for (const arquivo of ARQUIVOS) {
  const texto = readFileSync(arquivo, "utf8");
  const total = texto.split(DOMINIO_ATUAL).length - 1;
  writeFileSync(arquivo, texto.split(DOMINIO_ATUAL).join(novo));
  console.log(`${arquivo}: ${total} ocorrência(s) trocada(s)`);
}
console.log(`Pronto. Lembre de atualizar DOMINIO_ATUAL neste script para ${novo} se precisar trocar de novo.`);
