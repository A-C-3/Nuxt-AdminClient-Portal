<template>
    <v-app>
        <MainAppbar />
        <MainNavigation />
        <v-main>
            <NuxtPage />
            <v-footer>
                <div class="flex justify-between w-full items-center">
                    <p>
                        @2024 | <strong>Simple CRUD</strong>
                    </p>
                    <p>Ace</p>
                </div>
            </v-footer>
        </v-main>
    </v-app>
</template>