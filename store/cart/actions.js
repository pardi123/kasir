export default {
    fecthCart(store) {
        let client = this.app.apolloProvider.defaultClient
        client
            .query({
                query: require('~/graphql/query/cart.gql').Carts
            }).then(response => {
                store.commit('setCarts', response.data.keranjang);
            }).catch(error => {
                console.error(error);
            })
    },
    setToCart(store, param) {
        let client = this.app.apolloProvider.defaultClient

        client
            .query({
                query: require('~/graphql/query/cart.gql').checkCart,
                variables: {
                    kode: param.kode
                }
            }).then(response => {
                if (response.data.keranjang.length === 0) {
                    store.dispatch('addtoCart', param)
                    console.log(response.data.keranjang.length)
                } else {
                    const dataCart = {
                        return: response.data.keranjang[0],
                        data: param
                    }
                    store.dispatch('plusCartItem', dataCart)
                }
            }).catch(error => {
                console.log(error)
            })
    },
    addtoCart(store, param) {
        let client = this.app.apolloProvider.defaultClient
        client
            .mutate({
                mutation: require('~/graphql/mutations/cart.gql').addToCart,
                variables: {
                    kode: param.kode,
                    nama: param.nama,
                    jumlah: param.jumlah,
                    harga: param.harga,
                    satuan: param.satuan,
                }
            }).then(response => {
                store.commit('setCart', response.data.insert_keranjang.returning[0])
            }).catch(error => {
                console.log(error)
            })
    },
    plusCartItem(store, param) {
        const jumlah = param.jumlah
        let client = this.app.apolloProvider.defaultClient
        client
            .mutate({
                mutation: require('~/graphql/mutations/cart.gql').plusCart,
                variables: {
                    kode: param.kode,
                    jumlah: jumlah,
                }
            }).then(response => {
                store.commit('updateCart', response.data.update_keranjang.returning[0])
                console.log(response.data.update_keranjang.returning[0].kodeBarang)

            }).catch(error => {
                console.error(error);
            })

    },
    deleteProductCart(store, param) {
        let client = this.app.apolloProvider.defaultClient
        client
            .mutate({
                mutation: require('~/graphql/mutations/cart.gql').deleteCart,
                variables: {
                    id: param.id,
                }
            }).then(response => {
                store.commit('deleteCart', response.data.delete_keranjang.returning[0])
            })
    },
    minusCartItem(store, param) {
        let client = this.app.apolloProvider.defaultClient
        client.mutate({
            mutation: require('~/graphql/mutations/cart.gql').plusCart,
            variables: {
                kode: param.kode,
                jumlah: param.jumlah,
            }
        }).then(response => {
            store.commit('updateCart', response.data.update_keranjang.returning[0])

        }).catch(error => {
            console.error(error)
        })
    },
    addToSold(store, param) {
        let client = this.app.apolloProvider.defaultClient
        client.mutate({
            mutation: require('~/graphql/mutations/cart.gql').addProductSold,
            variables: {
                id: param.id,
                kode: param.kode,
                nama: param.nama,
                jumlah: param.jumlah,
                harga: param.harga,
                total: param.total,
                date: param.date,
                satuan: param.satuan,
            }
        }).then(response => {
            store.dispatch('changeStatus', response.data.insert_product_sold.returning[0])
            store.commit('setAllCart', response.data.insert_product_sold.returning[0])
        }).catch(error => {
            console.log(error)
        })
    },
    changeStatus(store, param) {
        let client = this.app.apolloProvider.defaultClient
        client.mutate({
            mutation: require('~/graphql/mutations/cart.gql').changeStatus,
            variables: {
                id: param.id_keranjang
            }
        }).then(response => {
            console.log(param.id_keranjang)
        }).catch(error => {
            console.log(error)
        })
    }

}