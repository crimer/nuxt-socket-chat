<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <p class="text-xs-center">{{ text }}</p>
      <hr />
    </div>
    <div v-else class="wrap">
      <div class="message" :class="{ owner }">
        <small>
          <strong>{{ name }}</strong>
        </small>
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    name: String,
    text: String,
    owner: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.system{
  margin-bottom: 1rem;
  text-align: center;

}
.system p{
  margin-bottom: 1rem;

}
.wrap{
  display: flex;
  flex-direction: column;

}
.message{
  padding: 1rem;
  width: 50%;
  margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50,50,50,.3);
  border-radius: 4px;
  background-color: #1976d2;
  position: relative;
  margin-bottom: 1rem;

}
.message p{
  margin-bottom: 0;

}

.owner{
  background-color: white;
  color: black;
  align-self: flex-end;

}
</style>
