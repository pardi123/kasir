<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="3" sm="6"> 
          <material-stats-card
            color="green"
            icon= "mdi-store"
            title= "Penjualan"
            value= "Rp.10.000.000,00" 
            sub-icon= "mdi-calendar"
            sub-text = "24 hari" 
            />

        </v-col>
             <v-col cols="12" lg="3" sm="6"> 
          <material-stats-card
            color="orange"
            icon= "mdi-store"
            title= "Penjualan"
            value= "Rp.10.000.000,00" 
            sub-icon= "mdi-calendar"
            sub-text = "24 hari" 
            />

        </v-col>
             <v-col cols="12" lg="3" sm="6"> 
          <material-stats-card
            color="red"
            icon= "mdi-store"
            title= "Penjualan"
            value= "Rp.10.000.000,00" 
            sub-icon= "mdi-calendar"
            sub-text = "24 hari" 
            />

        </v-col>
             <v-col cols="12" lg="3" sm="6"> 
          <material-stats-card
            color="info"
            icon= "mdi-store"
            title= "Penjualan"
            value= "Rp.10.000.000,00" 
            sub-icon= "mdi-calendar"
            sub-text = "24 hari" 
            />

        </v-col>

                    <v-col cols="12" lg="12">
                <material-card color="orange" title="Employee Stats" text="New employees on 15th September, 2016">
                    <v-data-table :headers="headers" :items="items" hide-default-footer />
                </material-card>
            </v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {

  name: 'IndexPage',
  data: () => ({
                headers: [
                {
                    sortable: false,
                    text: 'ID',
                    value: 'id',
                },
                {
                    sortable: false,
                    text: 'Name',
                    value: 'name',
                },
                {
                    sortable: false,
                    text: 'Salary',
                    value: 'salary',
                    align: 'right',
                },
                {
                    sortable: false,
                    text: 'Country',
                    value: 'country',
                    align: 'right',
                },
                {
                    sortable: false,
                    text: 'City',
                    value: 'city',
                    align: 'right',
                },
            ],
            items: [
                {
                    id: 1,
                    name: 'Dakota Rice',
                    country: 'Niger',
                    city: 'Oud-Tunrhout',
                    salary: '$35,738',
                },
                {
                    id: 2,
                    name: 'Minerva Hooper',
                    country: 'Curaçao',
                    city: 'Sinaai-Waas',
                    salary: '$23,738',
                },
                {
                    id: 3,
                    name: 'Sage Rodriguez',
                    country: 'Netherlands',
                    city: 'Overland Park',
                    salary: '$56,142',
                },
                {
                    id: 4,
                    name: 'Philip Chanley',
                    country: 'Korea, South',
                    city: 'Gloucester',
                    salary: '$38,735',
                },
                {
                    id: 5,
                    name: 'Doris Greene',
                    country: 'Malawi',
                    city: 'Feldkirchen in Kārnten',
                    salary: '$63,542',
                },
            ],

  })
}
</script>
