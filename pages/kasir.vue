<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" md="6" sm="12" xs="12">
                
                <material-card color="green" text="Kasir" title="Kasir">
                    <v-dialog
                        v-model="dialogAdd"
                        width="500"

                    >
                    
                       <v-card>
                           <v-card-title>
                               <span class="h5">Tambah Produk Ke Keranjang </span>
                           </v-card-title>
                           <v-card-text>
                               <v-row>
                                   <v-col cols="12" md="10">
                                       <v-form
                                        ref="form"
                                        lazy-validation

                                       >


                                         <v-text-field 
                                            type="number"
                                            v-model.number="jumlahBarang"
                                            label="Jumlah Barang"
                                            disabled
                                        ></v-text-field>
                                         <v-text-field 
                                            type="number"
                                            v-model.number="valueAddProduct"
                                            label="Tambahan Barang"
                                        ></v-text-field>
                                        <v-btn
                                            class="mr-4"
                                            color="green"
                                            dark
                                            @click="addToCart()"
                                        >
                                            Submit
                                        </v-btn>
                                        <v-btn
                                            class="mr-4"
                                            color="red"
                                            dark
                                            @click="closeEditDialogAddProduct"
                                        >
                                        Close
                                        </v-btn>
                                       </v-form>
                                   </v-col>
                               </v-row>
                           </v-card-text>
                       </v-card>
                    </v-dialog>
                    <v-dialog
                        v-model="dialogMinus"
                        width="500"

                    >
                   
                    
                       <v-card>
                           <v-card-title>
                               <span class="h5">Kurangi Produk</span>
                           </v-card-title>
                           <v-card-text>
                               <v-row>
                                   <v-col cols="12" md="10">
                                       <v-form
                                        ref="form"
                                        lazy-validation

                                       >


                                         <v-text-field 
                                            type="number"
                                            v-model.number="jumlahBarangKeranjang"
                                            label="Jumlah Barang"
                                            disabled
                                        ></v-text-field>
                                         <v-text-field 
                                            type="number"
                                            v-model.number="valueAddProduct"
                                            label="Tambahan Barang"
                                        ></v-text-field>
                                        <v-btn
                                            class="mr-4"
                                            color="green"
                                            dark
                                            @click="minusCart()"
                                        >
                                            Submit
                                        </v-btn>
                                        <v-btn
                                            class="mr-4"
                                            color="red"
                                            dark
                                            @click="closeEditDialogAddProduct"
                                        >
                                        Close
                                        </v-btn>
                                       </v-form>
                                   </v-col>
                               </v-row>
                           </v-card-text>
                       </v-card>
                    </v-dialog>
  
                        <v-row justify="end">
                            <v-col cols="4">
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Search"  
                                    hide-details     
                                >

                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-data-table
                            :headers="headers"
                            :items="allProduct"
                            sort-by="namaBarang"
                            class="elevation-1"
                            :loading="dataLoading"  
                            loading-text="Loading... Please wait"
                            :search="search"

                        >
                            <template v-slot:item.harga_barang="{item}">
                                {{ changeRupiah(item.hargaBarang) }}
                            </template>
                            
                            <template v-slot:item.Action="{item}">
                                <v-icon class="mr-2 cursor-pointer" small @click="openDialogAdd(item)" >mdi-plus</v-icon>

                            </template>
                        </v-data-table>

                </material-card>
            </v-col>
            <v-col cols="12" md="6" sm="12" xs="12">
                <material-card color="green" text="keranjang" title="keranjang">
                        <v-data-table
                            :headers="headers"
                            :items="cartProduct"
                            sort-by="namaBarang"
                            class="elevation-1"
                            :loading="dataLoading"  
                            loading-text="Loading... Please wait"
                            :search="search"

                        >
                            <template v-slot:item.harga_barang="{item}">
                                {{ changeRupiah(item.hargaBarang) }}
                            </template>
                            
                            <template v-slot:item.Action="{item}">
                                <v-icon class="mr-2 cursor-pointer" small @click="opendialogMinus(item)" >mdi-minus</v-icon>

                            </template>
                          
                        </v-data-table>
                        <v-row justify="end" class="my-4">
                            <v-col cols="4">
                                <v-btn 
                                    class="mr-4"
                                    color="green"
                                    dark
                                    to="checkOut"
                                >
                                    Check Out
                                </v-btn>
                            </v-col>
                        </v-row>
                </material-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapActions,mapState} from 'vuex';
