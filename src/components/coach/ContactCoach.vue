<template>
  <form
    @submit.prevent="submitReq"
    class="contact-coach-form"
    autocomplete="off"
  >
    <h2 class="heading-secondary">
      Contact
      <span>{{ currentCoach.firstName }}&nbsp;{{ currentCoach.lastName }}</span>
    </h2>
    <div>
      <label for="firstName">Your First Name: </label>
    </div>
    <div>
      <input
        id="firstName"
        type="text"
        title="firstName"
        v-model="state.firstName"
      />
    </div>
    <span class="input-error" v-if="v$.firstName.$error">{{
      v$.firstName.$errors[0].$message
    }}</span>
    <div>
      <label for="lastName">Your Surname: </label>
    </div>
    <div>
      <input
        id="lastName"
        type="text"
        title="lastName"
        v-model="state.lastName"
      />
    </div>
    <span class="input-error" v-if="v$.lastName.$error">{{
      v$.lastName.$errors[0].$message
    }}</span>
    <div>
      <label for="email">Your Email Address: </label>
    </div>
    <div>
      <input id="email" type="text" title="email" v-model="state.email" />
    </div>
    <span class="input-error" v-if="v$.email.$error">{{
      v$.email.$errors[0].$message
    }}</span>
    <div>
      <label for="message">Your Request: </label>
    </div>
    <div>
      <textarea id="message" rows="3" name="message" v-model="state.message" />
    </div>
    <span class="input-error" v-if="v$.message.$error">{{
      v$.message.$errors[0].$message
    }}</span>
    <button class="router-nav-link">Submit</button>
  </form>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';

export default {
  props: ['currentCoach'],
  setup() {
    const store = useStore();
    const router = useRouter();
    const coaches = store.getters.getCoaches;

    const route = useRoute();
    const routeId = route.params.id;

    const state = reactive({
      coachId: routeId,
      email: '',
      message: '',
      firstName: '',
      lastName: '',
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        message: { required },
        firstName: { required },
        lastName: { required },
      };
    });
    const v$ = useVuelidate(rules, state);

    function submitReq() {
      v$.value.$validate();
      try {
        if (!v$.value.$error) {
          store.dispatch('registerRequest', state);
          router.push('/coaches');
        } else {
          throw new Error(
            'Please make sure you have filled in all the required fields.'
          );
        }
      } catch (err) {
        console.error(err);
        store.dispatch('updateError', err);
      }
    }

    return {
      v$,
      state,
      submitReq,
      coaches,
    };
  },
};
</script>

<style scoped>
.contact-coach-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: span 2;
  font-size: 1.53rem;
  padding: 1.2rem 4.8rem;
  border-top: 4px dashed #9a66b3;
  border-bottom: 4px dashed #9a66b3;
  margin-top: 2.4rem;
}

.contact-coach-form label {
  font-weight: 600;
}

.contact-coach-form input {
  margin-bottom: 0.4rem;
  margin-top: 0.4rem;
  font-size: 1.95rem;
  border-radius: 0.8rem;
  color: #333;
  padding: 0.4rem 0.8rem;
}

.contact-coach-form textarea {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  font-size: 1.95rem;
  padding: 0.4rem 1.2rem;
  border-radius: 0.8rem;
  color: #333;
  border: 2px solid #333;
}
</style>
