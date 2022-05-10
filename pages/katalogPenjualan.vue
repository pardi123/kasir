<template>
      <v-container fluid>
        <material-card color="green" title="Katalog Penjualan" text="Katalog Penjualan">
                 <v-row justify="center">
                    <v-col cols="6">
                           <v-date-picker
                                v-model="dates"
                                range
                                @change="getKatalogDate"
                            ></v-date-picker>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            v-model="dateRangeText"
                            label="Date range"
                            prepend-icon="mdi-calendar"
                            readonly
                            
                        ></v-text-field>
                    </v-col>
                </v-row>
               <v-data-table
                            :headers="headers"
                            :items="dataKatalog"
                            sort-by="namaBarang"
                            class="elevation-1"
                            :loading="dataLoading"  
                            loading-text="Loading... Please wait"

                >
                     <template v-slot:item.hargaBarang="{item}">
                                {{ changeRupiah(item.hargaBarang) }}
                    </template>
                    <template v-slot:item.jumlahHarga="{item}">
                                {{ changeRupiah(item.jumlahHarga) }}
                     </template>
              </v-data-table> 
              
        </material-card>
    </v-container>   
</template>

<script>
import {mapActions,mapState} from 'vuex';

export default {
    computed: {
        dateRangeText () {
                return this.dates.join(' ~ ')
        },
        dataKatalog(){
            return this.$store.state.katalog.dataKatalog
        },
        dataLoading(){
            return this.$store.state.katalog.dataLoading
        }
    },
    data: () => ({
        date: '',
        dates: [],
        headers: [
         
            { text: 'Kode Barang', value: 'kodeBarang'},
            { text: 'Nama Barang', value: 'namaBarang' },
            { text: 'Jumlah Barang', value: 'jumlahBarang'},
            {text: 'Harga Barang',value: 'hargaBarang',sortable: false,},
            {text: 'total Harga',value: 'jumlahHarga',sortable: false,},
            {text: 'Satuan', value: 'satuan'},
            {text: 'Date', value: 'date'},

        ],
    }),
    mounted(){
        this.getDataKatalog();
    },
    methods: {
        ...mapActions({
            fecthKatalog : 'katalog/fecthKatalog',

        }),
        getDataKatalog(){
            var date = new Date();
            this.date = date.toLocaleDateString();
                let param = {
                date: this.date
            }
            this.fecthKatalog(param)
        },
        getKatalogDate(){
             if(this.dates === []){
                 var date = new Date();
                 this.date = date.toLocaleDateString();
                     let param = {
                     date: this.date
                     }
                 this.fecthKatalog(param)
             }
             else {
                 var date1 = new Date(this.dates[0])
                 var date2 = new Date(this.dates[1])
                 let dateConvert1 = date1.toLocaleDateString()
                 let dateConvert2 = date2.toLocaleDateString()
                 let param = {
                     date1: dateConvert1,
                     date2: dateConvert2,
                 }
                //  this.date = date.toLocaleDateString()
                //  this.fecthKatalog(param)
                console.log(param)
             }
      
            
        },
         changeRupiah(item){
            return new Intl.NumberFormat('id', { style: 'currency', currency: 'IDR' }).format(item)

        },
    }
}
</script>

<style>

</style>