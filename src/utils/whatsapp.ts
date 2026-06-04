import { CartItem, Product, Client } from '../types';

const WHATSAPP_NUMBER = '5544997491549';

export function buildWhatsAppMessage(client: Client, items: CartItem[], products: Product[]): string {
  const lines: string[] = [
    `🛒 *NOVO PEDIDO — DA FONTE*`,
    ``,
    `*Cliente:* ${client.name}`,
    `*ID:* ${client.id}`,
    `*Empresa:* ${client.company}`,
    `*CNPJ:* ${client.cnpj}`,
    `*Telefone:* ${client.phone}`,
    `*Endereço:* ${client.address}`,
    ``,
    `*📦 PRODUTOS:*`,
  ];

  let total = 0;
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;
    const subtotal = product.price * item.quantity;
    total += subtotal;
    lines.push(`▸ ${product.name} — ${item.quantity}x — R$ ${subtotal.toFixed(2).replace('.', ',')}`);
  }

  lines.push(``, `*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*`);
  lines.push(``, `_Pedido gerado em ${new Date().toLocaleString('pt-BR')}_`);

  return encodeURIComponent(lines.join('\n'));
}

export function openWhatsApp(client: Client, items: CartItem[], products: Product[]) {
  const msg = buildWhatsAppMessage(client, items, products);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}
