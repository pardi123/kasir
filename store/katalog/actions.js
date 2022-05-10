export default {
    fecthKatalog(store, param) {
        let client = this.app.apolloProvider.defaultClient
        client.query({
            query: require('~/graphql/query/katalog.gql'),
            variables: {
                date: param.date,
            }
        }).then(response => {
            store.commit('setDataKatalog', response.data.product_sold);
        }).catch(error => {
            console.log(error)
        })
    }
}