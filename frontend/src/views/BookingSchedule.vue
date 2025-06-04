<template>
  <div class="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
    <transition name="fade" mode="out-in">
      <div v-if="step === 1" key="step1">
        <h2 class="text-2xl font-bold mb-4">Select Consultation Type</h2>
        <select
          v-model="selectedType"
          class="block w-full mb-4 p-2 border rounded"
        >
          <option disabled value="">Choose type...</option>
          <option v-for="type in consultationTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
        <select
          v-model="selectedDuration"
          class="block w-full mb-4 p-2 border rounded"
        >
          <option disabled value="">Choose duration...</option>
          <option
            v-for="duration in durations"
            :key="duration.value"
            :value="duration.value"
          >
            {{ duration.label }}
          </option>
        </select>
        <button
          :disabled="!selectedType || !selectedDuration"
          @click="step++"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>

      <div v-else-if="step === 2" key="step2">
        <h2 class="text-2xl font-bold mb-4">Select a Lawyer</h2>
        <div
          v-for="lawyer in filteredLawyers"
          :key="lawyer.id"
          class="mb-4 p-4 border rounded flex justify-between items-center"
        >
          <div>
            <div class="font-semibold">{{ lawyer.name }}</div>
            <div class="text-sm text-gray-500">{{ lawyer.specialty }}</div>
          </div>
          <button
            @click="selectLawyer(lawyer)"
            class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
          >
            Select
          </button>
        </div>
        <button @click="step--" class="text-blue-600 underline">Back</button>
      </div>

      <div v-else-if="step === 3" key="step3">
        <h2 class="text-2xl font-bold mb-4">Select Date & Time</h2>
        <div v-if="selectedLawyer">
          <div class="mb-2 font-semibold">
            {{ selectedLawyer.name }}'s Availability:
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="slot in availableSlots"
              :key="slot"
              :disabled="!isSlotAvailable(slot)"
              @click="selectSlot(slot)"
              :class="[
                'px-3 py-2 rounded transition',
                selectedSlot === slot
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-blue-100',
                !isSlotAvailable(slot) ? 'opacity-50 cursor-not-allowed' : '',
              ]"
            >
              {{ slot }}
            </button>
          </div>
        </div>
        <button @click="step--" class="text-blue-600 underline mt-4">
          Back
        </button>
      </div>

      <div v-else-if="step === 4" key="step4">
        <h2 class="text-2xl font-bold mb-4">Confirm Booking</h2>
        <div class="mb-2">
          Type: <span class="font-semibold">{{ selectedType }}</span>
        </div>
        <div class="mb-2">
          Duration:
          <span class="font-semibold">{{ selectedDuration }} minutes</span>
        </div>
        <div class="mb-2">
          Lawyer: <span class="font-semibold">{{ selectedLawyer.name }}</span>
        </div>
        <div class="mb-2">
          Date & Time: <span class="font-semibold">{{ selectedSlot }}</span>
        </div>
        <div class="mb-4">
          Fee: <span class="font-semibold">${{ selectedLawyer.fee }}</span>
        </div>
        <button
          @click="confirmBooking"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Confirm
        </button>
        <button @click="step--" class="text-blue-600 underline ml-4">
          Back
        </button>
      </div>

      <div v-else-if="step === 5" key="step5">
        <h2 class="text-2xl font-bold mb-4 text-green-600">
          Booking Confirmed!
        </h2>
        <div class="mb-2">Thank you for your booking.</div>
        <button @click="reset" class="text-blue-600 underline">
          Book Another
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const step = ref(1);
const consultationTypes = [
  "Civil",
  "Criminal",
  "Family Law",
  "Corporate",
  "Immigration",
];
const durations = [
  { label: "30 minutes", value: 30 },
  { label: "1 hour", value: 60 },
];
const selectedType = ref("");
const selectedDuration = ref("");
const selectedLawyer = ref(null);
const selectedSlot = ref("");

// Dummy data for lawyers and their availability
const lawyers = [
  {
    id: 1,
    name: "John Doe",
    specialty: "Civil",
    fee: 100,
    availability: ["2024-06-10 10:00", "2024-06-10 11:00", "2024-06-11 14:00"],
  },
  {
    id: 2,
    name: "Jane Smith",
    specialty: "Criminal",
    fee: 120,
    availability: ["2024-06-10 09:00", "2024-06-12 15:00"],
  },
  {
    id: 3,
    name: "Ahmed Ali",
    specialty: "Family Law",
    fee: 110,
    availability: ["2024-06-11 10:00", "2024-06-13 13:00"],
  },
];

const filteredLawyers = computed(() =>
  lawyers.filter((lawyer) => lawyer.specialty === selectedType.value)
);

const availableSlots = computed(() =>
  selectedLawyer.value ? selectedLawyer.value.availability : []
);

const bookedSlots = ref([]);

function selectLawyer(lawyer) {
  selectedLawyer.value = lawyer;
  selectedSlot.value = "";
  step.value++;
}

function selectSlot(slot) {
  selectedSlot.value = slot;
  step.value++;
}

function isSlotAvailable(slot) {
  return !bookedSlots.value.includes(`${selectedLawyer.value.id}-${slot}`);
}

function confirmBooking() {
  bookedSlots.value.push(`${selectedLawyer.value.id}-${selectedSlot.value}`);
  step.value++;
}

function reset() {
  step.value = 1;
  selectedType.value = "";
  selectedDuration.value = "";
  selectedLawyer.value = null;
  selectedSlot.value = "";
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
