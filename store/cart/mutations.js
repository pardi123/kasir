export default {
    setCart(state, param) {
        state.cart.push(param);
    },
    setCarts(state, param) {
        state.cart = param;
    },
    updateCart(state, param) {
        const id = state.cart.map(id => id.id_keranjang)
        const length = id.indexOf(param.id_keranjang)
        state.cart.splice(length, 1, param);
    },
    deleteCart(state, param) {
        const id = state.cart.map(id => id.id_keranjang)
        const length = id.indexOf(param.id_keranjang)
        state.cart.splice(length, 1);
    },
    setAllCart(state, param) {
        const id = state.cart.map(id => id.id_keranjang)
        const length = id.indexOf(param.id_keranjang)
        state.cart.splice(length, 1);


    }
}