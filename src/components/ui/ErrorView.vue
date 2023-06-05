<template>
  <dialog open v-if="show" class="backdrop">
    <form method="dialog" class="errorForm">
      <h2 class="heading-secondary">An error occurred</h2>
      <section class="slot-text">
        <slot></slot>
      </section>
      <button @click="tryClose" class="router-nav-link" type="button">
        CLOSE
      </button>
    </form>
  </dialog>
</template>

<script>
export default {
  props: ['show'],
  emits: ['close'],
  setup(_, { emit }) {
    function tryClose() {
      emit('close');
    }

    return { tryClose };
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
.errorForm {
  position: fixed;
  display: flex;
  flex-direction: column;
  font-size: 1.95rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 35rem;
  width: 40rem;
  line-height: 1.2;
  z-index: 100;
  align-items: center;
  justify-content: space-evenly;
  padding: 0.8rem 1.6rem;
  border: 4px solid black;
  background-color: #ddcce6;
  text-align: start;
}

h2 {
  margin-bottom: 0;
}
</style>
