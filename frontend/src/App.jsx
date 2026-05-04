import { useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "/api";
const PRODUCTS = [
  { id: "p1", name: "에어 러닝 재킷", category: "의류", price: 89000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80" },
  { id: "p2", name: "무선 노이즈 캔슬링 헤드폰", category: "전자기기", price: 179000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80" },
  { id: "p3", name: "스마트 워터 보틀", category: "생활", price: 39000, image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=900&q=80" },
  { id: "p4", name: "데스크 미니 조명", category: "인테리어", price: 49000, image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900&q=80" },
];

const formatKRW = (price) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(price);

function App() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [cart, setCart] = useState([]);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = useMemo(
    () => ["전체", ...new Set(PRODUCTS.map((product) => product.category))],
    []
  );

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "전체") return PRODUCTS;
    return PRODUCTS.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const cartSummary = useMemo(() => {
    const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const amount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { quantity, amount };
  }, [cart]);

  const addToCart = (product) => {
    setCheckoutMessage("");
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, nextQuantity) => {
    setCheckoutMessage("");
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const startCheckout = async () => {
    if (cart.length === 0) {
      setCheckoutMessage("장바구니가 비어 있습니다.");
      return;
    }

    setIsLoading(true);
    setCheckoutMessage("");
    try {
      const res = await fetch(`${API_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({ id: item.id, quantity: item.quantity })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setCheckoutMessage(data.message || "결제 세션 생성에 실패했습니다.");
        return;
      }
      setCheckoutMessage(
        `${data.message} (총 ${formatKRW(data.totalAmount)})`
      );
    } catch (error) {
      setCheckoutMessage("결제 요청 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="market-shell">
      <section className="hero">
        <p className="chip">Market Demo</p>
        <h1>결제 연동 준비형 마켓</h1>
        <p>
          장바구니, 서버 결제 세션 API 호출, 결제 성공/취소 URL 구조까지 포함된
          기본 템플릿입니다.
        </p>
      </section>

      <section className="filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </section>

      <section className="layout">
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <p className="category">{product.category}</p>
              <h3>{product.name}</h3>
              <p className="price">{formatKRW(product.price)}</p>
              <button onClick={() => addToCart(product)}>장바구니 담기</button>
            </article>
          ))}
        </div>

        <aside className="cart-panel">
          <h2>장바구니</h2>
          {cart.length === 0 ? (
            <p className="muted">상품을 담아보세요.</p>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="muted">{formatKRW(item.price)}</p>
                  </div>
                  <div className="qty-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="summary">
            <p>
              총 수량 <strong>{cartSummary.quantity}</strong>개
            </p>
            <p>
              결제 금액 <strong>{formatKRW(cartSummary.amount)}</strong>
            </p>
          </div>

          <button className="checkout-btn" disabled={isLoading} onClick={startCheckout}>
            {isLoading ? "결제 준비 중..." : "결제 진행"}
          </button>
          {checkoutMessage && <p className="checkout-message">{checkoutMessage}</p>}
        </aside>
      </section>
    </main>
  );
}

export default App;
