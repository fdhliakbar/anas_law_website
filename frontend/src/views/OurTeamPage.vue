<script setup lang="ts">
import { ref, computed } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

// Team members data
const teamMembers = ref([
  {
    id: 1,
    name: 'Alexander Mitchell',
    position: 'Senior Partner',
    specialty: 'Corporate Law',
    image: '/src/assets/images/2.jpg',
    education: 'J.D., Harvard Law School',
    experience: '20+ years',
    description: 'Alexander leads our corporate practice with extensive experience in mergers & acquisitions, corporate governance, and securities regulation. He has represented major clients in complex transactions across various industries.',
    email: 'alexander@anaslawfirm.com',
    phone: '+62 812 3456 7890',
    socialMedia: {
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/'
    },
    featured: true,
    categories: ['corporate', 'banking']
  },
  {
    id: 2,
    name: 'Sophia Rahman',
    position: 'Managing Partner',
    specialty: 'Litigation',
    image: '/src/assets/images/2.jpg',
    education: 'J.D., Yale Law School',
    experience: '15+ years',
    description: 'Sophia is a skilled litigator with a proven track record in high-stakes commercial disputes. She specializes in complex litigation, arbitration, and has successfully represented clients in various international forums.',
    email: 'sophia@anaslawfirm.com',
    phone: '+62 812 3456 7891',
    socialMedia: {
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/'
    },
    featured: true,
    categories: ['litigation', 'dispute']
  },
  {
    id: 3,
    name: 'David Wijaya',
    position: 'Partner',
    specialty: 'Tax Law',
    image: '/src/assets/images/2.jpg',
    education: 'J.D., University of Indonesia',
    experience: '12+ years',
    description: 'David specializes in tax planning, compliance, and controversy. He helps businesses navigate complex tax regulations and represents clients in tax disputes with government authorities.',
    email: 'david@anaslawfirm.com',
    phone: '+62 812 3456 7892',
    socialMedia: {
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/'
    },
    featured: false,
    categories: ['tax', 'corporate']
  },
  {
    id: 4,
    name: 'Emma Kusuma',
    position: 'Partner',
    specialty: 'Intellectual Property',
    image: '/src/assets/images/2.jpg',
    education: 'J.D., Stanford Law School',
    experience: '10+ years',
    description: 'Emma specializes in all aspects of intellectual property law, including patents, trademarks, and copyright protection. She has extensive experience protecting the IP assets of technology companies and creative professionals.',
    email: 'emma@anaslawfirm.com',
    phone: '+62 812 3456 7893',
    socialMedia: {
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/'
    },
    featured: false,
    categories: ['intellectual-property', 'technology']
  },
  {
    id: 5,
    name: 'James Santoso',
    position: 'Partner',
    specialty: 'Real Estate Law',
    image: '/src/assets/images/2.jpg',
    education: 'J.D., Columbia Law School',
    experience: '14+ years',
    description: 'James focuses on real estate transactions, development projects, and property disputes. He has handled major commercial and residential developments throughout Indonesia and Southeast Asia.',
    email: 'james@anaslawfirm.com',
    phone: '+62 812 3456 7894',
    socialMedia: {
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/'
    },
    featured: false,
    categories: ['real-estate', 'property']
  },
  {
    id: 6,
    name: 'Amelia Haryanto',
    position: 'Partner',
    specialty: 'Family Law',
    image: '/src/assets/images/2.jpg',
    education: 'J.D., University of Chicago Law School',
    experience: '11+ years',
    description: 'Amelia specializes in all aspects of family law, including divorce, child custody, and matrimonial asset division. She approaches each case with sensitivity and a commitment to achieving fair outcomes for families.',
    email: 'amelia@anaslawfirm.com',
    phone: '+62 812 3456 7895',
    socialMedia: {
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/'
    },
    featured: false,
    categories: ['family', 'matrimonial']
  },
  {
    id: 7,
    name: 'Michael Sutanto',
    position: 'Senior Associate',
    specialty: 'Banking & Finance',
    image: '/src/assets/images/2.jpg',
    education: 'J.D., New York University School of Law',
    experience: '8+ years',
    description: 'Michael specializes in banking and finance law, advising financial institutions and borrowers on complex financing transactions, regulatory compliance, and restructuring matters.',
    email: 'michael@anaslawfirm.com',
    phone: '+62 812 3456 7896',
    socialMedia: {
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/'
    },
    featured: false,
    categories: ['banking', 'finance']
  },
  {
    id: 8,
    name: 'Sarah Gunawan',
    position: 'Senior Associate',
    specialty: 'Labor & Employment',
    image: '/src/assets/images/2.jpg',
    education: 'J.D., Georgetown University Law Center',
    experience: '7+ years',
    description: 'Sarah advises employers and executives on employment matters, including labor disputes, employment contracts, terminations, and workplace compliance issues across multiple industries.',
    email: 'sarah@anaslawfirm.com',
    phone: '+62 812 3456 7897',
    socialMedia: {
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/'
    },
    featured: false,
    categories: ['labor', 'employment']
  }
]);

