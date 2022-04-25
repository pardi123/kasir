export default {
    setProducts(state,param){
        state.allProduct = param;
        state.dataLoading = false;
    },
    setDataLoading(state){
        state.dataLoading = true;
    },
    setAlert(state,param){
        state.alert = param
    }
    
}