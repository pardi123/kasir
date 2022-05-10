<template>
    <v-row justify="center">
        <v-col cols="12" md="6" xs="6" ms="6" >
        <material-card
            color="green"
            text="Check Out"
            title="Check Out"
        >
            <v-card>
                <v-card-title>
                    List Product
                </v-card-title>
                <v-list danse v-for="(productCart,i) in allDataCart" :key="productCart.id_keranjang">
                    <v-list-item>
                        <v-list-item-content>
                            Nama Barang :
                        </v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{ productCart.namaBarang }}
                        </v-list-item-content>
                    </v-list-item>
                        <v-list-item>
                        <v-list-item-content>
                            Harga Barang : 
                        </v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{ changeRupiah(productCart.hargaBarang) }}
                        </v-list-item-content>
                    </v-list-item>
                        <v-list-item>
                        <v-list-item-content>
                            Jumlah Barang :
                        </v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{ productCart.jumlahBarang }} {{ productCart.satuan }}
                        </v-list-item-content>
                    </v-list-item>
                        <v-list-item>
                        <v-list-item-content>
                            Total Harga :
                        </v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{totalHarga(productCart.jumlahBarang,productCart.hargaBarang)}}
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
              
                 
                </v-list>
                <v-list>
                    <v-list-item>
                        <v-list-item-content>
                            Total Pembayaran : 
                        </v-list-item-content>
                        <v-list-item-content>
                            {{ changeRupiah(this.totalPembayaran) }}
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-container>

                <v-row
                justify="end">
                     <v-col cols="3" md="3" xs="3" sm="3" class="p-right">
                        <v-btn color="green" dark @click="checkout">
                            Bayar
                        </v-btn>
                    </v-col>                   

                </v-row>
                </v-container>

            </v-card>
        </material-card>
        </v-col>
    </v-row>

</template>

<script>
import {mapActions,mapState} from 'vuex';

export default {
    computed: {
        allDataCart(){
          return  this.$store.state.cart.cart
        },
        totalPembayaran(){
            let total = 0
            for(let i = 0 ; i < this.allDataCart.length ; i++){
                let totalHarga = this.allDataCart[i].hargaBarang * this.allDataCart[i].jumlahBarang
                total = total +totalHarga          
            }
            return total
        }
    },
    data: () => ({
    }),
    mounted(){
        this.getDataCart();  
        this.validationView()
    },

    methods : {
        ...mapActions({
             fecthCart: 'cart/fecthCart',
             addToSold: 'cart/addToSold',
             
        }),       
        getDataCart(){
          this.fecthCart(false)
        },
        changeRupiah(item){
            return new Intl.NumberFormat('id', { style: 'currency', currency: 'IDR' }).format(item)

        },
        totalHarga(jumlah,harga){
             const total =  jumlah * harga ;
             return this.changeRupiah(total)
        },
        checkout(){
            let dataCart = this.allDataCart;
            var dt = new Date()

            for(let i = 0; i < dataCart.length; i++){
                let param = {
                    id: dataCart[i].id_keranjang,
                    kode : dataCart[i].kodeBarang,
                    nama: dataCart[i].namaBarang,
                    jumlah: dataCart[i].jumlahBarang,
                    harga: dataCart[i].hargaBarang,
                    total: dataCart[i].hargaBarang * dataCart[i].jumlahBarang,
                    date:  dt.toLocaleDateString(),
                    satuan: dataCart[i].satuan,
                }
                this.addToSold(param)
                this.$router.go(-1)
                
            }
        },
        validationView(){
            if (this.allDataCart.length  === 0) {
                this.$router.go(-1)
                
            }
        }
      
   
    }
}
</script>

<style>
    @media only screen and (max-width: 400px){
        .p-right{
                margin-right: 15px !important;
        }        
    }
</style>