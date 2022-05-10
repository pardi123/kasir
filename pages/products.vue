<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="12">
                <material-card color="green" text="Products" title="Products">

    <v-alert
            dense
            outlined
            type="error"
            :value="errorAlert"
    >
    <v-row justify="end">

            <v-col cols="11">
                Data Telah <strong>Ada</strong> 

            </v-col>
            <v-col cols="1">
                    <v-icon class="text--primary cursor-pointer" @click="alertErrorClose">mdi-close</v-icon>
            </v-col>
    </v-row>
    </v-alert>
    <v-alert
      dense
      text
      type="success"
      :value="successAlert"
    >
    <v-row justify="end">

        <v-col cols="11">
            Berhasil Menambah <strong>Product</strong> 

        </v-col>
        <v-col cols="1">
                <v-icon class="text--primary cursor-pointer" @click="alertSuccessClose" >mdi-close</v-icon>
        </v-col>
    </v-row>
    </v-alert>
        <!-- all-Dialog -->
                    <v-dialog
                        v-model="dialogEdit"
                        width="500"

                    >
                   
                    
                       <v-card>
                           <v-card-title>
                               <span class="h5">Edit Produk</span>
                           </v-card-title>
                           <v-card-text>
                               <v-row>
                                   <v-col cols="12" md="10">

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
                                            v-model.number="hargaBarang"
                                            label="Harga Barang"
                                        >
                                     
                                        </v-text-field>
                                             <v-select
                                            :items="satuan"
                                            label="Satuan"
                                            v-model="valueSatuan"
                                            dense
                                        ></v-select>
                                        <v-btn
                                            class="mr-4"
                                            color="green"
                                            dark
                                            @click="editProduct()"
                                        >
                                            Submit
                                        </v-btn>
                                        <v-btn
                                            class="mr-4"
                                            color="red"
                                            dark
                                            @click="closeEditDialog"
                                        >
                                        Close
                                        </v-btn>
                                   </v-col>
                               </v-row>
                           </v-card-text>
                       </v-card>
                    </v-dialog>
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
                                        <v-text-field
                                            type="number"
                                            v-model.number="hargaBarang"
                                            label="Harga Barang"
                                        >
                                     
                                        </v-text-field>
                                             <v-select
                                            :items="satuan"
                                            label="Satuan"
                                            v-model="valueSatuan"
                                            dense
                                        ></v-select>
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
                    <v-dialog
                        v-model="dialogAdd"
                        width="500"

                    >
                   
                    
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
                                            @click="plusProduct()"
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
                                        v-model="valid"
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
                                            v-model.number="valueMinusProduct"
                                            label="Tambahan Barang"
                                        ></v-text-field>
                                        <v-btn
                                            class="mr-4"
                                            color="green"
                                            dark
                                            @click="minusProduct()"
                                        >
                                            Submit
                                        </v-btn>
                                        <v-btn
                                            class="mr-4"
                                            color="red"
                                            dark
                                            @click="closeDialogMinus"
                                        >
                                        Close
                                        </v-btn>
                                       </v-form>
                                   </v-col>
                               </v-row>
                           </v-card-text>
                       </v-card>
                    </v-dialog>
        <!-- all-Dialog -->

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
                        :search="search"
                        sort-by="namaBarang"
                        class="elevation-1"
                        :loading="dataLoading"  
                         loading-text="Loading... Please wait"
                    >
                       <template v-slot:item.harga_barang="{item}">
                           {{ changeRupiah(item.hargaBarang) }}
                       </template>
                        <template v-slot:item.Action="{item}">
                 
                                <v-icon class="mr-2 cursor-pointer" small @click="openEditDialogMinusProduct(item)">mdi-minus</v-icon>
                                <v-icon class="mr-2 cursor-pointer" small @click="openEditDialogAddProduct(item)">mdi-plus</v-icon>
                                <v-divider></v-divider>
                                <v-icon class="mr-2 cursor-pointer" small @click="openEditDialog(item)">mdi-pencil</v-icon>
                                <v-icon small class="cursor-pointer" @click="deleteProduct(item.id_data)" >mdi-delete</v-icon>

                        </template>

                    </v-data-table>
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
        successAlert(){
            return this.$store.state.products.alert
        },
        errorAlert(){
            return this.$store.state.products.errorAlert
        },

   
 
        
    },
    data: () => ({
        disabled: false,
        dialog:false,
        dialogEdit: false,
        dialogAdd: false,
        dialogMinus: false,
        valid: true,
        kodeBarang: '',
        namaBarang: '',
        jumlahBarang: 0,
        valueAddProduct: 0,
        valueMinusProduct: 0,
        hargaBarang: 0,
        idAdd: 0,
        idEdit: 0,
        search: '',        
        test: 10000000,
        // table
        search: '',
        valueSatuan: '',
        satuan: ['Dus','pcs','lusin',],
        i: 0,
        headers: [
         
            { text: 'Kode Barang', value: 'kodeBarang'},
            { text: 'Nama Barang', value: 'namaBarang' },
            { text: 'Jumlah Barang', value: 'jumlahBarang'},
            {text: 'Harga Barang',value: 'harga_barang',sortable: false,},
            {text: 'Satuan', value: 'satuan'},
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
        ...mapActions('products', ['fecthProducts','CheckProduct','closeAlertError','deleteProducts','closeAlertSuccess','productEdit','setAddProduct']),
        resetForms(){
            this.kodeBarang = ''
            this.namaBarang = ''
            this.jumlahBarang = 0
            this.hargaBarang = 0
            this.valueSatuan = ''
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
                harga: this.hargaBarang,
                satuan: this.valueSatuan,
            }
            this.CheckProduct(product);
            this.kodeBarang = ''
            this.namaBarang = ''
            this.jumlahBarang = 0
            this.dialog = false;
        },
       alertErrorClose(){
           
           this.closeAlertError(false)
       },
       deleteProduct(id){
           this.disable = true
           this.deleteProducts(id);
       },
        changeRupiah(item){
                return new Intl.NumberFormat('id', { style: 'currency', currency: 'IDR' }).format(item)

        },
        alertSuccessClose(){
            this.closeAlertSuccess(false);
        },
        closeEditDialog () {
            this.dialogEdit = false
            this.kodeBarang = ''
            this.namaBarang = ''
            this.jumlahBarang = 0
            this.hargaBarang = 0
            this.valueSatuan = ''

        },
        openEditDialog (item) {
            this.dialogEdit = true
            this.kodeBarang = item.kodeBarang
            this.namaBarang = item.namaBarang
            this.hargaBarang = item.hargaBarang
            this.valueSatuan = item.satuan
            this.idEdit = item.id_data
        },
        editProduct(){
            this.dialogEdit = false
            const product = {
                id: this.idEdit,
                kode: this.kodeBarang,
                nama: this.namaBarang,
                harga: this.hargaBarang,
                satuan: this.valueSatuan,   
            }
            this.productEdit(product)
        },
        openEditDialogAddProduct(item){
            this.idAdd = item.id_data
            this.dialogAdd = true;
            this.jumlahBarang = item.jumlahBarang;
           
        },
        closeEditDialogAddProduct(){
            this.dialogAdd = false;
            this.jumlahBarang = 0
            this.valueAddProduct = 0
            this.idAdd = 0

        },
        plusProduct(){
            this.dialogAdd = false;
            let newAdd = this.jumlahBarang + this.valueAddProduct;
            const product = {
                id: this.idAdd,
                jumlah: newAdd,
                
            };
            this.setAddProduct(product);
            this.jumlahBarang = 0
            this.valueAddProduct = 0
            this.idAdd = 0
            // this.setAddProduct(product);
        
        },
        openEditDialogMinusProduct(item){
            this.idAdd = item.id_data
            this.dialogMinus = true;
            this.jumlahBarang = item.jumlahBarang;
        },
        minusProduct(){
            this.dialogMinus = false;
            if(this.valueMinusProduct > this.jumlahBarang) {
                alert("Barang tidak mencukupi")

            }
            else
            { 
                let newAdd = this.jumlahBarang - this.valueMinusProduct;
                const product = {
                    id: this.idAdd,
                    jumlah: newAdd,
                
                    };
                this.setAddProduct(product);
           
            }
                          this.jumlahBarang = 0
                    this.valueMinusProduct = 0
                    this.idAdd = 0

   

        },
        closeDialogMinus(){
            this.dialogMinus = false;
                    this.jumlahBarang = 0
                    this.valueMinusProduct = 0
                    this.idAdd = 0

        }
     

    }
}
</script>

<style>
.cursor-pointer {
    cursor:  pointer !important;
}
</style>