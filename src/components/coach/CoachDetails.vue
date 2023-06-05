<template>
  <div class="container flex-column">
    <h1 class="heading-primary">Coach Details</h1>
    <base-spinner v-if="isLoading"></base-spinner>
    <div v-else class="details-box box-shadow">
      <div class="details-text-box">
        <p class="details-text">
          <strong>Coach:</strong> {{ coachDetails.firstName }}
          {{ coachDetails.lastName }}
        </p>
        <p class="details-text">
          <strong>Rate:</strong> ${{ coachDetails.rate }}/hour
        </p>
        <p class="details-text">
          <strong class="details-text-areas">Areas of Expertise:&nbsp;</strong>
          <span
            v-for="area in coachDetails.areas"
            :key="area"
            class="details-areas-list"
          >
            <p
              class="tag"
              :class="[
                area === 'Teacher'
                  ? 'tag-teacher'
                  : area === 'Frontend'
                  ? 'tag-frontend'
                  : area === 'Backend'
                  ? 'tag-backend'
                  : null,
              ]"
            >
              {{ area }}
            </p>
          </span>
          <!-- <li>{{ coachDetails.areas }}</li> -->
        </p>
        <p class="details-text">
          <strong>Description:</strong> {{ coachDetails.description }}
        </p>
      </div>
      <div class="details-img-btn-box">
        <img
          :src="`../../images/${coachDetails.firstName}.jpg`"
          alt="Image of coach"
          class="img-coach"
        />

        <button @click="contactClick" class="router-nav-link btn-contact">
          Contact
        </button>
      </div>
      <transition name="contact" mode="out-in">
        <contact-coach
          v-if="showContact"
          :currentCoach="coachDetails"
          class="contact-coach-open"
        ></contact-coach>
      </transition>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ContactCoach from './ContactCoach.vue';
import { ref, computed } from 'vue';
export default {
  components: {
    ContactCoach,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const routeId = route.params.id;
    const coachDetails = computed(() => store.getters.getCoachDetails);

    // for reloading browser
    const loadCoachDetails = async () => {
      await store.dispatch('loadCoaches', {
        forceRefresh: true,
      });
      const coaches = computed(() => store.getters.getCoaches);
      const [coachDetails] = coaches.value.filter((uid) => uid.id === routeId);
      return store.dispatch('coachDetailsUpdate', coachDetails);
    };

    loadCoachDetails();

    const showContact = ref(false);

    function contactClick() {
      showContact.value = !showContact.value;
    }

    const isLoading = computed(() => store.getters.getIsLoading);

    return {
      routeId,
      coachDetails,
      contactClick,
      showContact,
      isLoading,
    };
  },
};
</script>

<style scoped>
.details-box {
  display: grid;
  grid-template-columns: 2fr 1fr;
  border: 2px solid #333;
  width: 80rem;

  padding: 3.2rem;
  margin-bottom: 2.4rem;
  align-items: flex-start;
  border-radius: 0.8rem;
}
.details-text {
  font-size: 1.95rem;
  margin-bottom: 1.2rem;
  line-height: 1;
}
.details-text ul {
  list-style: none;
}
.details-text-box {
  padding: 1.2rem;
}

.c {
  justify-self: end;
}

.details-img-btn-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-coach {
  justify-self: end;
  padding: 1.2rem;
  border-radius: 0.8rem;
  height: 20rem;
  width: 20rem;
}

.btn-contact {
  align-self: center;
  justify-self: end;
}

/* Transitions */
.contact-enter-from {
  opacity: 0;
  transform: translateX(100rem);
}
.contact-enter-active {
  transition: all 0.5s ease-in;
}

.contact-leave-active {
  transition: all 0.5s ease-out;
}

.contact-enter-to,
.contact-leave-from {
  opacity: 1;
  transform: translateX(0px);
}

.contact-leave-to {
  opacity: 0;
  transform: translateX(-100rem);
}
</style>
