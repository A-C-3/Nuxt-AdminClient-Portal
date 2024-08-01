<template>
    <v-app>
        <div class="flex h-full">
            <div class="flex-1" style="background-image: url('/bg.jpg'); background-position: center; background-repeat: no-repeat; background-size: cover;">
                <div class="bg-[#ffffffcc] backdrop-blur-lg w-full h-full flex items-center justify-center">
                </div>
            </div>
            <div class="w-1/3 h-full flex flex-col items-center justify-center px-8">
                <NuxtPage />
            </div>
        </div>
    </v-app>
</template>