export default {
    setProducts(state,param){
        state.allProduct = param;
        state.dataLoading = false;
    },
    setDataLoading(state){
        state.dataLoading = true;
    },
    setAlertError(state,param){
        state.errorAlert = param
    },

    setNewProduct(state,param){
        state.allProduct.push(param);
        state.alert = true;
    },
    setProduct(state,param){
     
       const id = state.allProduct.map(id => id.id_data)
       const length = id.indexOf(param)
       state.allProduct.splice(length,1)
    },
    closeAlertError(state,param){
        state.errorAlert = param
    }
    
}