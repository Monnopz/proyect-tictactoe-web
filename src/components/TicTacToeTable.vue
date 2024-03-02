<script setup>
import { ref } from 'vue';
import useTicTacToe from '@/composables/useTicTacToe';

const tableTicTacToe = ref(null); // La ref del script tiene que coincidir de nombre con el atributo ref de la vista

const { player1Score, player2PCScore, tieScore, pushValue, resetGame } = useTicTacToe( tableTicTacToe )

</script>

<template>
    <div class="min-h-screen">
        <p class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-9xl text-center font-bold mx-4 mb-4 2xl:mb-8">Tic-Tac-Toe!</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-y-2 2xl:gap-y-6 my-0 md:my-2 2xl:my-8">
            <p class="text-base sm:text-xl lg:text-3xl 2xl:text-5xl flex justify-evenly md:justify-between mx-4 sm:mb-2 md:mb-0">
                <span class="flex items-center">
                    <span>Player 1 as</span>
                    <i class="icon pi pi-times mx-2"></i>
                </span>
                <span>
                    <span class="font-bold">—</span>
                </span>
                <span>
                    <span class="font-medium">{{player1Score}}</span>
                </span>
            </p>
            <p class="text-base sm:text-xl lg:text-3xl 2xl:text-5xl flex justify-evenly md:justify-between mx-4 sm:my-2 md:my-0">
                <span class="flex items-center">
                    <span>CPU as</span>
                    <i class="icon pi pi-circle mx-2"></i>
                </span>
                <span>
                    <span class="font-bold">—</span>
                </span>
                <span>
                    <span class="font-medium">{{player2PCScore}}</span>
                </span>
            </p>
            <p class="text-base sm:text-xl lg:text-3xl 2xl:text-5xl flex justify-evenly md:justify-between mx-4 sm:mt-2 md:mt-0">
                <span class="flex items-center">
                    <span>Tie!</span>
                </span>
                <span>
                    <span class="font-bold">—</span>
                </span>
                <span>
                    <span class="font-medium">{{tieScore}}</span>
                </span>
            </p>
            <div class="text-base lg:text-xl 2xl:text-2xl font-bold flex justify-evenly md:justify-start mx-4 sm:my-2 md:my-0"><button class="bg-[#273043] rounded-full px-4 py-2" @click="resetGame()">Reset Game</button></div>
        </div>
        <div class="flex justify-center mt-8 2xl:mt-14 mb-4 2xl:mb-7 text-3xl sm:text-5xl lg:text-6xl 2xl:text-8xl font-bold">
            <table ref="tableTicTacToe" class="table-fixed divide-y-2 lg:divide-y-4 divide-[#eff6ee]/[0.94]">
                <tr class="divide-x-2 lg:divide-x-4 2xl:divide-x-6 divide-[#eff6ee]/[0.94]">
                    <td><button class="p-2 w-16 h-16 sm:w-32 sm:h-32 lg:w-36 lg:h-36 2xl:w-44 2xl:h-44 btn-value" @click="pushValue(1)"><i class=""></i></button></td>
                    <td><button class="p-2 w-16 h-16 sm:w-32 sm:h-32 lg:w-36 lg:h-36 2xl:w-44 2xl:h-44 btn-value" @click="pushValue(2)"><i class=""></i></button></td>
                    <td><button class="p-2 w-16 h-16 sm:w-32 sm:h-32 lg:w-36 lg:h-36 2xl:w-44 2xl:h-44 btn-value" @click="pushValue(3)"><i class=""></i></button></td>
                </tr>
                <tr class="divide-x-2 lg:divide-x-4 2xl:divide-x-6 divide-[#eff6ee]/[0.94]">
                    <td><button class="p-2 w-16 h-16 sm:w-32 sm:h-32 lg:w-36 lg:h-36 2xl:w-44 2xl:h-44 btn-value" @click="pushValue(4)"><i class=""></i></button></td>
                    <td><button class="p-2 w-16 h-16 sm:w-32 sm:h-32 lg:w-36 lg:h-36 2xl:w-44 2xl:h-44 btn-value" @click="pushValue(5)"><i class=""></i></button></td>
                    <td><button class="p-2 w-16 h-16 sm:w-32 sm:h-32 lg:w-36 lg:h-36 2xl:w-44 2xl:h-44 btn-value" @click="pushValue(6)"><i class=""></i></button></td>
                </tr>
                <tr class="divide-x-2 lg:divide-x-4 2xl:divide-x-6 divide-[#eff6ee]/[0.94]">
                    <td><button class="p-2 w-16 h-16 sm:w-32 sm:h-32 lg:w-36 lg:h-36 2xl:w-44 2xl:h-44 btn-value" @click="pushValue(7)"><i class=""></i></button></td>
                    <td><button class="p-2 w-16 h-16 sm:w-32 sm:h-32 lg:w-36 lg:h-36 2xl:w-44 2xl:h-44 btn-value" @click="pushValue(8)"><i class=""></i></button></td>
                    <td><button class="p-2 w-16 h-16 sm:w-32 sm:h-32 lg:w-36 lg:h-36 2xl:w-44 2xl:h-44 btn-value" @click="pushValue(9)"><i class=""></i></button></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped>

</style>