// Available filter categories
const categories = [
  { id: 'all', name: 'All Practice Areas' },
  { id: 'corporate', name: 'Corporate Law' },
  { id: 'litigation', name: 'Litigation' },
  { id: 'tax', name: 'Tax Law' },
  { id: 'intellectual-property', name: 'Intellectual Property' },
  { id: 'real-estate', name: 'Real Estate' },
  { id: 'banking', name: 'Banking & Finance' },
  { id: 'family', name: 'Family Law' },
  { id: 'labor', name: 'Labor & Employment' },
];

// Active filter
const activeFilter = ref('all');

// Selected team member for modal
const selectedMember = ref(null);
const isModalOpen = ref(false);

// Filtered team members
const filteredTeamMembers = computed(() => {
  if (activeFilter.value === 'all') {
    return teamMembers.value;
  }
  return teamMembers.value.filter(member => 
    member.categories.includes(activeFilter.value)
  );
});

// Set active filter
const setFilter = (filter) => {
  activeFilter.value = filter;
};

// Open member detail modal
const openMemberModal = (member) => {
  selectedMember.value = member;
  isModalOpen.value = true;
  document.body.classList.add('overflow-hidden');
};

// Close member detail modal
const closeMemberModal = () => {
  isModalOpen.value = false;
  document.body.classList.remove('overflow-hidden');
};
</script>

