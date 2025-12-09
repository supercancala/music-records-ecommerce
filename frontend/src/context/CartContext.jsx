import React, { createContext, useContext, useState, useEffect, Children } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('vinyl_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('vinyl_cart', JSON.stringify(cart));
    }, [cart]);

    // ACTIONS
    const addToCart = (product) => {
        setCart((prevCart) => {
            // Check if item already exists in cart
            const existingItem = prevCart.find((item) => item.id === product.id);

            if (existingItem) {
                return prevCart.map((item) => {
                    item.id === product.id 
                    ? {... item, quantity: item.quantity + 1 } 
                    : item
                })
            } else {
                return [...prevCart, {...product, quantity: 1}]
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    }

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart((prevCart) => {
            prevCart.map((item) => {
                item.id === productId ? {... item, quantity: newQuantity } : item
            })
        });
    };

    const clearCart = () => setCart([]);

    // Calculations
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    )
}

// Custom Hook for easy access
export const useCart = () => useContext(CartContext);