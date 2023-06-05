<template>
  <div class="backdrop" v-if="showLogin">
    <dialog open class="login-register-form box-shadow">
      <h2 class="heading-secondary">Login</h2>
      <form @submit.prevent="login" class="login-form" autocomplete="off">
        <div class="login-form-el">
          <label for="input-email">Email:&nbsp;</label>
          <input type="text" id="input-email" v-model="state.email" />
          <span class="input-error" v-if="v$.email.$error">{{
            v$.email.$errors[0].$message
          }}</span>
        </div>

        <div class="login-form-el">
          <label for="input-password">Password:&nbsp;</label>
          <input
            v-if="showPassword"
            id="input-password"
            type="text"
            class="input"
            v-model="state.password"
          />
          <input
            v-else
            id="input-password"
            type="password"
            class="input"
            v-model="state.password"
          />
          <span class="input-error" v-if="v$.password.$error">{{
            v$.password.$errors[0].$message
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
        </div>
        <button class="router-nav-link btn-login-form">Login</button>
      </form>
      <button @click="closeLogin" class="btn-login-form-close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </dialog>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { minLength, email, required } from '@vuelidate/validators';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      email: '',
      password: '',
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        password: { required, minLength: minLength(6) },
      };
    });
    const v$ = useVuelidate(rules, state);

    const error = computed(() => store.getters.getError);
    const showLogin = computed(() => store.getters.getShowLogin);
    const showPassword = computed(() => store.getters.getShowPassword);

    function toggleShow() {
      store.dispatch('showPassword');
    }
    function closeLogin() {
      state.email = '';
      state.password = '';
      store.dispatch('closeLogin');
      handleError();
    }
    function handleError() {
      store.dispatch('handleError');
    }

    function login() {
      v$.value.$validate();
      try {
        if (!v$.value.$error) {
          store.dispatch('login', [state.email, state.password]);
          store.dispatch('closeLogin');
          state.email = '';
          state.password = '';
        } else {
          throw new Error(
            'There was an issue the entered email or password. Please ensure these are correct, and try logging in again.'
          );
        }
      } catch (err) {
        console.error(err);
        store.dispatch('updateError', err);
      }
      router.push('/coaches');
    }

    return {
      state,
      v$,
      error,
      showLogin,
      login,
      showPassword,
      toggleShow,
      closeLogin,
    };
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
.login-register-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  height: 45rem;
  width: 50rem;
  z-index: 100;
  align-items: center;
  justify-content: center;
}

.transform {
  transform: translateX(5rem);
}

.login-form {
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 4px dashed #9a66b3;
  border-bottom: 4px dashed #9a66b3;
  position: relative;
  margin-bottom: 0.3rem;
}
.login-form-el {
  padding: 1.2rem;
  font-size: 1.56rem;
}
.login-form-el label {
  font-weight: 600;
  color: #555;
}
.login-form-el input {
  display: block;
  width: 100%;
  margin-top: 0.4rem;
  font-size: 1.95rem;
  border-radius: 0.8rem;
  padding: 0.4rem 0.8rem;
}

.btn-login-form {
  justify-self: center;
  align-self: center;
  position: relative;
}

.btn-login-form-close {
  height: 3.6rem;
  width: 3.6rem;
  position: absolute;
  top: -0.2rem;
  right: -0.2rem;
  border: 2px solid #333;
  color: #333;
}

.control-eye {
  position: absolute;
  top: 53%;
  right: -1%;
}
</style>
