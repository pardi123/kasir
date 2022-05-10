export default {
    async fecthProducts(store, param) {
        let client = this.app.apolloProvider.defaultClient
        store.commit('setDataLoading')
        return new Promise((resolve, reject) => {
            client
                .query({
                    query: require('~/graphql/query/products.gql').Products,
                    variables: {
                        status: param
                    },
                })
                .then(response => {
                    store.commit('setProducts', response.data.products)
                    resolve(response)
                }).catch(error => {
                    resolve(error)
                })
        })
    },
    async fecthProductsFalse(store, param) {
        let client = this.app.apolloProvider.defaultClient
        store.commit('setDataLoading')
        return new Promise((resolve, reject) => {
            client
                .query({
                    query: require('~/graphql/query/products.gql').Products,
                    variables: {
                        status: param
                    },
                })
                .then(response => {
                    store.commit('setProductsFalse', response.data.products)
                    resolve(response)
                }).catch(error => {
                    resolve(error)
                })
        })
    },

    async CheckProduct(store, param) {
        let client = this.app.apolloProvider.defaultClient
        return new Promise((resolve, reject) => {
            client
                .query({
                    query: require('~/graphql/query/products.gql').selectProduct,
                    variables: {
                        kode: param.kode
                    }
                }).then(response => {
                    if (response.data.products.length > 0) {
                        store.commit('setAlertError', true)
                    } else {
                        store.dispatch('addProduct', param)
                    }
                }).catch(error => {
                    console.error(error)
                })
        })
    },
    async addProduct(store, param) {
        let client = this.app.apolloProvider.defaultClient
        client
            .mutate({
                mutation: require('~/graphql/mutations/addProducts.gql').addProduct,
                variables: {
                    jumlah: param.jumlah,
                    kode: param.kode,
                    nama: param.nama,
                    status: true,
                    harga: param.harga,
                    satuan: param.satuan,
                }
            }).then(response => {
                store.commit('setNewProduct', response.data.insert_products.returning[0])
            }).catch(error => {
                console.error(error)
            })
    },
    deleteProducts(store, param) {
        let client = this.app.apolloProvider.defaultClient
        client
            .mutate({
                mutation: require('~/graphql/mutations/addProducts.gql').deleteProduct,
                variables: {
                    id: param
                }
            }).then(response => {
                store.commit('setProduct', response.data.delete_products.returning[0].id_data)
                console.log(response.data.delete_products.returning[0].id_data)

            }).catch(error => {
                console.error(error)
            })
    },
    productEdit(store, param) {
        let client = this.app.apolloProvider.defaultClient
        client.mutate({
            mutation: require('~/graphql/mutations/addProducts.gql').updateProduct,
            variables: {
                id: param.id,
                nama: param.nama,
                harga: param.harga,
                kode: param.kode,
                satuan: param.satuan
            }
        }).then(response => {
            store.commit('updateProduct', response.data.update_products.returning[0])
            console.log(response.data.update_products.returning[0])
        }).catch(error => {
            console.log(error)
        })
    },
    closeAlertError(store, param) {
        store.commit('closeAlertError', param)
    },
    closeAlertSuccess(store, param) {
        store.commit('closeAlertSuccess', param)
    },
    setAddProduct(store, param) {
        let client = this.app.apolloProvider.defaultClient
        client
            .mutate({
                mutation: require('~/graphql/mutations/addProducts.gql').plusProduct,
                variables: {
                    id: param.id,
                    jumlah: param.jumlah,
                }

            }).then(response => {
                store.commit('setAddProduct', response.data.update_products.returning[0])
                console.log(response.data.update_products.returning[0])
            }).catch(error => {
                console.error(error)
            })
    },
    minusProducts(store, param) {
        let client = this.app.apolloProvider.defaultClient
        client
            .mutate({
                mutation: require('~/graphql/mutations/addProducts.gql').minusProduct,
                variables: {
                    kode: param.kode,
                    jumlah: param.sisa,
                }
            }).then(response => {
                store.commit('setAddProduct', response.data.update_products.returning[0])
            }).catch(error => {
                console.error(error);
            })

    },
    setProductFalse(store, param) {
        let client = this.app.apolloProvider.defaultClient
        client
            .mutate({
                mutation: require('~/graphql/mutations/addProducts.gql').flaseProduct,
                variables: {
                    id: param.id,
                    jumlah: param.jumlah,
                    status: param.status,
                }

            }).then(response => {
                store.commit('setFalseProduct', response.data.update_products.returning[0])
                console.log(response.data.update_products.returning[0])
            }).catch(error => {
                console.error(error)
            })
    }

}