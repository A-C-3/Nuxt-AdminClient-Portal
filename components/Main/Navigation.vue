<template>
    <v-navigation-drawer
        image="/public/bg.jpg"
        permanent
      >
        <div class="h-full">
            <div class="bg-[#ffffffcc] backdrop-blur-lg h-full p-2">
                <v-list nav color="primary">
                    <v-list-item
                        prepend-icon="mdi-monitor-dashboard" 
                        title="Dashboard" 
                        value="Dashboard" 
                        :to="'/'">
                    </v-list-item>
                    <v-list-item
                        prepend-icon="mdi-account-supervisor-circle-outline" 
                        title="Clients" 
                        value="Clients" 
                        :to="'/clients'">
                    </v-list-item>
                    <v-list-item 
                        prepend-icon="mdi-head-heart-outline" 
                        title="Interests" 
                        value="Interests"
                        :to="'/interests'">
                    </v-list-item>
                </v-list>
            </div>
        </div>
    </v-navigation-drawer>
</template>