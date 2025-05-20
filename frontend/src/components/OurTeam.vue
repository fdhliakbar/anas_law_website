<template>
  <section class="bg-white py-12" id="team">
    <div class="max-w-5xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-2">
        Meet Our Attorneys
      </h2>
      <p class="text-gray-500 text-center mb-10">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum
      </p>
      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div
          v-for="member in team"
          :key="member.name"
          class="bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center"
        >
          <img
            :src="member.image"
            :alt="member.name"
            class="w-24 h-28 object-cover rounded-md mb-4 bg-gray-200"
          />
          <h3 class="font-semibold text-lg">{{ member.name }}</h3>
          <p class="text-sm text-gray-500 mb-2">{{ member.role }}</p>
          <div class="flex space-x-3 mt-2" v-if="member.social">
            <a
              v-for="(url, icon) in member.social"
              :key="icon"
              :href="url"
              target="_blank"
              rel="noopener"
              class="text-gray-400 hover:text-blue-600 text-xl"
            >
              <i :class="`fab fa-${icon}`"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "OurTeam",
  data() {
    return {
      team: [
        {
          name: "Helen Ederson",
          role: "Family Lawyer",
          image: new URL("@/assets/images/cofounder.jpg", import.meta.url).href,
          social: {
            twitter: "#",
            linkedin: "#",
          },
        },
        {
          name: "Jonson Leo",
          role: "Criminal Lawyer",
          image: new URL("@/assets/images/cofounder.jpg", import.meta.url).href,
          social: {
            twitter: "#",
            linkedin: "#",
          },
        },
        {
          name: "Armor Byron",
          role: "Civil Lawyer",
          image: new URL("@/assets/images/cofounder.jpg", import.meta.url).href,
          social: {
            twitter: "#",
            linkedin: "#",
          },
        },
      ],
    };
  },
};
</script>
