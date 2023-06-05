<template>
  <div class="request-box">
    <li class="request-item request-none" v-if="!isCoach">
      You need to register as a coach to receive requests
    </li>
    <li
      class="request-item request-none"
      v-if="isCoach && filteredRequests.length <= 0"
    >
      No requests received as of yet
    </li>

    <li
      class="request-item fade"
      v-for="{
        id,
        firstName,
        lastName,
        email,
        message,
        date,
        time,
      } in filteredRequests"
      :key="id"
    >
      <div class="request-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="current-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          @click="openRequest"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="hidden-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          @click="closeRequest"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
      <div>
        <p class="request-text-title">
          From:&nbsp;<span class="request-text">
            {{ firstName }} {{ lastName }}</span
          >
        </p>
      </div>
      <div>
        <p class="request-text-title">
          Received:&nbsp;<span class="request-text">{{ time }}</span
          >&nbsp;<span class="request-text">{{ date }}</span>
        </p>
      </div>
      <div class="hide-request">
        <p class="request-text-title">
          Message:&nbsp;<span class="request-text request-message">{{
            message
          }}</span>
        </p>
        <p class="request-text-title">
          Contact:&nbsp;<a :href="'mailto:' + email" class="request-contact">{{
            email
          }}</a>
        </p>
      </div>
    </li>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const filteredRequests = computed(() => store.getters.getFilteredRequests);
    const isRequestOpen = computed(() => store.getters.getIsRequestOpen);
    const isCoach = computed(() => store.getters.getIsCoach);

    function openRequest(e) {
      const target = e.target.closest('svg');
      target.classList.add('hidden-icon');
      target.classList.remove('current-icon');
      const otherIcon = target.nextSibling;
      otherIcon.classList.remove('hidden-icon');
      otherIcon.classList.add('current-icon');
      const listEl = e.target.closest('li');
      listEl.classList.add('open');
      store.dispatch('requestOpen');
    }

    function closeRequest(e) {
      const target = e.target.closest('svg');
      target.classList.add('hidden-icon');
      target.classList.remove('current-icon');
      const otherIcon = target.previousSibling;
      otherIcon.classList.remove('hidden-icon');
      otherIcon.classList.add('current-icon');
      const listEl = e.target.closest('li');
      listEl.classList.remove('open');
      store.dispatch('requestOpen');
    }

    return {
      filteredRequests,
      openRequest,
      isRequestOpen,
      closeRequest,
      isCoach,
    };
  },
};
</script>

<style scoped>
.request-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  border: 2px solid #570080;
  width: 100%;
  align-items: center;
  column-gap: 2.4rem;
  row-gap: 1.2rem;
  padding: 1.2rem;
  color: #333;
  transition: 1s all ease-in-out;
}

.request-none {
  font-size: 1.95rem;
}

.request-icon {
  width: 2.4rem;
  height: 2.4rem;
  color: #570080;
}

.request-text-title {
  font-size: 1.53rem;
  font-weight: 500;
  color: #555;
}

.request-text {
  font-size: 1.53rem;
  font-family: 500;
  font-weight: 700;
  color: #333;
}

.request-message {
  margin-top: 0.8rem;
  display: block;
  margin-bottom: 1.2rem;
}

/* Collapsing message */

.hide-request {
  grid-column: 2 /4;
  display: none;
}
.open {
  border: 2px dashed #9a66b3;
}

.open .hide-request {
  display: block;
}

.open .icon {
  color: #333;
}

.current-icon {
  grid-column: 1;
}
.hidden-icon {
  display: none;
}

/* Transitions */
</style>
