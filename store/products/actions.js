
export default {
    async fecthProducts(store,param){
        let client = this.app.apolloProvider.defaultClient
        store.commit('setDataLoading')
        return new Promise ((resolve, reject) => {
            client
                .query({
                    query: require('~/graphql/query/products.gql').Products,
                    variables: {
                        status: param
                    },
                })
                .then(response => {
                    store.commit('setProducts',response.data.products)
                    resolve(response)
                }) .catch(error => {
                    resolve(error)
                })
        })
    },

    async addProduct(store,param){
        let client = this.app.apolloProvider.defaultClient
        return new Promise((resolve, reject) => {
            client
                .query({
                    query: require('~/graphql/query/products.gql').selectProduct,
                    variables: {
                        kode: param.kode
                    }
                }) .then(response => {
                    if (response.data.products.length > 0) {
                        store.commit('setAlert',true)
                    }
                })
        })    
    },
    
    closeAlert(store,param){
        store.commit('setAlert',param)
    }
}