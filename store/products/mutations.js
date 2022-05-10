export default {
    setProducts(state, param) {
        state.allProduct = param;
        state.dataLoading = false;
    },
    setDataLoading(state) {
        state.dataLoading = true;
    },
    setAlertError(state, param) {
        state.errorAlert = param
    },

    setNewProduct(state, param) {
        state.allProduct.push(param);
        state.alert = true;
    },
    setProduct(state, param) {

        const id = state.allProduct.map(id => id.id_data)
        const length = id.indexOf(param)
        state.allProduct.splice(length, 1)
    },
    closeAlertError(state, param) {
        state.errorAlert = param
    },
    closeAlertSuccess(state, param) {
        state.alert = param
    },
    updateProduct(state, param) {
        const id = state.allProduct.map(id => id.id_data)
        const length = id.indexOf(param.id_data)
        state.allProduct.splice(length, 1, param)
    },
    setAddProduct(state, param) {
        const id = state.allProduct.map(id => id.id_data)
        const length = id.indexOf(param.id_data)
        state.allProduct.splice(length, 1, param)
    },
    setFalseProduct(state, param) {

        if (param.status === false) {
            const id = state.allProduct.map(id => id.id_data)
            const length = id.indexOf(param.id_data)
            state.allProduct.splice(length, 1)
            state.allProductFalse.push(param)
        } else {
            const id = state.allProductFalse.map(id => id.id_data)
            const length = id.indexOf(param.id_data)

            state.allProductFalse.splice(length, 1)
            state.allProduct.push(param)
        }
    },
    setProductsFalse(state, param) {
        state.allProductFalse = param
    },

}