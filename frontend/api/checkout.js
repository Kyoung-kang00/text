const PRODUCT_CATALOG = {
  p1: { name: "에어 러닝 재킷", price: 89000 },
  p2: { name: "무선 노이즈 캔슬링 헤드폰", price: 179000 },
  p3: { name: "스마트 워터 보틀", price: 39000 },
  p4: { name: "데스크 미니 조명", price: 49000 },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "POST 요청만 허용됩니다." });
  }

  const { items } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "결제할 상품이 없습니다." });
  }

  const normalized = [];
  for (const item of items) {
    const product = PRODUCT_CATALOG[item.id];
    const quantity = Number(item.quantity || 0);

    if (!product || !Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "유효하지 않은 장바구니 데이터입니다." });
    }

    normalized.push({
      id: item.id,
      name: product.name,
      unitPrice: product.price,
      quantity,
      subtotal: product.price * quantity,
    });
  }

  const totalAmount = normalized.reduce((sum, item) => sum + item.subtotal, 0);

  // TODO: Stripe/Toss 등 실제 결제사 SDK 연동 위치.
  // - env에 결제 비밀키 저장
  // - 주문정보 DB 저장
  // - success/cancel URL로 리다이렉트
  return res.status(200).json({
    message: "결제 세션 생성 준비 완료 (데모 응답)",
    totalAmount,
    currency: "KRW",
    provider: "ready-for-integration",
    successUrl: `${req.headers.origin || ""}/checkout/success`,
    cancelUrl: `${req.headers.origin || ""}/checkout/cancel`,
  });
}
