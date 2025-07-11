<!-- filepath: c:\laragon\www\anas_law_website\frontend\src\components\Testimonials.vue -->
<template>
  <div class="py-5 bg-[#F6F9E1]">
    <div
      class="container flex flex-col items-center justify-center w-full p-6 mx-auto text-center xl:px-0"
    >
      <div class="text-sm font-bold tracking-wider text-indigo-600 uppercase">
        {{ $t('testimonials.badge') }}
      </div>
      <h2
        class="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl"
      >
        {{ $t('testimonials.title') }}
      </h2>
      <p
        class="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl"
      >
        {{ $t('testimonials.description') }}
      </p>
    </div>
    <div class="container p-6 mx-auto mb-10 xl:px-0">
      <div class="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div class="lg:col-span-2 xl:col-auto">
          <div
            class="flex flex-col justify-between w-full h-full px-6 py-6 bg-white shadow-md md:px-14 rounded-2xl md:py-14"
            data-aos="fade-zoom-in"
          >
            <p class="text-2xl leading-normal text-gray-700">
              {{ $t('testimonials.clients.fadhli.review').split($t('testimonials.clients.fadhli.highlight1'))[0] }}
              <mark
                class="mx-1 text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4"
                >{{ $t('testimonials.clients.fadhli.highlight1') }}</mark
              >
              {{ $t('testimonials.clients.fadhli.review').split($t('testimonials.clients.fadhli.highlight1'))[1].split($t('testimonials.clients.fadhli.highlight2'))[0] }}
              <mark
                class="mx-1 text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4"
                >{{ $t('testimonials.clients.fadhli.highlight2') }}</mark
              >
              {{ $t('testimonials.clients.fadhli.review').split($t('testimonials.clients.fadhli.highlight2'))[1] }}
            </p>
            <div class="flex items-center mt-8 space-x-3">
              <div class="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                <img
                  alt="Avatar"
                  src="../assets/images/icons/fadhli.jpg"
                  loading="lazy"
                />
              </div>
              <div>
                <div class="text-lg font-medium text-gray-800">
                  {{ $t('testimonials.clients.fadhli.name') }}
                </div>
                <div class="text-gray-500">{{ $t('testimonials.clients.fadhli.position') }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div
            class="flex flex-col justify-between w-full h-full px-6 py-6 bg-white shadow-md md:px-14 rounded-2xl md:py-14"
            data-aos="fade-zoom-in"
          >
            <p class="text-2xl leading-normal text-gray-700">
              {{ $t('testimonials.clients.dylan.review').split($t('testimonials.clients.dylan.highlight1'))[0] }}
              <mark
                class="mx-1 text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4"
                >{{ $t('testimonials.clients.dylan.highlight1') }}</mark
              >
              {{ $t('testimonials.clients.dylan.review').split($t('testimonials.clients.dylan.highlight1'))[1] }}
            </p>
            <div class="flex items-center mt-8 space-x-3">
              <div class="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                <img
                  alt="Avatar"
                  src="../assets/images/icons/Frieren.jpeg"
                  loading="lazy"
                />
              </div>
              <div>
                <div class="text-lg font-medium text-gray-800">
                  {{ $t('testimonials.clients.dylan.name') }}
                </div>
                <div class="text-gray-500">{{ $t('testimonials.clients.dylan.position') }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div
            class="flex flex-col justify-between w-full h-full px-6 py-6 bg-white shadow-md md:px-14 rounded-2xl md:py-14"
            data-aos="fade-zoom-in"
          >
            <p class="text-2xl leading-normal text-gray-700">
              {{ $t('testimonials.clients.gabrielle.review').split($t('testimonials.clients.gabrielle.highlight1'))[0] }}
              <mark
                class="mx-1 text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4"
                >{{ $t('testimonials.clients.gabrielle.highlight1') }}</mark
              >
              {{ $t('testimonials.clients.gabrielle.review').split($t('testimonials.clients.gabrielle.highlight1'))[1] }}
            </p>
            <div class="flex items-center mt-8 space-x-3">
              <div class="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                <img
                  alt="Avatar"
                  src="../assets/images/icons/Frieren.jpeg"
                  loading="lazy"
                />
              </div>
              <div>
                <div class="text-lg font-medium text-gray-800">
                  {{ $t('testimonials.clients.gabrielle.name') }}
                </div>
                <div class="text-gray-500">{{ $t('testimonials.clients.gabrielle.position') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>
<style scoped></style>
