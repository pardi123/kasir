<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="12">
                <material-card color="green" text="Products" title="Products">
    <v-alert
      dense
      text
      type="success"
      :value="alertError"
    >
    <v-row justify="end">

        <v-col cols="11">
            Berhasil Menambah <strong>Product</strong> prop and 

        </v-col>
        <v-col cols="1">
                <v-icon class="text--primary cursor-pointer" @click="alertErrorClose">mdi-close</v-icon>
        </v-col>
    </v-row>
    </v-alert>
                    <v-dialog
                        v-model="dialog"
                        persistent
                        width="500"

                    >
                        <template 
                            v-slot:activator="{on, attrs}"
                        >
                            <v-btn
                                color="green"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                class="my-4 py-5"
                            >
                            <v-icon>mdi-plus</v-icon>

                                Tambah Product
                            </v-btn>
                        </template>
                    
                       <v-card>
                           <v-card-title>
                               <span class="h5">Tambah Produk</span>
                           </v-card-title>
                           <v-card-text>
                               <v-row>
                                   <v-col cols="12" md="10">
                                       <v-form
                                        ref="form"
                                        v-model="valid"
                                        lazy-validation

                                       >
                                        <v-text-field
                                            v-model="kodeBarang"
                                            label="Kode Barang"
                                            required
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="namaBarang"
                                            label="Nama Barang"
                                            required
                                        ></v-text-field>
                                        <v-text-field 
                                            type="number"
                                            v-model.number="jumlahBarang"
                                            label="Jumlah Barang"
                                        ></v-text-field>
                                        <v-btn
                                            class="mr-4"
                                            color="green"
                                            dark
                                            @click="addNewProduct()"
                                        >
                                            Submit
                                        </v-btn>
                                        <v-btn
                                            class="mr-4"
                                            color="red"
                                            dark
                                            @click="resetForms"
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
                            <v-select
                            item-text="stock"
                            item-value="status"
                            :items="selects"
                            v-model="select"
                            return-object
                            persistent-hint
                            label="Stock Barang"
                            v-on:change="getProducts()"
                            ></v-select>
                        </v-col>
                    </v-row>

                    <v-data-table
                        :headers="headers"
                        :items="allProduct"
                        sort-by="namaBarang"
                        class="elevation-1"
                        :loading="dataLoading"  
                         loading-text="Loading... Please wait"
                    >
                            <template v-slot:item.no="{item}">
                                {{ i+1 }}

                            </template>
                        <template v-slot:item.Action="{item}">
                                <v-icon class="mr-2 cursor-pointer" small >mdi-pencil</v-icon>
                                <v-icon small class="cursor-pointer">mdi-delete</v-icon>

                        </template>

                    </v-data-table>
                </material-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    computed: {
        allProduct(){
            
            return this.$store.state.products.allProduct
        },
        dataLoading() {
            return this.$store.state.products.dataLoading
        },
        alertError(){
            return this.$store.state.products.alert
        }
    },
    data: () => ({
        dialog:false,
        valid: true,
        kodeBarang: '',
        namaBarang: '',
        jumlahBarang: 0,
        // table
        search: '',
        i: 0,
        headers: [
            {
                text: 'No',
                align: 'start',
                filterable: false,
                value: 'no',
            },
            { text: 'Kode Barang', value: 'kodeBarang'},
            { text: 'Nama Barang', value: 'namaBarang' },
            { text: 'Jumlah Barang', value: 'jumlahBarang'},
            {text:'Action',value: 'Action',sortable:false,},
        ],
        select: {stock: 'Tersedia', status: true},
        selects: [
            {stock: 'Tersedia', status: true},
            {stock: 'Habis', status: false},
        ],
    }),
    mounted(){
        this.getProducts();
    },

    methods: {
        ...mapActions('products', ['fecthProducts','addProduct','closeAlert']),
        resetForms(){
            this.kodeBarang = ''
            this.namaBarang = ''
            this.jumlahBarang = 0
            this.dialog = false
        },
         getProducts(){
            this.fecthProducts(this.select.status);
                  

        },
        addNewProduct(){
           const product = {
                kode: this.kodeBarang,
                nama: this.namaBarang,
                jumlah: this.jumlahBarang,
            }
            this.addProduct(product);
        },
       alertErrorClose(){
           this.closeAlert(false)
       }

    }
}
</script>

<style>
.cursor-pointer {
    cursor:  pointer !important;
}
</style>