export default {
    computed: {
         allProduct(){
            
            return this.$store.state.products.allProduct
        
        },  
        dataLoading() {
            return this.$store.state.products.dataLoading
        },
        cartProduct(){
            return this.$store.state.cart.cart
        },
        productFalse(){
            return this.$store.state.products.allProductFalse
        }
        
        
    },
    data: () => ({
        dialogAdd: false,
        dialogMinus: false,
        search: '',
        namaBarang: '',
        kodeBarang: '',
        hargaBarang: '',
        satuan: '',
        jumlahBarang: 0,
        jumlahBarangKeranjang: 0,
        valueAddProduct: 0,
        jumlahCart: 0,
        kodeAdd: 0,
        kodeKeranjang: '',
        idAdd: 0,
        idKeranjang: 0,
        headers: [
         
            { text: 'Kode Barang', value: 'kodeBarang'},
            { text: 'Nama Barang', value: 'namaBarang' },
            { text: 'Jumlah Barang', value: 'jumlahBarang'},
            {text: 'Harga Barang',value: 'harga_barang',sortable: false,},
            {text: 'Satuan', value: 'satuan'},
            {text:'Action',value: 'Action',sortable:false,},
        ],
    }),
    mounted() {
                this.getProducts();
                this.getCart();
                this.getProductFalse();

    },
    methods: {
        ...mapActions({
           fecthProducts:  'products/fecthProducts',
           setAddProduct: 'products/setAddProduct',
           minusProducts: 'products/minusProducts',
           fecthProductsFalse: 'products/fecthProductsFalse',
           setProductFalse: 'products/setProductFalse',
           setToCart: 'cart/setToCart',
           fecthCart: 'cart/fecthCart',
           addtoCart: 'cart/addtoCart',
           plusCartItem: 'cart/plusCartItem',
           deleteProductCart: 'cart/deleteProductCart',
           minusCartItem: 'cart/minusCartItem',
        }),
        getProductFalse(){
            this.fecthProductsFalse(false)
        },
        minusCart(){
            const sisa = this.jumlahBarangKeranjang - this.valueAddProduct
            if(sisa < 0){
                alert(`jumlah barang di keranjang hanya ${this.jumlahBarangKeranjang}`)
                this.dialogMinus = false
                this.valueAddProduct = 0 
                this.kodeAdd = 0
                this.jumlahBarangKeranjang = 0
                this.idKeranjang = 0
            }
            else if(sisa === 0){
                const param = {
                    id: this.idKeranjang

                }
               this.deleteProductCart(param)
                const product = this.allProduct.filter(kode => kode.kodeBarang === this.kodeKeranjang)
                const productFalse = this.productFalse.filter(kode => kode.kodeBarang === this.kodeKeranjang)
                if(productFalse.length > 0){
                    const jumlahProduct = productFalse[0].jumlahBarang + this.valueAddProduct
                    const paramProduct = {
                        id: productFalse[0].id_data,
                        jumlah:  jumlahProduct,
                        status: true,
                    }
                     this.setProductFalse(paramProduct)
                     this.dialogMinus = false
                     this.valueAddProduct = 0 
                     this.kodeAdd = 0
                     this.jumlahBarangKeranjang = 0
                     this.idKeranjang = 0
                }
                else{
                const jumlahProduct = product[0].jumlahBarang + this.valueAddProduct
                 const paramProduct = {
                     id: product[0].id_data,
                     jumlah:  jumlahProduct
                 }
                 this.setAddProduct(paramProduct)
                 this.dialogMinus = false
                 this.valueAddProduct = 0 
                 this.kodeAdd = 0
                 this.jumlahBarangKeranjang = 0
                 this.idKeranjang = 0
                }
            


            }
            else if(sisa > 0){
                const param = {
                    kode: this.kodeKeranjang,
                    jumlah: sisa,
                }
                this.minusCartItem(param)
                const product = this.allProduct.filter(kode => kode.kodeBarang === this.kodeKeranjang)
                const productFalse = this.productFalse.filter(kode => kode.kodeBarang === this.kodeKeranjang)

                if(productFalse.length > 0 ) {
                    const jumlahProduct = productFalse[0].jumlahBarang + this.valueAddProduct
                    const paramProduct = {
                        id: productFalse[0].id_data,
                        jumlah:  jumlahProduct,
                        status: true,
                    }
                    this.setProductFalse(paramProduct)
                    this.dialogMinus = false
                    this.valueAddProduct = 0 
                    this.kodeAdd = 0
                    this.jumlahBarangKeranjang = 0
                    this.idKeranjang = 0
                }
                else{
                const jumlahProduct = product[0].jumlahBarang + this.valueAddProduct
                const paramProduct = {
                    id: product[0].id_data,
                    jumlah:  jumlahProduct
                }
                this.setAddProduct(paramProduct)
                this.dialogMinus = false
                this.valueAddProduct = 0 
                this.kodeAdd = 0
                this.jumlahBarangKeranjang = 0
                this.idKeranjang = 0
                }

            }
       
        },
        opendialogMinus(item){
            this.jumlahBarangKeranjang = item.jumlahBarang
            this.idKeranjang = item.id_keranjang
            this.dialogMinus = true
            this.kodeKeranjang = item.kodeBarang
        },
        getCart(){
            this.fecthCart();
        },
         getProducts(){
            this.fecthProducts(true);
                  

        },
        changeRupiah(item){
            return new Intl.NumberFormat('id', { style: 'currency', currency: 'IDR' }).format(item)

        },
        openDialogAdd(item){
            this.jumlahBarang = item.jumlahBarang
            this.idAdd = item.id_keranjang
            this.dialogAdd = true
            this.kodeAdd = item.kodeBarang

        },
        closeEditDialogAddProduct(){
            this.dialogAdd= false
            this.dialogMinus = false
            this.jumlahBarang = 0
            this.valueAddProduct = 0 
            this.kodeAdd = ''
            this.jumlahBarangKeranjang = 0
            this.idKeranjang = 0

        },
        addToCart(){
             const cart = this.cartProduct.filter(kode => kode.kodeBarang === this.kodeAdd)
             const product = this.allProduct.filter(kode => kode.kodeBarang === this.kodeAdd)
             if(cart.length === 0){
                const param = {
                     kode: product[0].kodeBarang,
                     nama: product[0].namaBarang,
                     jumlah: this.valueAddProduct,
                     harga: product[0].hargaBarang,
                     satuan: product[0].satuan
                 }
                 this.addtoCart(param)
                const jumlahProduct = product[0].jumlahBarang - this.valueAddProduct
                if(jumlahProduct > 0){
                    const paramProduct = {
                        id: product[0].id_data,
                        jumlah:  jumlahProduct,
                    }
                    this.setAddProduct(paramProduct)
                    this.dialogAdd = false
                    this.jumlahBarang = 0
                    this.valueAddProduct = 0 
                    this.kodeAdd = ''
                    this.jumlahBarangKeranjang = 0
                    this.idKeranjang = 0
                }
                else {
                    const paramProduct = {
                        id: product[0].id_data,
                        jumlah:  jumlahProduct,
                        status: false,
                    
                    }
                    this.setProductFalse(paramProduct)
                    this.dialogAdd = false
                    this.jumlahBarang = 0
                    this.valueAddProduct = 0 
                    this.kodeAdd = ''
                    this.jumlahBarangKeranjang = 0
                    this.idKeranjang = 0
                }
             }
             else if(cart.length > 0) {
                 const jumlah = cart[0].jumlahBarang + this.valueAddProduct
                 const param = {
                     kode: cart[0].kodeBarang,
                     jumlah: jumlah,
                 }
                 this.plusCartItem(param)
                 const jumlahProduct = product[0].jumlahBarang - this.valueAddProduct
                 if(jumlahProduct > 0){
                     const paramProduct = {
                        id: product[0].id_data,
                        jumlah:  jumlahProduct
                     }
                    this.setAddProduct(paramProduct)
                    this.dialogAdd = false
                    this.jumlahBarang = 0
                    this.valueAddProduct = 0 
                    this.kodeAdd = ''
                    this.jumlahBarangKeranjang = 0
                    this.idKeranjang = 0

             }
             else{
                 const paramProduct = {
                     id: product[0].id_data,
                     jumlah: jumlahProduct,
                     status: false,
                 }
                 this.setProductFalse(paramProduct)
                 this.dialogAdd = false
                 this.jumlahBarang = 0
                 this.valueAddProduct = 0 
                 this.kodeAdd = ''
                 this.jumlahBarangKeranjang = 0
                 this.idKeranjang = 0
             }
                 
            }

        },
        

    }
}
</script>

<style>

</style>