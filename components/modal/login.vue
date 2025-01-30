<template>
  <Dialog
    :visible="authStore.isLoginModalOpened"
    modal
    dismissable-mask
    header="Авторизация"
    :style="{ width: '20rem' }"
    @update:visible="() => authStore.showLoginModal(false)"
  >
    <div class="form">
      <Form
        v-slot="$form"
        :initial-values
        :resolver
        class="form__inner"
        @submit="onFormSubmit"
      >
        <div class="form__inpus-group">
          <div class="form__item">
            <FloatLabel variant="on">
              <InputText
                id="login-email"
                v-model:model-value="initialValues.email"
                name="email"
                autocomplete="off"
                fluid
              />
              <label for="login-email">Email</label>
            </FloatLabel>
            <Message
              v-if="$form.email?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.email.error.message }}
            </Message>
          </div>
          <div class="form__item">
            <FloatLabel variant="on">
              <Password
                id="login-password"
                v-model="initialValues.password"
                name="password"
                :feedback="false"
                toggle-mask
                fluid
              />
              <label for="login-password">Пароль</label>
            </FloatLabel>
            <Message
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.password.error.message }}
            </Message>
          </div>
        </div>
        <Btn
          :show-spinner="showBtnSpinner"
          class="form__btn"
          type="submit"
        >
          Войти
        </Btn>
      </Form>
      <button
        type="button"
        class="form__outsid-btn"
        @click="openRegistration"
      >
        Регистрация
      </button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useToast } from 'primevue/usetoast'
import type { ILogin } from '@/types/auth'

const authStore = useAuthStore()
const toast = useToast()

const showBtnSpinner = ref(false)
const isSubmitBlocked = ref(false)

const initialValues = ref<ILogin>({
  email: '',
  password: '',
})

const resolver = zodResolver(z.object({
  email: z
    .string()
    .nonempty({ message: 'Введите Email' })
    .email({ message: 'Некорректный Email' }),
  password: z
    .string()
    .nonempty({ message: 'Введите пароль' })
    .min(6, { message: 'Не может быть короче 6 символов' }),
}))

async function onFormSubmit(e: FormSubmitEvent) {
  if (!e.valid) return

  if (!isSubmitBlocked.value) {
    showBtnSpinner.value = true
    await authStore.fetchLogin(e.values as ILogin)
    showBtnSpinner.value = false
  }

  if (!authStore.loginError) {
    toast.add({
      severity: 'success',
      summary: 'Успешная авторизация',
      life: 3000,
    })

    authStore.showLoginModal(false)

    initialValues.value = {
      email: '',
      password: '',
    }
  }
  else if (authStore.loginError && authStore.loginError.status === 401) {
    isSubmitBlocked.value = true
    toast.add({
      severity: 'error',
      summary: 'Неверный Email или пароль',
      life: 3000,
    })
  }
  else if (authStore.loginError && authStore.loginError.status === 500) {
    isSubmitBlocked.value = true
    toast.add({
      severity: 'error',
      summary: 'Ошибка сервера',
      life: 3000,
    })
  }
}

function openRegistration() {
  authStore.showLoginModal(false)
  authStore.showRegistrationModal(true)
}

watch(() => initialValues.value, () => isSubmitBlocked.value = false, { deep: true })
</script>

<style scoped lang="scss">
.form {
  display: grid;
  padding-top: 16px;
  &__inner {
    display: grid;
  }
  &__inpus-group {
    display: grid;
    row-gap: 16px;
    margin-bottom: 24px;
  }
  &__item {
    display: grid;
    row-gap: 4px;
  }
  &__btn {
    max-width: max-content;
    margin-bottom: 8px;
  }
  &__outsid-btn {
    $padding: 4px;
    position: relative;
    justify-self: flex-end;
    padding: $padding;
    font-size: 14px;
    font-weight: 600;
    color: $secondary;
    @include transition(color);
    &::before {
      position: absolute;
      content: '';
      right: $padding;
      bottom: 0;
      left: $padding;
      border-bottom: 2px solid $primary;
      transform: scaleX(100%);
      @include transition(transform);
    }

    &:focus-visible {
      outline: none;
      color: $primary;
      &::before {
        transform: scale(0);
      }
    }

    @media #{$xl-screen} {
      &:hover {
        outline: none;
        color: $primary;
        &::before {
          transform: scale(0);
        }
      }
    }
  }
}
</style>
