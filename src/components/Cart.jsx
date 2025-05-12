import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { FaGooglePay, FaPhone, FaMoneyBillWave } from "react-icons/fa";
import { SiPhonepe, SiPaytm } from "react-icons/si";
import { RiSecurePaymentLine } from "react-icons/ri";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || { cart: [] };
  const [cartItems, setCartItems] = useState(cart);
  const [appliedOffer, setAppliedOffer] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    setCartItems(cart);
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cart]);

  const handleIncrement = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const finalPrice = totalPrice - discount;

  const offers = [
    { label: "₹100 OFF on ₹250+", min: 250, discount: 100 },
    { label: "₹50 OFF on ₹150+", min: 150, discount: 50 },
    { label: "₹200 OFF on ₹500+", min: 500, discount: 200 },
  ];

  const applyOffer = (offer) => {
    if (totalPrice >= offer.min) {
      setDiscount(offer.discount);
      setAppliedOffer(offer.label);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      alert(`Minimum ₹${offer.min} required for this offer!`);
    }
  };

  return (
    <div style={{
      backgroundColor: "#000",
      minHeight: "100vh",
      padding: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          colors={["#FFD700", "#000", "#FF0000"]}
        />
      )}
      
      <div style={{
        backgroundColor: "#111",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 0 25px rgba(255, 215, 0, 0.3)",
        width: "100%",
        maxWidth: "500px",
        border: "2px solid #FFD700"
      }}>
        <h2 style={{
          color: "#FFD700",
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
          letterSpacing: "1px",
          textShadow: "0 0 10px rgba(255, 215, 0, 0.7)"
        }}>🛒 YOUR CART</h2>

        {cartItems.length === 0 ? (
          <p style={{ color: "#FFD700", textAlign: "center" }}>
            Your cart is empty. Start Ordering Your Favorite items!
          </p>
        ) : (
          <>
            <ul style={{
              padding: 0,
              margin: 0,
              maxHeight: "300px",
              overflowY: "auto"
            }}>
              {cartItems.map((item) => (
                <li key={item.id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  margin: "10px 0",
                  backgroundColor: "#222",
                  borderRadius: "8px",
                  borderLeft: "4px solid #FFD700",
                  transition: "transform 0.2s",
                  ":hover": {
                    transform: "scale(1.02)",
                  }
                }}>
                  <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        marginRight: "12px",
                        border: "1px solid #FFD700"
                      }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ color: "#FFF", fontWeight: "bold" }}>{item.name}</span>
                      <span style={{ color: "#FFD700", marginTop: "4px" }}>₹{item.price}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      onClick={() => handleDecrement(item.id)}
                      style={{
                        backgroundColor: "#FFD700",
                        color: "#000",
                        border: "none",
                        borderRadius: "4px",
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "all 0.2s",
                        ":hover": {
                          backgroundColor: "#FFF",
                          transform: "scale(1.1)",
                        }
                      }}
                    >
                      -
                    </button>
                    <span style={{ 
                      color: "#FFF",
                      margin: "0 10px",
                      minWidth: "20px",
                      textAlign: "center"
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      style={{
                        backgroundColor: "#FFD700",
                        color: "#000",
                        border: "none",
                        borderRadius: "4px",
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "all 0.2s",
                        ":hover": {
                          backgroundColor: "#FFF",
                          transform: "scale(1.1)",
                        }
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        backgroundColor: "transparent",
                        color: "#FF5555",
                        border: "none",
                        fontSize: "18px",
                        cursor: "pointer",
                        marginLeft: "10px",
                        transition: "transform 0.2s",
                        ":hover": {
                          transform: "scale(1.3)",
                        }
                      }}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/dashboard", { state: { cart: cartItems } })}
              style={{
                backgroundColor: "transparent",
                color: "#FFD700",
                border: "2px solid #FFD700",
                borderRadius: "6px",
                padding: "12px",
                width: "100%",
                marginTop: "15px",
                cursor: "pointer",
                fontWeight: "bold",
                letterSpacing: "1px",
                transition: "all 0.3s",
                ":hover": {
                  backgroundColor: "#FFD700",
                  color: "#000",
                }
              }}
            >
              ＋ ADD MORE ITEMS
            </button>

            <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px dashed #FFD700" }}>
              <h3 style={{ color: "#FFD700", fontSize: "16px", marginBottom: "12px" }}>🔥 AVAILABLE OFFERS</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                {offers.map((offer, index) => (
                  <button
                    key={index}
                    onClick={() => applyOffer(offer)}
                    style={{
                      backgroundColor: "#000",
                      color: "#FFD700",
                      border: "1px solid #FFD700",
                      borderRadius: "6px",
                      padding: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "12px",
                      transition: "all 0.3s",
                      transform: appliedOffer === offer.label ? "scale(0.95)" : "none",
                      boxShadow: appliedOffer === offer.label 
                        ? "0 0 15px #FFD700" 
                        : "0 2px 5px rgba(0,0,0,0.2)",
                      ":hover": {
                        backgroundColor: "#FFD700",
                        color: "#000",
                      }
                    }}
                  >
                    {offer.label}
                  </button>
                ))}
              </div>
              {appliedOffer && (
                <div style={{ 
                  color: "#FFD700", 
                  marginTop: "10px", 
                  fontWeight: "bold",
                  animation: "pulse 1.5s infinite"
                }}>
                  🎉 <span style={{ textShadow: "0 0 8px #FFD700" }}>Applied: {appliedOffer}</span>
                </div>
              )}
            </div>

            <div style={{ 
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#222",
              borderRadius: "8px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#FFF", marginBottom: "8px" }}>
                <span>Subtotal:</span>
                <span>₹{totalPrice}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#FF0000", marginBottom: "8px" }}>
                  <span>Discount:</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                color: "#FFD700", 
                fontWeight: "bold", 
                fontSize: "18px",
                marginTop: "10px",
                paddingTop: "10px",
                borderTop: "1px solid #444"
              }}>
                <span>TOTAL:</span>
                <span>₹{finalPrice}</span>
              </div>
            </div>

            <button
              style={{
                backgroundColor: "#FFD700",
                color: "#000",
                border: "none",
                borderRadius: "6px",
                padding: "15px",
                width: "100%",
                marginTop: "20px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                letterSpacing: "1px",
                transition: "all 0.3s",
                boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
                ":hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
                }
              }}
              onClick={() => alert("Payment gateway integration would go here!")}
            >
              🔥 PROCEED TO PAY
            </button>

            {/* ==================== ADDED PAYMENT OPTIONS ==================== */}
            <div style={{ 
              marginTop: "15px",
              width: "100%",
              textAlign: "center",
              padding: "10px",
              borderTop: "1px dashed #FFD700"
            }}>
              <p style={{ 
                color: "#FFD700", 
                margin: "10px 0",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px"
              }}>
                <RiSecurePaymentLine /> SECURE PAYMENT OPTIONS
              </p>
              
              <div style={{ 
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap"
              }}>
                {/* PhonePe */}
                <div 
                  onClick={() => alert("Redirecting to PhonePe...")}
                  style={{
                    background: "linear-gradient(135deg, #5F259F 0%, #3D1385 100%)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    ":hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 0 10px rgba(95, 37, 159, 0.7)"
                    }
                  }}
                >
                  <SiPhonepe style={{ color: "white", fontSize: "20px" }} />
                  <span style={{ color: "white", marginLeft: "6px", fontSize: "12px" }}>PhonePe</span>
                </div>

                {/* GPay */}
                <div 
                  onClick={() => alert("Redirecting to GPay...")}
                  style={{
                    background: "linear-gradient(135deg, #4285F4 0%, #3367D6 100%)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    ":hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 0 10px rgba(66, 133, 244, 0.7)"
                    }
                  }}
                >
                  <FaGooglePay style={{ color: "white", fontSize: "20px" }} />
                  <span style={{ color: "white", marginLeft: "6px", fontSize: "12px" }}>GPay</span>
                </div>

                {/* Paytm */}
                <div 
                  onClick={() => alert("Redirecting to Paytm...")}
                  style={{
                    background: "linear-gradient(135deg, #00BAF2 0%, #0085FF 100%)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    ":hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 0 10px rgba(0, 186, 242, 0.7)"
                    }
                  }}
                >
                  <SiPaytm style={{ color: "white", fontSize: "20px" }} />
                  <span style={{ color: "white", marginLeft: "6px", fontSize: "12px" }}>Paytm</span>
                </div>

                {/* UPI */}
                <div 
                  onClick={() => alert("Redirecting to UPI...")}
                  style={{
                    background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    ":hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 0 10px rgba(59, 130, 246, 0.7)"
                    }
                  }}
                >
                  <FaPhone style={{ color: "white", fontSize: "20px" }} />
                  <span style={{ color: "white", marginLeft: "6px", fontSize: "12px" }}>UPI</span>
                </div>

                {/* Cash on Delivery */}
                <div 
                  onClick={() => alert("Selecting Cash on Delivery...")}
                  style={{
                    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    ":hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 0 10px rgba(16, 185, 129, 0.7)"
                    }
                  }}
                >
                  <FaMoneyBillWave style={{ color: "white", fontSize: "20px" }} />
                  <span style={{ color: "white", marginLeft: "6px", fontSize: "12px" }}>Cash</span>
                </div>
              </div>
            </div>
            {/* ==================== END OF ADDED SECTION ==================== */}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;