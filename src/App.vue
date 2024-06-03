<template>
  <div class="flex justify-center min-h-screen bg-primary text-white font-sans">
    <div class="w-screen px-8 sm:w-[500px] bg-primary py-6 flex flex-col gap-4">

      <!-- Header -->
      <div class="flex flex-col gap-1 text-center">
        <h1
          class="bg-gradient-to-r from-secondary to-tertiary text-transparent bg-clip-text animate-gradient text-5xl font-bold bg-300% h-[60px]">
          Cryptography
        </h1>
        <p class="text-2xl font-medium text-gray-400">Tugas Besar JKI</p>
      </div>
      <!--  -->

      <!-- Algoritma -->
      <div class="mt-4">
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <p class="text-lg font-medium">Pilih Algoritma</p>
        <div class="grid grid-cols-3 gap-8 mt-3">
          <label
            :class="['border px-4 py-2 cursor-pointer rounded-md border-none transition-all flex justify-center items-center font-semibold', { 'bg-[#3b82f6] text-white': algorithm === 'AES', 'bg-[#192c51] text-[#3b82f6]': algorithm !== 'AES' }]"
            for="AES">
            AES
            <input type="radio" name="algorithm" id="AES" value="AES" v-model="algorithm" class="hidden" />
          </label>
          <label
            :class="['border px-4 py-2 cursor-pointer rounded-md border-none transition-all flex justify-center items-center font-semibold', { 'bg-[#3b82f6] text-white': algorithm === '3DES', 'bg-[#192c51] text-[#3b82f6]': algorithm !== '3DES' }]"
            for="3DES">
            3DES
            <input type="radio" name="algorithm" id="3DES" value="3DES" v-model="algorithm" class="hidden" />
          </label>
          <label
            :class="['border px-4 py-2 cursor-pointer rounded-md border-none transition-all flex justify-center items-center font-semibold', { 'bg-[#3b82f6] text-white': algorithm === 'RSA', 'bg-[#192c51] text-[#3b82f6]': algorithm !== 'RSA' }]"
            for="RSA">
            RSA
            <input type="radio" name="algorithm" id="RSA" value="RSA" v-model="algorithm" class="hidden" />
          </label>
        </div>
      </div>
      <!--  -->

      <!-- Aksi -->
      <div>
        <p class="text-lg font-medium">Pilih Aksi</p>
        <div class="grid grid-cols-2 gap-8 mt-3">
          <label
            :class="['border px-4 py-2 cursor-pointer rounded-md border-none transition-all flex justify-center items-center font-semibold', { 'bg-[#3b82f6] text-white': action === 'encryption', 'bg-[#192c51] text-[#3b82f6]': action !== 'encryption' }]"
            for="encryption">
            Enkripsi
            <input type="radio" name="action" id="encryption" value="encryption" v-model="action" class="hidden" />
          </label>
          <label
            :class="['border px-4 py-2 cursor-pointer rounded-md border-none transition-all flex justify-center items-center font-semibold', { 'bg-[#3b82f6] text-white': action === 'decryption', 'bg-[#192c51] text-[#3b82f6]': action !== 'decryption' }]"
            for="decryption">
            Dekripsi
            <input type="radio" name="action" id="decryption" value="decryption" v-model="action" class="hidden" />
          </label>
        </div>
      </div>
      <!--  -->

      <!-- Input -->
      <div class="flex flex-col gap-2">
        <div>
          <p class="text-lg font-medium">Data</p>
          <input type="text" v-model="data" class="rounded-md h-12 w-full mt-3 text-black px-2 font-medium" />
        </div>
        <div v-if="algorithm !== 'RSA' || action === 'decryption'">
          <p class="text-lg font-medium">Key</p>
          <input type="text" v-model="key" class="rounded-md h-12 w-full mt-3 text-black px-2 font-medium" />
        </div>
      </div>
      <!--  -->

      <!-- Generate Button -->
      <div class="mt-1">
        <button v-if="action === 'encryption'" @click="handleEncrypt"
          class="bg-gradient-to-br from-secondary to-tertiary text-white w-full font-semibold px-4 py-2 h-12 rounded-md hover:brightness-95 transition-all">GENERATE</button>
        <button v-else-if="action === 'decryption'" @click="handleDecrypt"
          class="bg-gradient-to-br from-secondary to-tertiary text-white w-full font-semibold px-4 py-2 h-12 rounded-md hover:brightness-95 transition-all">GENERATE</button>
      </div>
      <!--  -->

      <!-- Hasil -->
      <div v-if="dataResult" class="flex flex-col gap-2 mt-2">
        <p class="text-lg font-medium">Hasil</p>
        <div class="w-full border rounded-md p-4 flex-col">
          <p class="break-all">
            {{ dataResult }}
          </p>

          <p v-if="dataKey" class="break-all mt-8">
            <span class="font-bold"> Key : </span> <br> {{ dataKey }}
          </p>
        </div>
      </div>
      <!--  -->

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dataResult: null,
      dataKey: "",
      key: "",
      data: "",
      algorithm: "",
      errorMessage: null,
      action: "",
    };
  },
  methods: {
    async handleEncrypt() {
      try {
        const response = await axios.get(
          `https://tubes-three.vercel.app/${this.action}/${this.algorithm}?key=${this.key}&data=${this.data}`
        );
        if (this.algorithm === "RSA") {
          this.dataResult = response.data.data;
          this.dataKey = response.data.key;
        } else {
          this.dataResult = response.data.data;
        }
        this.errorMessage = null;
      } catch (error) {
        console.error("Gagal melakukan enkripsi", error);
        this.errorMessage = "Gagal melakukan enkripsi: " + error.message;
      }
    },
    async handleDecrypt() {
      try {
        const response = await axios.get(
          `https://tubes-three.vercel.app/${this.action}/${this.algorithm}?key=${this.key}&data=${this.data}`
        );
        this.dataResult = response.data;
        this.dataKey = null
        this.errorMessage = null;
      } catch (error) {
        console.error("Gagal melakukan dekripsi", error);
        this.errorMessage = "Gagal melakukan dekripsi: " + error.message;
      }
    },
  },
};  
</script>