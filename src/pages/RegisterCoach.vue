<template>
  <div class="container flex-column">
    <h1 class="heading-primary">Register as a Coach</h1>
    <form @submit.prevent="submitReq" class="signup-coach-form">
      <div>
        <label for="email">Your Email Address: </label>
      </div>
      <div>
        <input type="text" title="email" v-model="state.email" />
      </div>
      <span class="input-error" v-if="v$.email.$error">{{
        v$.email.$errors[0].$message
      }}</span>
      <div>
        <label for="firstName">Your First Name: </label>
      </div>
      <div>
        <input type="text" title="firstName" v-model="state.firstName" />
      </div>
      <span class="input-error" v-if="v$.firstName.$error">{{
        v$.firstName.$errors[0].$message
      }}</span>
      <div>
        <label for="lastName">Your Surname: </label>
      </div>
      <div>
        <input type="text" title="lastName" v-model="state.lastName" />
      </div>
      <span class="input-error" v-if="v$.lastName.$error">{{
        v$.lastName.$errors[0].$message
      }}</span>
      <div>
        <label for="rate">Your Rate Per Hour in $: </label>
      </div>
      <div>
        <input type="number" title="rate" v-model="state.rate" />
      </div>
      <span class="input-error" v-if="v$.rate.$error">{{
        v$.rate.$errors[0].$message
      }}</span>
      <div>
        <label for="description"
          >Please enter a description of yourself:
        </label>
      </div>
      <div>
        <textarea rows="5" name="description" v-model="state.description" />
      </div>
      <span class="input-error" v-if="v$.description.$error">{{
        v$.description.$errors[0].$message
      }}</span>
      <div class="signup-coach-checkboxes">
        <label>Please select your Areas of Expertise:</label>
        <div>
          <input
            type="checkbox"
            id="teacher"
            value="Teacher"
            v-model="state.areas"
          />
          <label for="teacher">&nbsp;&#8212;&nbsp;Teacher</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="frontend"
            value="Frontend"
            v-model="state.areas"
          />
          <label for="frontend">&nbsp;&#8212;&nbsp;Frontend</label>
        </div>
        <div class="margin-bottom-sm">
          <input
            type="checkbox"
            id="backend"
            value="Backend"
            v-model="state.areas"
          />
          <label for="backend">&nbsp;&#8212;&nbsp;Backend</label>
        </div>
      </div>
      <span class="input-error" v-if="v$.areas.$error">{{
        v$.areas.$errors[0].$message
      }}</span>
      <button class="router-nav-link btn-submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      email: '',
      firstName: '',
      lastName: '',
      description: '',
      rate: '',
      areas: [],
    });

    const rules = computed(() => {
      return {
        email: { required, email },
        firstName: { required },
        lastName: { required },
        description: { required },
        rate: { required },
        areas: { required },
      };
    });

    const v$ = useVuelidate(rules, state);

    const submitReq = async () => {
      v$.value.$validate();
      try {
        if (!v$.value.$error) {
          await store.dispatch('registerCoach', state);
          await store.dispatch('loadCoaches', {
            forceRefresh: true,
          });
          router.push('/coaches');
        } else {
          throw new Error(
            'There was an issue with the information entered. Please ensure all the fields have been completed, and try again.'
          );
        }
      } catch (err) {
        console.error(err);
        store.dispatch('updateError', err);
      }
    };

    return { submitReq, state, v$ };
  },
};
</script>

<style scoped>
.signup-coach-form {
  font-size: 1.53rem;
  padding: 1.2rem;
}

.signup-coach-form label {
  font-weight: 600;
  display: inline-block;
  margin-bottom: 0.4rem;
  color: #555;
}

.signup-coach-form input {
  margin-bottom: 0.4rem;
  font-size: 1.95rem;
  border-radius: 0.8rem;
  color: #333;
  padding: 0.4rem 0.8rem;
  border: 2px solid #333;
}

.signup-coach-form textarea {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  font-size: 1.95rem;
  padding: 0.4rem 1.2rem;
  border-radius: 0.8rem;
  color: #333;
  border: 2px solid #333;
}
</style>
