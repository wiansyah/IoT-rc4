<script setup lang="ts">
import { ref } from "vue";
import { database } from "@/firebase";
import { ref as rtdb, onValue } from "firebase/database";
import { rc4 } from "@/library/rc4";

const enc = ref();
const text = ref();
const key = ref('Bambang Fitriadi Wiansyah');
const temperature = ref();
const humidity = ref();
const timestamp = ref();

const path = rtdb(database, "/");
onValue(path, (Snapshot) => {
    const snapshot = Snapshot.val()
    const { encrypt, decrypt, suhu, kelembaban } = rc4(snapshot.data, key.value);
    enc.value = encrypt;
    text.value = decrypt;
    temperature.value = suhu;
    humidity.value = kelembaban;
	timestamp.value = snapshot.timestamp
})
</script>

<template>
    <main class="flex flex-col justify-center flex-grow bg-stone-700">
		<div class="container flex flex-col gap-4 p-4 mx-auto">
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<div :class="(enc) ? 'bg-teal-700' : 'bg-teal-800'" class="component">
					<div class="bg-teal-500 icon"></div>
					<p class="">Data Logged</p>
					<h4 class=""></h4>
				</div>

                <div :class="(text) ? 'bg-green-700':'bg-gray-600'" class="component">
					<div class="bg-green-500 icon"></div>
					<p class="">Status</p>
					<h4 class=""></h4>
				</div>
				
				<div :class="(temperature) ? 'bg-red-700':'bg-red-800'" class="component">
					<div class="bg-red-500 icon"></div>
					<p class="">Temperature</p>
					<h4 class="">{{ (temperature) ? `${temperature}℃` : "" }}</h4>
				</div>
				
				<div :class="(humidity) ? 'bg-blue-700':'bg-blue-800'" class="component">
					<div class="bg-blue-500 icon"></div>
					<p>Humidity</p>
					<h4 class="">{{ (humidity) ? `${humidity}%` : "" }}</h4>
				</div>
			</div>

			<div class="grid gap-4 md:grid-cols-2">
				<div :class="(enc) ? 'bg-gray-600' : 'bg-gray-800'" class="component">
					<div class="bg-gray-500 icon"></div>
					<p class="">Data Encrypted</p>
					<h4 class="font-mono ">{{ enc ?? "" }}</h4>
				</div>
				
				<div :class="(text) ? 'bg-gray-600':'bg-gray-800'" class="component">
					<div class="bg-gray-500 icon"></div>
					<p class="">Data Decrypted</p>
					<h4 class="font-mono ">{{ text ?? "" }}</h4>
				</div>
			</div>

			<div class="grid gap-4">
				<div :class="(enc) ? 'bg-green-700' : 'bg-green-800'" class="component">
					<div class="bg-green-500 icon"></div>
					<p class="">Last Updated</p>
					<h4 class="">{{ timestamp ?? "" }}</h4>
				</div>
			</div>
		</div>
	</main>
</template>

<style scoped>
.component {
	@apply p-4 transition-colors duration-300 rounded-lg flex flex-col items-center justify-center relative overflow-hidden;
}

.icon {
	@apply absolute w-10 lg:w-12 aspect-square rounded-br-3xl top-0 left-0;
}

main > div > div {
    @apply lg:h-36;
}

p {
	@apply text-xl font-light underline underline-offset-4;
}

div > h4 {
	@apply text-2xl lg:text-4xl font-semibold;
}
</style>