<template>
  <Header />
  
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-indigo-600 to-blue-500 py-20 text-white relative overflow-hidden">
    <div class="absolute inset-0 bg-black opacity-20"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Our Legal Team</h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto">
          Meet our accomplished attorneys who are dedicated to providing exceptional legal services
        </p>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 w-full h-20 bg-white" style="clip-path: polygon(0 100%, 100% 100%, 100% 0);"></div>
  </section>
  
  <!-- Team Introduction -->
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Legal Excellence & Expertise
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Our team of experienced attorneys combines deep legal knowledge with a commitment to client success. 
          With diverse backgrounds and specialized expertise, we provide comprehensive legal solutions tailored to your needs.
        </p>
      </div>
      
      <!-- Featured Attorneys -->
      <div class="mb-20">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">Senior Partners</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div v-for="member in teamMembers.filter(m => m.featured)" :key="member.id" 
               class="flex flex-col md:flex-row items-center md:items-start gap-8 bg-gray-50 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
            <div class="w-40 h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-md">
              <img :src="member.image" :alt="member.name" class="w-full h-full object-cover" 
                   onerror="this.src='/src/assets/images/team/default-attorney.jpg'">
            </div>
            <div class="flex-grow text-center md:text-left">
              <h4 class="text-xl font-bold text-gray-900">{{ member.name }}</h4>
              <p class="text-indigo-600 font-medium mb-2">{{ member.position }}</p>
              <p class="text-gray-700 mb-2">{{ member.specialty }}</p>
              <p class="text-gray-600 mb-4">{{ member.education }}</p>
              <p class="text-gray-600 mb-6 line-clamp-3">{{ member.description }}</p>
              <button @click="openMemberModal(member)" 
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300">
                View Profile
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Filter Categories -->
      <div class="mb-10">
        <div class="flex flex-wrap justify-center gap-3">
          <button v-for="category in categories" :key="category.id"
                  @click="setFilter(category.id)"
                  class="px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300"
                  :class="activeFilter === category.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'">
            {{ category.name }}
          </button>
        </div>
      </div>
      
      <!-- Team Members Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-for="member in filteredTeamMembers" :key="member.id" 
             class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="h-64 overflow-hidden">
            <img :src="member.image" :alt="member.name" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                 onerror="this.src='/src/assets/images/team/default-attorney.jpg'">
          </div>
          <div class="p-6">
            <h3 class="text-lg font-bold text-gray-900">{{ member.name }}</h3>
            <p class="text-indigo-600 font-medium mb-1">{{ member.position }}</p>
            <p class="text-gray-700 mb-4">{{ member.specialty }}</p>
            <div class="flex space-x-3 mb-4">
              <a :href="member.socialMedia.linkedin" target="_blank" class="text-gray-500 hover:text-indigo-600">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a :href="member.socialMedia.twitter" target="_blank" class="text-gray-500 hover:text-indigo-600">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a :href="`mailto:${member.email}`" class="text-gray-500 hover:text-indigo-600">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
            <button @click="openMemberModal(member)" 
                    class="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300">
              View Profile
            </button>
          </div>
        </div>
      </div>
      
      <!-- No results message -->
      <div v-if="filteredTeamMembers.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-gray-900">No team members found</h3>
        <p class="mt-1 text-gray-500">Try selecting a different practice area.</p>
      </div>
    </div>
  </section>
  
  <!-- Join Our Team Section -->
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl shadow-xl overflow-hidden">
        <div class="px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl font-extrabold text-white">
              Join Our Legal Team
            </h2>
            <p class="mt-4 text-lg text-indigo-100">
              We're always looking for talented attorneys and legal professionals to join our growing team.
              If you're passionate about law and client service, we'd love to hear from you.
            </p>
            <div class="mt-8">
              <a href="#" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                View Career Opportunities
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Attorney Detail Modal -->
  <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="attorney-modal" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeMemberModal"></div>
      
      <!-- Modal content -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
        <button @click="closeMemberModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div class="bg-white p-6 sm:p-8">
          <div class="flex flex-col md:flex-row gap-8">
            <div class="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-indigo-50 shadow-md mx-auto md:mx-0">
              <img :src="selectedMember?.image" :alt="selectedMember?.name" class="w-full h-full object-cover"
                   onerror="this.src='/src/assets/images/team/default-attorney.jpg'">
            </div>
            <div class="flex-grow">
              <h3 class="text-2xl font-bold text-gray-900">{{ selectedMember?.name }}</h3>
              <p class="text-lg text-indigo-600 font-medium mb-2">{{ selectedMember?.position }}</p>
              <p class="text-gray-700 mb-2"><span class="font-medium">Practice Area:</span> {{ selectedMember?.specialty }}</p>
              <p class="text-gray-700 mb-2"><span class="font-medium">Education:</span> {{ selectedMember?.education }}</p>
              <p class="text-gray-700 mb-4"><span class="font-medium">Experience:</span> {{ selectedMember?.experience }}</p>
              
              <div class="flex space-x-4 mb-6">
                <a :href="`mailto:${selectedMember?.email}`" class="flex items-center text-gray-700 hover:text-indigo-600">
                  <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {{ selectedMember?.email }}
                </a>
                <a :href="`tel:${selectedMember?.phone}`" class="flex items-center text-gray-700 hover:text-indigo-600">
                  <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {{ selectedMember?.phone }}
                </a>
              </div>
              
              <div class="flex space-x-3 mb-6">
                <a :href="selectedMember?.socialMedia.linkedin" target="_blank" 
                   class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-600 transition-colors">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a :href="selectedMember?.socialMedia.twitter" target="_blank" 
                   class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-600 transition-colors">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div class="mt-6 border-t border-gray-200 pt-6">
            <h4 class="text-lg font-medium text-gray-900 mb-4">About {{ selectedMember?.name }}</h4>
            <p class="text-gray-700 whitespace-pre-line">{{ selectedMember?.description }}</p>
          </div>
          
          <div class="mt-8 flex justify-end">
            <button @click="closeMemberModal" 
                    class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Close
            </button>
            <a :href="`mailto:${selectedMember?.email}`" 
               class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Contact {{ selectedMember?.name.split(' ')[0] }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <Footer />
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  /* -webkit-line-clamp: 3; */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animation for card hover */
.transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.hover\:-translate-y-1:hover {
  --tw-translate-y: -0.25rem;
  transform: var(--tw-transform);
}
</style>