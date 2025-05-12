<template>
  <div
    class="px-4 py-16 mx-auto max-w-7xl md:px-8 lg:py-20 bg-gradient-to-b from-green-50 via-white to-white rounded-2xl shadow-inner"
  >
    <div class="max-w-xl mb-12 mx-auto text-center lg:max-w-2xl">
      <h2
        class="max-w-lg mb-4 font-sans text-4xl font-extrabold leading-tight tracking-tight text-green-700 sm:text-5xl mx-auto relative"
      >
        <span class="relative inline-block">
          <svg
            viewBox="0 0 52 24"
            fill="currentColor"
            class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-green-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
          >
            <defs>
              <pattern
                id="fdca20a0-aeb4-4caf-ba1b-4351eee42363"
                x="0"
                y="0"
                width=".135"
                height=".30"
              >
                <circle cx="1" cy="1" r=".7"></circle>
              </pattern>
            </defs>
            <rect
              fill="url(#fdca20a0-aeb4-4caf-ba1b-4351eee42363)"
              width="52"
              height="24"
            ></rect>
          </svg>
          <span class="relative">Our</span>
        </span>
        Services
      </h2>
      <p class="text-gray-500 text-lg mt-2">
        Layanan hukum profesional, terpercaya, dan solutif untuk kebutuhan Anda.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        class="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-green-100 group"
      >
        <div
          class="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-green-100 group-hover:bg-green-500 transition"
        >
          <font-awesome-icon
            :icon="['fas', 'globe']"
            class="text-green-500 group-hover:text-white text-4xl transition"
          />
        </div>
        <h6
          class="mb-2 font-semibold leading-6 text-center text-green-700 text-lg"
        >
          Dampingan Hukum
        </h6>
        <p class="mb-6 text-sm text-gray-600 text-center">
          Menyediakan pendampingan hukum di dalam maupun di luar pengadilan
          (litigasi dan non-litigasi) guna menyelesaikan permasalahan dengan
          prinsip solusi saling menguntungkan (win-win solution).
        </p>
        <a
          href="/"
          aria-label=""
          class="inline-flex items-center font-semibold transition-colors duration-200 text-green-600 hover:text-green-800"
          >Learn more
          <svg
            class="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>

      <div
        class="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-green-100 group"
      >
        <div
          class="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-green-100 group-hover:bg-green-500 transition"
        >
          <font-awesome-icon
            :icon="['fas', 'magnifying-glass']"
            class="text-green-500 group-hover:text-white text-4xl transition"
          />
        </div>
        <h6
          class="mb-2 font-semibold leading-6 text-center text-green-700 text-lg"
        >
          Legal Research
        </h6>
        <p class="mb-6 text-sm text-gray-600 text-center">
          Mengadakan penelitian hukum yang komprehensif dan mendalam untuk
          mendukung berbagai kepentingan hukum, baik untuk kepentingan litigasi
          maupun non-litigasi, termasuk penelitian hukum untuk kepentingan
          akademis.
        </p>
        <a
          href="/"
          aria-label=""
          class="inline-flex items-center font-semibold transition-colors duration-200 text-green-600 hover:text-green-800"
          >Learn more
          <svg
            class="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>

      <div
        class="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-green-100 group"
      >
        <div
          class="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-green-100 group-hover:bg-green-500 transition"
        >
          <font-awesome-icon
            :icon="['fas', 'book']"
            class="text-green-500 group-hover:text-white text-4xl transition"
          />
        </div>
        <h6
          class="mb-2 font-semibold leading-6 text-center text-green-700 text-lg"
        >
          Legal Audit
        </h6>
        <p class="mb-6 text-sm text-gray-600 text-center">
          Legal audit atau legal due diligence (LDD) merupakan kegiatan
          pemeriksaan hukum secara seksama yang dilakukan konsultan hukum
          terhadap perusahaan atau objek transaksi sesuai tujuan.
        </p>
        <a
          href="/"
          aria-label=""
          class="inline-flex items-center font-semibold transition-colors duration-200 text-green-600 hover:text-green-800"
          >Learn more
          <svg
            class="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>

      <div
        class="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-green-100 group"
      >
        <div
          class="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-green-100 group-hover:bg-green-500 transition"
        >
          <font-awesome-icon
            :icon="['fas', 'scale-balanced']"
            class="text-green-500 group-hover:text-white text-4xl transition"
          />
        </div>
        <h6
          class="mb-2 font-semibold leading-6 text-center text-green-700 text-lg"
        >
          Legal Consultant
        </h6>
        <p class="mb-6 text-sm text-gray-600 text-center">
          Memberikan pendapat hukum profesional yang tepat untuk berbagai isu
          hukum, berikut analisa dan solusi yang diperlukan dalam penyelesaian
          permasalahan hukum.
        </p>
        <a
          href="/"
          aria-label=""
          class="inline-flex items-center font-semibold transition-colors duration-200 text-green-600 hover:text-green-800"
          >Learn more
          <svg
            class="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
  <!-- End Services -->
</template>

<script></script>

<style scoped></style>
