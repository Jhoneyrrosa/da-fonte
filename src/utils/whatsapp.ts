import { CartItem, Product, Client } from '../types';

const WHATSAPP_NUMBER = '5544997491549';

//   = non-breaking space: impede que "R$" e o valor quebrem em linhas separadas no WhatsApp
function formatPrice(value: number): string {
  return 'R$ ' + value.toFixed(2).replace('.', ',');
}

export function buildWhatsAppMessage(client: Client, items: CartItem[], products: Product[]): string {
  const lines: string[] = [
    '*NOVO PEDIDO - DA FONTE*',
    '',
    '*Cliente:* ' + client.name,
    '*ID:* ' + client.id,
    '*Empresa:* ' + client.company,
    '*CNPJ:* ' + client.cnpj,
    '*Telefone:* ' + client.phone,
    '*Endereco:* ' + client.address,
    '',
    '*PRODUTOS:*',
  ];

  let total = 0;
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;
    const subtotal = product.price * item.quantity;
    total += subtotal;
    lines.push('> ' + product.name + ' - ' + item.quantity + 'x - ' + formatPrice(subtotal));
  }

  lines.push('', '*TOTAL: ' + formatPrice(total) + '*');
  lines.push('', 'Pedido gerado em ' + new Date().toLocaleString('pt-BR'));

  return encodeURIComponent(lines.join('\n'));
}

export function openWhatsApp(client: Client, items: CartItem[], products: Product[]) {
  const msg = buildWhatsAppMessage(client, items, products);
  window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg, '_blank');
}
