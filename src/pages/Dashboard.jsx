import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const categories = [
  {
    id: 1,
    name: "Burgers",
    image: "https://source.unsplash.com/featured/?burger",
    items: [
      { id: 1, name: "Cheese Burger", price: 150, image: "https://png.pngtree.com/background/20230527/original/pngtree-hamburger-with-cheese-and-sauce-splashes-across-black-background-picture-image_2758282.jpg" },
      { id: 2, name: "Veg Burger", price: 120, image: "https://5.imimg.com/data5/SELLER/Default/2024/6/426466964/PV/AN/XU/4895422/veg-burger.jpeg" },
      { id: 3, name: "Chicken Burger", price: 180, image: "https://images.arla.com/recordid/4DD3D039-5E45-4BF6-9BB5805A06755B74/chicken-burger.jpg?format=jpg&width=1200&height=630&mode=crop" },
      { id: 4, name: "Double Patty Burger", price: 220, image: "https://img.freepik.com/free-photo/front-view-woman-eating-meat-burgers_141793-17491.jpg?semt=ais_hybrid&w=740" },
    ],
  },
  {
    id: 2,
    name: "Pizzas",
    image: "https://source.unsplash.com/featured/?pizza",
    items: [
      { id: 5, name: "Margherita Pizza", price: 200, image: "https://c.ndtvimg.com/2023-02/k581r5q8_pizza_625x300_12_February_23.jpg" },
      { id: 6, name: "Pepperoni Pizza", price: 250, image: "https://lloydpans.com/media/amasty/blog/cache/N/a/1200/675/National-Cheese_-Pepperoni-Days-Honor-Traditional-Faves.jpg" },
      { id: 7, name: "Veggie Pizza", price: 230, image: "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg" },
    ],
  },
  {
    id: 3,
    name: "Drinks",
    image: "https://source.unsplash.com/featured/?drinks",
    items: [
      { id: 8, name: "Cold Coffee", price: 90, image: "https://amritfood.com/wp-content/uploads/2021/11/Cold-Coffee.png" },
      { id: 9, name: "Mojito", price: 110, image: "https://images.slurrp.com/prod/recipe_images/leites-culinaria/recipes-mexican-mojito.html-1646671102_LOCI6QY03XFVPA4YB6CQ.webp?impolicy=slurrp-20210601&width=1200&height=675" },
      { id: 10, name: "Soft Drinks", price: 60, image: "https://mesarestaurant.ph/wp-content/uploads/2022/05/beverages-cover.png" },
    ],
  },
  {
    id: 4,
    name: "Desserts",
    image: "https://source.unsplash.com/featured/?dessert",
    items: [
      { id: 11, name: "Chocolate Brownie", price: 130, image: "https://akm-img-a-in.tosshub.com/sites/rd/resources/202008/brownie_1598447888_1200x675.png?size=684:384?size=1200:675" },
      { id: 12, name: "Ice Cream", price: 80, image: "https://c.ndtvimg.com/2023-02/egi0l8i_ice-cream_625x300_17_February_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675" },
    ],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [pulseItem, setPulseItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 300]);

  const handleAddToCart = (item) => {
    setPulseItem(item.id);
    setTimeout(() => setPulseItem(null), 1000);
    
    setCart((prevCart) =>
      prevCart.find((cartItem) => cartItem.id === item.id)
        ? prevCart.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          )
        : [...prevCart, { ...item, quantity: 1 }]
    );
  };

  const handleGoToCart = () => {
    navigate("/cart", { state: { cart } });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id === selectedCategory ? null : category.id);
  };

  // Filter items based on selected category and price range
  const filteredItems = categories
    .filter(category => !selectedCategory || category.id === selectedCategory)
    .flatMap(category => category.items)
    .filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);

  return (
    <div style={{ 
      padding: "30px", 
      backgroundColor: "#000", 
      color: "#ffcc00", 
      minHeight: "100vh", 
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* PROFILE ICON ADDED HERE */}
      <Link 
        to="/profile" 
        style={{
          position: "absolute",
          top: "80px",
          right: "30px",
          color: "#ffcc00",
          fontSize: "28px",
          zIndex: 100,
          transition: "transform 0.3s"
        }}
        className="profile-icon"
      >
        <FiUser />
      </Link>

      {/* Animated background elements */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle, rgba(255,204,0,0.1) 0%, rgba(0,0,0,0) 70%)",
        pointerEvents: "none",
        zIndex: 0
      }}></div>
      
      {/* Floating food icons */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="floating-icon" style={{
          position: "absolute",
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
          fontSize: `${Math.random() * 20 + 10}px`,
          opacity: 0.3,
          animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
          transform: `rotate(${Math.random() * 360}deg)`
        }}>
          {["🍔", "🍕", "🍹", "🍦"][i % 4]}
        </div>
      ))}

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ 
          fontSize: "3rem", 
          fontWeight: "bold", 
          textShadow: "0px 4px 15px #ffcc00", 
          textTransform: "uppercase",
          marginBottom: "10px",
          background: "linear-gradient(to right, #ffcc00, #ff9900, #ffcc00)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "gradient 3s ease infinite",
          backgroundSize: "200% 200%"
        }}>
          {selectedCategory 
            ? `${categories.find(c => c.id === selectedCategory)?.name} Menu` 
            : "Explore Our Menu"}
        </h2>
        
        <p style={{
          marginBottom: "30px",
          fontSize: "1.2rem",
          textShadow: "0 0 8px rgba(255,204,0,0.7)"
        }}>
          {selectedCategory 
            ? "All delicious options in this category" 
            : "Click on any category to filter items"}
        </p>

        {/* Category Selector */}
        <div style={{ 
          display: "flex", 
          gap: "15px", 
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "30px"
        }}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category)}
              style={{
                padding: "12px 20px",
                backgroundColor: selectedCategory === category.id ? "#ffcc00" : "transparent",
                border: "2px solid #ffcc00",
                borderRadius: "50px",
                color: selectedCategory === category.id ? "#000" : "#ffcc00",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: selectedCategory === category.id 
                  ? "0 0 15px rgba(255, 204, 0, 0.8)" 
                  : "none",
                minWidth: "120px"
              }}
            >
              {category.name}
            </button>
          ))}
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              padding: "12px 20px",
              backgroundColor: !selectedCategory ? "#ffcc00" : "transparent",
              border: "2px solid #ffcc00",
              borderRadius: "50px",
              color: !selectedCategory ? "#000" : "#ffcc00",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: !selectedCategory 
                ? "0 0 15px rgba(255, 204, 0, 0.8)" 
                : "none",
              minWidth: "120px"
            }}
          >
            All Items
          </button>
        </div>

        {/* Price Range Filter */}
        <div style={{
          margin: "20px auto",
          maxWidth: "500px",
          padding: "20px",
          backgroundColor: "rgba(0,0,0,0.5)",
          border: "1px solid #ffcc00",
          borderRadius: "10px"
        }}>
          <h3 style={{ marginBottom: "15px" }}>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</h3>
          <input
            type="range"
            min="0"
            max="300"
            step="10"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
            style={{
              width: "100%",
              height: "8px",
              background: "#ffcc00",
              borderRadius: "5px",
              marginBottom: "15px",
              WebkitAppearance: "none"
            }}
          />
          <input
            type="range"
            min="0"
            max="300"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            style={{
              width: "100%",
              height: "8px",
              background: "#ffcc00",
              borderRadius: "5px",
              WebkitAppearance: "none"
            }}
          />
        </div>

        {/* Items Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "25px", 
          marginTop: "20px",
          perspective: "1000px"
        }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleAddToCart(item)}
              style={{
                border: "2px solid #ffcc00",
                padding: "20px",
                borderRadius: "15px",
                cursor: "pointer",
                boxShadow: `0 4px 20px ${pulseItem === item.id ? 'rgba(255, 204, 0, 0.9)' : 'rgba(255, 204, 0, 0.4)'}`,
                backgroundColor: "#111",
                transition: "all 0.3s ease-in-out",
                transform: pulseItem === item.id ? "scale(1.1)" : "scale(1)",
                position: "relative",
                overflow: "hidden"
              }}
              className="menu-item"
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(45deg, rgba(255,204,0,0.1) 0%, rgba(255,204,0,0) 50%)",
                zIndex: 0
              }}></div>
              
              <div style={{
                position: "relative",
                zIndex: 1
              }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ 
                    width: "100%", 
                    height: "160px", 
                    objectFit: "cover", 
                    borderRadius: "8px", 
                    border: "2px solid #ffcc00",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                    transform: pulseItem === item.id ? "rotate(5deg)" : "rotate(0deg)",
                    transition: "all 0.3s ease"
                  }}
                />
                <h3 style={{ 
                  margin: "15px 0 10px", 
                  fontWeight: "bold", 
                  color: "#ffcc00",
                  fontSize: "1.4rem",
                  textShadow: "0 0 10px rgba(255,204,0,0.7)"
                }}>
                  {item.name}
                </h3>
                <p style={{ 
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  color: "#fff"
                }}>
                  ₹{item.price}
                </p>
                {pulseItem === item.id && (
                  <div style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    backgroundColor: "#ffcc00",
                    color: "#000",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    animation: "pop 0.5s ease-out"
                  }}>
                    +1
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Button */}
        {cart.length > 0 && (
          <button
            onClick={handleGoToCart}
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              padding: "15px 30px",
              backgroundColor: "#ffcc00",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: "#000",
              boxShadow: "0 0 20px rgba(255, 204, 0, 0.7)",
              transition: "all 0.3s ease",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
            className="cart-button"
          >
            🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
        )}
      </div>

      <style>
        {`
          .profile-icon:hover {
            transform: scale(1.2);
          }
          .menu-item:hover {
            transform: scale(1.05) rotateY(10deg) !important;
            box-shadow: 0 10px 25px rgba(255, 204, 0, 0.8) !important;
          }
          .cart-button:hover {
            transform: scale(1.1);
          }
          @keyframes pop {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 20px;
            height: 20px;
            background: #ffcc00;
            border-radius: 50%;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;