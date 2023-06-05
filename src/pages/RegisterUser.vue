<template>
  <div class="container flex-column">
    <h1 class="heading-primary">Register as a New User</h1>
    <form @submit.prevent="submitReq" class="signup-user-form">
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
        <label for="password">Your Password:</label>
      </div>
      <div>
        <input
          v-if="showPassword"
          type="text"
          title="password"
          v-model="state.password.password"
        />
        <input
          v-else
          type="password"
          class="input"
          v-model="state.password.password"
        />
      </div>
      <span class="input-error" v-if="v$.password.password.$error">{{
        v$.password.password.$errors[0].$message
      }}</span>
      <div>
        <label for="confirm">Confirm Password:</label>
      </div>
      <div>
        <input
          type="password"
          title="confirm"
          v-model="state.password.confirm"
        />
      </div>
      <span class="input-error" v-if="v$.password.confirm.$error">{{
        v$.password.confirm.$errors[0].$message
      }}</span>
      <div class="control-eye">
        <button
          type="button"
          class="btn-eye"
          @click="toggleShow"
          v-if="!showPassword"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
        <button type="button" class="btn-eye" @click="toggleShow" v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
              clip-rule="evenodd"
            />
            <path
              d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
            />
          </svg>
        </button>
      </div>
      <button class="router-nav-link btn-submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { minLength, sameAs, email, required } from '@vuelidate/validators';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      email: '',
      password: {
        password: '',
        confirm: '',
      },
    });

    const rules = computed(() => {
      return {
        email: { required, email },
        password: {
          password: { required, minLength: minLength(6) },
          confirm: { required, sameAs: sameAs(state.password.password) },
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    async function submitReq() {
      v$.value.$validate();
      const payload = [state.email, state.password.password];
      try {
        if (!v$.value.$error) {
          await store.dispatch('registerUser', state);
          router.push('/coaches');
          await store.dispatch('login', payload);
        } else {
          throw new Error(
            'There was an issue with the entered email or password. Please ensure these are correct, and try logging in again.'
          );
        }
      } catch (err) {
        console.error(err);
        store.dispatch('updateError', err);
      }
    }

    const showPassword = computed(() => store.getters.getShowPassword);

    function toggleShow() {
      store.dispatch('showPassword');
    }
    return { state, v$, submitReq, showPassword, toggleShow };
  },
};
</script>

<style scoped>
.signup-user-form {
  font-size: 1.53rem;
  padding: 2.4rem;
  align-self: center;
  position: relative;
}

.signup-user-form label {
  font-weight: 600;
  display: inline-block;
  color: #555;
}

.signup-user-form input {
  margin-top: 0.4rem;
  font-size: 1.95rem;
  border-radius: 0.8rem;
  padding: 0.4rem 0.8rem;
  margin-bottom: 0.4rem;
}

.control-eye {
  position: absolute;
  top: 37.5%;
  right: -5%;
}
</style>
