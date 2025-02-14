<template>
  <OrderFieldset legend="Получатель">
    <ul class="recipient-list">
      <li class="recipient-list__item">
        <OrderFormInput
          v-model="updatedName"
          :required="true"
          label="Имя"
          name="name"
          :error-message="errorName"
        />
      </li>
      <li class="recipient-list__item">
        <OrderFormInput
          v-model="updatedSurname"
          :required="true"
          label="Фамилия"
          name="surname"
          :error-message="errorSurname"
        />
      </li>
      <li class="recipient-list__item">
        <OrderFormInput
          v-model="updatedPhone"
          :required="true"
          label="Тел."
          name="phone"
          input-type="mask"
          :error-message="errorPhone"
        />
      </li>
    </ul>
  </OrderFieldset>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  surname: string
  phone: string
  errorName?: string
  errorSurname?: string
  errorPhone?: string
}>()

const emit = defineEmits<{
  (e: 'update:name' | 'update:surname' | 'update:phone', value: string): void
}>()

const updatedName = computed({
  get: () => props.name,
  set: (newValue) => {
    emit('update:name', newValue)
  },
})
const updatedSurname = computed({
  get: () => props.surname,
  set: (newValue) => {
    emit('update:surname', newValue)
  },
})
const updatedPhone = computed({
  get: () => props.phone,
  set: (newValue) => {
    emit('update:phone', newValue)
  },
})
</script>

<style scoped lang="scss">
.recipient-list {
  display: grid;
  row-gap: 12px;
}
</style>
