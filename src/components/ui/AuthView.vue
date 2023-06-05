<template>
  <div class="login-register-btns" v-if="!whoLogged">
    <div>
      <router-link class="router-nav-link btn-signup header-btn" to="/newUser"
        >Signup</router-link
      >
    </div>
    <div>
      <button class="router-nav-link btn-login" @click="openLogin">
        Login
      </button>
    </div>
  </div>
  <div v-if="whoLogged" class="login-register-btns">
    <div v-if="!isCoach">
      <router-link class="router-nav-link btn-login" to="register"
        >Register as a Coach</router-link
      >
    </div>
    <div>
      <button class="router-nav-link btn-login" @click="logout">Logout</button>
      <div v-if="!!currentUser" class="logged-info">
        Logged in as: {{ currentUser }}
      </div>
      <div v-if="!currentUser" class="logged-info logged-info-not-coach">
        Logged in
      </div>
    </div>
  </div>
  <transition name="login" mode="out-in">
    <login-dialog></login-dialog>
  </transition>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import LoginDialog from './LoginDialog.vue';

export default {
  components: {
    LoginDialog,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const whoLogged = computed(() => store.getters.getWhoLogged);
    const currentUser = computed(() => store.getters.getCurrentUser);
    const isCoach = computed(() => store.getters.getIsCoach);

    function openLogin() {
      store.dispatch('openLogin');
    }

    function logout() {
      store.dispatch('logout');
      router.push('/coaches');
    }

    return {
      whoLogged,
      logout,
      openLogin,
      currentUser,
      isCoach,
    };
  },
};
</script>

<style scoped>
.login-register-btns {
  display: flex;
  justify-content: center;
  gap: 3.6rem;
  align-items: center;
}

.btn-login,
.btn-signup {
  background-color: #570080;
  border: none;
  margin-bottom: 0;
}
.logged-info {
  color: #fff;
  position: absolute;
  top: 7rem;
  right: 2rem;
}
.logged-info-not-coach {
  right: 11rem;
}

/* Transition */

.login-enter-from {
  opacity: 0;
  transform: translateZ(0);
}
.login-enter-active {
  transition: all 0.3s ease-in;
}

.login-leave-active {
  transition: all 0.3s ease-out;
}

.login-enter-to,
.login-leave-from {
  opacity: 1;
  transform: translateZ(100);
}

.login-leave-to {
  opacity: 0;
  transform: translateZ(0);
}
</style>
